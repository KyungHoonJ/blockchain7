import "./App.css";
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
    </div>
  );
}

export default App;
