const mongoose = require("mongoose");
const User = require("./Users");

const url = "mongodb://localhost:27017";
const dbName = "myblog";

main()
  .catch((err) => console.log(err))
  .finally(() => mongoose.disconnect());

async function main() {
  await mongoose.connect(`${url}/${dbName}`);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  // const docs = await User.find({
  //   username: "wangwu",
  //   password: "123",
  // });
  // console.log(docs);
}

// const a = mongoose.connect(`${url}/${dbName}`);
// .then(async () => {
//   console.log("Connected successfully to server");
//   const result = await User.create({
//     username: "wangwu2",
//     password: "123",
//     realname: "王五",
//   });
// console.log(result);

// const result = await User.updateOne({ username: "zhangsan" }, { $set: { realname: "张三" } });
// console.log(result);
// const result = await User.deleteOne({ username: "zhangsan" });
// console.log(result);
// const docs = await User.find({
//   username: "wangwu",
//   password: "1232",
// });
// console.log(docs);
// return "done.";
// })
// .catch(console.error)
// .finally(() => mongoose.disconnect());

module.exports = {};
