const Block = require("./block");
const merkle = require("merkle");

describe("Block Test", () => {
  it("merkle Test", () => {
    // merkleRoot를 확인한다.
    const data = ["a", "b", "c"];
    const block = new Block(data);
    const merkleRoot = merkle("sha256").sync(data).root();

    expect(block.merkleRoot).toBe(merkleRoot);
  });

  it("hash test", () => {
    // hash를 확인한다.
    const data = ["a", "b", "c"];
    const block1 = new Block(data); // block1이 1번 블록이고
    const block2 = new Block(data, block1); // block2가 2번 블록이다.
    // 즉, block1, block2 로 연결되어있다.
    const hash = Block.createHash(block2);

    expect(block2.hash).toBe(hash);
  });
});
