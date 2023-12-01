const jwt = require("jsonwebtoken");

const generateToken = ({ id, email }) => {
  return jwt.sign(
    {
      user_id: id,
      email: email,
      iat: Date.now(),
    },
    process.env.jwt_salt,
    {
      expiresIn: "30d",
    }
  );
};

// const authenticateUser = async (req, res, next) => {
//   try {
//     const authtoken = req.headers.authorization.replace("Bearer ", "");
//     const jwtPayload = jwt.verify(authtoken, process.env.jwt_salt);
//     console.log(jwtPayload);
//     req.user = jwtPayload;
//     next();
//   } catch (e) {
//     res.status(401).json({ status: "failed", message: "unauthorized" });
//     return;
//   }
// };

module.exports = generateToken;
// module.exports = authenticateUser;
