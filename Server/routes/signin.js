const express = require("express");
var router = express.Router();
const { CheckUser } = require("../controllers/login.js");
const { InsertVerifyUser, InsertUser } = require("../controllers/signin.js");

router.get("/:token", async (req, res) => {
  try {
    const reponse = await InsertUser(req.params.token);
    res.status(200).send(reponse);
  } catch (e) {
    res.status(500).send("Unexpected Error Happened");
  }
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
