// const querystring = require("querystring");
// const handleBlogRouter = require("./src/router/blog");
// const handleUserRouter = require("./src/router/user");
// const { get, set, init } = require("./src/db/redis");
// const { main } = require("./src/db/mongo");
// const { access } = require("./src/utils/log");

// main();
// init();

// const getPostData = (req) => {
//   return new Promise((resolve, reject) => {
//     if (req.method !== "POST") {
//       resolve({});
//       return;
//     }

//     if (req.headers["content-type"] !== "application/json") {
//       resolve({});
//       return;
//     }

//     let postData = "";
//     req.on("data", (chunk) => {
//       postData += chunk.toString();
//     });

//     req.on("end", () => {
//       if (!postData) {
//         resolve({});
//         return;
//       }

//       resolve(JSON.parse(postData));
//     });
//   });
// };

// const serverHandle = (req, res) => {
//   access(`${req.method} -- ${req.url} -- ${req.headers["user-agent"]} -- ${Date.now()}`);

//   res.setHeader("Content-type", "application/json");
//   const url = req.url;
//   const path = url.split("?")[0];
//   req.path = path;

//   req.query = querystring.parse(url.split("?")[1]);
//   req.cookie = {};
//   const cookieStr = req.headers.cookie || "";
//   cookieStr.split(";").forEach((item) => {
//     if (!item) return;
//     const arr = item.split("=");
//     const key = arr[0].trim();
//     const value = arr[1].trim();
//     req.cookie[key] = value;
//   });

//   let needSetCookie = false;
//   let userId = req.cookie.userid;
//   if (!userId) {
//     needSetCookie = true;
//     userId = `${Date.now()}_${Math.random()}`;
//     set(userId, {});
//   }
//   req.sessionId = userId;
//   get(userId)
//     .then((sessionData) => {
//       if (sessionData == null) {
//         set(req.sessionId, {});
//         req.session = {};
//       } else {
//         req.session = sessionData;
//       }

//       return getPostData(req);
//     })
//     .then((postData) => {
//       req.body = postData;

//       const blogResult = handleBlogRouter(req, res);
//       if (blogResult) {
//         blogResult.then((blogData) => {
//           if (needSetCookie) {
//             res.setHeader(
//               "Set-Cookie",
//               `userid=${userId}; path=/; httpOnly; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}`
//             );
//           }

//           res.end(JSON.stringify(blogData));
//         });
//         return;
//       }

//       const userResult = handleUserRouter(req, res);
//       if (userResult) {
//         userResult.then((userData) => {
//           if (needSetCookie) {
//             res.setHeader(
//               "Set-Cookie",
//               `userid=${userId}; path=/; httpOnly; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}`
//             );
//           }
//           res.end(JSON.stringify(userData));
//         });
//         return;
//       }

//       res.writeHead(404, { "Content-type": "text/plain" });
//       res.write("404 Not Found\n");
//       res.end();
//     });
// };

// module.exports = serverHandle;
