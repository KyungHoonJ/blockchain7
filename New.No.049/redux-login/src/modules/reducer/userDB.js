// 회원가입한 유저들의 정보
const TYPE = {
  REGIST: "userDB/regist",
};

// action
const regist = (userId, userPw, userName) => {
  // 8. regist를 호출당했다. userId, userPw, userName를 매개변수로 받았다.
  console.log("8. action regist");
  // 9. { type: TYPE.REGIST, payload: { userId, userPw, userName } }를 반환했다. << 액션
  return {
    type: TYPE.REGIST,
    payload: { userId, userPw, userName },
  };
};

export const action = { regist };

export const initialize = { userDB: [] };

export const reducer = (state = initialize, action) => {
  // 12. dispatch가 액션(action)을 매개변수로 보내며 호출했다. state는 기존의 상태값이다.
  //   - state는 combineReducers의 사용 여부에 따라서 달라진다.
  console.log(action);
  const { type, payload } = action;

  // 13. type에 따라서 state를 재정의한다. 재정의하고 싶은 정보를 return한다.
  switch (type) {
    case TYPE.REGIST:
      return state;
    default:
      return state;
  }
};
