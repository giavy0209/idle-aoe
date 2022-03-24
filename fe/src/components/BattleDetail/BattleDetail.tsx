import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBattleDetail } from "store/actions";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import wood from 'assets/images/wood.webp'
import food from 'assets/images/food.webp'
import DetailAttack from "./DetailAttack";
import DetailSpy from "./DetailSpy";
const resources : {
    name : string,
    img: any,
}[] = [
    {
        name : 'gold',
        img : goldore,
    },
    {
        name : 'iron',
        img : ironore,
    },
    {
        name : 'wood',
        img : wood
    },
    {
        name : 'food',
        img : food
    }
]
const BattleDetail: FC = () => {
    const dispatch = useDispatch()
    const battleDetail = useSelector((state: any) => state.battleDetail)
    console.log(battleDetail);
    
    return (
        <>
            {battleDetail && <div className="modal">
                <div onClick={() => dispatch(actionChangeBattleDetail(null))} className="mask"></div>
                <div className="body">
                    {
                        battleDetail.marching.type === 1 ?
                        <DetailAttack /> 
                        :
                        <DetailSpy />
                    }
                </div>
            </div>}
        </>
    )
}

export default BattleDetail