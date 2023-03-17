import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";
// 데이터를 stream화 해준다?
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import axios from "axios";

import { abi as NftAbi } from "../contracts/artifacts/NftToken.json";
import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";
// 추신 : Artifacts 는 단순한 계약(Contract)의 Json 파일이다.

const app: Express = express();

dotenv.config();

const web3 = new Web3("http://ganache.test.errorcode.help:8545");

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload: multer.Multer = multer();

app.post("/api/list", async (req: Request, res: Response) => {
  console.log(req.body.from);
  const deployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
  );

  let data: Array<{ [key: string]: string }> = [];
  if (req.body.from) {
    try {
      const tempArr = await deployed.methods
        .getOwnerTokens(req.body.from)
        .call();
      for (let i = 0; i < tempArr.length; i++) {
        try {
          const { name, description, image } = (
            await axios.get(
              tempArr[i].tokenURI.replace(
                "gateway.pinata.cloud",
                "block7.mypinata.cloud"
              )
            )
          ).data;
          data.push({
            tokenId: tempArr[i].tokenId,
            price: tempArr[i].price,
            name,
            description,
            image: image.replace(
              "gateway.pinata.cloud",
              "block7.mypinata.cloud"
            ),
          });
        } catch (error) {}
      }
    } catch (error) {}
  } else {
    try {
      const tempArr = await deployed.methods.getSaleTokenList().call();
      console.log(tempArr);
      for (let i = 0; i < tempArr.length; i++) {
        try {
          const { name, description, image } = (
            await axios.get(
              tempArr[i].tokenURI.replace(
                "gateway.pinata.cloud",
                "jkh.mypinata.cloud"
              )
            )
          ).data;
          data.push({
            tokenId: tempArr[i].tokenId,
            price: tempArr[i].price,
            name,
            description,
            image: image.replace("gateway.pinata.cloud", "jkh.mypinata.cloud"),
          });
        } catch (error) {}
      }
    } catch (error) {}
  }
  res.send(data);
});

app.post(
  "/api/mint",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { name, description }: { name: string; description: string } =
      req.body;

    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
      pinataMetadata: {
        name: Date.now().toString(),
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });

    if (imgResult.isDuplicate) {
      console.log("같은 이미지!");
    }

    const jsonResult = await pinata.pinJSONToIPFS(
      {
        name,
        description,
        //   image: "https://gateway.pinata.cloud/ipfs/" + imgResult.IpfsHash,
        image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
      },
      {
        pinataMetadata: {
          name: Date.now().toString() + ".json",
        },
        pinataOptions: {
          cidVersion: 0,
        },
      }
    );
    console.log(jsonResult);

    const deployed = new web3.eth.Contract(
      NftAbi as AbiItem[],
      process.env.NFT_CA
    );

    const obj: { nonce: number; to: string; from: string; data: string } = {
      nonce: 0,
      to: "",
      from: "",
      data: "",
    };
    obj.nonce = await web3.eth.getTransactionCount(req.body.from);
    obj.to = process.env.NFT_CA;
    obj.from = req.body.from;
    obj.data = deployed.methods.safeMint(jsonResult.IpfsHash).encodeABI();

    res.send(obj);
  }
);

app.listen(8080, () => {
  console.log("8080 port server open");
});
