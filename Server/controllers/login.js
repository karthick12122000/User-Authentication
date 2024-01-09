const users = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();
async function CheckUser(email) {
  try {
    var user = await users.findOne({ email: email });
    if (user != null) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return e;
  }
}
async function AuthenticateUser(email, password) {
  try {
    var userCheck = await users.findOne({ email: email });
    if (userCheck) {
      var validatepassword = await bcrypt.compare(password, userCheck.password);
      if (validatepassword) {
        const token = jwt.sign(email, process.env.loginsecret_token);
        const response = {
          id: userCheck.id,
          name: userCheck.name,
          email: userCheck.email,
          token: token,
          status: true,
        };
        await users.findOneAndUpdate(
          { email: userCheck.email },
          { $set: { token: token } },
          { new: true }
        );
        return response;
      }
    }
    return "Invalid user name and password";
  } catch (error) {
    console.log(error);
    return "Server busy";
  }
}
module.exports = { CheckUser, AuthenticateUser };
