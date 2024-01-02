const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    joined_on: {
      type: date,
      default: date.now(),
    },
    forgetpassword: {
      time: date,
      otp: String,
    },
    token: {
      type: String,
    },
  },
  {
    collection: "userSchema",
  }
);
module.exports = mongoose.model("userSchema", verifySchema);
