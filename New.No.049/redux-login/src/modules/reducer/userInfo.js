// 로그인한 유저의 정보
const TYPE = {
  LOGIN: "userInfo/login",
  LOGOUT: "userInfo/logout",
};

const logIn = (userId, userPw) => ({
  type: TYPE.LOGIN,
  payload: { userId, userPw },
});

const logOut = () => ({
  type: TYPE.LOGOUT,
});

export const action = { logIn, logOut };

// export const initialize = {userInfo : { userId: "", userName: "" }};
export const initialize = { userId: "", userName: "" };
// 로그인 했을 때 아이디와 이름을 저장하겠다.

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPE.LOGIN:
      return state;

    case TYPE.LOGOUT:
      return state;

    default:
      return state;
  }
};
