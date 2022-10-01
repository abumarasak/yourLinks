const asuncHandler = require("express-async-handler");
const User = require("./model");
const emailVerificationOtp = require("../email_verification_otp");
const { hashData, verifyHashedData } = require("../../util/bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../util/token");
// const RefreshToken = require("../refresh_token/model");
const validEmail = require("../../util/validEmail");
const { uploadFile } = require("../../util/s3");
const util = require("util");
const fs = require("fs");
const unlinkFile = util.promisify(fs.unlink);
const validImage = require("../../util/validImage");

// @desc signup user
// @route Posr /api/auth/signup
// @access Public
const signup = asuncHandler(async (req, res) => {
  const { name, email, password, userName } = req.body;
  //   check if user has all the required fields
  if (!name || !email || !password || !userName) {
    res.status(400);
    throw new Error("Please fill all the required fields");
  }
  //   check if all fields  not empty
  if (name === "" || email === "" || password === "" || userName === "") {
    res.status(400);
    throw new Error("Please fill all the required fields");
  }
  //   check if email is valid
  if (!validEmail(email)) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }
  //   check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //   check if user name already exists
  const userNameExists = await User.findOne({ userName });
  if (userNameExists) {
    res.status(400);
    throw new Error("User name already exists");
  }
  //    check if image is valid
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload image");
  }
  if (!validImage(req.file)) {
    res.status(400);
    throw new Error("Please upload valid image");
  }
  //   upload image
  const imageUrl = await uploadFile(req.file);
  if (!imageUrl) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  //   hash password
  const hashedPassword = await hashData(password);
  //   create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    userName,
    isAdmin: false,
    isActive: false,
    image: imageUrl,
  });
  if (!user) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  //   delete image from local storage
  await unlinkFile(req.file.path);
  //   send email verification otp
  await emailVerificationOtp(user, res);
});

// @desc signin user
// @route Posr /api/auth/signin
// @access Public
const signin = asuncHandler(async (req, res) => {});

module.exports = { signup, signin };
