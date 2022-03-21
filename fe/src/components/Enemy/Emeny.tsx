import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeEnemy, actionChangeShowAttack, asyncGetEnemy } from "store/actions";

const Enemy : FC = () => {
    const dispatch = useDispatch()
    const enemy = useSelector((state : any) => state.enemy)
    const openModelAttack = (enemy) => {
        dispatch(actionChangeShowAttack({_id : enemy._id , username:enemy.username}))
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
                            <div onClick={() => openModelAttack(o)} className="action">Attack</div>
                            <div className="action">Spy</div>
                        </div>
                    </div> )
                }

            </div>
        </div>}
        </>
    )
}

export default Enemy