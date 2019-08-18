const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const routes = require("./routes/index");
const winston = require("./config/winston");
const { SQL } = require("./config/db");

const app = express();

// * Check db
SQL.authenticate()
  .then(() => winston.info("Connected"))
  .catch((err) => winston.error("Could not connect", err));

// * Routes
app.use("/api", routes.apiRouter);
app.use("/auth", routes.authRouter);

// * Plugin setup
app.use(morgan("combined", { stream: winston.stream }));

// * Network setup
const PORT = process.env.PORT || 3001;
app.listen(PORT);
