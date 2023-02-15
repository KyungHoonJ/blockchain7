"use strict";

const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const Board = require("./board");
const User = require("./user");

const db = { Board, User };

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Board.init(sequelize);
User.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
