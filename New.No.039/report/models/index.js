"use strict";

const Sequelize = require("sequelize");

const Chat = require("./chat.js");
const User = require("./user.js");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = { Chat, User };

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Chat.init(sequelize);
User.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
