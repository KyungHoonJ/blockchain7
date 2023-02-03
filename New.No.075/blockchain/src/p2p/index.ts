// npm i ws express
// npm i -D @types/ws @types/express

import { WebSocket, WebSocketServer } from "ws";
import Chain from "@core/chain";

// const TYPE = {
//   BLOCK: 1,
//   CHAIN: 2,
// };

// TYPE.BLOCK

export enum MessageType {
  // enum : 배열과 비슷한 순서가 있는 데이터이다.
  //   - 열거형 이라고 한다.
  //   - 위의 코드와 같은 역할을 한다.
  //   - 변수에 정의할 값을 미리 정의했다고 생각하자.
  // MessageType << 왜 정의했느냐? << 어떤 메세지를 주고 받았는지 확인하기 위해서 타입으로 설정했다.
  lastBlock = 0,
  // 마지막 블록을 달라고 하고 준다.
  allBlock = 1,
  // 전체 체인 달라고 하고 준다.
  addBlock = 2,
  // 블록이 추가됐다고 알려주고 뭐가 추가됐는지 알려준다.
  addTx = 3,
  // 트랜잭션 추가됐다.(보내준 거 추가해라~)
}
// 오타 같은 오류를 줄이기 위해서 사용한다.

export interface IMessage {
  // 주고 받을 메세지에 대한 타입
  type: MessageType;
  // 어떤 메세지를 주고 받았는지 확인
  payload: any;
  // 메세지에 담긴 데이터
  msg: string;
}

class P2P extends Chain {
  // Chain을 상속받는 이유 : 현재 P2P 서버에 기존의 체인을 상속함으로써 블록 추가 등에 있어서 편함
  private sockets: Array<WebSocket>; // 연결된 peer의 목록

  constructor() {
    super();
    this.sockets = [];
  }

  get getSockets(): Array<WebSocket> {
    return [...this.sockets];
  }

  connectSocket(socket: WebSocket, type?: MessageType): void {
    if (global.debug) console.log("connectSocket");
    // 소켓을 연결한다.
    this.sockets.push(socket);
    // 연결된 소켓을 소켓 목록에 추가한다.(peer 목록에 추가)
    //   - 후에 어디랑 연결됐는지 확인할 때 등 사용한다.
    socket.on("message", (_data: string) => {
      // message 이벤트가 발생하면 로그로 남긴다.
      // if(global.debug)console.log(_data.toString());
      if (global.debug) console.log("message");

      const data: IMessage = JSON.parse(_data.toString());
      // 받은 메세지를 객체로 파싱
      if (global.debug) console.log(data);

      switch (data.type) {
        // 어떤 요청이 왔는가 type으로 확인해서
        case MessageType.lastBlock: {
          // 마지막 블록 달라고 했으니까.
          const message: IMessage = {
            type: MessageType.allBlock,
            payload: [this.lastBlock],
            // 마지막 블록을 payload에 담아서
            msg: "lastBlock 정경훈이 보냈다.",
          };
          socket.send(JSON.stringify(message));
          // 보내자.
          break;
        }
        case MessageType.allBlock: {
          if (global.debug)
            console.log("7-31 다른 피어가 블록을 추가했다고 알려옴");
          if (global.debug) console.log("7-32 새로운 블록을 구조분해할당");
          const [newBlock]: [IBlock] = data.payload;
          if (global.debug) console.log("7-33 새 블록을 내 블록에 추가 시도");
          const isValid: IBlock | null = this.add2Chain(newBlock);
          if (global.debug)
            console.log("7-42 블록이 정상적으로 추가되었는지 확인");
          if (isValid !== null) break;
          // isValid가 null이 아니다 => 체인에 블록이 정상적으로 추가됐다.

          // 체인에 블록이 정상적으로 추가되지 않았을 때 전체 체인을 보내서 확인해보자.
          if (global.debug)
            console.log(
              "7-43 정상 추가되지 않았다면 다른 피어에게 내 체인을 보내준다."
            );
          const message: IMessage = {
            type: MessageType.addBlock,
            payload: this.getChain,
            msg: "allBlock 정경훈이 보냈다.",
          };

          socket.send(JSON.stringify(message));

          break;
        }
        case MessageType.addBlock: {
          if (global.debug)
            console.log("7-44 다른 피어가 보내온 체인이 정상인지 확인");
          const isValidChain = this.isValidChain(data.payload);
          if (isValidChain.isError === true) {
            if (global.debug) console.log(isValidChain.msg);
            break;
          }

          if (global.debug)
            console.log("7-45 정상적인 체인이라면 내 체인과 교체 시도");
          const isValid = this.replaceChain(data.payload);
          if (isValid.isError === true) {
            if (global.debug) console.log(isValid.msg);
            break;
          }

          console.log(
            "7-50 내 체인이 정상적으로 바뀌었다면 다른 피어들에게도 알린다."
          );
          // 나랑 연결된 피어들에게 내가 데이터 바뀌었음을 알린다.
          const message: IMessage = {
            type: MessageType.addBlock,
            payload: data.payload,
            msg: "addBlock 정경훈이 보냈다.",
          };

          this.broadcast(message);

          break;
        }
        case MessageType.addTx: {
          if (global.debug) console.log("8-30 트랜잭션 배포 받음");
          const receivedTx = data.payload;
          if (
            !receivedTx ||
            this.getTxPool.find((item) => item.hash === receivedTx.hash)
          )
            break;

          if (global.debug) console.log("8-31 새 트랜잭션 추가");
          this.addTxPool(receivedTx);

          if (global.debug) console.log("8-32 새 트랜잭션 배포");
          const message: IMessage = {
            type: MessageType.addTx,
            payload: receivedTx,
            msg: "",
          };
          this.broadcast(message);

          break;
        }
      }
    });

    const message: IMessage = {
      // 처음 연결 시 요청을 보내자, 마지막 블럭 주세요
      type: type | MessageType.lastBlock,
      payload: type ? this.getChain : [],
      msg: "처음 정경훈이 보냈다.",
    };

    socket.send(JSON.stringify(message));
    // 방금 연결한 소켓 서버에 message 이벤트를 보낸다.
  }

  listen(port: number): void {
    // 현재 로컬에서 서버를 생성, 배포한다.
    const server: WebSocketServer = new WebSocket.Server({ port });
    // 서버를 생성한다.
    // 가나슈(Ganache) 라는 개인(로컬)용 블록체인이 있다. << 네트워크 없이 진행 가능하다.
    // 이 가나슈의 초기 port 설정이 7545이다.

    server.on("connection", (socket: WebSocket) => {
      // 서버에 연결이 들어왔을 때
      if (global.debug) console.log("socket start");
      this.connectSocket(socket);
      // socket을 추가한다.
    });
  }

  addToPeer(peer: string): void {
    if (global.debug) console.log("addToPeer");
    if (global.debug) console.log("peer :", peer);
    // 소켓을 생성하고 연결한다.
    const socket: WebSocket = new WebSocket(peer);
    // 상대 소켓 서버 주소를 받아서 연결을 시도한다.
    socket.on("open", () => {
      // 연결 성공 시 open 이벤트가 발생한다.
      if (global.debug) console.log("open");
      this.connectSocket(socket, MessageType.addBlock);
      // 연결에 성공하면 소켓을 추가한다.
    });
  }

  broadcast(message: IMessage) {
    if (global.debug) console.log("8-29 새 트랜잭션 배포");
    this.sockets.forEach((item) => {
      item.send(JSON.stringify(message));
    });
  }
}

export default P2P;
