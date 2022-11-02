const socket = require("socket.io");

module.exports = (server) => {
  const io = socket(server);

  // namespace << 라우터
  // 진짜 라우터와 같은 역활을 한다.
  // 소켓에 있어서 제일 큰 분류이다.
  // axios.post('/api/board') => app.post('/api/board')
  // socket('/room') => io.on('/room')
  // socket('/chat') => io.on('/chat')
  // socket('/user') => io.on('/user')
  // 단점 : 연결이 따로 되는 것이기 때문에 ws 자체가 다르다.

  // room << 방
  // 이름 그대로 방이다.
  // namespace의 하위에 속한다.
  // io.on 이후에 사용된다. => ws를 마음껏 사용할 수 있다?

  // on << 이벤트
  // io.on / ws.on << 이 메서드들은 어떤 메서드일까? 어떤 상황일 때 실행되는 코드 << 콜백함수, addEventListener 같은 역활이다.
  //   여러개 넣으면 여러번 실행된다. onclick = function과 addEventListener('click', function)과 비교하면서 테스트 해보고 addEventListener와 on은 같은 기능을 한다.

  io.on("connection", (ws) => {
    ws.on("login", (data) => {
      ws.userId = data.id;
      ws.emit("login", { id: ws.userId });
    });

    ws.on("logout", () => {
      if (ws.room) {
        ws.leave(ws.room);
        ws.emit("roomInfo", {});
        ws.broadcast.to(ws.room).emit("logoutInfo", { id: ws.userId });
        ws.room = undefined;
      }
      ws.emit("logout");
      ws.userId = undefined;
    });

    ws.on("chat", (data) => {
      if (!ws.userId) {
        ws.emit("chat", { text: "거수자는 이름을 밝혀라!" });
      } else if (!ws.room) {
        ws.emit("chat", { text: "혼자 떠들래? 방에 들어가라~" });
      } else {
        io.to(ws.room).emit("chat", { id: ws.userId, text: data.text });
      }
    });

    ws.on("room", (data) => {
      if (ws.userId) {
        if (ws.room) {
          ws.leave(ws.room);
          // 방에서 나간다.
          ws.emit("roomInfo", {});
          ws.broadcast.to(ws.room).emit("logoutInfo", { id: ws.userId });
        }
        ws.room = data.room;
        ws.join(ws.room);
        // 방에 들어간다.
        ws.emit("roomInfo", { room: ws.room });
        // io.to(ws.room).emit("loginInfo", { id: ws.userId });
        ws.broadcast.to(ws.room).emit("loginInfo", { id: ws.userId });
        // to()는 어떤 방에 메세지를 보낸다.
        // broadcast => 나를 제외한 나머지 모든 접속자에게
        // to => 어떤 방에 속한 사람들에게
      } else {
        ws.emit("chat", { text: "방에 입장하세요." });
      }
    });
  });
};
