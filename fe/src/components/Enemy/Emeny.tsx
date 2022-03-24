import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeEnemy, actionChangeShowAttack, asyncGetEnemy } from "store/actions";

const Enemy : FC = () => {
    const dispatch = useDispatch()
    const enemy = useSelector((state : any) => state.enemy)
    const openModelAttack = (enemy, type) => {
        dispatch(actionChangeShowAttack({_id : enemy._id , username:enemy.username , type }))
    }
    return (
        <>
        {enemy && <div className="enemy-model">
            <div onClick={() => dispatch(actionChangeEnemy(null))} className="mask"></div>
            <div className="list-enemy">
                <div  onClick={()=>dispatch(asyncGetEnemy())} className="reload">Reload</div>
                {
                    enemy?.map(o => <div key={o._id} className="enemy">
                        <span>Player {o.username}</span>
                        <div className="actions">
                            <div onClick={() => openModelAttack(o, 1)} className="action">Attack</div>
                            <div onClick={() => openModelAttack(o, 2)} className="action">Spy</div>
                        </div>
                    </div> )
                }

            </div>
        </div>}
        </>
    )
}

export default Enemy