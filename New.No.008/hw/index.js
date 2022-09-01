let firstNum = 0;
let secondNum = 0;

function addFN() {
  firstNum++;
  //   firstNum 를 하나 증가시킨다.
  console.log("firstNum : " + firstNum);
  //   firstNum를 콘솔창에 출력한다.
}

const addSN = function () {
  secondNum++;
  console.log("secondNum : " + secondNum);
};

const sum = () => {
  const sumNum = firstNum + secondNum;
  console.log(sumNum);
  //   return sumNum;
};

function examAddFN(firstNum) {
  // let firstNum;
  // 매개변수는 위에 변수와 다른 변수가 된다.
  // 1번줄에서 선언한 firstNum와 매개변수로 선언된 firstNum는 엄연히 다른 놈이다.
  console.log(firstNum);
  firstNum++;
  firstNum += 1;
  firstNum = firstNum + 1;
  console.log(firstNum);
}

examAddFN(firstNum); // << 매개변수가 없어, 20번째 줄의 firstNum는 undefined
