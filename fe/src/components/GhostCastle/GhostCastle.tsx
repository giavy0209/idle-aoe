import Button from "components/Button";
import Modal from "components/Modal";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeShowAttack } from "store/actions/battle";
import { actionChangeGhostCastle } from "store/actions/user";

const GhostCastle: FC = () => {
    const dispatch = useDispatch()
    const ghostCastle = useSelector((state: any) => state.ghostCastle)
    const openModelAttack = (type) => {
        dispatch(actionChangeShowAttack({ ...ghostCastle, type }))
    }
    return (
        <>
            <Modal show={!!ghostCastle} onClose={() => dispatch(actionChangeGhostCastle(null))} >
               {ghostCastle &&  <div className="enemies">
                    <div className="enemy">
                        <span>{ghostCastle.user.username}({ghostCastle.name})</span>
                        <div className="actions">
                            <Button onClick={() => openModelAttack(1)} text="Attack" />
                            <Button onClick={() => openModelAttack(2)} text="Spy" />
                        </div>
                    </div>
                </div>}

            </Modal>
        </>
    )
}

export default GhostCastle