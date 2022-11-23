import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/login">Log in</Link> |{" "}
      <Link to="log/in">Log in 2</Link> | <Link to={"log/out"}>Log out 2</Link>
      {/* a 태그 대신 사용한다. */}
      {/* a 태그를 사용하는 것은 외부 웹페이지에 접근할 때 사용한다. << localhost -> naver.com */}
    </div>
  );
}
