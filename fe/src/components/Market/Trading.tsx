import { FC, useCallback, useMemo, useState } from "react";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import wood from 'assets/images/wood.webp'
import food from 'assets/images/food.webp'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "components/Button";
import callAPI from "callAPI";
import { actionChangeShowMarketOffer, asyncGetMarketOffer } from "store/actions/market";
const _resources: {
    name: string,
    img: any,
}[] = [
        {
            name: 'Gold',
            img: goldore,
        },
        {
            name: 'Iron',
            img: ironore,
        },
        {
            name: 'Wood',
            img: wood
        },
        {
            name: 'Food',
            img: food
        }
    ]

interface IData {
    offer: {
        gold?: number,
        iron?: number,
        wood?: number,
        food?: number
    },
    receive: {
        gold?: number,
        iron?: number,
        wood?: number,
        food?: number
    },
}
const Trading: FC = () => {
    const dispatch = useDispatch()
    const stateResources = useSelector((state: any) => state.resources)
    const market = useSelector((state: any) => state.buildings?.find(o => o.building.name === 'Market'))
    const marchingsMarket = useSelector((state: any) => state.activity?.filter(o => (o.type === 3 || o.type === 4)))
    const marketOffers = useSelector((state: any) => state.marketOffer)

    const [Data, setData] = useState<IData>({ offer: {}, receive: {} })

    const { isEqual, cargoUsed, totalOffer, totalReceive } = useMemo(() => {
        const offer = Data.offer
        const receive = Data.receive
        let totalOffer = 0
        let totalReceive = 0

        for (const key in offer) {
            if (Object.prototype.hasOwnProperty.call(offer, key)) {
                const value = offer[key];
                totalOffer += value
            }
        }

        for (const key in receive) {
            if (Object.prototype.hasOwnProperty.call(receive, key)) {
                const value = receive[key];
                totalReceive += value
            }
        }

        return {
            isEqual: totalOffer === totalReceive,
            cargoUsed: totalOffer,
            totalOffer,
            totalReceive
        }
    }, [Data])

    const marketCargo = useMemo(() => {
        if (!market || !marchingsMarket || !marketOffers) return 0
        let cargo = market.value
        marchingsMarket.forEach(o => {
            Object.entries(o.cargo).forEach((_cargo: [string, any]) => cargo -= _cargo[1])
        })
        marketOffers.forEach(o => {
            Object.entries(o.offer).forEach((_offer: [string, any]) => cargo -= _offer[1])
        })
        return cargo
    }, [market, marchingsMarket, marketOffers])

    const resources: any[] = useMemo(() => {
        if (!stateResources) return []
        return _resources.map(o => {
            let findResource = stateResources.find(_state => _state.type.name === o.name)

            return {
                ...findResource,
                name: o.name,
                img: o.img,
            }
        })
    }, [stateResources])

    const validInput = (e, max, data, type) => {
        let value = Number(e.target.value)
        if (!value && value !== 0) value = 1
        if (value > max) value = Math.floor(max)
        e.target.value = value
        const _data = Data[type]
        const resourceName = data.type.name.toLowerCase()
        if (value > 0) {
            if (_data[resourceName]) {
                _data[resourceName] = value
                setData({
                    ...Data,
                })
            } else {
                _data[resourceName] = value
                setData({
                    ...Data,
                })
            }
        }
        if (value === 0) {
            delete _data[resourceName]
            setData({
                ...Data,
            })
        }
    }

    const reset = useCallback(() => {
        document.querySelectorAll<HTMLInputElement>('.trading input')
        .forEach((el) => {
            el.value = '0'
        })
        setData({offer : {} , receive : {}})
    },[])

    const handleTrade = useCallback(async () => {
        if (isEqual) {
            const res = await callAPI.post('/market', Data)
            if (res.status === 1) {
                toast('Make offer successfully')
                reset()
            }
            if (res.status === 101) {
                toast('You are leak of cargo')
            }
            if (res.status === 102) {
                toast('You are not join any clan')
            }
        } else {
            toast('You have to trade 1:1')
        }
    }, [isEqual, Data,reset])

    return (
        <>
            <div className="trading">
                <Button text="Your offer" onClick={() => dispatch(actionChangeShowMarketOffer(true))} />
                <div className="create-offer">
                    <div className="offer">
                        <div className="title">Offer</div>
                        {
                            resources.map(o => <div key={'offer' + o.name} className="row">
                                <div className="img">
                                    <img src={o.img} alt="" />
                                </div>
                                <div className="input">
                                    <input onChange={e => validInput(e, o.value, o, 'offer')} type="number" />
                                </div>
                            </div>)
                        }
                        <div className="total">Total : {totalOffer}</div>
                    </div>
                    <div className="receive">
                        <div className="title">Receive</div>
                        {
                            resources.map(o => <div key={'offer' + o.name} className="row">
                                <div className="img">
                                    <img src={o.img} alt="" />
                                </div>
                                <div className="input">
                                    <input onChange={e => validInput(e, 99999, o, 'receive')} type="number" />
                                </div>
                            </div>)
                        }
                        <div className="total">Total : {totalReceive}</div>
                    </div>
                </div>
                <div className="cargo">Cargo : {cargoUsed}/{marketCargo}</div>
                <Button text="Trade" onClick={handleTrade} />
            </div>
        </>
    )
}

export default Trading