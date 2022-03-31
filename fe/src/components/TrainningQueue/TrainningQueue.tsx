import callAPI from "callAPI";
import Confirm from "components/Confirm";
import secondsToTime from "helpers/secondsToTime";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const TrainningQueue: FC = () => {
    const [ShowConfirm, setShowConfirm] = useState(false)
    const trainningQueue = useSelector((state: any) => state.trainningQueue)
    const [TimeLeft, setTimeLeft] = useState(0)
    const [Total, setTotal] = useState(0)
    const [Now, setNow] = useState(Date.now())
    useEffect(() => {
        const timer = setTimeout(() => {
            setNow(Date.now())
        }, 1000);
        return () => {
            clearTimeout(timer)
        }
    }, [Now])

    useEffect(() => {
        if (trainningQueue) {
            setTotal(trainningQueue.total)
            setTimeLeft(Math.round((new Date(trainningQueue.finishAt).getTime() - Now) / 1000))
        }else {
            setTotal(0)
        }
    }, [trainningQueue,Now])

    const openConfirm = () => {
        setShowConfirm(true)
    }
    const onOK = async () => {
        setShowConfirm(false)
        const res = await callAPI.post('/training/cancel', { training: trainningQueue._id })
        if (res.status === 1) {
            toast('Training caneled')
        }
    }
    return (
        <>
            <div className='trainning-queue'>
                <div className="title">Trainning <span className="total">{Total || ''}</span> {trainningQueue?.unit?.name}</div>
                {
                    trainningQueue ? <>
                        <div className="timeleft">Time left : {secondsToTime(TimeLeft)}</div>
                        <div className="timeleft">Total time left : {secondsToTime((new Date(trainningQueue?.time).getTime() - Date.now()) / 1000)}</div>
                        <div onClick={openConfirm} className="cancel">Cancel Training</div>
                    </>
                    :
                    <p className="no-active">No unit on training</p>
                }
            </div>
            <Confirm
                show={ShowConfirm}
                onOk={onOK}
                onCancel={() => setShowConfirm(false)}
                title="Are you sure?"
                message="Your unit will stop training, you will get nothing back, but you can training other unit"
            />
        </>
    )
}

export default TrainningQueue