const { sequelize } = require("../../models");

const getUserTweets = (Post, User, Likes, Op) => {
  return async (req, res) => {
    const { user } = req;
    const tweets = await Post.findAll({
      where: { userId: user.user_id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Likes,
          as: "likes",
          attributes: [[sequelize.fn("COUNT", "likes.id"), "likesCount"]],
        },
        {
          model: Post,
          as: "reposts",
          attributes: [[sequelize.fn("COUNT", "reposts.id"), "repostsCount"]],
        },
        {
          model: Post,
          as: "comments",
          attributes: [[sequelize.fn("COUNT", "comments"), "commentsCount"]],
        },
      ],
      group: ["Post.id", "user.id", "likes.id", "reposts.id", "comments.id"],
    });

    if (!tweets) throw "fetch User tweet failed";

    res.status(200).json(tweets);
  };
};

module.exports = getUserTweets;
