import { useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

function Header() {
  const [searchStr, setSearchStr] = useState("");

  return (
    <div>
      Header!
      <input
        value={searchStr}
        onInput={(e) => {
          setSearchStr(e.target.value);
        }}
        placeholder="검색어를 입력하세요"
      />
      <div>
        <Link to="/" state={{ search: searchStr }}>
          {/* state props를 사용해서 데이터를 전달할 수 있다. */}
          Home
        </Link>{" "}
        | <Link to="/login">Log in</Link> | <Link to="log/in">Log in 2</Link> |{" "}
        <Link to={"log/out?" + queryString.stringify({ search: searchStr })}>
          Log out 2
        </Link>
      </div>
    </div>
  );
}

export default Header;
