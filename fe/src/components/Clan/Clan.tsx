import Modal from "components/Modal";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeClan } from "store/actions";

const Clan : FC = () => {
    const dispatch = useDispatch()
    const clan = useSelector((state : any) => state.clan)
    return (
        <>
            <Modal show={clan} onClose={()=>dispatch(actionChangeClan(null))}>
                <div className="clan">

                </div>
            </Modal>
        </>
    )
}

export default Clan