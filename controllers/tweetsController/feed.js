const feed = (Post, Op) => {
  return async (req, res) => {
    const tweets = await Post.findAll({
      where: { content: { [Op.ne]: null } },
    });
    console.log(tweets);
    res.status(200).json({ status: "success", data: { tweets: tweets } });
  };
};

module.exports = feed;
