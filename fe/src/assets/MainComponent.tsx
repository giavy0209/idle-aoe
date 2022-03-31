import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actions, Modal, OpenModalFixed } from "components";
import storage from "helpers/storage";
import { FC, useState } from "react";
import { useSelector } from "react-redux";

const MainComponent: FC = () => {
  const [ShowModal, setShowModal] = useState(false)
  const user = useSelector((state: any) => state.user)
  const handleLogout = () => {
    storage.clearToken()
    window.location.reload()
  }
  return (
        <>
            <div id="fixed-height">
                <header>
                    <div id="exp">{user?.exp} EXP</div>
                    <div onClick={() => setShowModal(true)} className="show-info"><FontAwesomeIcon icon={faCircleQuestion} /></div>
                    <div onClick={handleLogout} className="logout">LOGOUT</div>
                </header>
                <Actions />
                <OpenModalFixed />
            </div>
            <Modal onClose={() => setShowModal(false)} show={ShowModal}>
                <div className="question">
                    <div className="title">Tutorial</div>
                    <div className="content">
                        <p>On your top screen is your resource and generate per hour</p>
                        <p>You can tap on it to upgrade and increase your generate</p>
                        <p>Next you will see your EXP. You will be ranked base on EXP you earn, </p>
                        <p>You can gain Experience from:</p>
                        <p>Buildings - they give you Experience, which equals the sum of the spent Resources on the current Building level (</p>
                        <p>Units- they give you Experience, which equals to 1/3 (one third) of the sum of the spent</p>
                        <p>Battles - the Experience gained after Battle is based on 3 time of the population of the killed Units. </p>
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
    )
}

export default MainComponent