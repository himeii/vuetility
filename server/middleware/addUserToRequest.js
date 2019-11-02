const User = require("../components/users/userModel");

module.exports = (req, res, next) => {
  req.user = User.findByPk(req.pk);
  next();
};
