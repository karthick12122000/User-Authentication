const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.log(`Redis error: ${err}`);
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});

// Handle SIGINT event (Ctrl+C in the terminal)
process.on("SIGINT", () => {
  redisClient.quit(() => {
    console.log("Redis connection closed gracefully");
    process.exit();
  });
});

// Handle SIGTERM event
process.on("SIGTERM", () => {
  redisClient.quit(() => {
    console.log("Redis connection closed gracefully");
    process.exit();
  });
});

module.exports = redisClient;
