const express = require("express");
var router = express.Router();
router.get("/", (req, res) => {
  res.send("Hi");
});
router.post("/verify", (req, res) => {});
module.exports = router;
