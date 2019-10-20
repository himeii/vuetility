const User = require("./userModel");

const getUser = async (req, res) => {
  const users = await User.findAll();
  res.send(users);
};

const authenticate = async (req, res) => {
  const { login, password } = req.body;
  console.log(login, password);
  res.send({ login, password });
};

module.exports = {
  getUser,
  authenticate,
};
