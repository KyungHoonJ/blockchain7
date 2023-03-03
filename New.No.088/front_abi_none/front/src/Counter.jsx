import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);

  const getCount = useCallback(async () => {
    const _count = (await axios.post("http://localhost:8080/api/count")).data
      .count;
    setCount(_count);
  }, []);

  useEffect(() => {
    getCount();
  }, []);

  const increment = async () => {
    const data = (
      await axios.post("http://localhost:8080/api/increment", { from: account })
    ).data;
    await web3.eth.sendTransaction(data);
    getCount();
  };

  const decrement = async () => {
    const data = (
      await axios.post("http://localhost:8080/api/decrement", { from: account })
    ).data;
    await web3.eth.sendTransaction(data);
    getCount();
  };

  return (
    <div>
      <h2>Count : {count}</h2>
      <button
        onClick={() => {
          increment();
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          decrement();
        }}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
