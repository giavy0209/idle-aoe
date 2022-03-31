import { CSSProperties, useCallback, useEffect, useRef } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWindowSize from "hooks/useWindowSize";
import storage from "helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import socket from './socket'

import { asyncInit } from "store/actions/init";
import { actionChangeUser } from "store/actions/user";
import { actionChangeResources } from "store/actions/resources";
import { actionChangeBuildings } from "store/actions/building";
import { actionChangeTranningQueue, actionChangeUnits } from "store/actions/unit";
import { actionChangeActivity } from "store/actions/battle";

import { Loading, Login, Resources } from "components";
import FixedComponents from "FixedComponents";
import AbsoluteComponents from "AbsoluteComponents";
import MainComponent from "assets/MainComponent";
function App() {
  const dispatch = useDispatch()
  const refApp = useRef<any>(null)
  const user = useSelector((state: any) => state.user)
  const { width, height } = useWindowSize()
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

    const changeUser = ({ data }) => {
      dispatch(actionChangeUser(data))
    }

    socket.on('user', changeUser)

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

    const changeActivity = ({ data }) => {
      dispatch(actionChangeActivity(data))
    }
    socket.on('marching', changeActivity)

    return () => {
      socket.removeListener('user', changeUser)
      socket.removeListener('resources', changeResource)
      socket.removeListener('building', changeBuilding)
      socket.removeListener('trainning-queue', changeTrainningQueue)
      socket.removeListener('units', changeUnits)
    }
  }, [dispatch])



  return (
    <div style={{ '--window-width': width + 'px', '--window-height': height + 'px' } as CSSProperties} ref={ref => refApp.current = ref} id="App">
      <Loading />
      <ToastContainer
        position="bottom-center"
      />
      {!user && <Login />}
      {
        user &&
        <>
          <Resources />
          {/* FIXED COMPONENT */}
          <FixedComponents />
          {/* ABSOLUTE COMPONENT */}
          <AbsoluteComponents />
          
          <MainComponent />
        </>
      }
    </div>
  );
}

export default App;
