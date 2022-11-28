const reducer = (state = 0, action) => {
  // state의 대체값을 0으로 정의했다.
  // state의 대체값을 주지 않으면 오류가 발생한다.
  // 매개변수로 전달된 state가 없으면 state는 0으로 정의된다.
  const { type } = action;
  switch (type) {
    case "count2/plus":
      return state + 1;
    case "count2/minus":
      return state - 1;
    default:
      return state;
  }
};

export default reducer;
