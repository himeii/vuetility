const User = require("../userModel");

async function withUser(req, res, next) {
  const id = req.user;
  console.log("current", req.user, req.session);
  const user = await User.findByPk(id);
  if (!user) {
    return next();
  }
  // scope("withoutPassword")
  req.currentUser = user;
  return next();
}

module.exports = withUser;
