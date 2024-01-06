const express = require("express");
var router = express.Router();
const { CheckUser } = require("../controllers/login.js");
const { InsertVerifyUser } = require("../controllers/signin.js");

router.get("/", (req, res) => {
  res.send("Hi");
});
router.post("/verify", async (req, res) => {
  try {
    const { name, email, password } = await req.body;
    registerUser = await CheckUser(email);
    if (registerUser === false) {
      InsertVerifyUser(name, email, password);
      res.status(200).send(true);
    } else if (registerUser === true) {
      res.status(200).send(false);
    } else {
      res.status(500);
    }
  } catch (e) {
    console.log("Error:" + e);
  }
});
module.exports = router;
