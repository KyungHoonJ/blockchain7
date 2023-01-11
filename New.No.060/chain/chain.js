const Block = require("../block/block");

class Chain {
  // 체인은 배열로 만들거다.
  #chain;
  // 아무 데이터, 정보 등등을 체인에 넣지 못하도록 외부에서의 접근을 막기 위해 private로 설정

  constructor() {
    this.#chain = [];
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    console.log(new Date());
    this.#chain.push(genesis);
  }

  get chain() {
    return [...this.#chain];
    // 외부에서 #chain 접근 시 새로운 배열을 만들어서 준다.(반환한다.)
  }

  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
  }

  addBlock(_data) {
    const newBlock = new Block(_data, this.lastBlock);
    {
      // 제네시스 블록만 있을 때 체인의 길이는? 1 [제네시스 블록]
      //   - 제네시스 블록의 인덱스는? 0
      //   - 마지막 블록의 인덱스는 0 < 길이가 1일 때 0을 구해야한다.
      // 블록 하나를 추가했다. [제네시스 블록, 하나 추가]
      //   - 체인의 길이 : 2
      //   - 제네시스 블록의 인덱스는? 0
      //   - 제네시스 블록의 다음 블록의 인덱스는? 1
      //   - 제네시스 블록의 다음 블록의 다음 블록의 인덱스는? 2? << 터진다
      //   - 마지막 블록의 인덱스는 1 < 길이가 2일 때 1을 구해야한다.
      // 블록 하나 더 추가 [제네시스 블록, 하나 추가, 하나 더 추가]
      //   - 체인의 길이 : 3
      //   - 제네시스 블록의 인덱스는? 0
      //   - 제네시스 블록의 다음 블록의 인덱스는? 1
      //   - 제네시스 블록의 다음 블록의 다음 블록의 인덱스는? 2
      //   - 마지막 블록의 인덱스는 2 < 길이가 3일 때 2을 구해야한다.
    }

    // const isValid = Block.isValidBlock(newBlock, this.lastBlock);
    // if (isValid.isError) {
    //   console.error(isValid.msg);
    //   return null;
    // } else {
    //   this.#chain.push(newBlock);
    //   return newBlock;
    // }
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock) {
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      this.#chain.push(_newBlock);
      return _newBlock;
    }
  }
}

const chain = new Chain();
console.log(chain.chain);
const block = new Block(["qwer"], chain.lastBlock);
console.log("lastBlock: ", chain.lastBlock);
console.log(block);
block.height = 4;

chain.addBlock(["asdf"]);
chain.addBlock(["asdf2"]);
chain.addBlock(["asd3"]);

chain.add2Chain(block);

console.log(chain.chain);
