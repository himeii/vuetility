const passport = require("passport");
const User = require("./userModel");

const getUser = async (req, res) => {
  const users = await User.findAll();
  res.send(users);
};

const authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.login(user, (error) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send({ user: { ...user.get(), password: undefined }, message: "ok" });
      });
    } else {
      return res.status(400).send({ message: "Something went wrong" });
    }
  })(req, res, next);
};

module.exports = {
  getUser,
  authenticate,
};
