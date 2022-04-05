import Modal from "components/Modal";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeGhostCastle } from "store/actions/user";

const GhostCastle : FC = () => {
    const dispatch = useDispatch()
    const ghostCastle = useSelector((state : any) => state.ghostCastle)
    console.log(ghostCastle);
    
    return (
        <>
        <Modal show={!!ghostCastle} onClose={()=>dispatch(actionChangeGhostCastle(null))} >


        </Modal>
        </>
    )
}

export default GhostCastle