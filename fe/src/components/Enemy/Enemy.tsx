import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "components";
import Button from "components/Button";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeEnemy, actionChangeShowAttack, asyncGetEnemy } from "store/actions";

const Enemy: FC = () => {
    const renderTime = useRef(0)
    const [Search, setSearch] = useState('')
    const [ShowModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const enemy = useSelector((state: any) => state.enemy)
    const openModelAttack = (enemy, type) => {
        dispatch(actionChangeShowAttack({ _id: enemy._id, username: enemy.username, type }))
    }

    useEffect(() => {
        if(renderTime.current > 0) {
            console.log(Search);
            
            dispatch(asyncGetEnemy(Search))
        }
        renderTime.current++
    },[Search])

    useEffect(() => {
        if(!enemy) {
            renderTime.current = 0
        }
    },[enemy])

    return (
        <>
            <Modal show={enemy} onClose={() => dispatch(actionChangeEnemy(null))}>
                <div className="enemies">
                    <div onClick={() => setShowModal(true)} className="show-info"><FontAwesomeIcon icon={faCircleQuestion} /></div>
                    <Button onClick={() => dispatch(asyncGetEnemy())} text="Reload" />
                    <div className="search">
                        <input value={Search} onChange={e => setSearch(e.target.value)} type="text" placeholder="search"/>
                    </div>
                    {
                        enemy?.map(o => <div key={o._id} className="enemy">
                            <span>Player {o.username}</span>
                            <div className="actions">
                                <Button onClick={() => openModelAttack(o, 1)} text="Attack" />
                                <Button onClick={() => openModelAttack(o, 2)} text="Spy" />
                            </div>
                        </div>)
                    }
                </div>
            </Modal>
            <Modal onClose={() => setShowModal(false)} show={ShowModal}>
                <div className="question">
                    <div className="title">Attack</div>
                    <div className="content">
                        <p>Attack is send your army to someone, attack their castle.</p>
                        <p>If you win, you can steel their resources</p>
                    </div>
                    <div className="title">Spy</div>
                    <div className="content">
                        <p>Spy is send your Quickwalker to enemy to collect their information</p>
                        <p>If your Quickwalker more than enemy's Quickwalker, you can collect enemy's information</p>
                        <p>If your Quickwalker less than enemy's Quickwalker, you fail to collect enemy's information</p>
                        <p>You and enemy will lost some Quickwalker if enemy also have Quickwalker</p>
                        <p>You will collect the following information</p>
                        <p>-Building Level</p>
                        <p>-Amount of resources</p>
                        <p>-Army</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Enemy