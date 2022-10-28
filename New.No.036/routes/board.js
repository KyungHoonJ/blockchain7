const jwt = require("jsonwebtoken");

const router = require("express").Router();

const { User, Board } = require("../models/index.js");

router.get("/", async (req, res) => {
  const tempBoard = await Board.findAll();
  res.send({ list: tempBoard });
});

router.post("/add", async (req, res) => {
  const tempUser = await User.findOne({
    where: {
      id: jwt.verify(req.cookies.sid, process.env.JWT_KEY).id,
    },
  });
  const tempBoard = await Board.create(req.body);
  tempUser.addBoard(tempBoard);
  res.end();
});

router.put("/update", (req, res) => {
  res.end();
});

router.delete("/delete", async (req, res) => {
  await Board.destroy({
    where: {
      id: req.query.id,
    },
  });
  res.end();
});

module.exports = router;
