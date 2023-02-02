export default class TxIn implements ITxIn {
  public txOutId: string;
  public txOutIndex: number;
  public signature?: string;

  constructor(_txOutId: string, _txOutIndex: number, _signature?: string) {
    this.txOutId = _txOutId;
    this.txOutIndex = _txOutIndex;
    this.signature = _signature;
  }

  static createTxIns(_receivedTx, _myUTXO: Array<IUnspentTxOut>) {
    // 보내늣 사람의 UTXO를 기준으로 input(txIns)를 만든다.
    let sum: number = 0;
    let txIns: Array<TxIn> = [];

    for (let i = 0; i < _myUTXO.length; ++i) {
      const { txOutId, txOutIndex, amount } = _myUTXO[i];
      const txIn = new TxIn(txOutId, txOutIndex, _receivedTx.signature);

      txIns.push(txIn);
      sum += amount;
      if (sum >= _receivedTx.amount) break;
    }
    return { sum, txIns };
  }
}
