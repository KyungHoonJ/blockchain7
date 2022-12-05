const promiseTime = (type, time) => {
  // 5. Promise 함수를 생성하여 return한다.
  console.log("5. return promise");
  return new Promise((resolve, reject) => {
    // 프라미스 함수를 사용하자~
    try {
      // 4번 위와 마찬가지로 에러를 체크한다.
      // 6. setTimeout을 사용해 전달된 시간(매개변수 time)만큼 기다린 후에 resolve를 사용해 결과(매개변수 type)를 반환한다.
      setTimeout(() => {
        console.log("6. setTimeout to " + type);
        resolve(type);
        // resolve는 성공 시 매개변수를 결과로 전달한다.
      }, time);
      // 매개변수로 전달된 시간 후에 매개변수로 전달된 type을 반환한다.
      // 만약에 서버와의 통신(axios 등)을 사용할 시 setTimeout이 아니라 axios의 then 등을 이용해서 resolve 메서드를 호출하자.
    } catch (error) {
      reject({ type: "error", payload: error });
      // reject는 실패 시 에러를 매개변수로 전달한다.
    }
  });
};

export default promiseTime;

// 비동기 처리란 / 동기 처리란
// 비동기 처리는 다른 작업과 함께 진행하는 방식이다.
//   - setTimeout과 같이 작업에 대해서 예약해둔다? 정도의 의미
// 동기 처리는 실재 코드를 읽듯이 순서대로 처리한다.
//   - 일반 코드와 같음

// setTimeout(() => {
//   console.log("비동기 확인");
// }, 1000);
// console.log("동기 확인");
// 비동기 처리를 연속되게 실행할 때
// 1초마다 한번씩 실행한다. 아래의 코드는 콜백지옥이라고 한다.
// setTimeout(() => {
//   console.log("비동기 확인1");
//   setTimeout(() => {
//     console.log("비동기 확인2");
//     setTimeout(() => {
//       console.log("비동기 확인3");
//       setTimeout(() => {
//         console.log("비동기 확인4");
//         setTimeout(() => {
//           console.log("비동기 확인5");
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// 아래 방식으로 작성하는 경우가 많기 때문에 콜백지옥이라고 부른다.
// const callbackHell = (text, func) => {
//   setTimeout(() => {
//     console.log(text);
//     if (func) func();
//   }, 1000);
// };

// callbackHell("비동기 확인1", () => {
//   callbackHell("비동기 확인2", () => {
//     callbackHell("비동기 확인3", () => {
//       callbackHell("비동기 확인4", () => {
//         callbackHell("비동기 확인5");
//       });
//     });
//   });
// });

// // Promise는 위와 같은 콜백 지옥을 피하기 위해 사용한다.
// const callbackPromise = (text, time) => {
//   return new Promise((resolve, reject) => {
//     // resolve는 성공 시 결과를 전달한다. 전달할 데이터는 resolve의 매개변수로 전달한다.
//     // reject는 실패 시 에러를 전달한다. 사용법은 resolve와 같다.
//     try {
//       // try 스코프 내의 코드를 실행한다.
//       // 도중에 오류가 발생하면 아래의 catch의 error로 전달한다.
//       if (text == "어싱크 확인3") reject("end");
//       setTimeout(() => {
//         resolve(text);
//       }, time);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// callbackPromise("프라미스 1", 1000)
//   .then((result) => {
//     // then은 promise 성공 시 실행하는 콜백함수를 전달한다.
//     // 콜백함수의 매개변수는 76번 줄의 resolve에 전달된 매개변수(text를 result로)를 받는다.
//     console.log(result);
//     return callbackPromise("프라미스 2", 1000);
//     // 다음 프라미스(작업)은 return으로 반환하며 아래에 then으로 위의 프라미스(현재는 89번 줄)의 결과를 받을 수 있다.
//   })
//   .then((result) => {
//     console.log(result);
//     return callbackPromise("프라미스 3", 1000);
//   })
//   .then((result) => {
//     console.log(result);
//     return callbackPromise("프라미스 4", 1000);
//   })
//   .then((result) => {
//     console.log(result);
//     return callbackPromise("프라미스 5", 1000);
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     // catch는 프라미스(작업) 도중 reject 발생 시 그것을 받아 처리한다.
//     // reject가 호출되면 then이 아닌 catch에서 그 결과를 받는다.
//     console.log(error);
//   });

// const asyncFunc = async () => {
//   try {
//     // async는 await 쓰려면 써야한다. asynchronism의 약자
//     console.log(await callbackPromise("어싱크 확인1", 1000));
//     // await는 프라미스 함수가 끝날 때까지 기다리도록 한다.
//     // 아래의 줄로 내려가지 않는다. 즉, 비동기 작업을 동기처럼 작성할 수 있게 해준다.
//     console.log(await callbackPromise("어싱크 확인2", 1000));
//     console.log(await callbackPromise("어싱크 확인3", 1000));
//     console.log(await callbackPromise("어싱크 확인4", 1000));
//     console.log(await callbackPromise("어싱크 확인5", 1000));
//   } catch (error) {
//     console.log(error);
//     // await를 사용한 프라미스 함수 호출 시 reject가 발생하면 catch를 사용해 error를 받아준다.
//   }
// };

// asyncFunc();
