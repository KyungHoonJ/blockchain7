const router = require("express").Router();

const user = require("./user.js");
const board = require("./board.js");

router.use("/user", user);
router.use("/board", board);

module.exports = router;
