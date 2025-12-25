const User = require("./Users");

async function main() {
  const result = await User.create({
    username: "wangwu3333",
    password: "123",
    realname: "王五",
  });
  console.log(result);
  // const result = await User.updateOne({ username: "zhangsan" }, { $set: { realname: "张三" } });
  // console.log(result);
  // const result = await User.deleteOne({ username: "zhangsan" });
  // console.log(result);
  // const docs = await User.find({
  //   username: "zhangsan",
  //   password: "123",
  // });
  // console.log(docs);
  return "done.";
}

main();
