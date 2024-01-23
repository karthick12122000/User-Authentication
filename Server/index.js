const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();
// /for access cros platform
var cors = require("cors");
app.use(cors({ orgin: "*" }));
//// for json format
app.use(express.json());
var signuprouter = require("./routes/signup");
var signinrouter = require("./routes/login");
var homerouter = require("./routes/home");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const uri = process.env.MONGODB_CONNECT_URI;

mongoose.connect(uri);
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

app.use("/signup", signuprouter);
app.use("/signin", signinrouter);
app.use("/home", homerouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
