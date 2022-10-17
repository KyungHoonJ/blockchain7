function testFunc(num, time, func) {
  setTimeout(() => {
    console.log(num);
    if (func) func();
  }, time);
}

// setTimeout(() => {
//   console.log(1);
// }, 1000);
// setTimeout(() => {
//   console.log(2);
// }, 2000);
// setTimeout(() => {
//   console.log(3);
// }, 3000);

// testFunc(1, 1000, () => {
//   testFunc(2, 2000, () => {
//     testFunc(3, 3000, () => {
//       testFunc(4, 4000);
//     });
//   });
// });

function testPromise(num) {
  return new Promise((resolve, reject) => {
    // resolve는 완료했을 때
    // reject는 에러 발생 시
    try {
      if (num > 10) reject({ data: "숫자가 너무 커" });
      console.log(num);
      setTimeout(() => {
        resolve(num + 1);
      }, num * 100);
    } catch (error) {
      reject(error);
    }
  });
}

// testPromise(9)
//   .then((data) => {
//     return testPromise(data);
//   })
//   .then((data) => {
//     return testPromise(data);
//   })
//   .then((data) => {
//     // then : 완료했을 때
//     // 34번째 줄의 resolve의 매개변수(num+1)가 data에 정의된다.
//     console.log("data : " + data);
//   })
//   .catch((err) => {
//     // catch : 에러 발생 시
//     // 31번줄, 37번줄의 reject 매개변수가 err에 정의된다.
//     console.log(err);
//   });

async function asyncFunc() {
  // async : promise를 기다리기 위해서(동기처럼 사용하기 위해서) 사용한다.
  try {
    let temp = await testPromise(1);
    temp = await testPromise(temp);
    temp = await testPromise(temp);
    temp = await testPromise(temp);
    temp = await testPromise(temp);
    temp = await testPromise(temp);
    temp = await testPromise(temp);
    // temp = await testPromise(temp);
    // temp = await testPromise(temp);
    // temp = await testPromise(temp);
    // temp = await testPromise(temp);
    // await + promise : promise를 기다려서 resolve 값을 반환받는다.
    console.log("temp : " + temp);
    // [].map().join()
    // ''.split().map().join()
  } catch (err) {
    console.log(err);
  }
}
asyncFunc();
