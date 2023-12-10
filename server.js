const { createClient } = require("@supabase/supabase-js");
const fs = require("fs").promises;
require("dotenv").config();
const config = require("./config/config.json");

config.development.username = process.env.DEV_USERNAME;
config.development.password = process.env.DEV_PASSWORD;
config.development.database = process.env.DEV_DATABASE;
config.development.host = process.env.DEV_HOST;

const express = require("express");
require("express-async-errors");
const cors = require("cors");
const db = require("./models/index.js");
const bcrpyt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const multer = require("multer");
const errorHandler = require("./handler/errorHandler.js");
const { User, Post, FollowAction, Likes, Comments } = require("./models");
const healthcheck = require("./controllers/healthcheck.js");
const { generateToken } = require("./handler/generateToken.js");
const {
  registeration,
  password,
  login,
  verificationCode,
  userDetails,
  postTweet,
  repostTweet,
  replayTweets,
  editProfile,
  followAction,
  likePost,
  getUser,
  getUserTweets,
} = require("./controllers/index.js");
const feed = require("./controllers/tweetsController/feed.js");
const isAuth = require("./utils.js");

const corsOptions = {
  origin: "http://localhost:5173" || "*",
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow all methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow all headers
};

const app = express();
const upload = multer({ dest: "uploads/" });

const supabase = createClient(process.env.SUPABASE_URL, process.env.ANON_KEY);

app.use(cors(corsOptions));
app.use(express.json());
app.get("/healthcheck", healthcheck(db));
app.post("/registration", registeration(User));
app.get("/getuser/:email", userDetails(User));
app.post("/password", password(User, bcrpyt));
app.post("/verificationCode", verificationCode(User));
app.post("/login", login(User, bcrpyt));
app.post("/posts", postTweet(Post, Likes));
app.post("/posts/:id/reposts", isAuth, repostTweet(Post));
app.post("/posts/:id/replies", isAuth, replayTweets(Post));
app.get("/feed", isAuth, feed(Post, User, Likes, Op));
app.get("/users", isAuth, getUser(User, FollowAction));
app.post("/editProfile", isAuth, editProfile(User, FollowAction));
app.get("/userTweets", isAuth, getUserTweets(Post, User, Likes, Op));
app.post("/followAction", followAction(FollowAction));
app.post("/posts/:id/like", likePost(Likes));
app.post("/uploadProfile/:id", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const file = await fs.readFile(req.file.path);
  const fileName = `Avatar_${req.params.id}.png`;
  console.log(file);
  const { data, error } = await supabase.storage
    .from("avathars")
    .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

  if (error) {
    return res.status(500).send(error.message);
  } else {
    const { publicURL, error } = supabase.storage
      .from("avathars")
      .getPublicUrl(fileName);
    if (error) {
      return res.status(500).send(error.message);
    }
    console.log(publicURL);
    await User.update(
      { profilePicUrl: publicURL },
      { where: { username: req.id } }
    );

    res.json({
      status: "success",
      message: "File uploaded successfully!",
      data: { name: fileName, url: publicURL },
    });
  }

  // Send a response back to the client
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
