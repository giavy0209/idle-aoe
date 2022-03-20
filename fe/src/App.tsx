import { useCallback, useEffect, useRef } from "react";
import { Building, Loading, Login, Resources, TrainningQueue, Tranning, Units, Upgrade, Upgrading } from "components";
import useWindowSize from "hooks/useWindowSize";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from "helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBuildings, actionChangeResources, actionChangeTranningQueue, actionChangeUnits, asyncInit } from "store/actions";
import socket from './socket'
import Actions from "components/Actions";
function App() {
  const dispatch = useDispatch()
  const refApp = useRef<any>(null)
  const size = useWindowSize()
  const user = useSelector((state: any) => state.user)
  useEffect(() => {
    const windowWidth = size.width
    const windowHeight = size.height
    let width: number, height: number;
    if (windowWidth > windowHeight * 9 / 16) {
      width = windowHeight * 9 / 16;
      height = windowHeight
    } else {
      width = windowWidth
      height = windowWidth * 16 / 9
    }
    refApp.current.style.width = width + 'px'
    refApp.current.style.height = height + 'px'
  }, [size])

  const handleInit = useCallback(() => {
    const jwt = storage.getToken()
    if (jwt) {
      dispatch(asyncInit())
    }
  }, [dispatch])

  useEffect(() => {
    handleInit()
  }, [handleInit])

  useEffect(() => {
    socket.on('connect', () => console.log('connected ws'))
    const changeResource = ({ data }) => {
      dispatch(actionChangeResources(data))
    }
    socket.on('resources', changeResource)

    const changeBuilding = ({ data }) => {
      dispatch(actionChangeBuildings(data))
    }
    socket.on('building', changeBuilding)

    const changeTrainningQueue = ({ data }) => {
      dispatch(actionChangeTranningQueue(data))
    }
    socket.on('trainning-queue', changeTrainningQueue)

    const changeUnits = ({ data }) => {
      dispatch(actionChangeUnits(data))
    }
    socket.on('units', changeUnits)

    return () => {
      socket.removeListener('resources', changeResource)
      socket.removeListener('building', changeBuilding)
      socket.removeListener('trainning-queue', changeTrainningQueue)
      socket.removeListener('units', changeUnits)
    }
  }, [dispatch])

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
          <Tranning />
          <div id="fixed-height">
            <Actions />
            <Upgrading />
            <Building />
            <TrainningQueue />
            <Units />
          </div>
        </>
      }
    </div>
  );
}

export default App;
