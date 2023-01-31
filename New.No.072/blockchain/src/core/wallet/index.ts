import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

const ec = new elliptic.ec("secp256k1");

type TSignature = elliptic.ec.Signature;

class Wallet {
  public publicKey: string;
  public address: string;
  public balance: number;
  public signature: TSignature;

  constructor(_sender: string, _signature: TSignature) {
    this.publicKey = _sender;
    this.address = Wallet.getAddress(this.publicKey);
    this.balance = 0;
    this.signature = _signature;
  }

  static getAddress(_publicKey: string): string {
    return _publicKey.slice(26);
  }

  static verify(_receivedTx: {
    sender: string;
    received: string;
    amount: number;
    signature: TSignature;
  }): TResult<undefined, string> {
    const { sender, received, amount, signature } = _receivedTx;
    const hash = SHA256(sender + received + amount)
      .toString()
      .toUpperCase();
    const keyPair = ec.keyFromPublic(sender, "hex");
    const isValid = keyPair.verify(hash, signature);
    if (!isValid) return { isError: true, msg: "서명 오류" };
    return { isError: false, value: undefined };
  }
}

export default Wallet;
