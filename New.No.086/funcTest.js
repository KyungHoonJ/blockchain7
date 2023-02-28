// 오버로드, 오버라이드 << 라이브
class Parent {
  console(data) {
    console.log("Parent", data);
  }
  console(data1, data2) {
    console.log(data1, "은 data1이고 ", data2, "는 data2이다.");
  }
}
const temp = { a: 1 };
const temp2 = { ...temp, a: 2 };

class Child extends Parent {
  console(data) {
    console.log("Child", data);
  }
  // console을 주석처리 하면 부모의 console을 가져다 사용한다.
  // console을 주석처리 하지 않으면 "오버라이딩!"이 되어서 함수가 변경된다. overRide
}

const parent = new Parent();
parent.console("재혁아");
const child = new Child();
child.console("뭐나올까?");
child.console("재혁아!", "진짜로 뭐나올까?");

const forEach = (...data) => {
  data.forEach((item) => console.log(item));
};
forEach(1, 2, 3, 4, "sad", "wee", "fsdaf");
