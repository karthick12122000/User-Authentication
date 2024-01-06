const VerifyUser = require("../models/verifyusers");
const { SendMail } = require("./sendmail");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
var jwt = require("jsonwebtoken");
async function InsertVerifyUser(name, email, password) {
  try {
    const salt = await bcrypt.genSalt(process.env.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generateToken(email);

    const newUser = new VerifyUser({
      name: name,
      email: email,
      password: hashedPassword,
      token: token,
    });
    await newUser.save();
    const activationlink = "link to be added";
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
module.exports = { InsertVerifyUser };
