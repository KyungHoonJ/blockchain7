import { SHA256, lib } from "crypto-js";
import elliptic from "elliptic";
// 데이터(지갑 계정)을 저장하기 위해서
import fs from "fs";
import path from "path";

// 지갑 계정을 저장할 위치
const addressDir: string = path.join(__dirname, "../walletData");

const ec: elliptic.ec = new elliptic.ec("secp256k1");

class Wallet implements IWallet {
  public address: string;
  public publicKey: string;
  public privateKey: string;
  public balance: number;

  constructor(_privateKey: string = "") {
    this.privateKey = _privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.address = this.getAddress();
    this.balance = 0;

    const fileName = path.join(addressDir, this.address);
    fs.writeFileSync(fileName, this.privateKey);
  }

  public getAddress(): string {
    return this.publicKey.slice(26);
  }

  public getPrivateKey(): string {
    return lib.WordArray.random(32).toString().toUpperCase();
  }

  public getPublicKey(): string {
    return ec
      .keyFromPrivate(this.privateKey) // 요부분 중요
      .getPublic() // 공개키 가져온다.
      .encode("hex", true)
      .toUpperCase();
  }

  static getList(): Array<string> {
    const files: Array<string> = fs.readdirSync(addressDir);
    return files;
  }

  static getWalletPrivateKey(_address) {
    const filePath = path.join(addressDir, _address);
    const fileContent = fs.readFileSync(filePath);
    return fileContent.toString();
  }

  static createSign(_data) {
    const hash = SHA256(_data.sender.publicKey + _data.received + _data.amount)
      .toString()
      .toUpperCase();
    const privateKey = Wallet.getWalletPrivateKey(_data.sender.address);
    const keyPair = ec.keyFromPrivate(privateKey);
    return keyPair.sign(hash, "hex");
  }
}

export default Wallet;
