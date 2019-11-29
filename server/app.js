const http = require("http");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const passport = require("passport");
const ioConstructor = require("socket.io");

const routes = require("./routes/index");
const winston = require("./config/winston");
const { SQL } = require("./config/db");
const routeLogger = require("./middleware/routeLogger");
const magic = require("./utils/magic");

const { urlencoded, json } = express;

const app = express();
const server = http.createServer(app);
// eslint-disable-next-line no-multi-assign
const io = ioConstructor(server);

global.io = io;

require("./services/socketio")(io);

const client = redis.createClient();
client.on("error", (error) => console.log(error));

// * Check db
SQL.authenticate()
  .then(() => winston.info("Connected"))
  .catch((err) => winston.error("Could not connect", err));

require("./config/relations");

// if (process.env.NODE_ENV === "development") {

// }

SQL.sync().then(() => {
  // require("./utils/testDB");
  // magic();
});

// * Plugin setup
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(session({
  store: new RedisStore({ client }),
  secret: "vuetility-is-a-secret",
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: false,
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
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


server.listen(PORT, () => {
  console.log("Connected");
});
