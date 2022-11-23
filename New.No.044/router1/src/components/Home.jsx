import { useLocation } from "react-router-dom";

function Home({ propsNum }) {
  console.log(useLocation().state);

  return <div>Home! {propsNum}</div>;
}

export default Home;
