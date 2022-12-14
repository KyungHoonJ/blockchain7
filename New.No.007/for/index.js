for (let i = 0; i < 10; ++i) {
  // for는 반복문의 명령어 중 하나.
  // () 안에 변수 선언, 조건, 반복하며 달라져야할 코드? 변수? (반복하며 실행할 코드?)
  //   while 과 마찬가지로 {} 내의 코드를 실행한다.
  //   (1;2;3) 1 => 2 => {} => 3 => 2 => {} => 3 => 2 => {}
  // 1은 변수 선언이고, 2는 조건이야, 3은 {}의 코드 실행 후 변할 코드
  console.log(`i = ${i}`);
  // console.log("i = " + i);
  // ``(템플릿 리터널)은 텍스트(string) 안에 변수를 넣고싶을때 사용한다.
  // 템플릿 리터널은 1 옆에, esc 밑에 있는 ``
  // `i = ${i}` === "i = " + i => 두 개가 같다.
}

let j = 0;
for (; j < 10; ) {
  console.log(`j = ${j}`);
  ++j;
}

let w = 0;
while (w < 10) {
  console.log(`w = ${w}`);
  ++w;
}

//   console.log(`i 는 ${i < 5 ? "5보다 작다" : i === 5 ? "5다" : "5보다 크다"}`);
//   if (i < 5) console.log("i 는 5보다 작다");
//   else if (i === 5) console.log("i 는 5다");
//   else console.log("i 는 5보다 크다");

for (let a = 0, b = 1; a < 10 && b > -2; ++a, --b) {
  // && 는 '그리고'다. 즉 두 조건이 한번에 만족해야한다.
  console.log(`a = ${a}, b = ${b}`);
}

for (let a = 0, b = 1; a < 10 || b > -2; ++a, --b) {
  // || 는 '또는'다. 즉 두 조건 중 하나라도 만족하면 실행된다.
  // | 는 shift + \
  console.log(`a = ${a}, b = ${b}`);
  //   교수님! 왜 위에서 let a 썼는데 여기서 또 쓸 수 있죠? -> 응 낼 함수에서 보자
}

// 오늘의 숙제! 미연시 || 아키네이터 만들기
// prompt를 이용해서 입력값 받아서 선택지를 선택하고
// 선택한 선택지에 따라서 다른 질문이 나와야함
// 결론도 다르게 나와야한다.
// 최소 개수 조건 : 질문 10개, 결과 5개; 단 RPG 형식의 전투를 넣었을 시 무시해 됨(공격 방법 5개 이상)
// 만약에 1~4 번까지 선택지가 있을 때 5를 선택하면 다시 선택하게 해야함

// 원래 내주려고 했던 과제
// 컴퓨터가 1 ~ 100사이의 하나의 숫자를 골라
// 사람이 하나의 숫자를 선택해
// 숫자를 맞추면 끝
// 못맞추면 대소 비교해서 UP(내가 선택한 숫자가 크다)
// Down(내가 선택한 숫자가 작다.)
// 총 몇번 입력했는지.
// 맞췄을때 '축하합니다, 몇번 입력하셨습니다'
console.log(Math.random()); // 0~1까지의 랜덤수
// parseInt(***)
