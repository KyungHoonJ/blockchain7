const net = require("net");

const reqParser = require("./lib/req");
const resParser = require("./lib/res");

global.isJson = true;
// === app.use(express.json())

const server = net.createServer((client) => {
  client.on("data", (data) => {
    // req, res << 오늘은 이거 2개 구현할거다
    console.log(data);
    console.log(data.toString());
    const req = reqParser(data.toString());
    console.log("req", req);
    const res = resParser(client, req);

    // res.send("Hi Block 7 with res send");
    res.sendFile("index.html");
    // express 서버에서 응답 보낼 때 => res.send(보낼 데이터)

    //     client.write(`HTTP/1.1 200 OK
    // Connection: Close
    // Content-Type: image/avif,image/webp,image/apng,*/*;q=0.8; charset=UTF-8
    // Content-Length: 10

    // Hi Block 7`);
  });
});

server.on("close", () => {
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  console.log("4193 서버를 열었다.");
});
