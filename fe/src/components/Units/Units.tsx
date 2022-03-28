import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pikeman from 'assets/images/pikeman.webp'
import Swordsman from 'assets/images/swordsman.webp'
import Axeman from 'assets/images/axeman.webp'
import Maceman from 'assets/images/maceman.webp'
import ShortbowArcher from 'assets/images/shortbow_archer.webp'
import LongbowArcher from 'assets/images/longbow_archer.webp'
import CrossbowArcher from 'assets/images/crossbow_archer.webp'

import Quickwalker from 'assets/images/quickwalker.webp'
import LightCavalry from 'assets/images/light_cavalry.webp'
import HeavyCavalry from 'assets/images/heavy_cavalry.webp'
import Ballistician from 'assets/images/ballistician.webp'
import Catapult from 'assets/images/catapult.webp'
import Trebuchet from 'assets/images/trebuchet.webp'
import { asyncGetTranning } from "store/actions";
const _units = [
    {
        name : 'Pikeman',
        img : Pikeman
    },
    {
        name : 'Swordsman',
        img : Swordsman
    },
    {
        name : 'Axeman',
        img : Axeman
    },
    {
        name : 'Maceman',
        img : Maceman
    },
    {
        name : 'Shortbow archer',
        img : ShortbowArcher
    },
    {
        name : 'Longbow archer',
        img : LongbowArcher
    },
    {
        name : 'Crossbow archer',
        img : CrossbowArcher
    },
    {
        name : 'Quickwalker',
        img : Quickwalker
    },
    {
        name : 'Light Cavalry',
        img : LightCavalry
    },
    {
        name : 'Heavy Cavalry',
        img : HeavyCavalry
    },
    {
        name : 'Ballistician',
        img : Ballistician
    },
    {
        name : 'Catapult',
        img : Catapult
    },
    {
        name : 'Trebuchet',
        img : Trebuchet
    },
]
const Units : FC = () => {
    const stateUnits = useSelector((state : any) => state.units)
    const dispatch = useDispatch()
    const units = useMemo(() => {
        if(!stateUnits) return []
        return stateUnits.map(o => {
            return {
                ...o,
                img : _units.find(_o => _o.name === o.unit.name)?.img
            }
        })
    },[stateUnits])
    const handleTraning = unit => {
        dispatch(asyncGetTranning(unit))
    }
    return (
        <>
        <div className="units">
            <div className="title highlight">Army</div>
            {
                units.map(o => <div onClick={() => handleTraning(o.unit.name)} key={o._id} className="unit">
                    <div className="img">
                        <img src={o.img} alt="" />
                    </div>
                    <div className="name">{o.unit.name}</div>
                    <div className="total">{o.total}</div>
                </div> )
            }
        </div>
        </>
    )
}

export default Units