//dependencies
const http = require("http");
const dotenv = require("dotenv");
require("express-async-errors");
const { clientURL } = require("./URI");
const express = require("express");
const connectDB = require("./db/connect");
const path = require("path");
const bodyParser = require("body-parser");

const { Server } = require("socket.io");

//security dependencies

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

//app initialization

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes
app.use(function (req, res, next) {
  // console.log(req.header("Origin"));
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Type"
  );
  res.header("Content-Type", "multipart/form-data");

  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const waitlistRouter = require("./routes/WaitlistRoute");
const orderRouter = require("./routes/Order");
const subscriptionRouter = require("./routes/subscription");

//middle wares

const errorHandlerMiddleware = require("./middleware/error-handler");
const authorizationMiddleware = require("./middleware/authorization");
const notFoundMiddleware = require("./middleware/not-found");
const checkSubscription = require("./middleware/checkSubscription");
const userMiddleware = require("./middleware/usermiddleware");

app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: clientURL }));
dotenv.config({ path: "./config.env" });

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

app.use(express.static("public"));

//routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/waitlist", waitlistRouter);
app.use("/api/v1/users", authorizationMiddleware, userRouter);
app.use(
  "/api/v1/orders",
  authorizationMiddleware,
  checkSubscription,
  orderRouter
);
app.use("/api/v1/subscribe", authorizationMiddleware, subscriptionRouter);
// authorizationMiddleware

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.use(function (req, res, next) {
  // console.log(req.header("Origin"));
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Content-Type", "multipart/form-data");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

// ==========================
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const users = [];

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("disconnect", () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log("Offline", user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("updateUser", user);
      }
    }
  });
  socket.on("onLogin", (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log("Online", user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit("updateUser", updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit("listUsers", users);
    }
  });

  socket.on("onUserSelected", (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit("selectUser", existUser);
    }
  });

  socket.on("onMessage", (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit("message", message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("message", message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit("message", {
          name: "Admin",
          body: "Sorry. I am not online right now",
        });
      }
    }
  });
});

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_LOCAL).then(() =>
      console.log("DB connection successful!")
    );
    httpServer.listen(PORT, () => {
      console.log(`Serve at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
