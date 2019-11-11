module.exports = function protectedRoute(req, res, next) {
  console.log(req.user, req.isAuthenticated(), req.session);
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: "Unauthorized oleg" });
  }
  return next();
};
