import { useState } from "react";

const Count1Comp = ({ count1 = 0, plus, minus, input }) => {
  const [inputNum, setInputNum] = useState(0);
  return (
    <div>
      <div>{count1}</div>
      <div>
        <button
          onClick={() => {
            plus();
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            minus();
          }}
        >
          -
        </button>
        <div>
          <input
            type={"number"}
            value={inputNum}
            onInput={(e) => {
              setInputNum(+e.target.value);
            }}
            placeholder={"count1 input"}
          />
          <button
            onClick={() => {
              input(inputNum);
            }}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Count1Comp;
