import { useEffect, useRef, useCallback, useMemo, useState } from "react";

export default function Additional() {
  const ref = useRef();
  // useRef는 documnet.getElementById와 같은 기능을 하는 Hook이다.
  // HTML Element를 가져올 수 있다.

  useEffect(() => {
    ref.current.classList.add("testing");
    console.log(ref.current.classList); // Element에 접근 시 current 프로퍼티로 가져온다.
  }, []);

  const [testValue, setValue] = useState(0);
  // 기존에 useEffect를 사용할 경우 어떤 상태(a)의 값이 변화 시 a를 기준으로 다른 상태(b)의 값을 계산하여 정의하는 경우가 있다. (ex. axios를 통한 데이터 받기)
  // state를 따로 정의하지 않고 useMemo를 정의한 변수로 사용할 수 있다.
  const tValue = useMemo(() => {
    return testValue + 10;
  }, [testValue]);
  // 위의 tValue는 testValue가 변경(재정의)될 때마다 계산되어(+ 10) 정의된다.
  // state와 마찬가지로 tValue가 달라지면 리랜더링이 발생한다.

  const testFunc = useCallback(() => {
    console.log(testValue + 100);
  }, [testValue]);
  // useMemo와 유사하나 함수를 그대로 testFunc에 정의한다.
  // 즉, testFunc는 함수이므로 호출할 때는 testFunc() 로 사용해야한다.
  // useMemo와 마찬가지로 testValue의 값이 변경되었을 때만 재정의한다.

  function testFunc1() {
    console.log(testValue + 100);
  }
  // 위와 같이 function 등등으로 함수를 선언했을 때는 리랜더링 될 때마다 함수를 다시 정의한다. useCallback을 사용 시 두번째 매개변수의 상태값이 변화하지 않으면 재정의 하지 않고 있던 것을 사용한다.
  // 즉, 필요 없는 코드의 실행을 막을 수 있기 때문에 최적화 시 사용한다.
  // useMemo 또한 마찬가지로 최적화 시 사용한다.

  return (
    <div
      id="now-test"
      className="now-test"
      style={{ backgroundColor: "red" }}
      ref={ref} // 가져올 Element의 ref 속성으로 전달한다.
      onClick={() => {
        setValue(testValue + 1);
        testFunc();
      }}
    >
      {tValue}
      {/* useMemo로 정의한 변수 사용 시 일반 변수처럼 가져온다. */}
    </div>
  );
}
