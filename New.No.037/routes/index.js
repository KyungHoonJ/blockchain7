const router = require("express").Router();
// express 서버에서 사용하는 라우터를 생성한다.
// router를 전부 관리하는 root다.
// router에 대한 root 파일이라고 얘기할 수 있다.

// 미들웨어
// next가 중요하다.
// router.use("/", (req, res, next) => {
//   console.log(req.body, req.query);
//   //   res.end(); == res.send() == res.json()
//   next(); // 다음으로 넘긴다. << 없으면 무한 정지가 될수도 있다.
//   // res.end() 등등이 없을 때 응답을 보내지 않음으로 next가 없으면 응답하지 않는 상태로 멈춰있다.
//   // next()가 있으면 다음 흐름으로 넘어간다.
// });

const table1 = require("./table1.js");
// const table2 = require("./table2.js");

router.use("/table1", table1);
// router.use("/table2", table2);

module.exports = router;
// express 서버의 root에 연결하기 위해서 생성한 라우터를 외부로 보낸다?
