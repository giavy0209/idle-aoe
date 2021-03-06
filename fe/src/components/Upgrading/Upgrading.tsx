import callAPI from "callAPI"
import { Confirm } from "components"
import secondsToTime from "helpers/secondsToTime"
import { FC, useEffect, useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const Upgrading: FC = () => {
    const [ShowConfirm, setShowConfirm] = useState(false)
    const [UpgradingBuilding, setUpgradingBuilding] = useState<any>({})
    const [TimeLeft, setTimeLeft] = useState(0)
    const upgrading = useSelector((state: any) => {
        return state.buildings?.find(o => o.isUpgrade)
    })

    useEffect(() => {
        if (upgrading) {
            setUpgradingBuilding({
                ...upgrading,
            })
            setTimeLeft(Math.round((new Date(upgrading.finishAt).getTime() - Date.now()) / 1000))
        } else {
            setTimeLeft(0)
            setUpgradingBuilding(null)
        }
    }, [upgrading])
    useLayoutEffect(() => {
        let timeout;
        if (TimeLeft > 0) {
            timeout = setTimeout(() => {
                setTimeLeft(Math.round(TimeLeft - 1))
            }, 1000);
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [TimeLeft])

    const openConfirm = () => {
        setShowConfirm(true)
    }
    const onOK = async () => {
        setShowConfirm(false)
        const res = await callAPI.post('/upgrade/cancel', { building: upgrading._id })
        if (res.status === 1) {
            toast('Upgrade caneled')
        }
    }
    return (
        <>
            <div className={`upgrading`}>
                <div className="title">Upgrading {UpgradingBuilding?.building?.name}</div>
                {   TimeLeft > 0 ?
                    <>
                        <div className="timeleft">Time left : {secondsToTime(TimeLeft)}</div>
                        <div onClick={openConfirm} className="cancel">Cancel Upgrade</div>
                    </>
                    :
                    <p className="no-active">No building on upgrade</p>
                }
            </div>
            <Confirm
                show={ShowConfirm}
                onOk={onOK}
                onCancel={() => setShowConfirm(false)}
                title="Are you sure?"
                message="Your building will stop upgrade and you can't receive any resource back but you can upgrade another building"
            />
        </>
    )
}
export default Upgrading
