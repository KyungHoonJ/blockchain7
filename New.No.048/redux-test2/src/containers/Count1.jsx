// Containers VS Components
// Javascript 등의 로직 VS HTML 구조
// 나누는 이유 : 가시성? 리뷰, 유지보수에 좋다

import { useState } from "react";

import Count1Comp from "../components/Count1";
import store from "../store";
import { action } from "../modules/count1";

const Count1Container = () => {
  const count1 = store.getState().count1;
  const [_, render] = useState(true);

  const plus = () => {
    store.dispatch(action.plus);
    render((state) => !state);
  };
  const minus = () => {
    store.dispatch(action.minus);
    render((state) => !state);
  };
  const input = (input) => {
    store.dispatch(action.input(input));
    render((state) => !state);
  };

  return <Count1Comp count1={count1} plus={plus} minus={minus} input={input} />;
};

export default Count1Container;
