import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeModalActivity } from "store/actions";
import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import wood from 'assets/images/wood.webp'
import food from 'assets/images/food.webp'
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

    return (
        <>
            {activity && <div className="modal">
                <div onClick={() => dispatch(actionChangeModalActivity(null))} className="mask"></div>
                <div className="body">
                    <div className="activity">
                        <div className="title">Activity Detail</div>
                        <div className="activity-units">
                            <div className="title">Units</div>
                            {
                                activity.units.map(o => <div key={o.unit._id} className="unit">
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
                                        {Math.floor(activity.cargo[o.name])}
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Activity