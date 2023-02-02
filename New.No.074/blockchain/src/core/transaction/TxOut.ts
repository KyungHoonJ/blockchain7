import Wallet from "@core/wallet";

export default class TxOut implements ITxOut {
  public address: string;
  public amount: number;

  constructor(_address: string, _amount: number) {
    this.address = _address;
    this.amount = _amount;
  }

  static createTxOuts(sum: number, _receivedTx): Array<TxOut> {
    const { sender, received, amount } = _receivedTx;
    const senderAddress = Wallet.getAddress(sender);

    const receivedTxOut = new TxOut(received, amount);
    if (sum - amount === 0) return [receivedTxOut];
    const senderTxOut = new TxOut(senderAddress, sum - amount);
    return [receivedTxOut, senderTxOut];
  }
}
