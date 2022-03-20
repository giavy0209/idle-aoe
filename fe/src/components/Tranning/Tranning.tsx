import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeLoading, actionChangeTranning } from "store/actions";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import woodimg from 'assets/images/wood.webp'
import foodimg from 'assets/images/food.webp'
import secondsToTime from "helpers/secondsToTime";
import callAPI from "callAPI";
import { toast } from "react-toastify";
interface ITranning {
    name: string,
    gold: number,
    iron: number,
    wood: number,
    food: number,
    time : number,
    _id : string,
}
const Tranning : FC = () => {
    const dispatch = useDispatch()
    const {
        name,
        gold = 0,
        iron = 0,
        wood = 0,
        food = 0,
        time,
        _id
    } : ITranning = useSelector((state : any) => state?.tranning || {})

    const [Total, setTotal] = useState(1)
    const onChangeInput = e => {
        let value = Number(e.target.value)

        if(!value) value = 1

        setTotal(value)
    }

    const handleTranning = useCallback(async () => {
        dispatch(actionChangeLoading(true))
        const res = await callAPI.post(`/trainning`,{unit : _id , total: Total})
        if(res.status === 1) {
            toast('Add 1 unit to trainning queue')
        }
        if(res.status === 101) {
            toast('There is an unit on trainning queue' , {type : 'error'})
        }
        if(res.status === 102) {
            toast('Not enough resource')
        }
        dispatch(actionChangeLoading(false))
        dispatch(actionChangeTranning({}))

    },[Total,_id])
    return (
        <>
        <div className={`upgrade ${name ? 'show' : ''}`}>
                <div onClick={()=>dispatch(actionChangeTranning({name : null}))} className="mask"></div>
                <div className="body">
                    <div className="title">Tranning {name}</div>
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
                        <div className="input">
                            <input value={Total} onChange={onChangeInput} type="text" placeholder="Total Unit"/>
                        </div>
                        <div className="costs">
                            <div className="total-cost">Total Cost</div>
                            <div className="cost">
                                <span>{gold * Total}</span>
                                <img src={goldore} alt="" />
                            </div>
                            <div className="cost">
                                <span>{iron * Total}</span>
                                <img src={ironore} alt="" />
                            </div>
                            <div className="cost">
                                <span>{wood * Total}</span>
                                <img src={woodimg} alt="" />
                            </div>
                            <div className="cost">
                                <span>{food * Total}</span>
                                <img src={foodimg} alt="" />
                            </div>
                        </div>
                        <div className="sub-info">
                            <div className="time">Time: {secondsToTime(time)}</div>
                            <div className="time">Total: {secondsToTime(time * Total)}</div>
                        </div>
                    </div>
                    <div onClick={handleTranning} className="button">
                        Tranning
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tranning