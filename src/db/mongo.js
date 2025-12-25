const mongoose = require("mongoose");

const url = "mongodb://localhost:27017";
const dbName = "myblog";

// main().catch((err) => console.log(err));
// .finally(() => mongoose.disconnect());

async function main() {
  await mongoose.connect(`${url}/${dbName}`);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = { main };
