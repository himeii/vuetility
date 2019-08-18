const logger = require("../config/winston");

const getRouteInfo = (req, res, next) => {
  logger.log("info", `${res.status} ${req.url}`);
  next();
};
module.exports = getRouteInfo;
