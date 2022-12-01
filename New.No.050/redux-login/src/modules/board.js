const TYPE = {
  ADD: "board/add",
  REMOVE: "board/remove",
  EDIT: "board/edit",
};
// 일거리들을 만들어 놨으니 해당 일거리에 대한 주문서(action)을 만들자

const add = (title, text, userName) => ({
  type: TYPE.ADD,
  payload: {
    title,
    text,
    userName,
  },
});

const remove = (id) => ({
  type: TYPE.REMOVE,
  payload: { id },
});

const edit = (id, title, text) => ({
  type: TYPE.EDIT,
  payload: { id, title, text },
});

export const action = { add, remove, edit };

export const initialize = [];

let id = 0;
export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.ADD:
      // title, text, userName
      const { title, text, userName } = payload;
      id++;
      return [
        { id, title, text, userName, createdAt: new Date().toLocaleString() },
        // { ...payload, createdAt: new Date().toLocaleString() },
        // id가 있는 이유 : 수정 삭제 때문에
        ...state,
        // state가 아래에 있는 이유 : 최신 입력된 값을 위로 올리기 위해서
      ];
    // const tempArr = [...state];
    // tempArr.unshift({
    //   id,
    //   title,
    //   text,
    //   userName,
    //   createdAt: new Date().toLocaleString(),
    // });
    // return tempArr;

    case TYPE.REMOVE:
      return state;

    case TYPE.EDIT:
      return state;

    default:
      return state;
  }
};
