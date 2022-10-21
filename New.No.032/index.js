// 내일 수!업! : 게시판 등록/수정/삭제, 목록 페이징, 아이디 생성/삭제/로그인/로그아웃

const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const routes = require("./routes/index.js");

const app = express();
dotenv.config();

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use("/", express.static(path.join(__dirname, "web")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session",
  })
);

app.use("/", (req, res, next) => {
  console.log("url1 : " + req.url);

  next();
});

app.use("/api", (req, res, next) => {
  console.log("url2 : " + req.url);

  next();
});

app.use("/api", routes);

app.listen(8080, () => {
  console.log("http://localhost:8080");
});

// 암호화 << 이론만 간단하게 용어정도?
// 입력한 데이터를 다른 사람이 알수 없도록 변환한다
// 1234 => 암호화를 통해서 => asekuhrbveablkreasbrvrlkuseabrv123
// 복호화 : 암호화된 데이터를 원상 복구한다.
// asekuhrbveablkreasbrvrlkuseabrv123 => 복호화 => 1234
// 사용자가 입력한 데이터를 알 수 있어야 할까?
//   알면 안되는 것들도 있다. => 단방향 / 양방향 암호화
// 단방향은 암호화만 가능하다. => 복호화가 불가능하다.
// 양방향은 복호화가 가능하다.
