const Block = require("./block");
const merkle = require("merkle");

describe("Block Test", () => {
  // it("merkle Test", () => {
  //   // merkleRoot를 확인한다.
  //   const data = ["a", "b", "c"];
  //   const block = new Block(data);
  //   const merkleRoot = merkle("sha256").sync(data).root();

  //   expect(block.merkleRoot).toBe(merkleRoot);
  // });

  // it("hash test", () => {
  //   // hash를 확인한다.
  //   const data = ["a", "b", "c"];
  //   const block1 = new Block(data); // block1이 1번 블록이고
  //   const block2 = new Block(data, block1); // block2가 2번 블록이다.
  //   // 즉, block1, block2 로 연결되어있다.
  //   const hash = Block.createHash(block2);

  //   expect(block2.hash).toBe(hash);
  // });

  describe("data가 배열이 아닐 때", () => {
    const data = "a";
    const block = new Block(data);

    it("merkleRoot가 비어있는가?", () => {
      expect(block.merkleRoot).toBe("");
    });

    it("hash가 비어있는가?", () => {
      expect(block.hash).toBe("");
    });
  });

  describe("data가 배열일 때", () => {
    const data = ["a"];
    const block = new Block(data);

    it("merkleRoot가 정상인가?", () => {
      const merkleRoot = merkle("sha256").sync(data).root();
      expect(block.merkleRoot).toBe(merkleRoot);
    });

    it("hash와 merkleRoot의 길이가 64인가?", () => {
      expect(block.merkleRoot).toHaveLength(64);
      expect(block.hash).toHaveLength(64);
      // toHaveLength << 길이 확인
    });
  });
});
