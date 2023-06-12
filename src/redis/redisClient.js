const { createClient } = require('redis');
const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Failed to connect to Redis", err);
  }
};

connectRedis();

process.on('SIGINT', () => {
  client.quit(() => {
    console.log('Redis client disconnected due to app termination');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  client.quit(() => {
    console.log('Redis client disconnected due to app termination');
    process.exit(0);
  });
});

module.exports = client;
