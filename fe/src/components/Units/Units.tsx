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
import Nobleman from 'assets/images/nobleman.webp'

import ModalFixed from "components/ModalFixed";
import { asyncGetTranning } from "store/actions/unit";
import { actionChangeUnitType } from "store/actions/state";
const _units = [
    {
        name: 'Pikeman',
        img: Pikeman,
        type: "infantry"
    },
    {
        name: 'Swordsman',
        img: Swordsman,
        type: "infantry"
    },
    {
        name: 'Axeman',
        img: Axeman,
        type: "infantry"
    },
    {
        name: 'Maceman',
        img: Maceman,
        type: "infantry"
    },
    {
        name: 'Shortbow archer',
        img: ShortbowArcher,
        type: "archer"
    },
    {
        name: 'Longbow archer',
        img: LongbowArcher,
        type: "archer"
    },
    {
        name: 'Crossbow archer',
        img: CrossbowArcher,
        type: "archer"
    },
    {
        name: 'Quickwalker',
        img: Quickwalker,
        type: "cavalry"
    },
    {
        name: 'Light Cavalry',
        img: LightCavalry,
        type: "cavalry"
    },
    {
        name: 'Heavy Cavalry',
        img: HeavyCavalry,
        type: "cavalry"
    },
    {
        name: 'Ballistician',
        img: Ballistician,
        type: "siege"
    },
    {
        name: 'Catapult',
        img: Catapult,
        type: "siege"
    },
    {
        name: 'Trebuchet',
        img: Trebuchet,
        type: "siege"
    },
    {
        name: 'Nobleman',
        img: Nobleman,
        type: "unique"
    },
]
const Units: FC = () => {
    const unitType = useSelector((state: any) => state.unitType)
    const stateUnits = useSelector((state: any) => state.units)
    const dispatch = useDispatch()
    const units = useMemo(() => {
        if (!stateUnits) return []
        const __units = _units.filter(o => {
            if(unitType) return o.type === unitType
            return true
        })
        const _stateUnits = stateUnits.filter(o => {
            return !!__units.find(_o => _o.name === o.unit.name)
        })
        return _stateUnits.map(o => {
            return {
                ...o,
                img : _units.find(_o => _o.name === o.unit.name)?.img
            }
        })
    }, [stateUnits, unitType])
    const handleTraning = unit => {
        dispatch(asyncGetTranning(unit))
    }
    return (
        <>
            <ModalFixed show={!!unitType} onClose={()=>dispatch(actionChangeUnitType(null))}>
                <div className="units list-modal-fixed">
                    {
                        units.map(o => <div onClick={() => handleTraning(o.unit.name)} key={o._id} className="unit">
                            <div className="img">
                                <img src={o.img} alt="" />
                            </div>
                            <div className="name">{o.unit.name}</div>
                            <div className="total">Defense: {o.total}</div>
                            <div className="total">In Tower: {o.inTower}</div>
                        </div>)
                    }
                </div>
            </ModalFixed>
        </>
    )
}

export default Units