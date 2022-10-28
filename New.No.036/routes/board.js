const jwt = require("jsonwebtoken");

const router = require("express").Router();

const { User, Board } = require("../models/index.js");

router.use("/", (req, res, next) => {
  // 미들웨어
  global.userId = "";
  try {
    const tempUserInfo = jwt.verify(req.cookies.sid, process.env.JWT_KEY);
    global.userId = tempUserInfo.id;
    res.cookie(
      "sid",
      jwt.sign(
        {
          id: tempUserInfo.id,
          name: tempUserInfo.name,
        },
        process.env.JWT_KEY,
        {
          algorithm: "HS256",
          expiresIn: "30m",
          issuer: "jkh",
        }
      )
    );
    next();
    // 완료되면 다음거 돌리기
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  const tempBoard = await Board.findAll({
    // attributes << 찾아봐
    order: [["id", "DESC"]], // 정렬
    limit: 5, // 최대 개수
    // offset: 3, // 시작 위치
  });
  res.send({ list: tempBoard });
});

router.post("/add", async (req, res) => {
  // findOne = 하나찾기
  const tempUser = await User.findOne({
    where: {
      id: global.userId,
    },
  });
  const tempBoard = await Board.create(req.body);
  tempUser.addBoard(tempBoard);
  res.end();
});

router.put("/update", async (req, res) => {
  // UPDATE TableName SET text=${req.body.text} WHERE id=${req.body.id}
  await Board.update(
    // 업데이트
    {
      // 어떤 컬럼에 어떤 값으로
      text: req.body.text,
    },
    {
      where: {
        // 위치 찾기
        id: req.body.id,
      },
    }
  );
  res.end();
});

router.delete("/delete", async (req, res) => {
  const tempBoard = await Board.findOne({
    where: {
      id: req.query.id,
    },
  });

  if (tempBoard.user_id === global.userId) {
    // DELETE TableName WHERE id=${req.body.id}
    await Board.destroy({
      where: {
        id: req.query.id,
      },
    });
  }
  res.end();
});

module.exports = router;
