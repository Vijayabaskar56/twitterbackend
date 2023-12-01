require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models/index.js");
const bcrpyt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const errorHandler = require("./handler/errorHandler.js");
const { User, Post, FollowAction, Likes, Comments } = require("./models");
const healthcheck = require("./controllers/healthcheck.js");
const { generateToken } = require("./utils.js");
const {
  registeration,
  password,
  login,
  verificationCode,
  userDetails,
  postTweet,
  repostTweet,
  replayTweets,
} = require("./controllers/index.js");
const feed = require("./controllers/tweetsController/feed.js");

const corsOptions = {
  origin: "http://localhost:5173" || "*",
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow all methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow all headers
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.get("/healthcheck", healthcheck(db));
app.post("/registration", registeration(User));
app.get("/getuser/:email", userDetails(User));
app.post("/password", password(User, bcrpyt));
app.post("/verificationCode", verificationCode(User));
app.post("/login", login(User, bcrpyt));
app.post("/posts", postTweet(Post, Likes));
app.post("/posts/:id/reposts", repostTweet(Post));
app.post("/posts/:id/replies", replayTweets(Post));
app.get("/feed", feed(Post, Op));
app.post("/user", async (res, req) => {});
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
