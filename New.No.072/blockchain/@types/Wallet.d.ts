declare interface IWallet {
  address: string;
  publicKey: string;
  privateKey: string;
  balance: number;

  getPrivateKey(): string;
  getPublicKey(): string;
  getAddress(): string;
}
