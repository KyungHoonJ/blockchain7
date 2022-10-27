const dotenv = require("dotenv");

const db = require("./models/index.js");

dotenv.config();

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });
