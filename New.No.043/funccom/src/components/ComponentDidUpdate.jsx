import { useEffect } from "react";

export default function ComponentDidUpdate() {
  useEffect(() => {
    // 여기에는 업데이트 때마다 실행되는 코드를 작성한다. => 랜더링
    console.log("이거랑");
  });
  console.log("저거랑");
  // '이거랑' '저거랑' 차이가 없다.

  return <div></div>;
}
