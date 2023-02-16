const router = require("express").Router();

const { Board, User } = require("../models");

router.post("/", async (req, res) => {
  try {
    const list = await Board.findAll(req.body);
    res.send({ isError: false, list });
  } catch (error) {
    res.send({ isError: true });
  }
});

router.post("/new", async (req, res) => {
  try {
    const user = await User.findOne({ where: { name: req.body.userName } });
    const board = await Board.create(req.body);
    await user.addBoard(board);
    res.send({ isError: false });
  } catch (error) {
    res.send({ isError: true });
  }
});

module.exports = router;
