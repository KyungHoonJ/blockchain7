const net = require("net");
// net은 Node.js에서 제공하는 TCP 서버를 열 수 있는 모듈이다.
// express, morgan, cookie-parser, express-session, dotenv << npm에 올라와있는 라이브러리이다.
//   - 두 차이는 무엇이냐? 딱히 차이는 없으나 Node.js 자체에 이미 설치가 되어 있는지 아닌지 정도의 차이이다.
// net과 비슷 모듈이 path

// Buffer란
// Node.js에서 사용하는 바이너리 데이터를 저장하는 객체
//   - binary data << 이진 데이터 << 컴퓨터가 저장, 처리 등등 계산을 할 때 사용한다.
// RAM 등에 저장되는 데이터를 저장된 그대로 보여준다.(보여줄 때는 16진수로 바꿔서 보여준다.)
//   - 010100001010100000000 => A2B451
// 한번 생성하면 크기를 변경할 수 없다.
//   - 배열의 경우 push 몇개까지 될까? << 모른다. << 정하지 않는다.
//   - 버퍼는 처음 정한 크기를 넘겨 저장할 수 없다.
// 생성 방법
// 1. 데이터를 받아서 버퍼로 변환한다.
const tempBuffer1 = Buffer.from("buffer test 'from'");
console.log(tempBuffer1.toString(), tempBuffer1);
{
  /* <Buffer 
  62 75 66 66 65 
  72 20 74 65 73 
  74 20 27 66 72 
  6f 6d 27> */
}

const tempBuffer2 = Buffer.from("가 각 갃 간 갇 갈 한글 테스트");
console.log(tempBuffer2.toString(), tempBuffer2);
{
  /* <Buffer ea b0 80 20 ea b0 81 20 ea b0 84 20 ea b0 87 20 ea b0 88 20 ed 95 9c ea b8 80 20 ed 85 8c ec 8a a4 ed 8a b8> */
  // URL Encode << url에서 사용하는 포멧
  // %ea%b0%80
}

const tempBufferArr1 = Buffer.from([1, 2, 3, 300]);
console.log(tempBufferArr1);
// toString 해도 아무것도 안찍힘
// 300은 44가 찍힌다 => 왜? FF, 즉 255까지만 저장할 수 있기 때문에 넘어갈 경우 256을 빼서 남은 값을 저장한다. << 256로 나눈 나머지만 저장한다.
// FF => 1111 1111 << 8bit == 1byte

const tempBufferArr2 = Buffer.from(["가", "나", "다"]);
console.log(tempBufferArr2);
// 한글 등등은 넣을 수 없다.
// 배열을 버퍼로 변환 시 아이템 하나하나가 버퍼 한칸한칸으로 변환된다.
// 버퍼는 16진수로 최대 FF(255)까지만 나타낼 수 있다.

// 2. 버퍼의 길이를 정해 버퍼를 만든다.
const tempBuffer3 = Buffer.alloc(5);
tempBuffer3[3] = 255;
console.log(tempBuffer3);

console.log(tempBuffer3.length); // 버퍼의 길이
tempBuffer3.write("abcdefghijklmn");
console.log(tempBuffer3.toString());

const tempBuffer4 = Buffer.from([0x62, 0x63, 0x64, 0x65, 0x66]);
console.log(tempBuffer4.toString(), 0x62);
// 16진수는 0xXX로 바로 작성할 수 있다. => 0x11 = 17 (16 + 1)
// 8진수는 앞에 0을 하나 더 작성한다. => 015 => 13 (8 + 5)

// 성진이 왈 : Java에서 Buffer를 쓰면 파일을 더 빨리 받아온다. => 왜?? 컴퓨터가 계산, 저장하는 이진수를 그대로 가져오기 때문에 빠르다.

const server = net.createServer((client) => {
  // TCP 서버를 생성한다.

  client.on("data", (data) => {
    console.log(data);
    ``;
    // 컴퓨터가 데이터를 처리할 때 이진수로 처리한다.
    // 이진수를 저장하려면 Buffer를 사용한다. => data를 받으면 그 데이터(정보)는 버퍼이다.

    console.log(data.toString());
    // GET / HTTP/1.1
    // Host: localhost:4193
    // Connection: keep-alive
    // sec-ch-ua: "Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"
    // sec-ch-ua-mobile: ?0
    // sec-ch-ua-platform: "Windows"
    // Upgrade-Insecure-Requests: 1
    // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36
    // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
    // Sec-Fetch-Site: none
    // Sec-Fetch-Mode: navigate
    // Sec-Fetch-User: ?1
    // Sec-Fetch-Dest: document
    // Accept-Encoding: gzip, deflate, br
    // Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
  });
});

server.on("close", () => {
  // Socket 했을 때와 마찬가지로 통신에 대한 이벤트를 추가한다.
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  // listen << 서버가 들을 준비를 한다.
  //   - 즉, 요청을 받을 수 있도록 대기한다.
  // 매개변수로는 (port, ip, 서버 열고 실행할 함수)
  console.log("4193 서버를 열었다.");
});
