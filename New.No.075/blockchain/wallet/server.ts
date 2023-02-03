import express, { Express, Request, Response } from "express";
import axios from "axios";
import path from "path";
import Wallet from "./wallet";

global.debug = false;

const app: Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
// 1-1 웹페이지에 접근 시 파일 있으면

app.post("/wallet/create", (req: Request, res: Response) => {
  if (global.debug)
    console.log("2-2 /wallet/create 라우터, post 메서드로 요청 들어옴");
  // 2-2
  // 지갑을 생성해달라
  if (global.debug) console.log("2-7 생성된 지갑을 json 형식으로 응답");
  res.json(new Wallet());
  //   res.end();
});

app.get("/wallet/list", (req: Request, res: Response) => {
  if (global.debug)
    console.log("3-2 GET 메서드, /wallet/list 라우터로 요청 들어옴");
  // 3-3
  if (global.debug) console.log("3-4 가져온 파일 목록으로 응답");
  res.json(Wallet.getList());
  // 3-5 응답
});

app.get("/wallet/:address", async (req: Request, res: Response) => {
  if (global.debug)
    console.log("4-2 GET 메서드, /wallet/지갑주소 라우터로 요청 받음");
  // 4-3
  const address: string = req.params.address;
  const privateKey: string = Wallet.getWalletPrivateKey(address);
  // 4-5
  if (global.debug) console.log("4-8 생성된 지갑을 json 형식으로 응답");

  const wallet = new Wallet(privateKey);
  const balance = (
    await axios.post(
      "http://localhost:8080/balance",
      { address },
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from("admin:1234").toString("base64"),
          // HTTP 통신에서의 인증 방법
          // Authorization: Basic 방식은 base64 포멧을 기본으로 한다.
        },
      }
    )
  ).data.balance;
  wallet.balance = balance;

  res.json(wallet);
});

app.post("/transaction/send", (req: Request, res: Response) => {
  if (global.debug)
    console.log(
      "5-3/6-3/8-3 POST 메서드, /transaction/send 라우터로 요청 받음"
    );
  const signature = Wallet.createSign(req.body);
  if (global.debug) console.log(signature);

  const txObj = {
    sender: req.body.sender.publicKey,
    received: req.body.received,
    amount: req.body.amount,
    signature,
  };

  if (global.debug)
    console.log(
      "5-7/6-7/8-7 생성한 서명과 hash를 만들기 위한 데이터를 가지고 http://localhost:8080/transaction/send에 요청 보냄"
    );
  axios.post("http://localhost:8080/transaction/send", txObj, {
    headers: {
      Authorization: "Basic " + Buffer.from("admin:1234").toString("base64"),
      // HTTP 통신에서의 인증 방법
      // Authorization: Basic 방식은 base64 포멧을 기본으로 한다.
    },
  });

  res.json(signature);
});

app.post("/block/mine", (req: Request, res: Response) => {
  if (global.debug) console.log("7-3 블록 생성 요청을 블록체인 서버에 전달");
  axios.post("http://localhost:8080/block/mine", req.body, {
    headers: {
      Authorization: "Basic " + Buffer.from("admin:1234").toString("base64"),
      // HTTP 통신에서의 인증 방법
      // Authorization: Basic 방식은 base64 포멧을 기본으로 한다.
    },
  });
  res.end();
});

app.post("/balance", async (req: Request, res: Response) => {
  const balance = (
    await axios.post("http://localhost:8080/balance", req.body, {
      headers: {
        Authorization: "Basic " + Buffer.from("admin:1234").toString("base64"),
        // HTTP 통신에서의 인증 방법
        // Authorization: Basic 방식은 base64 포멧을 기본으로 한다.
      },
    })
  ).data.balance;
  res.json({ balance });
});

app.listen(9515, () => {
  console.log("wallet server open 9514");
});
