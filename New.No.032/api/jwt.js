// jwt : JsonWebToken
// JSON은 일종의 데이터 형식
// forms['dataName'] == forms.dataName
// forms?.[dataName] forms?.dataName
//   jwt : 웹에서 사용하는 JSON 형식의 토큰(짧은 데이터)
const crypto = require("crypto-js");

const tempHeader = JSON.stringify({ name: "block7", alg: "HS512" });
// stringify : 객체를 JSON 형식으로 변환
// parse : JSON 형식을 객체로 변환
// alg : 어떠한 알고리즘을 사용할 것인가? << 암호화한다.
//   HS256(default), HS384, HS512, RS256, RS384, RS512, ES256, ES384, ES512, PS256, PS384, PS512
const base64Header = Buffer.from(tempHeader).toString("base64url");
// JWT는 base64url 형식의 포멧을 사용한다.
//   base64가 뭘까? << ASCII 코드를 기준으로 데이터를 저장하는 포멧이다.
const JWTHeader = base64Header.replaceAll("=", "");
// 위는 header를 완성했다.

const tempPayload = JSON.stringify({ maker: "tester", expiresIn: "10m" });
const base64Payload = Buffer.from(tempPayload).toString("base64url");
const JWTPayload = base64Payload.replaceAll("=", "");
// 위는 payload를 완성했다.

const tempSignature = crypto
  .HmacSHA512(
    JWTHeader + "." + JWTPayload,
    "easkurvbesakvubrskveuabraseukbrvlkeuasbrvlkeuasbvr"
  )
  .toString(crypto.enc.Base64url)
  .replaceAll("=", "");

const jwt = `${JWTHeader}.${JWTPayload}.${tempSignature}`;
console.log(jwt);
// JSON Web Token은 'header.payload.signature'로 이루어져있다.
// header : JWT의 검증을 위한 데이터가 저장된다.
// payload : JWT가 갖고있는 데이터이다. << 개발자?가 저장하고 싶은 데이터, 주고받아야할 데이터!, 로그인 후의 그 사람의 닉네임, 어떠한 암호화된 토큰 등
// signature : 암호화된 서명이다. << 검증에 사용한다.

// eyJuYW1lIjoiYmxvY2s3IiwiYWxnIjoiSFM1MTIifQ.eyJtYWtlciI6InRlc3RlciIsImV4cGlyZXNJbiI6IjEwbSJ9.Rf5gi8ImwWffwbaKCxPKWtIoqFIVXLcpRDcTHBrB-9ZQLBNxVICX6_UVU14P1FwcPvZo7sWeuNoOlNq0YpwVOA
// eyJuYW1lIjoiYmxvY2s3IiwiYWxnIjoiSFM1MTIifQ.eyJtYWtlciI6InRlc3RlciIsImV4cGlyZXNJbiI6IjEwbSJ9.Rf5gi8ImwWffwbaKCxPKWtIoqFIVXLcpRDcTHBrB-9ZQLBNxVICX6_UVU14P1FwcPvZo7sWeuNoOlNq0YpwVOA
