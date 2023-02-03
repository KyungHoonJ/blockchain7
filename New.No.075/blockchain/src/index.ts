import P2P, { IMessage, MessageType } from "./p2p";
import express, { Express, Request, Response } from "express";
import Wallet from "@core/wallet";

global.debug = false;

const app: Express = express();
const ws: P2P = new P2P();

app.use(express.json());

// 보안 작업
app.use((req: Request, res: Response, next) => {
  if (global.debug)
    console.log("5-8/6-8 지갑 서버에서 보낸 요청 받음, 인증 확인");
  const baseAuth = req.headers.authorization?.split(" ")[1] || "";
  console.log("baseAuth :", baseAuth); // YWRtaW46MTIzNA==
  if (!baseAuth || baseAuth === "") return res.status(401).end();
  // 인증 정보가 없으면 401(유효 하지 않은 인증)을 응답한다.

  if (global.debug) console.log("check");

  const [userId, userPw] = Buffer.from(baseAuth, "base64")
    .toString()
    .split(":");
  if (userId !== "admin" || userPw !== "1234") return res.status(401).end();

  if (global.debug) console.log("5-9/6-9 인증이 확인되면 다음으로 넘어감");
  next();
});
// http 통신에서 header를 이용한 인증 방법
// Authorization: Basic 방식을 사용한다.
// 아무나 내 블록체인 네트워크(서버 || peer)에 블록을 추가하지 못하게 하기 위해서

app.get("/chains", (req: Request, res: Response) => {
  if (global.debug) console.log("GET /chains");
  res.json(ws.getChain);
});

app.post("/block/mine", (req: Request, res: Response) => {
  if (global.debug) console.log("7-4 블록 생성 요청을 받음");
  if (global.debug) console.log("POST /block/mine");
  // const { data }: { data: Array<string> } = req.body;
  if (global.debug) console.log("7-5 전달받은 데이터를 파싱");
  const { data }: { data: string } = req.body;
  // const newBlock: IBlock | null = ws.addBlock(data);
  if (global.debug) console.log("7-6 블록 채굴 메서드 호출");
  const newBlock: IBlock | null = ws.mineBlock(data);
  if (global.debug) console.log("7-29 새 블록 확인");
  if (newBlock === null) res.send("error data");

  if (global.debug)
    console.log("7-30 정상적으로 체인에 추가 시 다른 피어에게 알림");
  const message: IMessage = {
    type: MessageType.allBlock,
    payload: [newBlock],
    msg: "",
  };
  ws.broadcast(message);

  res.json(newBlock);
});

app.post("/peer/add", (req: Request, res: Response) => {
  if (global.debug) console.log("POST /peer/add");
  const { peer }: { peer: string } = req.body;
  ws.addToPeer(peer);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  if (global.debug) console.log("GET /peer");
  const sockets = ws.getSockets.map(
    (item: any) => item._socket.remoteAddress + ":" + item._socket.remotePort
  );
  res.json(sockets);
});

app.post("/transaction/send", (req: Request, res: Response) => {
  if (global.debug) console.log("5-10/6-10/8-8 지갑 서버에서 보낸 요청 받음");
  /*  {
    sender: '03765DC5F39AED4F75C53AB3907606A37F6F4EE78A573F8C289D1F33C90E74FCE3',
    received: '7606A37F6F4EE78A573F8C289D1F33C90E74FCE3',
    amount: '3',
    signature: {
      r: '90f68f8cca3fdb71d32f2323a90a3c5daf3f65fe6913b99217e440e2e0771904',
      s: '3778a76d3fc093f8d9e8cb906f9279e8248d9595792c1686d79e5c9ecbc97217',
      recoveryParam: 0
    }
  }   */
  if (global.debug) console.log(req.body);
  // const isValid = Wallet.verify(req.body);
  if (global.debug) console.log("6-11/8-9 트랜잭션 추가 함수를 호출");
  const result = Wallet.sendTransaction(req.body, ws.getUtxo);
  if (global.debug) console.log(result);
  if (global.debug)
    console.log("6-32/8-24 트랜잭션이 정상적으로 추가되었는지 확인");
  if (result.isError === true) res.send(result.msg);
  else {
    ws.addTxPool(result.value);
    if (global.debug) console.log("6-33/8-26 UTXO 수정 함수 호출");
    ws.updateUTXO(result.value);
    if (global.debug) console.log("6-37/8-28 트랜잭션 추가 및 UTXO 수정 끝");

    const message: IMessage = {
      type: MessageType.addTx,
      payload: result.value,
      msg: "",
    };
    ws.broadcast(message);

    res.end();
  }
  if (global.debug) console.log("5-12 서명 확인 결과 출력");
  // if(global.debug)console.log(isValid);
  // res.end();
});

app.get("/utxo", (req: Request, res: Response) => {
  res.json(ws.getUtxo);
});

app.post("/balance", (req: Request, res: Response) => {
  res.json({ balance: Wallet.getBalance(req.body.address, ws.getUtxo) });
});

app.get("/txpool", (req: Request, res: Response) => {
  res.json(ws.getTxPool);
});

const ports = [
  [8080, 7545],
  [8081, 7546],
];
const idx = 0;

app.listen(ports[idx][0], () => {
  console.log("server start " + ports[idx][0]);
  ws.listen(ports[idx][1]);
});
