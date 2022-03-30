import ModalFixed from "components/ModalFixed";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeShowBuilding } from "store/actions";
import { actionChangeBuildingType } from "store/actions/state";

const Buildings: FC = () => {
    const dispatch = useDispatch()
    const show = useSelector((state: any) => state.isShowBuilding)
    return (
        <>
            <ModalFixed onClose={() => dispatch(actionChangeShowBuilding(false))} show={show}>
                <div className="army list-modal-fixed">
                    <div onClick={() => dispatch(actionChangeBuildingType('army'))} className="title highlight">Army Building</div>
                </div>
            </ModalFixed>
        </>
    )
}

export default Buildings