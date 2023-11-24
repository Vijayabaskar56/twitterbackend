const User = require("../models/user");

const singup = async (req, res) => {
  console.log(req.body);
  const {
    userName,
    email,
    password,
    displayName,
    bio,
    bioShort,
    dateofBirth,
    website,
    location,
    profilePicUrl,
    headerPicUrl,
    emailVerifiedAt,
    authToken,
    authSession,
    authSessionExpiry,
  } = req.body;

  try {
    const verifyUser = await User.findOne({ where: { email: email } });

    if (verifyUser) {
      res.status(400).json({ status: "User has account, try login" });
      return;
    }

    await User.create({
      UserName: userName,
      email: email,
      password: password,
      displayName: displayName,
      bio: bio,
      bioShort: bioShort,
      dateofBirth: dateofBirth,
      website: website,
      location: location,
      profilePicUrl: profilePicUrl,
      headerPicUrl: headerPicUrl,
      emailVerifiedAt: emailVerifiedAt,
      authToken: authToken,
      authSession: authSession,
      authSessionExpiry: authSessionExpiry,
    })
      .then(() => res.json({ status: "create successfully" }))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ status: "something went wrong" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "something went wrong" });
  }
};

module.exports = singup;
