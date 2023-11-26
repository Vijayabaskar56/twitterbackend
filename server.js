require("express-async-errors");
const express = require("express");
const db = require("./models/index.js");
const errorHandler = require("./handler/errorHandler.js");
require("dotenv").config();
const app = express();
const { User, Post, FollowAction, Likes, Comments } = require("./models");
const bcrpyt = require("bcrypt");
var jwt = require("jsonwebtoken");
app.use(express.json());

app.get("/healthcheck", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.close();
    res.status(200).json({ status: "Sucessfully connected" });
  } catch (error) {
    await db.sequelize.close();
    res.status(500).json({ status: "failed to connect" });
  }
});

const authenticateUser = async (req, res, next) => {
  try {
    const authtoken = req.headers.authorization.replace("Bearer ", "");
    const jwtPayload = jwt.verify(authtoken, process.env.jwt_salt);
    console.log(jwtPayload);
    req.user = jwtPayload;
    next();
  } catch (e) {
    res.status(401).json({ status: "failed", message: "unauthorized" });
    return;
  }
};

app.post("/registration", async (req, res) => {
  console.log(req.body);
  const { username, email, dateOfBirth } = req.body;

  const verifyUser = await User.findOne({ where: { email: email } });

  if (verifyUser) throw "User has account, try login";

  await User.create({
    username,
    email,
    dateOfBirth,
  })
    .then(() => res.json({ status: "create successfully" }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "something went wrong" });
    });
});

app.post("/password", async (req, res) => {
  const { userId, password } = req.body;

  const hashedPassword = await bcrpyt.hash(password, 7);

  User.update({ password: hashedPassword }, { where: { id: userId } }).then(
    res.status(200).json({ status: "password set successfully" })
  );
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const getUser = await User.findOne({ where: { email: email } });
  if (!getUser) throw "UserName or Password is invalid";

  const dehashpasssword = await bcrpyt.compare(password, getUser.password);

  if (!dehashpasssword) throw "UserName or Password is invalid";

  // jwt auth
  const accessToken = await jwt.sign(
    {
      user_id: getUser.id,
      email: getUser.email,
      iat: Date.now(),
    },
    process.env.jwt_salt,
    {
      expiresIn: "30d",
    }
  );

  // Set auth session expiry
  const authSessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  // success response
  await User.update(
    { authToken: accessToken, authSessionExpiry: authSessionExpiry },
    { where: { id: getUser.id } }
  )
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "User Loged in sucessfully",
        accessToken: accessToken,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ status: "failed", message: "login failed" });
    });
});

app.get("/feed", authenticateUser, async (req, res) => {
  console.log("hello from feed");
  res.status(200).json({ status: "success", message: "feeddddd" });
});

app.post("/user", authenticateUser, async (res, req) => {});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
