import { useCallback, useEffect, useRef, useState } from "react";
import { Building, Loading, Login, Resources, TrainningQueue, Tranning, Units, Upgrade, Upgrading, Enemy, Actions, Attack, Activities, BattleReports, BattleDetail, Activity, Modal, Queue } from "components";
import useWindowSize from "hooks/useWindowSize";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from "helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeActivity, actionChangeBuildings, actionChangeResources, actionChangeTranningQueue, actionChangeUnits, asyncInit } from "store/actions";
import socket from './socket'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
function App() {
  const dispatch = useDispatch()
  const [ShowModal, setShowModal] = useState(false)
  const refApp = useRef<any>(null)
  const user = useSelector((state: any) => state.user)
  const { height } = useWindowSize()
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

    const changeActivity = ({ data }) => {
      dispatch(actionChangeActivity(data))
    }
    socket.on('marching', changeActivity)

    return () => {
      socket.removeListener('resources', changeResource)
      socket.removeListener('building', changeBuilding)
      socket.removeListener('trainning-queue', changeTrainningQueue)
      socket.removeListener('units', changeUnits)
    }
  }, [dispatch])

  const handleLogout = () => {
    storage.clearToken()
    window.location.reload()
  }

  return (
    <div style={{ height: height + 'px' }} ref={ref => refApp.current = ref} id="App">
      <Loading />
      <ToastContainer
        position="bottom-center"
      />
      {!user && <Login />}
      {
        user &&
        <>
          <Activity />
          <Attack />
          <Resources />
          <Upgrade />
          <Tranning />
          <Enemy />
          <BattleReports />
          <BattleDetail />
          <Queue />
          <div id="fixed-height">
            <div onClick={handleLogout} className="logout">LOGOUT</div>
            <div onClick={() => setShowModal(true)} className="show-info"><FontAwesomeIcon icon={faCircleQuestion} /></div>
            <Actions />
            <Building />
            <Units />
          </div>
          <Modal onClose={() => setShowModal(false)} show={ShowModal}>
            <div className="question">
              <div className="title">Tutorial</div>
              <div className="content">
                <p>On your top screen is your resource and generate per hour</p>
                <p>You can tap on it to upgrade and increase your generate</p>
                <p>2 button bellow is send your army to soneome and check battle report. You can skip it for this time</p>
                <p>Next you will see building list. You can tap on it to upgrade and decrease trainning time</p>
                <p>I recommend you should upgrade your resource to level 5 first</p>
                <p>You only can upgrade 1 building or resource at time</p>
                <p>Next is your army</p>
                <p>Each unit have their own strength, range, life, cargo,...</p>
                <p>You will need them to attack enemy</p>
                <p>If you wanna spy enemy, you need Quickwalker</p>
                <p>You can find more information about attack and spy by tap on "Send Army" button</p>
                <p>You only can upgrade 1 unit at time</p>
                <p>I recommend traning some Shortbow first, they are cheap, fast trainning, high cargo. You can use them to steal enemy's resource</p>
                <p>But be carefull, spy enemy first, if enemy don't have any unit.</p>
                <p>Shortbow is weak, they can easily be killed</p>
                <p>After you have more resources, you should train some Quickwalker to prevent being spied by another player</p>
                <p>If you going around, you will see Light Cavalry have high speed and high cargo, perfect to steal another player</p>
                <p>What next? build your army and invade another player.</p>
                <p>Goodluck</p>
              </div>
            </div>
          </Modal>
        </>
      }
    </div>
  );
}

export default App;
