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
    return (
        <>
            <Modal show={showMarket} onClose={()=> dispatch(actionChangeShowMarket(false)) } >
                <div className="market">
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
        </>
    )
}

export default Market