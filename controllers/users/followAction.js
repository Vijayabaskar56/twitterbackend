const followAction = (FollowAction) => {
  return async (req, res) => {
    const { followerId, followedId } = req.body;

    try {
      const followAction = await FollowAction.findOne({
        where: {
          followerId: followerId,
          followedId: followedId,
        },
      });

      if (followAction) {
        await FollowAction.destroy({
          where: {
            followerId: followerId,
            followedId: followedId,
          },
        });

        res.status(200).json({
          status: "success",
          message: "Unfollowed successfully",
        });
      } else {
        await FollowAction.create({
          followerId: followerId,
          followedId: followedId,
          followedAt: Date.now(),
        });

        res.status(200).json({
          status: "success",
          message: "Followed successfully",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Follow action failed",
      });
    }
  };
};

module.exports = followAction;
