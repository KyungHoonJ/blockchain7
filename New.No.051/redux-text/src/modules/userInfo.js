const TYPE = {
  LOGIN: "userInfo/login",
  LOGOUT: "userInfo/logout",
};
// 여러 곳에서 가져다 쓸 일정한 정보를 만들어둔다.

// const login = function (userId, password) {
//   return {
//     type: TYPE.LOGIN,
//     payload: {
//       userId,
//       password,
//     },
//   };
// };

// const login = (userId, password) => {
//   return {
//     type: TYPE.LOGIN,
//     payload: {
//       userId,
//       password,
//     },
//   };
// };

const logIn = (userId, password) => ({
  type: TYPE.LOGIN,
  payload: {
    userId,
    password,
  },
});

// const temp = () => {
//   return <div></div>;
// };

// const temp1 = () => [];
// const temp2 = (state) => state;

const logOut = (userId) => ({
  type: TYPE.LOGOUT,
  payload: {
    userId,
  },
});

export const action = { logIn, logOut };

// export const initialize = (userName = "", userId = "") => ({
//   userName,
//   userId,
// });

// export const initialize = {
//   userName: "",
//   userId: "",
// };
// userInfo : userIni

export const initialize = {
  user: {
    userName: "",
    userId: "",
  },
};
// ...userIni

// export const userArr = [
//   {
//     userId: "admin",
//     userPw: "1234",
//   },
// ];

// export const reducer = (state = initialize, action) => {
//   switch (action.type) {
//     case TYPE.LOGIN:
//       console.log(action.payload)
//       console.log(action.payload.userId)
//       return state;

//     case TYPE.LOGOUT:
//       return state;

//     default:
//       return state;
//   }
// };

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.LOGIN:
      console.log(payload.userId);
      return state;

    case TYPE.LOGOUT:
      return state;

    default:
      return state;
  }
};
