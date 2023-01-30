// npm i elliptic
//   - 타원 곡선 알고리즘 사용하는 암호화 라이브러리
// npm i -D @types/elliptic
//   - typescript 사용하니까 타입도 불러오자
import cryptoJS from "crypto-js";
import elliptic from "elliptic";

const privateKey: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();

const ec: elliptic.ec = new elliptic.ec("secp256k1");
// 타원 곡선을 생성한다.
// ec에 전달하는 매개변수 "secp256k1"은 elliptic에서 제공하는 사전 설정 중 하나이다.
//   - 사전 설정으로는 secp256k1, p192, p224 등등이 있다.
//   - 그럼 왜 secp256k1 설정을 사용하는가? => 비트코인과 이더리움에서 사용하는 설정이다. => y^2 = x^3 + 7, G = "02 ......"

const keyPair: elliptic.ec.KeyPair = ec.keyFromPrivate(privateKey);
// 개인키를 사용해서 키페어를 생성한다.
//   - 즉 공개키를 생성한다.

const publicKey = keyPair.getPublic().encode("hex", true);
// 생성된 키페어에서 공개키를 가져온다.
console.log("privateKey :", privateKey);
console.log("privateKey.length :", privateKey.length);
console.log("publicKey :", publicKey);
console.log("publicKey.length :", publicKey.length);
// 타원곡선에서 공개키는 찾은 점의 좌표이다. => x, y 두 수로 이루어져 있다.
// 공개키는 문자열로 나타낼 시 "x" + "y" = `${x}${y}` << 두 좌표를 문자로써 연결한 문자열(string)이다.
// x, y는 256 bits의 크기를 가진다. => 공개키는 512 bits의 크기를 가진다. => 128자가 나와야한다.(64자 * 2)
// 128자는 너무 길어서 압축을 하게 된다. => x의 값은 그대로 가져오고 y의 값은 짝수일 때는 "02", 홀수일 때는 "03"을 사용하게 된다. => 02XXXXXXXX || 03XXXXXXX가 나오게 된다.
//   => 0213484850ea2ab8e51500ff09d9802ac7ddf328e119847d60c2617162a686e381 => 02 / 13484850ea2ab8e51500ff09d9802ac7ddf328e119847d60c2617162a686e381 => y는 짝수고 x는 13484850ea2ab8e51500ff09d9802ac7ddf328e119847d60c2617162a686e381
// 타원 곡선 알고리즘을 사용해서 공개키를 구했을 때
// => x, y 좌표가 공개키로 정의된다.
// => x, y를 모두 표기하면 128자(512 bits)의 길이를 갖게된다.
// => 너무 길어서 64자로 줄인다.(x만 사용한다.)
// => y를 버릴 수가 없어서 홀수와 짝수로 나누어 간단하게 추가한다.(짝수 : 02, 홀수 : 03) y에 대한 값은 앞에 붙인다.
// => 02XXXXXXX || 03XXXXXX
// => 0213484850ea2ab8e51500ff09d9802ac7ddf328e119847d60c2617162a686e381

// y가 짝수일 때 02를 앞에 추가하고 홀수일 때 03을 앞에 추가한다. => x + y를 모두 사용할 때 128자일까? => 앞에 04를 붙인다. 즉 130자가 된다.(520 bits / 65 bytes)
// 0413484850ea2ab8e51500ff09d9802ac7ddf328e119847d60c2617162a686e38113484850ea2ab8e51500ff09d9802ac7ddf328e119847d60c2617162a686e381
