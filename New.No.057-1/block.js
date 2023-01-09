const IBlock = require("./block.interface");
// 블록 인터페이스 들고옴

const {
  lib: { merkle, SHA256, hexToBinary },
  constant: {
    BLOCK_GENRATION_INTERVAL,
    DIFFICULTY_ADJUSTMENT_INTERVAL,
    TIME_UNIT,
  },
} = require("./config");

class Block extends IBlock {
  // Block에 IBlock 인터페이스 상속
  constructor() {
    // 부모 함수 사용
    super();
  }
  // 블록 생성 함수
  create(_previousBlock, _adjustmentDifficulty, _adjustmentTimestamp, _data) {
    try {
      const { height, hash: previousHash } = _previousBlock;
      // 이전 블록의 hash를 previousHash 해시로 초기화한다.
      this.height = height + 1;
      // 기존 블록의 높이(개수) 보다 하나 증가.(생성할때 높이 증가시켜서 생성)
      this.previousHash = previousHash;
      // 기존 블록의 hash 값을 갖는다(오류 확인을 위해)

      // 임시값 초기화
      const merkleRoot = this.getMerkleRoot(_data);
      // 정상적으로 Root 구하도록 호출

      if (merkleRoot.isError) throw new Error(merkleRoot.error);
      // throw 명령어를 사용해서 try문을 멈추고 catch로 입력값을 전달한다.
      // merkleRoot에서 오류 발생 시 생성 멈춤
      this.merkleRoot = merkleRoot.value;

      // 임시값 초기화
      this.nonce = 0;
      this.timestamp = Date.now();
      // 현재 시간으로 초기화

      this.difficulty = this.getDifficulty(
        // 난이도를 구하는 메서드 호출
        {
          height: this.height,
          timestamp: this.timestamp,
          previousDifficulty: _previousBlock.difficulty,
          _adjustmentDifficulty,
          _adjustmentTimestamp,
        }
      );
      // 메서드 만들 전에 초기화
      this.hash = this.createHash(this);
      // createHash : 블록의 hash 구하는 메서드 호출
      this.data = _data;
      // 데이터 저장(블록에 담을 데이터)
      this.updateBlock(
        // 블록 생성(마이닝을 거쳐서)
        _previousBlock,
        _adjustmentDifficulty,
        _adjustmentTimestamp
      );
      return this;
    } catch (err) {
      // 에러 발생 시
      throw new Error(err.message);
      // 에러 던지고 종료
    }
  }

  // 머클루트 구해주는 함수
  getMerkleRoot(_data) {
    // _data가 배열인지 확인
    return Array.isArray(_data)
      ? {
          isError: false,
          // 에러가 아니다.
          value: _data.length
            ? // _data의 길이가 있다 = merkle 라이브러리 사용
              merkle("sha256").sync(_data).root()
            : // merkle 라이브러리를 사용하며 sha256 방식의 hash 암호화를 사용, merkleRoot를 구한다.
              "0".repeat(64),
          // _data의 길이가 없으면 초기값을 반환
        }
      : { isError: true, error: "이거 오류임" }; // 배열이 아니다.
  }

  // 해시 만들어주는 함수
  createHash(_block) {
    // hash 생성 함수
    return SHA256(
      //SHA256 방식의 hash 암호화 사용
      // 여기서 256은 256bits를 뜻
      Object.entries(_block)
        // 객체의 키와 값을 배열로 변경 [[key,value],[key,value],[key,value]]
        .filter((item) => item[0] !== "hash" && item[0] !== "data")
        // hash 생성 메서드기 때문에 hash를 제외, data는 merkleRoot로 대체됨
        .join("")
      // 배열을 하나의 문자열로 연결
    );
  }

