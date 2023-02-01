export default class TxIn implements ITxIn {
  public txOutId: string;
  public txOutIndex: number;
  public signature?: string;

  constructor(_txOutId: string, _txOutIndex: number, _signature?: string) {
    this.txOutId = _txOutId;
    this.txOutIndex = _txOutIndex;
    this.signature = _signature;
  }
}
