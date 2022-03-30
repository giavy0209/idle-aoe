import { FC, useCallback, useMemo } from "react";
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
    description : string,
    gold: number,
    iron: number,
    wood: number,
    food: number,
    level: number,
    generate: number,
    generateText: string,
    unit : string,
    time: number,
    _id: string,
    dispatchAction?() : any
}

const resourcesName = ['Gold Mine', 'Iron Mine', 'Lumberjacks', 'Farms']

const Upgrade: FC = function () {
    const {
        name,
        description,
        gold,
        iron,
        wood,
        food,
        level,
        generate,
        generateText,
        unit,
        time,
        _id,
        dispatchAction
    }: IUpgrade = useSelector((state: any) => state?.upgrade || {})
    const worldSpeed = useSelector((state: any) => state.user?.world.speed)
    const resources = useSelector((state: any) => state.resources)
    
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

    const mapedResources = useMemo(() => {
        const _resources: { [key: string]: any } = {
            gold: 0,
            iron: 0,
            wood: 0,
            food: 0,
        }
        if (!resources) return resources
        resources.forEach(resource => {
            const name = resource.type.name.toLowerCase()
            _resources[name] = resource.value
        })
        return _resources
    }, [resources])

    return (
        <>
            <Modal show={!!name} onClose={() => dispatch(actionChangeUpgrade({ name: null }))}>
                <div className="upgrade">
                    <div className="title">Upgrade {name}</div>
                    <div className="description">{description}</div>
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
                        <div className="costs">
                            <div className="total-cost">Resources left</div>
                            <div className="cost">
                                <span>{Math.floor(mapedResources?.gold - gold)}</span>
                                <img src={goldore} alt="" />
                            </div>
                            <div className="cost">
                                <span>{Math.floor(mapedResources?.iron - iron)}</span>
                                <img src={ironore} alt="" />
                            </div>
                            <div className="cost">
                                <span>{Math.floor(mapedResources?.wood - wood)}</span>
                                <img src={woodimg} alt="" />
                            </div>
                            <div className="cost">
                                <span>{Math.floor(mapedResources?.food - food)}</span>
                                <img src={foodimg} alt="" />
                            </div>
                        </div>
                        <div className="sub-info">
                            <div className="time"><span>Time:</span> <span>{secondsToTime(time / worldSpeed || 0)}</span></div>
                            <div className="level"><span>Next Level:</span> <span>{level}</span></div>
                            <div className="generate"><span>{generateText}:</span> <span>{resourcesName.includes(name) ? generate * worldSpeed : generate}{unit}</span></div>
                        </div>
                    </div>
                    <Button onClick={handleUpgrade} text="Upgrade" />
                    {typeof dispatchAction === 'function' && <Button onClick={()=>{dispatch(dispatchAction()) ; dispatch(actionChangeUpgrade({ name: null }))}} text="Enter Building" />}
                </div>
            </Modal>
        </>
    )
}

export default Upgrade