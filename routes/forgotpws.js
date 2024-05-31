const express = require("express");
const router = express.Router();
const { forgot, reset } = require("../controllers/forgot");
const path = require("path");
router.post("/", async (req, res) => {
  var { email } = req.body;
  const forgotres = await forgot(email);
  console.log(forgotres);
  res.status(200).send({ message: forgotres });
});
router.post("/reset", async (req, res) => {
  var { token, password } = req.body;
  const resp = await reset(token, password);
  res.status(200).send(resp);
});
module.exports = router;
