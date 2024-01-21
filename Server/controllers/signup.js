const VerifyUser = require("../models/verifyusers");
const newUser = require("../models/user");

const { SendMail } = require("./sendmail");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
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
    const activationlink = `http://localhost:3000/signup/${token}`;
    const content = `<h4>Hi there,</h4>
    <h5>Welcome to the app</h5>
    <p>Thanks for signing up. Click the below link to activate</p>
    <a href=${activationlink}>Click here</a>
    <p>Regards</p>
    <p>Team</p>`;
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
      await usersVerify.deleteOne({ token: token });
      const content = `<h4>Hi there,</h4>
    <h5>Welcome to the app</h5>
    <p>You are sucessfully Registered</p>
    <p>Regards</p>
    <p>Team</p>`;
      SendMail(user.email, "Registration sucessfully", content);
      return content;
    } else {
      return "Registration failed";
    }
  } catch (error) {
    console.log(error);
    return "Unexpected Error Happened";
  }
}
module.exports = { InsertVerifyUser, InsertUser };
