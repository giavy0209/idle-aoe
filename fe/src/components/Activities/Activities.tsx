import secondsToTime from "helpers/secondsToTime";
import { CSSProperties, FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeModalActivity } from "store/actions";

const Activities: FC = () => {
    const dispatch = useDispatch()
    const _activity = useSelector((state: any) => state.activity)
    const [Now, setNow] = useState(Date.now())
    const activity = useMemo(() => {
        if (!_activity) {
            return null
        }
        return _activity.map(o => {
            let progress, timeLeft
            if (o.status === 0) {
                const timeStartToArrive = new Date(o.arriveTime).getTime() - new Date(o.startTime).getTime()
                const startTimeToNow = Now - new Date(o.startTime).getTime()
                progress = startTimeToNow / timeStartToArrive * 100
                timeLeft = (new Date(o.arriveTime).getTime() - Now) / 1000
            }
            if (o.status === 1) {
                const timeArriveToHome = new Date(o.homeTime).getTime() - new Date(o.arriveTime).getTime()
                const timeArriveToNow = Now - new Date(o.arriveTime).getTime()
                progress = timeArriveToNow / timeArriveToHome * 100
                timeLeft = (new Date(o.homeTime).getTime() - Now) / 1000
            }
            return {
                ...o,
                progress: progress > 100 ? 100 : progress,
                timeLeft,
            }
        })
    }, [_activity, Now])
    console.log(activity);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setNow(Date.now())
        }, 1000);
        return () => {
            clearTimeout(timer)
        }
    }, [Now])

    return (
        <>
            {
                activity?.length > 0 &&
                <div className="activities">
                    <div className="title">Activites</div>
                    <div className="list-activity">
                        <div className="title-head">
                            <div className="from">From</div>
                            <div className="time">Time</div>
                            <div className="to">To</div>
                        </div>
                        {
                            activity?.map(o => <div onClick={() => dispatch(actionChangeModalActivity(o))} key={o._id} className="activity">
                                <div className="from">{o.user.username}</div>
                                <div style={{ '--progress': `${o.progress}%` } as CSSProperties} className={`time ${o.status === 0 ? 'moving' : 'comehome'}`}>
                                    <span>{secondsToTime(o.timeLeft)} ({o.type === 1 ? 'Attack' : 'Spy'} )</span>
                                </div>
                                <div className="target">{o.target.username}</div>
                            </div>)
                        }
                    </div>
                </div>
            }

        </>
    )
}

export default Activities