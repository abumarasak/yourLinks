const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    password: String,
    userName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    isAdmin: Boolean,
    isActive: Boolean,
    image: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
