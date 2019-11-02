const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const RedisStore = require("connect-redis")(session);
const passport = require("passport");
const routes = require("./routes/index");
const winston = require("./config/winston");
const { SQL } = require("./config/db");
const routeLogger = require("./middleware/routeLogger");
const magic = require("./utils/magic");

const { urlencoded, json } = express;

const app = express();

// * Check db
SQL.authenticate()
  .then(() => winston.info("Connected"))
  .catch((err) => winston.error("Could not connect", err));

require("./config/relations");

// if (process.env.NODE_ENV === "development") {

// }

SQL.sync().then(() => {
  // require("./utils/testDB");
  magic();
});

// * Plugin setup
app.use(cors());

app.use(session({
  store: new RedisStore(),
  secret: "vuetility-is-a-secret",
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: false,
  },
}));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("combined", { stream: winston.stream }));
require("./services/passport");

// * Routes
app.use("/api", routes.apiRouter);
app.use("/auth", routes.authRouter);
app.use(routeLogger);

// * Network setup
const PORT = process.env.PORT || 3001;
app.listen(PORT);
