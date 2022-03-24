import secondsToTime from "helpers/secondsToTime"
import { FC, useEffect, useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"

const Upgrading : FC = () => {
    const [UpgradingBuilding, setUpgradingBuilding] = useState<any>({})
    const [TimeLeft, setTimeLeft] = useState(0)
    const upgrading = useSelector((state : any) => {
        return state.buildings?.find(o => o.isUpgrade)
    })
    
    useEffect(() => {
        if(upgrading) {
            setUpgradingBuilding({
                ...upgrading,
            })
            setTimeLeft(Math.round((new Date(upgrading.finishAt).getTime() - Date.now()) / 1000))
        }
    },[upgrading])
    useLayoutEffect(() => {
        if(TimeLeft > 0){
            setTimeout(() => {
                setTimeLeft(Math.round(TimeLeft - 1))
            }, 1000);
        }
    },[TimeLeft])
    
    return (
        <>
        {TimeLeft && <div className={`upgrading ${TimeLeft ? 'show' : ''}`}>
            <div className="title">Upgrading {UpgradingBuilding.building?.name}</div>
            <div className="timeleft">Time left : {secondsToTime(TimeLeft)}</div>
        </div>}
        </>
    )
}
export default Upgrading
