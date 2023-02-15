const router = require("express").Router();

const board = require("./board");

router.use("/board", board);

module.exports = router;
