import express, { Express, Request, Response } from "express";
import axios from "axios";
import path from "path";

const app: Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/wallet/create", (req: Request, res: Response) => {
  // 지갑을 생성해달라
  res.end();
});

app.listen(9514, () => {
  console.log("wallet server open 9514");
});
