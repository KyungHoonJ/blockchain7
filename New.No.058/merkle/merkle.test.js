// jest를 사용하는 방법
//   - .js 파일을 .test.js 파일로 생성
//   - npx jest를 실행하면 .test.js 파일을 모두 확인한다.
//     - 또는 package.json 파일 안에 test 명령어를 jest로 수정한다.
//       - "test" : "jest"
//   - jest 뒤에 파일명을 입력하면 해당 파일만 확인한다.

test("이건 테스트다", () => {
  expect("1234").toBe("1234");
});

// test || it
// it(name, func)
// it 또는 test는 name 이라는 이름의 테스트를 실행한다.
// 해당 테스트의 구현 내용(코드)는 func(함수)에 포함된다.

// expect(확인할 내용) : 적혀있는 그대로 확인할 함수, 객체, 변수 등등을 매개변수로 전달한다. 이것만 있으면 아무 의미가 없다.
//
