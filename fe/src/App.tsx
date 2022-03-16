import { useCallback, useEffect, useRef } from "react";
import { Loading, Login, Resources, Upgrade } from "components";
import useWindowSize from "hooks/useWindowSize";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from "helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBuildings, actionChangeResources, asyncInit } from "store/actions";
import socket from './socket'
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

  useEffect(() => {
    socket.on('connect', () => console.log('connected ws'))
    const changeResource = ({data}) => {
      dispatch(actionChangeResources(data))
    }
    socket.on('resources' ,changeResource )

    const changeBuilding = ({data}) => {
      dispatch(actionChangeBuildings(data))
    }
    socket.on('building' ,changeBuilding )

    return () => {
      socket.removeListener('resources' , changeResource)
      socket.removeListener('building' , actionChangeBuildings)
    }
  },[dispatch])
  return (
    <div ref={ref => refApp.current = ref} id="App">
      <Loading />
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
