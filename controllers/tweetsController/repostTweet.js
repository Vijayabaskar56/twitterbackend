const repostTweet = (Post) => {
  return async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
      await Post.create({
        userId: userId,
        repostId: id,
      });

      res
        .status(200)
        .json({ status: "sucess", message: "Tweet reposted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ status: "failed", message: "RePost tweet failed" });
    }
  };
};

module.exports = repostTweet;
