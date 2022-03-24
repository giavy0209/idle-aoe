import secondsToTime from "helpers/secondsToTime";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

const TrainningQueue : FC = () => {
    const trainningQueue = useSelector((state : any) => state.trainningQueue)
    const [TimeLeft, setTimeLeft] = useState(0)
    const [Total, setTotal] = useState(0)
    
    useLayoutEffect(() => {
        if(TimeLeft > 0){
            setTimeout(() => {
                setTimeLeft(Math.round(TimeLeft - 1))
            }, 1000);
        }
    },[TimeLeft])

    useEffect(() => {
        if(trainningQueue) {
            setTotal(trainningQueue.total)
            setTimeLeft(Math.round((new Date(trainningQueue.finishAt).getTime() - Date.now()) / 1000))
        }
    },[trainningQueue])
    return(
        <>
        {trainningQueue && <div className={`trainning-queue ${trainningQueue ? 'show' : ''}`}>
            <div className="title">Trainning <span className="total">{Total}</span> {trainningQueue?.unit?.name}</div>
            <div className="timeleft">Time left : {secondsToTime(TimeLeft)}</div>
            <div className="timeleft">Total time left : {secondsToTime((new Date(trainningQueue?.time).getTime() - Date.now()) / 1000 )}</div>
        </div>}
        </>
    )
}

export default TrainningQueue