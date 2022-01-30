import callAPI from "callAPI";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    callAPI.get('/')
    .then(res => {

    })
  },[])
  return (
    <div className="App">
    </div>
  );
}

export default App;
