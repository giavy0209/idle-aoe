import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeLoading, actionChangeUpgrade } from "store/actions";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import woodimg from 'assets/images/wood.webp'
import foodimg from 'assets/images/food.webp'
import secondsToTime from "helpers/secondsToTime";
import callAPI from "callAPI";
import { toast } from "react-toastify";

interface IUpgrade {
    name: string,
    gold: number | string,
    iron: number | string,
    wood: number | string,
    food: number | string,
    level : number | string,
    generate ? : number | string,
    time : number,
    _id : string,
}

const Upgrade: FC = function () {
    const {
        name,
        gold,
        iron,
        wood,
        food,
        level,
        generate,
        time,
        _id
    } : IUpgrade = useSelector((state : any) => state?.upgrade || {})
    const dispatch = useDispatch()
    const handleUpgrade = useCallback(async () => {
        dispatch(actionChangeLoading(true))
        const res = await callAPI.post(`/upgrade?building=${_id}`,{})
        dispatch(actionChangeLoading(false))
        if(res.status === 102) toast('Not enough resources' , {type : 'error'})
        if(res.status === 103) toast('There is a building upgrading' , {type : 'error'})
        if(res.status === 1) {
            toast('Building is upgraded')
        }
        dispatch(actionChangeUpgrade({}))
    },[_id,dispatch])
    return (
        <>
            <div className={`upgrade ${name ? 'show' : ''}`}>
                <div onClick={()=>dispatch(actionChangeUpgrade({name : null}))} className="mask"></div>
                <div className="body">
                    <div className="title">Upgrade {name}</div>
                    <div className="content">
                        <div className="costs">
                            <div className="cost">
                                <span>{gold}</span>
                                <img src={goldore} alt="" />
                            </div>
                            <div className="cost">
                                <span>{iron}</span>
                                <img src={ironore} alt="" />
                            </div>
                            <div className="cost">
                                <span>{wood}</span>
                                <img src={woodimg} alt="" />
                            </div>
                            <div className="cost">
                                <span>{food}</span>
                                <img src={foodimg} alt="" />
                            </div>
                        </div>
                        <div className="sub-info">
                            <div className="level">Next Level: {level}</div>
                            <div className="generate">Next generate: {generate}</div>
                            <div className="time">Time: {secondsToTime(time || 0)}</div>
                        </div>
                    </div>
                    <div onClick={handleUpgrade} className="button">
                        Upgrade
                    </div>
                </div>
            </div>
        </>
    )
}

export default Upgrade