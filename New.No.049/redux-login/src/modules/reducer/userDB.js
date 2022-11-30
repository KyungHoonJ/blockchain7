// 회원가입한 유저들의 정보
const TYPE = {
  REGIST: "userDB/regist",
};

// action
const regist = (userId, userPw, userName) => ({
  type: TYPE.REGIST,
  payload: { userId, userPw, userName },
});

export const action = { regist };

export const initialize = { userDB: [] };

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPE.REGIST:
      return state;
    default:
      return state;
  }
};
