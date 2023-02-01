import TxIn from "./TxIn";
import TxOut from "./TxOut";
import UnspentTxOut from "./UnspentTxOut";
import { SHA256 } from "crypto-js";

export default class Transaction implements ITransaction {
  public txIns: Array<ITxIn>;
  public txOuts: Array<ITxOut>;
  public hash: string;

  constructor(_txIns: Array<ITxIn>, _txOuts: Array<ITxOut>) {
    this.txIns = _txIns;
    this.txOuts = _txOuts;
    this.hash = this.createHash();
  }

  createHash(): string {
    let txOutStr: string = "";
    for (let i = 0; i < this.txOuts.length; ++i) {
      const tempTxOut: Array<string | number> = Object.values(this.txOuts[i]);
      // output 내용의 값들만 가져오자, 여러개이기 때문에 배열이다.
      for (let j = 0; j < tempTxOut.length; ++j) {
        txOutStr += tempTxOut[j];
      }
    }
    // const txOutStr: string = this.txOuts.reduce(
    //   (prev, curr) => prev + Object.values(curr).join(""),
    //   ""
    // );

    let txInStr = "";
    for (let i = 0; i < this.txIns.length; ++i) {
      const tempTxIn: Array<string | number> = Object.values(this.txIns[i]);
      // input 내용의 값들만 가져오자, 여러개이기 때문에 배열이다.
      for (let j = 0; j < tempTxIn.length; ++j) {
        txInStr += tempTxIn[j];
      }
    }
    // const txInStr: string = this.txIns.reduce(
    //   (prev, curr) => prev + Object.values(curr).join(""),
    //   ""
    // );

    return SHA256(txInStr + txOutStr)
      .toString()
      .toUpperCase();
  }
}
