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
    (async () => {
      const { CA } = (await axios.post("http://localhost:8080/api/ca")).data;
      web3.eth.subscribe("logs", { address: CA }).on("data", (log) => {
        const params = [{ type: "int256", name: "count" }];
        const value = web3.eth.abi.decodeLog(params, log.data);
        setCount(value.count);
      });
    })();
  }, []);

  const increment = async () => {
    const data = (
      await axios.post("http://localhost:8080/api/increment", { from: account })
    ).data;
    await web3.eth.sendTransaction(data);
  };

  const decrement = async () => {
    const data = (
      await axios.post("http://localhost:8080/api/decrement", { from: account })
    ).data;
    await web3.eth.sendTransaction(data);
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
