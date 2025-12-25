const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "myblog";

const client = new MongoClient(url);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const usersCollection = db.collection("users");

  // const result = await usersCollection.insertOne({
  //   username: "wangwu",
  //   password: "456",
  // });
  // await usersCollection.updateOne({ username: "wangwu" }, { $set: { realname: "王五" } });
  await usersCollection.deleteOne({ username: "wangwu" });

  const docs = await usersCollection
    .find({
      // username: "zhangsan",
      // password: "123",
    })
    .toArray();
  console.log(docs);
  // the following code examples can be pasted here...

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
