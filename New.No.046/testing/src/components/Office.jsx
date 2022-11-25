import { useContext, useState } from "react";

import { OfficeContext } from "./ReducerTest";

export default function Office() {
  const { result, requestDispatch } = useContext(OfficeContext);
  const [balance, setBalance] = useState(10000);
  // 발급받을 때마다 돈이 줄어들도록
  // 발급 금액도 달라야한다.

  return (
    <div
      className="office"
      onClick={() => {
        requestDispatch({
          type: "주민등록등본",
          // 어떠한 작업을 할것인가?
          payload: {
            // 작업에 필요한 데이터
            identityCard: "주민등록증",
            pay: 500,
          },
        });
      }}
    >
      {result}
    </div>
  );
}
