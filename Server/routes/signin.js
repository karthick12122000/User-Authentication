const express = require("express");
var router = express.Router();
const { CheckUser } = require("../controllers/login.js");
router.get("/", (req, res) => {
  res.send("Hi");
});
router.post("/verify", async (req, res) => {
  try {
    const { name, email, password } = await req.body;
    console.log(name, email);
    registerUser = await CheckUser(email);
    if (registerUser === false) {
    } else if (registerUser === true) {
      res.status(200).send(true);
    } else {
      res.status(500).send("Server Busy");
    }
    res.send(await CheckUser(email));
  } catch (e) {
    console.log("Error:" + e);
  }
});
module.exports = router;
