import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import barrack from 'assets/images/barrack.webp'
import archer from 'assets/images/archer.webp'
import stable from 'assets/images/stable.webp'
import workshop from 'assets/images/workshop.webp'
import { asyncGetUpgrade } from "store/actions";
const _buildings = [
    {
        name : "Barracks",
        img : barrack
    },
    {
        name : "Archery Range",
        img : archer
    },
    {
        name : "Stables",
        img : stable
    },
    {
        name : "Workshop",
        img : workshop
    },
]
const Building : FC = () => {
    const dispatch = useDispatch()
    const stateBuilding = useSelector((state : any) => state.buildings)

    const buildings = useMemo(() => {
        if(!stateBuilding) return []
        return _buildings.map(o => {
            return {
                ...o,
                generate : stateBuilding.find(_o => _o.building.name === o.name).value
            }
        })
    },[stateBuilding])

    const handleUpgrade = name => {
        dispatch(asyncGetUpgrade(name))
    }
    return (
        <>
        <div className="buildings">
            <div className="title">Building List</div>
            {
                buildings.map( o => <div key={o.name} onClick={() => handleUpgrade(o.name)} className="building">
                    <div className="img">
                        <img src={o.img} alt="" />
                    </div>
                    <div className="name">{o.name}</div>
                    <div className="generate">Reduce trainning: <span>{o.generate}%</span></div>
                </div> )
            }
        </div>
        </>
    )
}

export default Building