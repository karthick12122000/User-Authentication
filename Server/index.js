const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const uri = process.env.MONGODB_CONNECT_URI;

mongoose.connect(uri);
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
