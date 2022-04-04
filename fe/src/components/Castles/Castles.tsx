import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "components/Modal";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeCastles } from "store/actions/user";

const Castles : FC = () => {
    const dispatch = useDispatch()
    const castles = useSelector((state : any) => state.castles)
    const currentCastle = useSelector((state : any) => state.currentCastle)

    const [ShowModal, setShowModal] = useState(false)
    return(
        <>
            <Modal show={!!castles} onClose={(() => dispatch(actionChangeCastles(null)))} >
                {castles && <div className="castles">
                    <div onClick={() => setShowModal(true)} className="show-info"><FontAwesomeIcon icon={faCircleQuestion} /></div>
                    <div className="title">Your castles</div>
                    {
                        castles.map(o => <div className="castle" key={o._id}>
                            <div className="name">{o.name} {o._id === currentCastle._id ? '(Current)' : ''} </div>
                            <p>Loyal : {o.loyal}</p>
                            <p>Population : {o.population}</p>
                        </div> )
                    }
                </div>}
            </Modal>
            <Modal onClose={() => setShowModal(false)} show={ShowModal}>
                <div className="question">
                    <div className="title">Loyal</div>
                    <div className="content">
                        <p>Each castle have their own Loyal, max = 10000</p>
                        <p>Loyal can be reduce by sending Nobleman on attack</p>
                        <p>If your Loyal = 0, you will lost your castle, but you can't lost your Capital</p>
                        <p>If your castle's Loyal bellow 5000, your castle's resource gain will be reduce 50%</p>
                        <p>If your castle's Loyal bellow 2000, your castle's resource gain will be reduce 80%</p>
                        <p>If you have more than 1 castle, you can change Capital to lowest Royal castle to prevent conquered</p>
                        <p>If you have more than 1 castle, you can change castle to manager building,army,...</p>
                        <p>You can attack another non-capital castle with Nobleman to conquered it</p>
                        <p>You can attack Ghost Castle to conquered too. Ghost Castle have an extremely strong army. Becarefull</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Castles