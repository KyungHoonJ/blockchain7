var num = 1234;
var str = "1234";
var bool = true;
var und = undefined;
var nul = null;
// und = 1234; // 에러 난다, TypeScript는 자료형(Type)을 확인하기 때문에 같은 자료형만 변수에 정의할 수 있다.
num = 4321;
// console.log(num.length); // 오류 날까?
console.log(str.length); // 오류 날까?
var numUnd = undefined;
numUnd = 1234;
// |를 사용해서 type을 여러 개 사용할 수 있다.
// 앞의 것이 아니면 뒤의 것으로 적용된다.
var any = undefined;
any = "1234";
any = 1234;
// any는 모든 자료형을 포함한다.
// 그래서 안쓰는 것이 좋다.
var unk = undefined;
unk = "1234";
unk = 1234;
console.log(any.length); // 왜 될까? << 모든 자료형을 포함하고 있다고 판단하여 각종 메서드, 프로퍼티를 모두 사용할 수 있다.
// console.log(unk.length); // 왜 안될까? << 자료형을 모른다고 판단하여 각종 메서드, 프로퍼티를 사용할 수 없다.
if (typeof unk === "string") {
    // Type을 확인 후에 해당 타입에 대한 메서드, 프로퍼티를 사용할 수 있다.
    console.log(unk.length);
}
var obj = { a: 1 };
// ?는 undefined를 포함한다.
obj.b = "1234";
var arr = [1, 2, 3];
// arr.push("asdf");
var arr1 = [1, "1"];
arr1.push(1);
