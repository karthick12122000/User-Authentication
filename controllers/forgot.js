const mongoose = require("mongoose");
const { SendMail } = require("./sendmail");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { verification_content } = require("../pages/forget_email");
const users = require("../models/user");
const bcrypt = require("bcrypt");
function generateToken(email) {
  const token = jwt.sign(email, process.env.secretKey);

  return token;
}
async function forgot(email) {
  console.log(email);
  try {
    var user = await users.findOne({ email: email });
    if (user != null) {
      const token = generateToken(email);
      const link = process.env.forgoturl + token;

      const content = await verification_content(email, link);
      SendMail(email, "Reset Password", content);
      return "Password reset email was sent successfully.";
    } else {
      return "Invalid Email";
    }
  } catch (e) {
    console.log(e);
  }
}
async function reset(token, password) {
  try {
    const email = jwt.verify(token, process.env.loginsecret_token);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    var user = await users.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );
    if (user != null) {
      return "Updated Successfully";
    }
    return "No user found.";
  } catch (e) {
    return "Server busy";
    console.log(e);
  }
}

module.exports = { forgot, reset };
