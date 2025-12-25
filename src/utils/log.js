const fs = require("fs");
const path = require("path");

function createWriteStream(filename) {
  const fullFilename = path.resolve(__dirname, "../../logs", filename);
  const writeStream = fs.createWriteStream(fullFilename, {
    flags: "a",
  });

  return writeStream;
}

const accessWriteStream = createWriteStream("access.log");
function access(log) {
  writeLog(accessWriteStream, log);
}

function writeLog(writeStream, log) {
  writeStream.write(log + "\n");
}

module.exports = {
  access,
};
