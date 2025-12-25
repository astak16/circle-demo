const { exec } = require("../db/mysql");
const Blog = require("../db/models/Blogs");

// const getList = (author, keyword) => {
//   let sql = `select * from blogs where 1=1 `;
//   if (author) {
//     sql += `and author='${author}' `;
//   }
//   if (keyword) {
//     sql += `and title like '%${keyword}%' `;
//   }
//   sql += `order by createtime desc;`;

//   return exec(sql);
// };

const getList = (author, keyword) => {
  const whereOpt = {};
  if (author) whereOpt.author = author;
  if (keyword) whereOpt.keyword = new RegExp(keyword);
  return Blog.find(whereOpt)
    .sort({ _id: -1 })
    .then((data) => {
      return data.map((item) => {
        const { _id, title, content, author, createTime } = item;
        return { id: _id, title, content, author, createTime };
      });
    });
};

// const getDetail = (id) => {
//   const sql = `select * from blogs where id='${id}'`;
//   return exec(sql).then((rows) => rows[0]);
// };

const getDetail = (id) => {
  return Blog.findById({ _id: id }).then((data) => {
    if (!data) return {};
    const { _id, title, content, author, createTime } = data;
    return { id: _id, title, content, author, createTime };
  });
};

// const newBlog = (blogData = {}) => {
//   const title = blogData.title;
//   const content = blogData.content;
//   const author = blogData.author;
//   const createTime = Date.now();

//   const sql = `
//     insert into blogs (title, content, createtime, author)
//     values ('${title}', '${content}', ${createTime}, '${author}');
//   `;
//   return exec(sql).then((insertData) => ({ id: insertData.insertId }));
// };

const newBlog = (blogData = {}) => {
  return Blog.create(blogData).then((data) => ({ id: data._id }));
};

// const updateBlog = (id, blogData = {}) => {
//   const title = blogData.title;
//   const content = blogData.content;

//   const sql = `
//     update blogs set title='${title}', content='${content}' where id=${id};
//   `;
//   return exec(sql).then((updateData) => updateData.affectedRows > 0);
// };

const updateBlog = (id, blogData = {}) => {
  return Blog.findByIdAndUpdate({ _id: id }, blogData, { new: true }).then((data) => {
    if (!data) return false;
    return true;
  });
};

// const delBlog = (id, author) => {
//   const sql = `delete from blogs where id=${id} and author='${author}';`;
//   return exec(sql).then((delData) => delData.affectedRows > 0);
// };

const delBlog = (id, author) => {
  return Blog.findOneAndDelete({ _id: id, author }).then((data) => !!data);
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
