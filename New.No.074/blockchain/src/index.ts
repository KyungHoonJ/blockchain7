import P2P, { IMessage, MessageType } from "./p2p";
import express, { Express, Request, Response } from "express";
import Wallet from "@core/wallet";

const app: Express = express();
const ws: P2P = new P2P();

app.use(express.json());

// 보안 작업
app.use((req: Request, res: Response, next) => {
  console.log("5-8 지갑 서버에서 보낸 요청 받음, 인증 확인");
  const baseAuth = req.headers.authorization?.split(" ")[1] || "";
  console.log("baseAuth :", baseAuth);
  if (!baseAuth || baseAuth === "") return res.status(401).end();
  // 인증 정보가 없으면 401(유효 하지 않은 인증)을 응답한다.

  console.log("check");

  const [userId, userPw] = Buffer.from(baseAuth, "base64")
    .toString()
    .split(":");
  if (userId !== "admin" || userPw !== "1234") return res.status(401).end();

  console.log("5-9 인증이 확인되면 다음으로 넘어감");
  next();
});
// http 통신에서 header를 이용한 인증 방법
// Authorization: Basic 방식을 사용한다.
// 아무나 내 블록체인 네트워크(서버 || peer)에 블록을 추가하지 못하게 하기 위해서

app.get("/chains", (req: Request, res: Response) => {
  console.log("GET /chains");
  res.json(ws.getChain);
});

app.post("/block/mine", (req: Request, res: Response) => {
  console.log("POST /block/mine");
  // const { data }: { data: Array<string> } = req.body;
  const { data }: { data: string } = req.body;
  // const newBlock: IBlock | null = ws.addBlock(data);
  const newBlock: IBlock | null = ws.mineBlock(data);
  if (newBlock === null) res.send("error data");

  const message: IMessage = {
    type: MessageType.allBlock,
    payload: [newBlock],
    msg: "",
  };
  ws.broadcast(message);

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

app.post("/transaction/send", (req: Request, res: Response) => {
  console.log("5-10 지갑 서버에서 보낸 요청 받음");
  // {
  //   sender: '03765DC5F39AED4F75C53AB3907606A37F6F4EE78A573F8C289D1F33C90E74FCE3',
  //   received: '7606A37F6F4EE78A573F8C289D1F33C90E74FCE3',
  //   amount: '3',
  //   signature: {
  //     r: '90f68f8cca3fdb71d32f2323a90a3c5daf3f65fe6913b99217e440e2e0771904',
  //     s: '3778a76d3fc093f8d9e8cb906f9279e8248d9595792c1686d79e5c9ecbc97217',
  //     recoveryParam: 0
  //   }
  // }
  console.log(req.body);
  const isValid = Wallet.verify(req.body);
  console.log("5-12 서명 확인 결과 출력");
  console.log(isValid);
  res.end();
});

app.get("/utxo", (req: Request, res: Response) => {
  res.json(ws.getUtxo);
});

app.post("/balance", (req: Request, res: Response) => {
  res.json({ balance: Wallet.getBalance(req.body.address, ws.getUtxo) });
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
