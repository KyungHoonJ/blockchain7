const router = require("express").Router();
const { User } = require("../models");

router.post("/regist", async (req, res) => {
  const { id: userId, pw, name } = req.body;
  const tempUser = await User.findOne({
    where: {
      userId,
    },
  });
  if (tempUser) {
    res.send({ isError: true, msg: "exist ID" });
  } else {
    await User.create({ userId, pw, name });
    res.send({ isError: false });
  }
});

router.post("/login", async (req, res) => {
  const { id: userId, pw } = req.body;
  const tempUser = await User.findOne({
    where: {
      userId,
      pw,
    },
  });
  if (!tempUser) {
    res.send({ isError: true, msg: "no exist ID" });
  } else {
    res.send({ isError: false, user: tempUser });
  }
});

module.exports = router;
