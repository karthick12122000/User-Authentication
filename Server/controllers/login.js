const users = require("../models/user.js");
async function CheckUser(email) {
  try {
    var user = await users.findOne({ email: email });
    if (user != null) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return e;
  }
}
module.exports = { CheckUser };
