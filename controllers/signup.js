const mongoose = require("mongoose");
const VerifyUser = require("../models/verifyusers");
const newUser = require("../models/user");

const { SendMail } = require("./sendmail");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();
var jwt = require("jsonwebtoken");
async function InsertVerifyUser(name, email, password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generateToken(email);

    const newUser = new VerifyUser({
      name: name,
      email: email,
      password: hashedPassword,
      token: token,
    });
    await newUser.save();
    const activationlink = process.env.signupurl + token;

    const { verification_content } = require("../pages/verification_email");
    const content = await verification_content(activationlink);

    SendMail(email, "verify user", content);
  } catch (e) {
    console.log(e);
  }
}
function generateToken(email) {
  const token = jwt.sign(email, process.env.secretKey);

  return token;
}
async function InsertUser(token) {
  try {
    const usersVerify = await VerifyUser.findOne({ token: token });
    if (usersVerify) {
      const user = new newUser({
        name: usersVerify.name,
        email: usersVerify.email,
        password: usersVerify.password,
        forgetpassword: {},
      });
      await user.save();
      let res = await VerifyUser.deleteMany({ token: token });
      const content = require("../pages/reg_success");
      SendMail(user.email, "Registration sucessfully", content);
      return content;
    } else {
      const content = require("../pages/reg_failed");
      return content;
    }
  } catch (error) {
    console.log(error);
    const content = require("../pages/server_fails");
    return content;
  }
}
module.exports = { InsertVerifyUser, InsertUser };
