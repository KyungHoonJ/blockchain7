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
    if (global.debug) console.log("6-24 txIns(input) 생성");
    let sum: number = 0;
    let txIns: Array<TxIn> = [];

    for (let i = 0; i < _myUTXO.length; ++i) {
      // 내 utxo를 기준으로
      const { txOutId, txOutIndex, amount } = _myUTXO[i];
      const txIn = new TxIn(txOutId, txOutIndex, _receivedTx.signature);
      // txIn을 생성하고

      txIns.push(txIn);
      // txIns(input)에 넣어주고
      sum += amount;
      // sum(총합)에 input의 잔액 더해주고
      if (sum >= _receivedTx.amount) break;
      // 총합이 보낼 금액보다 크면 멈춘다.
    }
    return { sum, txIns };
  }
}
