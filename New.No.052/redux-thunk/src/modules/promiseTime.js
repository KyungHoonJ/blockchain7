const promiseTime = (type, time) => {
  return new Promise((resolve, reject) => {
    // 프라미스 함수를 사용하자~
    try {
      setTimeout(() => {
        console.log(type);
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
