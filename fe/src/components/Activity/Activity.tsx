import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import wood from 'assets/images/wood.webp'
import food from 'assets/images/food.webp'
import callAPI from "callAPI";
import { toast } from "react-toastify";
import Modal from "components/Modal";
import { actionChangeModalActivity } from "store/actions/state";
const resources: {
    name: string,
    img: any,
}[] = [
        {
            name: 'gold',
            img: goldore,
        },
        {
            name: 'iron',
            img: ironore,
        },
        {
            name: 'wood',
            img: wood
        },
        {
            name: 'food',
            img: food
        }
    ]
const Activity: FC = () => {
    const dispatch = useDispatch()
    const activity = useSelector((state: any) => state.modalActivity)
    const getMarchingBack = async () => {
        const res = await callAPI.post('/marching/return', { marching: activity._id })
        if (res.status === 101) {
            toast('You cannot call your army back')
        }
        if (res.status === 1) {
            toast('Call army back successfully')
            dispatch(actionChangeModalActivity(null))
        }
    }
    return (
        <>
            <Modal onClose={() => dispatch(actionChangeModalActivity(null))} show={!!activity} >
                <div className="activity">
                    <div className="title">Activity Detail</div>
                    <div className="activity-units">
                        <div className="title">Units</div>
                        {
                            activity?.units.map(o => <div key={o.unit._id} className="unit">
                                <span>{o.total}</span>
                                <span>{o.unit.name}</span>
                            </div>)
                        }
                    </div>
                    <div className="activity-cargo">
                        <div className="title">Cargo</div>
                        {
                            resources.map(o => <div key={o.name} className="cargo">
                                <div className="img">
                                    <img src={o.img} alt="" />
                                </div>
                                <div className="value">
                                    {Math.floor(activity?.cargo[o.name])}
                                </div>
                            </div>)
                        }
                    </div>
                    {
                        activity?.status === 0 && [1,2].includes(activity.type) && <div onClick={getMarchingBack} className="back">Return</div>
                    }
                </div>
            </Modal>
        </>
    )
}

export default Activity