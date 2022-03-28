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
import Modal from "components/Modal";
import Button from "components/Button";

interface IUpgrade {
    name: string,
    gold: number,
    iron: number,
    wood: number,
    food: number,
    level: number,
    generate: number,
    time: number,
    _id: string,
}

const resources = ['Gold Mine', 'Iron Mine', 'Lumberjacks', 'Farms']

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
    }: IUpgrade = useSelector((state: any) => state?.upgrade || {})
    const worldSpeed = useSelector((state: any) => state.user?.world.speed)
    const dispatch = useDispatch()
    const handleUpgrade = useCallback(async () => {
        dispatch(actionChangeLoading(true))
        const res = await callAPI.post(`/upgrade?building=${_id}`, {})
        dispatch(actionChangeLoading(false))
        if (res.status === 102) toast('Not enough resources', { type: 'error' })
        if (res.status === 103) toast('There is a building upgrading', { type: 'error' })
        if (res.status === 1) {
            toast('Building is upgraded')
        }
        dispatch(actionChangeUpgrade({}))
    }, [_id, dispatch])
    console.log(name);
    
    return (
        <>
            <Modal show={!!name} onClose={() => dispatch(actionChangeUpgrade({ name: null }))}>
                <div className="upgrade">

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
                            <div className="generate">Next generate: {resources.includes(name) ? generate * worldSpeed : generate}</div>
                            <div className="time">Time: {secondsToTime(time / worldSpeed || 0)}</div>
                        </div>
                    </div>
                    <Button onClick={handleUpgrade} text="Upgrade" />    
                </div>
            </Modal>
        </>
    )
}

export default Upgrade