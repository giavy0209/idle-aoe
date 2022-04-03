import Modal from "components/Modal";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeCastles } from "store/actions/user";

const Castles : FC = () => {
    const dispatch = useDispatch()
    const castles = useSelector((state : any) => state.castles)
    const currentCastle = useSelector((state : any) => state.currentCastle)
    return(
        <>
            <Modal show={!!castles} onClose={(() => dispatch(actionChangeCastles(null)))} >
                {castles && <div className="castles">
                    <div className="title">Your castles</div>
                    {
                        castles.map(o => <div className="castle" key={o._id}>
                            {o.name}
                            {o._id === currentCastle?._id && 'Current'}
                        </div> )
                    }
                </div>}
            </Modal>
        </>
    )
}

export default Castles