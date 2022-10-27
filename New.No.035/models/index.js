"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const NewTable1 = require("./table1.js");

const db = { NewTable1 };

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

NewTable1.init(sequelize);

NewTable1.associate(db);

module.exports = db;
