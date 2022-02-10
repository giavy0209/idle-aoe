import { Resources } from "components";
import { useEffect, useRef } from "react";

function App() {
  const refApp : {current : any} = useRef(null)
  
  return (
    <div ref={ref => refApp.current = ref} id="App">
      <Resources />
    </div>
  );
}

export default App;
