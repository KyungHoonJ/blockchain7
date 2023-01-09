const {
  createdRoot,
  merkleRoot,
  secondTreeRoot,
  thirdTreeRoot,
} = require("./merkle");

const { oddMerkleRoot, oddThirdRoot } = require("./oddMerkle");

// jest를 사용하는 방법
//   - .js 파일을 .test.js 파일로 생성
//   - npx jest를 실행하면 .test.js 파일을 모두 확인한다.
//     - 또는 package.json 파일 안에 test 명령어를 jest로 수정한다.
//       - "test" : "jest"
//   - jest 뒤에 파일명을 입력하면 해당 파일만 확인한다.

describe("이건 테스트의 그룹이다.", () => {
  // describe는 단순한 그룹이다.
  //   - 목차에서 하위 목차 나누듯이 그룹으로 묶어서 하위 테스트 또는 하위 그룹을 만든다.
  test("이건 테스트다", () => {
    expect("1234").toBe("1234");
  });

  // test || it
  // it(name, func)
  // it 또는 test는 name 이라는 이름의 테스트를 실행한다.
  // 해당 테스트의 구현 내용(코드)는 func(함수)에 포함된다.

  // expect(확인할 내용) : 적혀있는 그대로 확인할 함수, 객체, 변수 등등을 매개변수로 전달한다. 이것만 있으면 아무 의미가 없다.
  // toBe(비교 대상) : 정확히 일치하는지를 확인한다.
  //   - toXXXXXXX 를 매쳐(matcher)라고 부른다. << 엄청 많다.
  //   - toBe의 경우 완벽한 일치를 확인하기 때문에 객체 등을 비교할 수는 없다.

  it("이건 안된다 => 이건 된다", () => {
    // expect({ a: 1 }).toBe({ a: 1 });
    // 객체는 서로 다른 것으로 취급한다. 같은 객체가 되려면 변수에 정의해야한다.
    const obj = { a: 1 };
    expect(obj).toBe(obj);
  });

  it("객체의 비교", () => {
    expect({ a: 1 }).toEqual({ a: 1 });
    // toEqual은 완벽한 일치가 아닌 포함된 정보들의 일치를 확인한다.
  });

  describe("toEqual VS toStrictEqual", () => {
    // describe는 describe 안에서도 사용할 수 있으며 하위 목록이 된다.
    // Strict : 엄격한
    it("하나씩 보자", () => {
      // expect({ a: 1, b: undefined }).toBe({ a: 1, b: undefined });
      expect({ a: 1, b: undefined }).toEqual({ a: 1 });
      // expect({ a: 1, b: undefined }).toStrictEqual({ a: 1 });
      // toStrictEqual은 내용 자체가 모두 일치해야한다. 같아야한다.
    });
  });
});

describe("merkle 비교", () => {
  //   it("하나의 데이터 암호화 확인", () => {
  //     expect(createdRoot).toBe(merkleRoot);
  //     // 배열 내의 데이터가 "숫자" 1 이기 때문에 현재는 오류가 발생한다.
  //   });

  //   it("두개의 데이터 암호화 확인", () => {
  //     expect(secondTreeRoot).toBe(merkleRoot);
  //   });

  it("네개의 데이터 암호화 확인", () => {
    expect(thirdTreeRoot).toBe(merkleRoot);
  });

  it("세개의 데이터 암호화 확인", () => {
    expect(oddThirdRoot).toBe(oddMerkleRoot);
  });
});
