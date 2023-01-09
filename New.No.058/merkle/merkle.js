const SHA256 = require("crypto-js").SHA256;
const merkle = require("merkle");

const data = [1, 2, 3, 4];

const merkleRoot = merkle("sha256").sync(data).root();
// merkle('sha256') << merkle 라이브러리를 사용한다. 매개변수로는 암호화 방식을 전달한다.
// .sync(data) << merkle Tree를 만들 데이터를 매개변수로 전달한다.
// .root() << 완성된 merkle Tree의 Root(완성된 하나의 암호화된 데이터)
// merkle 라이브러리는 받는 데이터 배열의 아이템을 전부 문자열(string)으로 처리한다.

const createMerkleRoot = () => {
  return SHA256(data[0].toString()).toString().toUpperCase();
  // SHA256(data[0]) << 데이터를 암호화한다. 해당 암호화된 데이터는 객체 형식이다.
  // .toString() << 문자열로 변환한다.
  // .toUpperCase() << SHA256를 쓸 경우 영어가 소문자로 나타나기 때문에 대문자로 수정해준다.
};

const firstTree = [];
for (let i = 0; i < data.length; i++) {
  firstTree.push(SHA256(data[i].toString()).toString().toUpperCase());
}
// 데이터의 모든 정보(아이템)을 한번씩 hash(SHA256) 방식으로 암호화한다.

const secondTreeRoot = SHA256(firstTree[0] + firstTree[1])
  .toString()
  .toUpperCase();
// 데이터(data) 안의 2개의 아이템을 암호화한 후 연결해서 다시 암호화하며 한개의 문자열로 만든다.

const secondTree = [];
for (let i = 0; i < firstTree.length; i += 2) {
  secondTree.push(
    SHA256(firstTree[i].toString() + firstTree[i + 1].toString())
      .toString()
      .toUpperCase()
  );
}

const thirdTreeRoot = SHA256(secondTree[0] + secondTree[1])
  .toString()
  .toUpperCase();

module.exports = {
  merkleRoot,
  createdRoot: createMerkleRoot(),
  secondTreeRoot,
  thirdTreeRoot,
};
