const router = require("express").Router();
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const userlist = {};
// {asdf: '2134'}

router.post("/regist", (req, res) => {
  const tempJWT = jwt.sign({ name: "test" }, "saldiuhfrsaeklurb", {
    algorithm: "HS256",
    expiresIn: "10m",
    issuer: "jkh",
  }); // jwt 생성
  console.log(tempJWT);
  const tempData = jwt.verify(tempJWT, "saldiuhfrsaeklurb"); // jwt 파싱
  console.log(tempData);
  // 쿠키는 임시 데이터를 브라우저에 저장한다.
  //   크롬에서 로그인한 거, 쿠키에 남아있겠지? >> 파이어폭스에서 연동될까? >> 안된다 << 왜? 데이터 저장 공간이 다르다, 즉 쿠키 저장한 파일이 다르다.
  const cookie_name = "cookie_name",
    cookie_data = "now testing";
  // res.cookie("cookie_name", "now testing", {
  res.cookie(cookie_name, cookie_data, {
    expires: new Date(Date.now() + 30 * 1000),
    // 단위가 ms다, 1ms = 0.001s => 1000ms = 1s
    // 10 * 60 * 1000 << 1000 => 1s * 60 => 1m * 10 => 10분
    // 30초로 수정
  });
  // 응답으로 쿠키 추가
  if (!userlist[req.body.id]) {
    userlist[req.body.id] = crypto.SHA256(req.body.pw).toString();
    res.send({ status: 200, data: "regist" });
  } else {
    res.send({ status: 402, data: "exist id" });
  }
});

router.post("/login", (req, res) => {
  console.log(req.cookies.cookie_name);
  // 요청을 통해 받은 쿠키
  if (userlist[req.body.id] === crypto.SHA256(req.body.pw).toString()) {
    res.send({ status: 200, data: "login" });
  } else {
    res.send({ status: 401, data: "wrong password" });
  }
});

module.exports = router;
