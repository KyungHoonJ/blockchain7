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
    console.log("2-3/4-4 지갑 생성 시작");
    // 2-3, 4-6
    this.privateKey = _privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.address = this.getAddress();
    this.balance = 0;

    console.log(
      "2-6/4-7 지갑 주소 이름으로 파일 생성하고 그 내용으로 개인키 저장"
    );
    // 2-4, 4-7
    !fs.existsSync(addressDir) && fs.mkdirSync(addressDir);
    const fileName = path.join(addressDir, this.address);
    fs.writeFileSync(fileName, this.privateKey);
  }

  public getAddress(): string {
    console.log("2-5/4-6 공개키로 지갑 주소 생성");
    return this.publicKey.slice(26);
  }

  public getPrivateKey(): string {
    console.log("2-3-1 개인키가 없으면 생성");
    return lib.WordArray.random(32).toString().toUpperCase();
  }

  public getPublicKey(): string {
    console.log("2-4/4-5 개인키로 공개키 생성");
    return ec
      .keyFromPrivate(this.privateKey) // 요부분 중요
      .getPublic() // 공개키 가져온다.
      .encode("hex", true)
      .toUpperCase();
  }

  static getList(): Array<string> {
    console.log("3-3 walletData 폴더의 파일 목록을 가져온다.");
    // 3-4
    const files: Array<string> = fs.readdirSync(addressDir);
    return files;
  }

  static getWalletPrivateKey(_address) {
    console.log(
      "4-3/5-5 지갑 주소 파일 명으로 파일을 불러와서 그 내용의 개인키를 가져온다."
    );
    // 4-4
    const filePath = path.join(addressDir, _address);
    const fileContent = fs.readFileSync(filePath);
    return fileContent.toString();
  }

  static createSign(_data) {
    console.log("5-4 서명 생성 시작");
    const hash = SHA256(_data.sender.publicKey + _data.received + _data.amount)
      .toString()
      .toUpperCase();
    const privateKey = Wallet.getWalletPrivateKey(_data.sender.address);
    const keyPair = ec.keyFromPrivate(privateKey);
    console.log("5-6 서명 반환(return)");
    return keyPair.sign(hash, "hex");
  }
}

export default Wallet;
