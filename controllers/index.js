const registeration = require("./registeration");
const login = require("./login");
const password = require("./password");
const healthcheck = require("./healthcheck");
const verificationCode = require("./verificationCode");
const userDetails = require("./userDetails");
const postTweet = require("./tweetsController/postTweeet");
const repostTweet = require("./tweetsController/repostTweet");
const replayTweets = require("./tweetsController/replayTweets");
const feed = require("./tweetsController/feed");

const index = {
  registeration,
  login,
  password,
  healthcheck,
  verificationCode,
  userDetails,
  postTweet,
  repostTweet,
  replayTweets,
  feed,
};

module.exports = index;
