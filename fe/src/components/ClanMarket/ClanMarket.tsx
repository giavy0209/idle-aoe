import Modal from "components/Modal";
import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeClanMarket, actionChangeShowMarketOffer } from "store/actions/market";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import wood from 'assets/images/wood.webp'
import food from 'assets/images/food.webp'
import Button from "components/Button";
import convertDateAgo from "helpers/convertDateAgo";
import callAPI from "callAPI";

const _resources: {
    gold: string,
    iron: string,
    wood: string,
    food: string
} = {
    gold: goldore,
    iron: ironore,
    wood: wood,
    food: food
}


const ClanMarket: FC = () => {
    const dispatch = useDispatch()
    const clanMarket = useSelector((state: any) => state.clanMarket)

    const acceptOffer = async id => {
        const res = await callAPI.put(`/market/clan/${id}` , {})
    }
    return (
        <>
            <Modal show={clanMarket} onClose={() => dispatch(actionChangeClanMarket(null))} >

                {clanMarket && <div className="market-offer">
                    <div className="title">Clan Market</div>
                    <div className="head">
                        <div>Offer</div>
                        <div>Receive</div>
                        <div>From</div>
                    </div>
                    <div className="offers">
                        {
                            clanMarket.map(o => <div className="offer">
                                <div>
                                    {
                                        Object.entries(o.offer).map((_offer : [string,any]) => <div key={_offer[0] + 'offer' + o._id} className="list-resource">
                                            <div className="img">
                                                <img src={_resources[_offer[0]]} alt="" />
                                            </div>
                                            <div className="value">{_offer[1]}</div>
                                        </div> )
                                    }
                                </div>
                                <div>
                                    {
                                        Object.entries(o.receive).map((_receive : [string,any]) => <div key={_receive[0] + 'receive' + o._id} className="list-resource">
                                            <div className="img">
                                                <img src={_resources[_receive[0]]} alt="" />
                                            </div>
                                            <div className="value">{_receive[1]}</div>
                                        </div> )
                                    }
                                </div>
                                <div className="time">{o.user.username}</div>
                                <Button text="Trade" onClick={()=>acceptOffer(o._id)} />
                            </div>)
                        }
                    </div>
                </div>}
            </Modal>
        </>
    )
}

export default ClanMarket