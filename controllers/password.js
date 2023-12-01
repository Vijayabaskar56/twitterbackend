const generateToken = require("../utils");

const password = (User, bcrpyt) => {
  return async (req, res) => {
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrpyt.hash(String(password), 7);
      const getUser = await User.findOne({ where: { email: email } });

      const authToken = generateToken(getUser);

      // Set auth session expiry
      const authSessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

      const userInfo = {
        id: getUser.id,
        username: getUser.username,
        email: getUser.email,
        authToken: authToken,
        authSessionExpiry: authSessionExpiry,
      };

      await User.update(
        {
          password: hashedPassword,
          authToken: authToken,
          authSessionExpiry: authSessionExpiry,
        },
        { where: { email: email } }
      ).then(
        res.status(200).json({
          status: "Success",
          message: "Account Created Successfully",
          authToken: authToken,
          userId: userInfo,
        })
      );
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "failed",
        message: "password setting  failed",
      });
    }
  };
};

module.exports = password;
