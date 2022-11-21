import "./App.css";
import Additional from "./components/Additional";
import ClassComp from "./components/ClassComp";
import FuncComp from "./components/FuncComp";

function App() {
  return (
    <div className="App">
      <ClassComp
        text={"testing ClassComp"}
        func={() => {
          console.log("testing ClassCom");
        }}
      />
      <FuncComp
        text={"testing FuncComp"}
        func={() => {
          console.log("testing FuncComp");
        }}
      />
      <Additional />
    </div>
  );
}

export default App;
