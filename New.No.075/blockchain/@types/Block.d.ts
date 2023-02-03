declare interface IBlockHeader {
  version: string;
  merkleRoot: string;
  timestamp: number;
  height: number;
  difficulty: number;
  nonce: number;
}

declare interface IBlock extends IBlockHeader {
  previousHash: string;
  hash: string;
  data: Array<ITransaction>;
  //   data: ITransaction[];
}
