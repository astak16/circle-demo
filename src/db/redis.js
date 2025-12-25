const { REDIS_PORT, REDIS_HOST } = require("../config/db");
const { createClient } = require("redis");

let client;

async function init() {
  client = await createClient(REDIS_PORT, REDIS_HOST)
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
}

const get = async (key) => {
  const value = await client.get(key);
  if (value == null) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

const set = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  return client.set(key, value);
};

module.exports = { get, set, init };
