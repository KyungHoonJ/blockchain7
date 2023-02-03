// const Block = require("../block/block");
import Block from "@core/block/block";
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/TxIn";
import TxOut from "@core/transaction/TxOut";
import UnspentTxOut from "@core/transaction/UnspentTxOut";

class Chain implements IChain {
  private chain: Array<IBlock>;
  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;
  private TIME_UNIT: number = 1000;
  // 보기 편하려고 private로 변경, 보통 다른 언어에서 private라고 적는다.
  // private는 해당 클래스 내에서만 사용할 수 있기 때문에 interface를 따로 사용하지 못한다.
  //   - private는 상속도 안된다.

  private utxos: Array<IUnspentTxOut>;
  private txPool: Array<ITransaction>;

  constructor() {
    this.chain = [];
    const transaction = new Transaction(
      [new TxIn(`경훈의 제네시스 블록 ${new Date()}`, 0)],
      []
    );

    const genesis: IBlock = new Block([transaction]);
    this.chain.push(genesis);

    this.utxos = [];
    this.txPool = [];
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

  get getTxPool(): Array<ITransaction> {
    return [...this.txPool];
  }

  addBlock(_data: Array<ITransaction>): IBlock | null {
    if (global.debug) console.log("7-12 블록 생성");
    if (global.debug) console.log("addBlock");
    if (global.debug) console.log("_data :", _data);
    const newBlock: IBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    if (global.debug)
      console.log("7-20 생성된 블록을 체인에 추가하는 메서드 호출");
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock: IBlock): IBlock | null {
    if (global.debug) console.log("7-21/7-34 정상적인 마지막 블록인지 확인");
    const isValid: TResult<IBlock, string> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      if (global.debug) console.log(_newBlock);
      if (global.debug) console.log("7-22/7-35 체인에 블록 추가");
      this.chain.push(_newBlock);

      if (global.debug)
        console.log("7-23/7-36 블록의 트랜잭션을 기준으로 UTXO 목록 수정");
      _newBlock.data.forEach((_tx: Transaction) => this.updateUTXO(_tx));
      if (global.debug)
        console.log("7-25/7-38 트랜잭션 수정 메서드에 블록 전달");
      this.updateTxPool(_newBlock);
      // 다른 peer가 추가됐다고 보냈을 때
      return _newBlock;
    }
  }

  isValidChain(_chain: Array<IBlock>): TResult<undefined, string> {
    // 다른 서버에서 체인 받았을 때 정상적인 체인인지 확인하자.
    if (global.debug) console.log("isValidChain");
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
    if (global.debug) console.log("replaceChain");
    if (global.debug)
      console.log("7-46 체인 교체를 위해 내 체인보다 긴지 확인한다.");
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

    if (global.debug) console.log("7-47 체인 교체");
    this.chain = _chain;

    if (global.debug)
      console.log("7-48 새로운 체인으로 트랜잭션 풀과 UTXO를 업데이트");
    // 새로운 체인의 모든 블록을 가져다가
    this.chain.forEach((_block: IBlock, index) => {
      // 트랜잭션 풀을 업데이트하고(삭제할거 삭제, 추가할거 추가)
      if (global.debug)
        console.log(`7-49-${index} 새로운 체인으로 트랜잭션 풀 업데이트`);
      this.updateTxPool(_block, index);
      _block.data.forEach((_tx: Transaction, index2) => {
        // 각 블록의 data(트랜잭션)을 하나하나 가져와서 UTXO를 업데이트한다
        console.log(`7-49-${index}-${index2} 새로운 체인으로 UTXO 업데이트`);
        this.updateUTXO(_tx, index, index2);
      });
    });

    return { isError: false, value: undefined };
  }

  mineBlock(_address: string) {
    if (global.debug) console.log("7-7 블록 채굴 시작");
    if (global.debug) console.log("7-8 txIns(input) 생성");
    const txIn: ITxIn = new TxIn("", this.lastBlock.height + 1);
    // 코인베이스 트랜잭션의 특징으로 txOutIndex를 블록의 높이로 정의한다.
    if (global.debug) console.log("7-9 txOuts(output) 생성");
    const txOut: ITxOut = new TxOut(_address, 50);
    if (global.debug) console.log("7-10 코인베이스 트랜잭션 생성");
    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    // const utxo = coinbaseTransaction.createUTXO();
    // this.utxos.push(...utxo);

    if (global.debug)
      console.log(
        "7-11 코인베이스 트랜잭션과 지금까지 쌓은 트랜잭션으로 블록 생성"
      );
    return this.addBlock([...this.getTxPool, coinbaseTransaction]);
  }

  updateUTXO(_tx: Transaction, index?: number, index2?: number) {
    if (global.debug)
      console.log(
        `6-34/7-24/7-37${`/7-49-${index}-${index2}`}/8-27 UTXO 수정 시작`
      );
    const utxos = this.getUtxo;
    const newUTXO: Array<IUnspentTxOut> = [];
    for (let i = 0; i < _tx.txOuts.length; ++i) {
      newUTXO.push(
        new UnspentTxOut(
          _tx.txOuts[i].address,
          _tx.txOuts[i].amount,
          _tx.hash,
          i
        )
      );
    }

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

    if (global.debug)
      console.log("6-36 수정된 utxo에 새로운 utxo를 추가해서 정의");
    const result = [...temp, ...newUTXO];

    this.utxos = result.reduce((prev, curr) => {
      const find = prev.find(
        ({ txOutId, txOutIndex }) =>
          txOutId === curr.txOutId && txOutIndex === curr.txOutIndex
      );
      if (!find) prev.push(curr);
      return prev;
    }, []);
  }

  addTxPool(_tx: Transaction): void {
    if (global.debug) console.log("8-25 트랜잭션 풀에 트랜잭션 추가");
    this.txPool.push(_tx);
  }

  updateTxPool(_newBlock: IBlock, index?: number): void {
    if (global.debug)
      console.log(
        `7-26/7-39${
          index !== undefined ? `/7-49-${index}-updateTxPool` : ""
        } 트랜잭션 수정 시작`
      );
    // 블록 생성 후 해당 블록에 사용된 트랜잭션을 삭제한다.
    let txPool: Array<ITransaction> = this.getTxPool; // 기존 트랜잭션 풀
    const tempTx: Array<ITransaction> = _newBlock.data; // 새로운 블록의 트랜잭션 << 사용된 트랜잭션
    if (global.debug)
      console.log(
        "7-27/7-40 기존 트랜잭션 풀과 새 블록의 데이터(트랜잭션)을 비교"
      );
    for (let i = 0; i < tempTx.length; ++i) {
      const tempTxPool: Array<ITransaction> = [];
      for (let j = 0; j < txPool.length; ++j) {
        if (txPool[j].hash !== tempTx[i].hash) tempTxPool.push(txPool[j]);
        // 기존 트랜잭션 풀과 사용된 트랜잭션들(블록 내의 트랜잭션)을 비교해서 사용되지 않은 트랜잭션을 새로운 배열에 넣어준다.
      }
      txPool = tempTxPool;

      // txPool = txPool.filter((_tx) => _tx.hash !== tempTx[i].hash);
    }
    if (global.debug) console.log("7-28/7-41 새로운 트랜잭션 풀을 적용");
    this.txPool = txPool;
  }
}

// module.exports = Chain;
export default Chain;
