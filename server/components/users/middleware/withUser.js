const User = require("../userModel");

async function withUser(req, res, next) {
  const id = req.user;
  const user = await User.findByPk(id);
  if (!user) {
    return next();
  }
  // scope("withoutPassword")
  req.currentUser = user;
  return next();
}

module.exports = withUser;
