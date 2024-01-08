const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();
// /for access cros platform
var cors = require("cors");
app.use(cors({ orgin: "*" }));
//// for json format
app.use(express.json());
var signuprouter = require("./routes/signin");
var signinrouter = require("./routes/login");

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

app.use("/signup", signuprouter);
app.use("/signin", signinrouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
