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

export const DOMAIN = process.env.REACT_APP_DOMAIN as string
export const WS = process.env.REACT_APP_WS as string

export const _units = [
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