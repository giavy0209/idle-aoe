import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "components/Modal";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeShowMarket } from "store/actions/state";
import Caravan from "./Caravan";
import Trading from "./Trading";

const tabs = [
    {
        name : 'Trading',
        component : <Trading />,
    },
    {
        name : 'Caravan',
        component : <Caravan />,
    }
]

const Market: FC = () => {
    const dispatch = useDispatch()
    const showMarket = useSelector((state : any) => state.showMarket)
    const [CurrentTab, setCurrentTab] = useState(0)
    const [ShowModal, setShowModal] = useState(false)
    return (
        <>
            <Modal show={showMarket} onClose={()=> dispatch(actionChangeShowMarket(false)) } >
                <div className="market">
                    <div onClick={() => setShowModal(true)} className="show-info"><FontAwesomeIcon icon={faCircleQuestion} /></div>
                    <div className="title">Market</div>
                    <div className="tabs">
                        {
                            tabs.map((o,index) =>  <div key={o.name} onClick={()=>setCurrentTab(index)} className={`tab title highlight ${CurrentTab === index ? 'active' : ''}`}>{o.name}</div>)
                        }
                    </div>
                    <div className="tab-content">
                        {
                            tabs[CurrentTab].component
                        }
                    </div>
                </div>
            </Modal>
            <Modal onClose={() => setShowModal(false)} show={ShowModal}>
                <div className="question">
                    <div className="title">Trade</div>
                    <div className="content">
                        <p>You can trade resources with your Clan</p>
                        <p>You can offer your redundant resource and require other resource you need</p>
                        <p>You have to offer with ratio 1:1</p>
                        <p>You can upgrade market to increase cargo.</p>
                    </div>
                    <div className="title">Caravan</div>
                    <div className="content">
                        <p>You can use your trader to bring your resource out of castle to prevent steal</p>
                        <p>You can set how long will they go, each speed equal 1 minute</p>
                        <p>You should send all resource before you are offline</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Market