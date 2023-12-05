const editProfile = (Users) => {
  return async (req, res) => {
    const { userId, location, website, bio, profilePicUrl, headerPicUrl } =
      req.body;

    try {
      await Users.update(
        { location: location, website: website, bio: bio, location: location },
        { where: { id: userId } }
      );

      if (profilePicUrl) {
        await Users.update(
          { profilePicUrl: profilePicUrl },
          { where: { id: userId } }
        );
      }

      if (headerPicUrl) {
        await Users.update(
          { headerPicUrl: headerPicUrl },
          { where: { id: userId } }
        );
      }

      res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
        profilePicUrl: profilePicUrl,
        headerPicUrl: headerPicUrl,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error,
      });
    }
  };
};

module.exports = editProfile;
