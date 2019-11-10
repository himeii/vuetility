const passport = require("passport");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("./userModel");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  password: Joi.string().min(8).max(30).required(),
});

const getUser = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(403).send({ message: "You're not logged in" });
  }
  const currentUser = await User.scope("withoutPassword").findOne({ where: { id: user } });
  return res.status(200).send(currentUser);
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.login(user, (error) => {
        if (error) {
          return next(error);
        }
        const safeUser = { ...user.get(), password: undefined };
        return res.status(200).send({ user: safeUser, message: "ok" });
      });
    } else {
      return res.status(400).send({ message: "Something went wrong" });
    }
  })(req, res, next);
};

const logout = (req, res) => {
  const { user } = req;
  console.log(req.user, req.session);
  if (!user) {
    return res.status(403).send({ message: "Can't logout, because no user is logged in." });
  }
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      return res.send(err);
    }
    return res.status(204).send({});
  });
};

const register = async (req, res, next) => {
  const { body } = req;
  const { value, error } = registerSchema.validate(body);
  console.log(value, error);
  if (error) {
    return res.status(400).send(error);
  }
  const { email } = body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).send({ message: "User is already registered" });
  }
  const password = await bcrypt.hash(value.password, 8);
  const registeredUser = await User.create({ ...value, password });
  if (registeredUser) {
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      console.log(registeredUser);
      return res.status(201).send({ user: { ...registeredUser.get(), password: undefined }, message: "Registered successfully" });
    });
  }
  return next();
};

const getProjectsDashboard = async (req, res) => {
  const { currentUser } = req;
  console.log(currentUser);
  const projects = await currentUser.getProjects();
  res.status(200).send(projects);
};

module.exports = {
  getUser,
  login,
  logout,
  register,
  getProjectsDashboard,
};
