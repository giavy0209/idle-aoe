import { FC, useMemo, useState } from "react";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import wood from 'assets/images/wood.webp'
import food from 'assets/images/food.webp'
import { useSelector } from "react-redux";
import Button from "components/Button";
import callAPI from "callAPI";
import { toast } from "react-toastify";
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
        _id : string,
        value : number
    }
const Caravan :FC = () => {
    const stateResources = useSelector((state : any) => state.resources)
    const market = useSelector((state: any) => state.buildings?.find(o => o.building.name === 'Market'))
    const marchingsMarket = useSelector((state: any) => state.activity?.filter(o => (o.type === 3 || o.type === 4)))
    const marketOffers = useSelector((state: any) => state.marketOffer)

    const [Data, setData] = useState<IData[]>([])
    const [Speed, setSpeed] = useState(10)

    const marketCargo = useMemo(() => {

        let cargo = market.value

        marchingsMarket.forEach(o => {
            Object.entries(o.cargo).forEach((_cargo: [string, any]) => cargo -= _cargo[1])
        })
        marketOffers.forEach(o => {
            Object.entries(o.offer).forEach((_offer: [string, any]) => cargo -= _offer[1])
        })

        return cargo
    }, [marchingsMarket,marketOffers])

    const cargoUsed = useMemo(() => {
        if(!Data.length) return 0
        return Data.reduce((prev, current) => {
            return {_id : '', value : prev.value + current.value}
        }).value
    },[Data])

    const resources = useMemo(() => {
        if(!stateResources) return []
        return _resources.map(o => {
            let findResource = stateResources.find(_state => _state.type.name === o.name)

            return {
                ...findResource,
                name: o.name,
                img: o.img,
            }
        })
    },[stateResources])

    const validInput = (e, max, data) => {
        let value = Number(e.target.value)
        if (!value && value !== 0) value = 1
        if (value > max) value = Math.floor(max)
        e.target.value = value
        
        
        if (value > 0) {
            const findData = Data.find(o => o._id === data._id)
            if(findData) {
                findData.value = value
            }else {
                Data.push({
                    _id : data._id,
                    value
                })
            }
            setData([...Data])
        }
        if (value === 0) {
            const findData = Data.findIndex(o => o._id === data._id)
            if(findData !== -1) {
                Data.splice(findData, 1)
                setData([...Data])
            }
        }
    }

    const validSpeed = (e, min , max) => {
        let value = Number(e.target.value)
        if (!value && value !== 0) value = min
        if (value <min) value = min
        if (value > max) value = Math.floor(max)
        setSpeed(value)
        console.log(value);
        
    }

    const handleSendCaravan = async () => {
        if(cargoUsed > marketCargo) {
            return toast('Not enough cargo')
        }
        const res = await callAPI.post('/market/caravan' , {data : Data , speed : Speed})
        if(res.status === 1) {
            toast('Send Caravan successfully')
        }
        return
    }
    
    return (
        <>
            <div className="caravan">
                {
                    resources.map( o => <div key={o.name} className="select-resource">
                        <div className="img">
                            <img src={o.img} alt="" />
                        </div>
                        <div className="input">
                            <input onChange={e => validInput(e , o.value , o)} type="number" />
                        </div>
                    </div> )
                }
                <div className="input">
                    <div className="label">Moving speed(10 - 600) 1speed = 1 minute</div>
                    <input value={Speed} onChange={e => validSpeed(e , 10 , 600)} type="number" placeholder="Moving speed(10 - 600)"/>
                </div>
                <div className="cargo">{cargoUsed} / {marketCargo}</div>
                <Button text="Send Caravan" onClick={handleSendCaravan} />
            </div>
        </>
    )
}

export default Caravan