import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const newBoard = async (boardData) => {
  return (await request.post("/board/new", boardData)).data;
};

export const board = async (options) => {
  return (await request.post("/board", options)).data;
};

export const signIn = async (registData) => {
  return (await request.post("/user/regist", registData)).data;
};

export const logIn = async (logInData) => {
  return (await request.post("/user/login", logInData)).data;
};
