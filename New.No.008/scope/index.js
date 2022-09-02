// scope라는 것이 있습니다.
// scope는 {}로 묶인 것입니다.
// {}를 스코프라고 부릅니다.
// 그래서 scope가 뭡니까?
// 지역을 나타냅니다.
// 지역이라는 건 일종의 부분이라고 생각.

let a = 0; // 모든 곳에서 사용할 수 있는 변수를 전역 변수
console.log(a);
{
  let a = 2;
  //   지역 스코프 내에서 전역 변수가 다시 선언될 경우(재선언) 전역 스코프의 변수와는 다른 변수가 된다.(같은 이름이지만 다른 데이터를 갖는다.)
  let b = 1; // 안에서 선언된 변수를 지역 변수
  // 지역 변수는 해당 스코프 내에서만 사용 가능합니다.
  console.log(a + b);
  console.log(a);
}
// {} 묶인 곳을 지역 스코프
console.log(a);
// console.log(b);
// 바깥은 전역 스코프 부릅니다.

function addA(a) {
  a++;
  console.log(a);
}

let obj = {
  a: 1,
  func1: function () {
    console.log("돼");
  },
  func: (fn, sn) => {
    return fn + sn;
  },
};

obj.func1();

console.log(obj.func(1, 2));
// 객체 안에 포함된 함수는 메서드(method)라고 부릅니다.
// console 객체 안의 log 메서드
// Math 객체 안의 random 메서드
// obj 객체 안의 func1, func 메서드

alert("경고!");

// 오늘의 과제 : 숫자 선택(2개)를 선택하고 +, -, *, /, % 중 하나를 누르면 계산된 값이 alert창으로 출력된다.
// 힌트 : 매개변수

// 계산기 다 만든사람 n! 구현하자
// 정현, 재훈, 성진, 정규, 영준, 우석, 혜림
