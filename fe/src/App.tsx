import { useCallback, useEffect, useRef } from "react";
import { Login, Resources, Upgrade } from "components";
import useWindowSize from "hooks/useWindowSize";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from "helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { asyncInit } from "store/actions";
function App() {
  const dispatch = useDispatch()
  const refApp= useRef<any>(null)
  const size = useWindowSize()
  const user = useSelector((state : any) => state.user )
  useEffect(() => {
    const windowWidth = size.width
    const windowHeight = size.height
    let width : number, height : number;
    if(windowWidth > windowHeight * 9 / 16) {
      width = windowHeight * 9 / 16;
      height = windowHeight
    }else {
      width = windowWidth
      height = windowWidth * 16 / 9
    }
    refApp.current.style.width = width + 'px'
    refApp.current.style.height = height + 'px'
  },[size])

  const handleInit = useCallback(() => {
    const jwt = storage.getToken()
    if(jwt) {
      dispatch(asyncInit())
    }
  },[dispatch])

  useEffect(() => {
    handleInit()
  },[handleInit])
  return (
    <div ref={ref => refApp.current = ref} id="App">
      <ToastContainer />
      {!user && <Login />}
      {
        user && 
        <>
        <Resources />
        <Upgrade />
        </>
      }
    </div>
  );
}

export default App;
