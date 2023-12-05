const likePost = (Likes) => {
  return async (req, res) => {
    const { postId, likedBy } = req.body;

    try {
      const like = await Likes.findOne({
        where: {
          postId: postId,
          likedBy: likedBy,
        },
      });

      if (like) {
        await Likes.destroy({
          where: {
            postId: postId,
            likedBy: likedBy,
          },
        });

        res.status(200).json({
          status: "success",
          message: "Unliked successfully",
        });
      } else {
        await Likes.create({
          postId: postId,
          likedBy: likedBy,
          likedAt: Date.now(),
        });

        res.status(200).json({
          status: "success",
          message: "Liked successfully",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error,
      });
    }
  };
};

module.exports = likePost;
