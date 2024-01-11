const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();
const redisClient = () => {
  return redis.createClient();
};
const Client = redisClient();
Client.on("connect", () => {
  console.log("Redis Connected");
});
Client.on("error", (err) => {
  console.log(err);
});

Client.connect();
module.exports = Client;
