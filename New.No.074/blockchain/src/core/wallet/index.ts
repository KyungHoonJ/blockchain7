import Transaction from "@core/transaction/Transaction";
import UnspentTxOut from "@core/transaction/UnspentTxOut";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

const ec = new elliptic.ec("secp256k1");

type TSignature = elliptic.ec.Signature;

class Wallet {
  public publicKey: string;
  public address: string;
  public balance: number;
  public signature: TSignature;

  constructor(
    _sender: string,
    _signature: TSignature,
    _utxos: Array<IUnspentTxOut>
  ) {
    this.publicKey = _sender;
    this.address = Wallet.getAddress(this.publicKey);
    this.balance = Wallet.getBalance(this.address, _utxos);
    this.signature = _signature;
  }

  static getAddress(_publicKey: string): string {
    return _publicKey.slice(26);
  }

  static getBalance(_address: string, _utxos: Array<IUnspentTxOut>) {
    // 잔액 계산
    return _utxos
      .filter((item) => item.address === _address)
      .reduce((prev, curr) => prev + curr.amount, 0);

    // let temp = 0;
    // for (let i = 0; i < _utxos.length; ++i) {
    //   if (_utxos[i].address === _address) temp += _utxos[i].amount;
    // }
    // return temp;
  }

  static verify(_receivedTx: {
    sender: string;
    received: string;
    amount: number;
    signature: TSignature;
  }): TResult<undefined, string> {
    console.log("5-11 서명 확인");
    const { sender, received, amount, signature } = _receivedTx;
    const hash = SHA256(sender + received + amount)
      .toString()
      .toUpperCase();
    const keyPair = ec.keyFromPublic(sender, "hex");
    const isValid = keyPair.verify(hash, signature);
    if (!isValid) return { isError: true, msg: "서명 오류" };
    return { isError: false, value: undefined };
  }

  static sendTransaction(
    _receivedTx: {
      sender: string;
      received: string;
      amount: number;
      signature: TSignature;
    },
    _utxos: Array<IUnspentTxOut>
  ) {
    const isValid = Wallet.verify(_receivedTx);
    if (isValid.isError === true) return isValid;

    const wallet = new this(_receivedTx.sender, _receivedTx.signature, _utxos);
    if (wallet.balance < _receivedTx.amount) {
      return { isError: true, msg: "잔액 부족" };
    }

    const myUTXO = UnspentTxOut.getMyUTXO(wallet.address, _utxos);
    const tx = Transaction.createTx(_receivedTx, myUTXO);
    return { isError: false, value: tx };
  }
}

export default Wallet;
