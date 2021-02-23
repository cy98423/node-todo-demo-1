const fs = require("fs");
const homedir = require("os").homedir(); //默认home目录
const home = process.env.HOME || homedir; //用户自定义的home目录
const p = require("path");
const dbPath = p.join(home, ".todo");

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (error, data) => {
        if (error) {
          return reject(error);
        }
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (error2) {
          list = [];
        }
        resolve(list);
      });
    });
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list);
      fs.writeFile(path, string + "\n", (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  },
  showAll() {},
};
module.exports = db;
