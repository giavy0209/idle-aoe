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
                
            </Modal>
        </>
    )
}

export default Castles