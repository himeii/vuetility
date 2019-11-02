module.exports = function protectedRoute(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: "Unauthorized oleg" });
  }
  return next();
};
