import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import barrack from 'assets/images/barrack.webp'
import archer from 'assets/images/archer.webp'
import stable from 'assets/images/stable.webp'
import workshop from 'assets/images/workshop.webp'
import market from 'assets/images/market.webp'
import shelter from 'assets/images/shelter.webp'
import tower from 'assets/images/tower.webp'
import order from 'assets/images/order.webp'
import ModalFixed from "components/ModalFixed";
import { actionChangeBuildingType, actionChangeShowMarket, actionChangeShowTower, actionChangeUnitType } from "store/actions/state";
import { asyncGetUpgrade } from "store/actions/building";
const _buildings = [
    {
        name: "Barracks",
        img: barrack,
        generateText: 'Reduce trainning time',
        type : 'army',
        unit : '%',
        dispatchAction : () => actionChangeUnitType('infantry')
    },
    {
        name: "Archery Range",
        img: archer,
        generateText: 'Reduce trainning time',
        type : 'army',
        unit : '%',
        dispatchAction : () => actionChangeUnitType('archer')
    },
    {
        name: "Stables",
        img: stable,
        generateText: 'Reduce trainning time',
        type : 'army',
        unit : '%',
        dispatchAction : () => actionChangeUnitType('cavalry')
    },
    {
        name: "Workshop",
        img: workshop,
        generateText: 'Reduce trainning time',
        type : 'army',
        unit : '%',
        dispatchAction : () => actionChangeUnitType('siege')
    },
    {
        name: "Market",
        img: market,
        generateText: 'Cargo',
        type : 'other',
        unit : '',
        dispatchAction : () => actionChangeShowMarket(true)
    },
    {
        name: "Shelter",
        img: shelter,
        generateText: 'Capacity',
        type : 'other',
        unit : ''
    },
    {
        name: "Tower",
        img: tower,
        generateText: 'Capacity',
        type : 'other',
        unit : '',
        dispatchAction : () => actionChangeShowTower(true)
    },
    {
        name: "Order",
        img: order,
        generateText: 'Increase max castle',
        type : 'order',
        unit : '',
        dispatchAction : () => actionChangeUnitType('unique')
    },
]
const Building: FC = () => {
    const dispatch = useDispatch()
    const stateBuilding = useSelector((state: any) => state.buildings)
    const buildingType = useSelector((state: any) => state.buildingType)
    
    const buildings = useMemo(() => {
        if (!stateBuilding) return []
        const __buildings = _buildings.filter(o => {
            if(!buildingType) return true
            return o.type === buildingType
        })
        
        return __buildings.map(o => {
            const findStateBuilding = stateBuilding.find(_o => _o.building.name === o.name)
            return {
                ...o,
                generate: findStateBuilding.value,
                description : findStateBuilding.building.description
            }
        })
    }, [stateBuilding,buildingType])

    const handleUpgrade = building => {
        dispatch(asyncGetUpgrade({
            ...building,
        }))
    }
    return (
        <>
            <ModalFixed show={!!buildingType} onClose={()=>dispatch(actionChangeBuildingType(null))} >
                <div className="buildings">
                    {
                        buildings.map(o => <div key={o.name} onClick={() => handleUpgrade(o)} className="building">
                            <div className="img">
                                <img src={o.img} alt="" />
                            </div>
                            <div className="name">{o.name}</div>
                            <div className="generate">{o.generateText}: <span>{o.generate}{o.unit}</span></div>
                        </div>)
                    }
                </div>
            </ModalFixed>
        </>
    )
}

export default Building