const User = require("./userModel");

const getUser = async (req, res) => {
  const users = await User.findAll();
  res.send(users);
};

module.exports = {
  getUser,
};
