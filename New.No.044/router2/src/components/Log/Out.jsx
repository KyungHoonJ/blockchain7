import { useLocation } from "react-router-dom";
import queryString from "query-string";

function Out() {
  const location = useLocation();
  // window.location 형식으로 보여준다.
  console.log(queryString.parse(location.search));
  // 쿼리스트링을 객체 형식으로 바꿔준다.

  return <div>Out!</div>;
}

export default Out;
