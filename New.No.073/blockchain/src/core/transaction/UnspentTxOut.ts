export default class UnspentTxOut implements IUnspentTxOut {
  public address: string;
  public amount: number;
  public txOutId: string;
  public txOutIndex: number;

  constructor(
    _address: string,
    _amount: number,
    _txOutId: string,
    _txOutIndex: number
  ) {
    this.address = _address;
    this.amount = _amount;
    this.txOutId = _txOutId;
    this.txOutIndex = _txOutIndex;
  }
}
