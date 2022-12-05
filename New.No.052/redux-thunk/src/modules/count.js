const TYPE = {
  INCREMENT: "count/increment",
  DECREMENT: "count/decrement",
};

const increment = () => {
  return {
    type: TYPE.INCREMENT,
  };
};

const decrement = () => {
  return {
    type: TYPE.DECREMENT,
  };
};

export const action = { increment, decrement };

export const initialize = 0;

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.INCREMENT:
      return state + 1;

    case TYPE.DECREMENT:
      return state - 1;

    default:
      return state;
  }
};
