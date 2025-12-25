const { exec, escape } = require("../db/mysql");
const { genPassword } = require("../utils/cryp");
const User = require("../db/models/Users");

// const login = (username, password) => {
//   username = escape(username);
//   password = genPassword(password);
//   password = escape(password);

//   const sql = `
//     select username, realname from users where username=${username} and password=${password};
//   `;
//   return exec(sql).then((rows) => rows[0] || {});
// };

const login = (username, password) => {
  // password = genPassword(password);
  return User.findOne({ username, password }).then((user) => user || {});
};

module.exports = {
  login,
};
