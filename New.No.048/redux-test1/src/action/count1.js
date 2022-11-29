export const COUNT1 = {
  PLUS: "count1/plus",
  MINUS: "count1/minus",
};
// 변수명이 전부 대문자다. 왜일까?
// 수정하지 않고 가져다 쓸 변수 << 관례 중 하나.
// 예 : DB의 컬럼명들

const plus = (input) => {
  console.log(input);
  return {
    type: COUNT1.PLUS,
    payload: { input },
  };
};

const minus = (input) => ({
  type: COUNT1.MINUS,
  payload: { input },
});

export const actions = { plus, minus };