  // 난이도 구하는 메서드
  getDifficulty({
    height, // 입력되는 높이
    timestamp, // 입력되는 시간
    previousDifficulty, // 이전 블록의 난이도
    adjustmentDifficulty, // 난이도 조절의 단위 개수 전의 난이도
    adjustmentTimestamp, // 난이도 조절의 단위 개수 전의 생성 시간
  }) {
    // 높이가 난이도 조절 단위 개수 미만일 경우 최초 블록에서 현재까지
    if (height < DIFFICULTY_ADJUSTMENT_INTERVAL) return 0;

    // 높이가 난이도 조절 단위 개수의 2배 미만일 경우 최초블록이 포함된 단위 개수 다음 개수
    if (height < DIFFICULTY_ADJUSTMENT_INTERVAL * 2) return 1;

    // 높이의 난이도 조절 단위 개수 나머지가 0이 아니면 개수가 맞아 떨어지지 않아서
    if (height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0)
      // 이전 난이도를 이용
      return previousDifficulty;
    // 만약 난이도 조절 단위 개수가 10이라면 10개 단위로 난이도 조절을 하게 된다.
    // 높이가 9까지는 0, 높이가 10~19까지는 1, 이후에는 각 10 단위마다 아래 코드로 난이도를 결정하게 된다.

    const timeTaken = timestamp - adjustmentTimestamp;
    // 현재 시간과 난이도 조절 단위 개수 이전의 시간의 차를 확인
    // 블록이 생성된 시간 - 10개 이전의 생성 시간 = 시간차

    // 블록 생성 기준시간 10분에 블록 하나 생성
    // 10개만들면 100분
    const timeExpected =
      TIME_UNIT * BLOCK_GENRATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;

    // 난이도 증가
    if (timeTaken < timeExpected * 0.5) return adjustmentDifficulty + 1;
    // 설정된 블록 10개 생성 시간보다 0.5배 미만이면 난이도 증가, 300초 보다 작은경우

    // 난이도 감소
    if (timeTaken > timeExpected * 1.5) return adjustmentDifficulty - 1;
    // 설정된 블록 10개 생성 시간보다 1.5배 초과이면 난이도 감소, 900초 보다 큰 경우

    return adjustmentDifficulty;
    // 위 2 조건에 맞지 않으면 기존 난이도
  }

  // 블록 마이닝(채굴)
  updateBlock(_previousBlock, _adjustmentDifficulty, _adjustmentTimestamp) {
    // 난이도에 맞게 hash를 생성, 문제풀이라고도 함
    let hashBinary = hexToBinary(this.hash);
    // 현재 hash를 bit형식으로, binary 형식으로 바꾼다.
    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      // 0과 1로 이루어진 hash 문자의 시작되는 0의 개수가 0의 난이도 개수와 같은지 확인
      // startsWith : 특정 문자열로 시작하는지 확인
      // 난이도를 구해야 하니까 블록의 난이도를 전달해주고
      // 난이도가 2면 "00"두개인지 확인
      // 블록의 난이도의 갯수만큼 "0" 붙을때까지 반복
      this.nonce += 1;
      // nonce를 증가시키고

      this.timestamp = Date.now();
      // 블록 생성 시점이 달라졌음으로 현재 시간을 다시 설정

      this.difficulty = this.getDifficulty(
        // 난이도를 다시 구한다.
        // 이전 블록 시간이랑 높이는 추가해야됨
        _previousBlock.difficulty,
        _adjustmentDifficulty,
        _adjustmentTimestamp
      );

      // 생성할 블록의 해시값
      this.hash = this.createHash(this);
      hashBinary = hexToBinary(this.hash);
      // 비교를 위해 hash를 다시 bit 형식, binary 형식으로 변경
    }
  }

  // 블록의 검증 함수(블록이 정상적인 블록인지 검사)
  isValidNewBlock(_newBlock, _previousBlock) {
    // 생성된 블록이 문제가 없는지 확인하는 메서드
    if (_newBlock.height !== _previousBlock.height + 1) {
      // 생성된 블록이 이전 블록의 다음 개수를 가져오는지 확인
      return { isError: true, error: "'Block's height is incorrect. " };
    }

    if (_newBlock.previousHash !== _previousBlock.hash) {
      // 생성된 블록에 저장된 이전 블록 hash가 이전 블록 hash와 같은지 확인
      return { isError: true, error: "Hash of previous Block is incorrect. " };
    }

    if (this.createHash(_newBlock) !== _newBlock.hash) {
      // hash를 다시 생성하여 생성된 블록의 hash와 맞는지 확인
      return { isError: true, error: "Hash of block is incorrect." };
    }

    // 모두 통과해서 문제가 없으면 에러가 없다고 표시하고 블록을 반환
    return { isError: false, value: _newBlock };
  }
}

module.exports = Block;
