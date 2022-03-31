import Modal from "components/Modal";
import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeShowMarketOffer } from "store/actions/market";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import wood from 'assets/images/wood.webp'
import food from 'assets/images/food.webp'
import Button from "components/Button";
import convertDateAgo from "helpers/convertDateAgo";

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


const MarketOffer: FC = () => {
    const dispatch = useDispatch()
    const marketOffer = useSelector((state: any) => state.marketOffer)
    const showMarketOffer = useSelector((state: any) => state.showMarketOffer)

    return (
        <>
            <Modal show={showMarketOffer} onClose={() => dispatch(actionChangeShowMarketOffer(false))} >

                {marketOffer && <div className="market-offer">
                    <div className="title">Your offer</div>
                    <div className="head">
                        <div>Offer</div>
                        <div>Receive</div>
                        <div>Time left</div>
                    </div>
                    <div className="offers">
                        {
                            marketOffer.map(o => <div className="offer">
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
                                <div className="time">{convertDateAgo(o.endAt)}</div>
                            </div>)
                        }
                    </div>
                </div>}
            </Modal>
        </>
    )
}

export default MarketOffer