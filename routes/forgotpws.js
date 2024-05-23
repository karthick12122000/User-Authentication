const express = require("express");
const router = express.Router();
const { forgot, reset } = require("../controllers/forgot");
const path = require("path");
router.post("/", async (req, res) => {
  var { email } = req.body;
  const forgotres = await forgot(email);
  res.status(200).send(forgotres);
});
router.get("/reset", async (req, res) => {
  var { token, password } = req.body;
  const res = await reset(email, password);
  res.status(200).send(res);
});
module.exports = router;
