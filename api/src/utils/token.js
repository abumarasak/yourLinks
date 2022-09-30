const jwt = require("jsonwebtoken");
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, isActive: user.isActive ,name : user.name},
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRATION_TIME }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, isActive: user.isActive , name : user.name},
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
};
module.exports = { generateAccessToken, generateRefreshToken };
