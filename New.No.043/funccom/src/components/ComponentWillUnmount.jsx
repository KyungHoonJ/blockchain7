import { useEffect } from "react";

function ComponentWillUnmount() {
  useEffect(() => {
    return () => {
      // 여기에 Unmount 시 실행할 코드를 적는다.
    };
  }, []);

  return <div></div>;
}

export default ComponentWillUnmount;
