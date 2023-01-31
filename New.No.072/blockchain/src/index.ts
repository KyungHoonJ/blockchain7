// import Block from "@core/block/block";
// import Chain from "@core/chain";

// const genesis = new Block(["첫 블록"]);
// console.log("genesis :", genesis);

// const second = new Block(["두번째 블록"], genesis);
// console.log("second :", second);

// // npx ts-node src/index
// const previousBlock = new Block(["이전 블록"]);
// previousBlock.height = 29;
// previousBlock.difficulty = 10;
// const adjustmentBlock = new Block(["단위 개수 전 블록"]);
// adjustmentBlock.height = 20;
// adjustmentBlock.difficulty = 11;

// const newBlock = new Block(["asdf"], previousBlock, adjustmentBlock, {
//   DAI: 10,
//   averageGenerationTime: 60 * 1000,
// });

// console.log(newBlock);

// const chain = new Chain();

// for (let i = 0; i < 300; i++) {
//   chain.addBlock([`test block ${i}`]);
// }

import P2P from "./p2p";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const ws: P2P = new P2P();

app.use(express.json());

app.get("/chains", (req: Request, res: Response) => {
  console.log("GET /chains");
  res.json(ws.getChain);
});

app.post("/block/mine", (req: Request, res: Response) => {
  console.log("POST /block/mine");
  const { data }: { data: Array<string> } = req.body;
  const newBlock: IBlock | null = ws.addBlock(data);
  if (newBlock === null) res.send("error data");
  res.json(newBlock);
});

app.post("/peer/add", (req: Request, res: Response) => {
  console.log("POST /peer/add");
  const { peer }: { peer: string } = req.body;
  ws.addToPeer(peer);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  console.log("GET /peer");
  const sockets = ws.getSockets.map(
    (item: any) => item._socket.remoteAddress + ":" + item._socket.remotePort
  );
  res.json(sockets);
});

const ports = [
  [8080, 7545],
  [8081, 7546],
];
const idx = 0; // 테스트용
// 1. idx를 0으로 정의한 후에 ts-node src/index 실행
//   - 8080 HTTP 서버와 7545 Socket 서버가 배포된다.(실행된다, 열린다.)
// 2. idx를 1로 정의한 후에 ts-node src/index 실행
//   - 8081 HTTP 서버와 7546 Socket 서버가 배포된다.(실행된다, 열린다.)
// 3. postman에서 테스트를 진행한다.
//   - chains 테스트 : http://localhost:8080/chains 또는 http://localhost:8081/chains 주소에 GET 메서드를 사용한다.
//     - 아무 것도 하지 않았다면 두 체인의 제네시스 블록이 다르게 뜬다.
//     - POST 메서드에 /peer/add 라우터로 보낸 적이 있다면 같은 제네시스 블록을 확인할 수 있다.
//     - POST 메서드에 /peer/add 라우터로 보낸 직후라면 같은 체인이 확인된다.
//   - peer 테스트 : http://localhost:8080/peer 또는 http://localhost:8081/peer 주소에 GET 메서드를 사용한다.
//     - 아무 것도 하지 않았다면 빈 배열이 뜬다.
//     - POST 메서드에 /peer/add 라우터로 보낸 적이 있다면 보낸 횟수만큼 서로의 주소가 배열의 아이템으로 확인된다.
//       - 2번 보냈다면 2개씩 존재한다.
//   - block/mine 테스트 : http://localhost:8080/block/mine 또는 http://localhost:8081/block/mine 주소에 POST 메서드를 사용, body에 JSON 형식으로 "data"를 ["원하는 내용"]으로 보낸다.
//     - 보낸 주소의 chains 테스트에서 블록이 추가됨이 확인된다.
//     - 보내지 않은 주소에서는 블록이 추가되지 않음이 확인된다.
//     - 8080 포트로 /block/mine 테스트를 실행했다면 8081 포트에서는 추가되지 않는 것이 확인되어야한다.
//   - peer/add 테스트 : http://localhost:8080/peer/add 또는 http://localhost:8081/peer/add 주소에 POST 메서드를 사용, body에 JSON 형식으로 "peer"를 "ws://내주소:내포트"으로 보낸다.
//     - 보내는 주소는 상대방의 주소이다.
//     - 8080 기준에서 8081에 보낸다고 생각했을 때 주소는 http://localhost:8081/peer/add 이고 JSON 데이터는 {"peer":"ws://localhost:7545"} 이다.
//     - 8081 기준에서 8080에 보낸다고 생각했을 때 주소는 http://localhost:8080/peer/add 이고 JSON 데이터는 {"peer":"ws://localhost:7546"} 이다.
//     - 보낸 직후에 chains 테스트를 진행하여 chains를 확인하면 두 체인이 동기화되어 같아짐을 확인할 수 있다.

app.listen(ports[idx][0], () => {
  console.log("server start " + ports[idx][0]);
  ws.listen(ports[idx][1]);
  // WebSocket(P2P) 서버 생성/배포
});
