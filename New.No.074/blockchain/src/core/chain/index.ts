// const Block = require("../block/block");
import Block from "@core/block/block";
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/TxIn";
import TxOut from "@core/transaction/TxOut";

class Chain implements IChain {
  private chain: Array<IBlock>;
  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;
  private TIME_UNIT: number = 60 * 1000;
  // 보기 편하려고 private로 변경, 보통 다른 언어에서 private라고 적는다.
  // private는 해당 클래스 내에서만 사용할 수 있기 때문에 interface를 따로 사용하지 못한다.
  //   - private는 상속도 안된다.

  private utxos: Array<IUnspentTxOut>;

  constructor() {
    this.chain = [];
    const transaction = new Transaction(
      [new TxIn(`경훈의 제네시스 블록 ${new Date()}`, 0)],
      []
    );

    const genesis: IBlock = new Block([transaction]);
    this.chain.push(genesis);

    this.utxos = [];
  }

  get getChain(): Array<IBlock> {
    return [...this.chain];
  }

  get lastBlock(): IBlock {
    return this.chain[this.chain.length - 1];
  }

  get config(): IConfig {
    return {
      DAI: this.DIFFICULTY_ADJUSTMENT_INTERVAL,
      averageGenerationTime: this.BLOCK_GENERATION_INTERVAL * this.TIME_UNIT,
    };
  }

  get adjustmentBlock(): IBlock {
    const length: number = this.chain.length;
    const interval: number = length - this.DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (interval < 0) return this.chain[0];
    return this.chain[interval];
  }

  get getUtxo(): Array<IUnspentTxOut> {
    return [...this.utxos];
  }

  addBlock(_data: Array<ITransaction>): IBlock | null {
    console.log("addBlock");
    console.log("_data :", _data);
    const newBlock: IBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock: IBlock): IBlock | null {
    const isValid: TResult<IBlock, string> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      console.log(_newBlock);
      this.chain.push(_newBlock);
      return _newBlock;
    }
  }

  isValidChain(_chain: Array<IBlock>): TResult<undefined, string> {
    // 다른 서버에서 체인 받았을 때 정상적인 체인인지 확인하자.
    console.log("isValidChain");
    for (let i = 1; i < _chain.length; ++i) {
      const nowBlock = _chain[i];
      const previousBlock = _chain[i - 1];
      const isValid = Block.isValidBlock(nowBlock, previousBlock);
      if (isValid.isError == true) return isValid;
      // 문제가 있는 체인이면 에러를 반환한다.
    }
    return { isError: false, value: undefined };
    // 문제가 없는 체인임이 확인됐다.
  }

  replaceChain(_chain: Array<IBlock>): TResult<undefined, string> {
    console.log("replaceChain");
    const newLastBlock = _chain[_chain.length - 1];
    const lastBlock = this.lastBlock;
    if (newLastBlock.height === 0 && lastBlock.height !== 0) {
      return { isError: true, msg: "받은 블록이 제네시스 블록이다." };
    }
    if (newLastBlock.height < lastBlock.height) {
      // 롱기스트 체인 룰, 긴 체인을 적용한다.
      return { isError: true, msg: "내 체인이 더 길다." };
    }
    if (newLastBlock.hash === lastBlock.hash) {
      return { isError: true, msg: "동기화 완료" };
    }

    this.chain = _chain;
    return { isError: false, value: undefined };
  }

  mineBlock(_address: string) {
    const txIn: ITxIn = new TxIn("", this.lastBlock.height + 1);
    // 코인베이스 트랜잭션의 특징으로 txOutIndex를 블록의 높이로 정의한다.
    const txOut: ITxOut = new TxOut(_address, 50);
    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    const utxo = coinbaseTransaction.createUTXO();
    this.utxos.push(...utxo);

    return this.addBlock([coinbaseTransaction]);
  }

  updateUTXO(_tx: Transaction) {
    const utxos = this.getUtxo;
    const newUTXO = _tx.createUTXO();

    let temp = utxos.filter((item) => {
      const txIn = _tx.txIns.find(
        (item1) =>
          item.txOutId === item1.txOutId && item.txOutIndex === item1.txOutIndex
        // 트랜잭션의 txIns에 들어갔다 => input으로 넣어서 사용했다
        // 그럼 기존의 utxos 에서 사용한 utxo들을 빼야한다.
        // 그래서 txIns와 utxos를 비교, 검색해서 나오면 filter에서 걸러진다
      );
      return !txIn;
    });

    // let temp = [];
    // for (let i = 0; i < utxos.length; ++i) {
    //   for (let j = 0; j < _tx.txIns.length; ++j) {
    //     if (
    //       !(utxos[i].txOutId === _tx.txIns[j].txOutId &&
    //       utxos[i].txOutIndex === _tx.txIns[j].txOutIndex)
    //     )
    //       temp.push(utxos[i]);
    // //    if (
    // //      utxos[i].txOutId !== _tx.txIns[j].txOutId ||
    // //      utxos[i].txOutIndex !== _tx.txIns[j].txOutIndex
    // //    )
    // //      temp.push(utxos[i]);
    //   }
    // }

    this.utxos = [...temp, ...newUTXO];
  }
}

// module.exports = Chain;
export default Chain;
