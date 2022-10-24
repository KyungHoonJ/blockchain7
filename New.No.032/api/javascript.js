// javascript는 prototype이다.
// 변수는 저장할 데이터의 이름이다.
//   const, let, var
//   var는 hoisting(호이스팅)이 가능하다.
//   저장한 데이터의 이름이기 때문에 호출하면 저장된 데이터를 가져온다, 출력한다, 사용한다
//   const는 변경 불가능하다. << 재정의가 불가능하다.
//   let은 같은 이름을 사용하지 못한다. << 재선언이 불가능하다.
//   let은 다른 데이터를 다시 저장할 수 있다. << 변경이 가능하다. << 재정의가 가능하다.
//   var는 마음대로 마구잡이로 사용 가능하다. << 같은 이름을 사용할 수 있다. << 재선언이 가능하다. 단, 덮어쓴다.

// console.log(constA); // << hoisting 불가능
// console.log(letA); // << hoisting 불가능
console.log(varA); // << hoisting 가능

const constA = 1;
// constA = 2; // << 재정의가 불가능하다.
// const constA = 3; // << 재선언이 불가능하다.
let letA = 1;
letA = 2;
// let letA = 3; // << 재선언이 불가능하다.
var varA = 1;
varA = 2;
var varA = 3;

// 자료형
// string, number, boolean, Array, null, Function, Object, undefined, Symbol
// string : 문자열
// number : 숫자
// boolean : 참거짓
// Array : 배열
// null : 비어있는 값 / 비어있다고 정의한 값
// Function : 함수
// Object : 객체
// undefined : 선언은 했는데 입력하지 않은 값 / 그냥 빈값(정의하지 않았다.)
// Symbol : 절대적으로 같지 않는 값 << 'asdf'를 2개를 선언했다. 두 값은 같은 값일까?

console.log('"asdf" == "asdf" : ', "asdf" == "asdf");
console.log(
  'Symbol("asdf") == Symbol("asdf") : ',
  Symbol("asdf") == Symbol("asdf")
); // 다르다고 나온다.

const constB = 1;
console.log("constA == constB : ", constA == constB);

("constTest"); // << 뭘까? string / const
1; // << number / const
console.log(typeof constA);
console.log(typeof constA.toString());
console.log(typeof 1);
console.log(typeof (1).toString());
console.log("asdf".toUpperCase());

console.log(typeof "123");
console.log(typeof +"123");
console.log(typeof parseInt("123"));
console.log(typeof Math.floor("123"));
console.log(typeof parseFloat("123"));
console.log(typeof Number("123"));

console.log((132).toString());
console.log(Boolean(123));
console.log(!!123);

console.log([1].push(10)); // << 왜 1이 나올까? push는 제일 뒤에 아이템을 추가한다. push는 length를 반환한다.
console.log([1, 2, 3, 5, 4].pop()); // 왜 4가 나올까? pop은 맨 뒤의 아이템을 제거한다. 뭘 제거했는지 보여주기 위해 제거한 아이템을 반환한다.
console.log([1].unshift(4)); // 제일 앞에 아이템을 추가한다.
console.log([10, 1].shift()); // 제일 앞에서 아이템을 제거한다. pop과 마찬가지로 제거한 아이템을 반환한다.

// [].join()
// [].filter()
// [].find()
// [].findIndex()
// [].indexOf()
// [].forEach()
// [].map()
// [].slice()
// [].splice()
// [].reduce()
// [].reverse()
// [].sort()
// [].concat() => [...A, ...B]

// Object

// Function
