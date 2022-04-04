import ModalFixed from "components/ModalFixed";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBuildingType, actionChangeShowBuilding } from "store/actions/state";

const Buildings: FC = () => {
    const dispatch = useDispatch()
    const show = useSelector((state: any) => state.isShowBuilding)
    return (
        <>
            <ModalFixed onClose={() => dispatch(actionChangeShowBuilding(false))} show={show}>
                <div className="army list-modal-fixed">
                    <div onClick={() => dispatch(actionChangeBuildingType('army'))} className="title highlight">Army Building</div>
                    <div onClick={() => dispatch(actionChangeBuildingType('other'))} className="title highlight">Other Building</div>
                    <div onClick={() => dispatch(actionChangeBuildingType('order'))} className="title highlight">Order</div>
                </div>
            </ModalFixed>
        </>
    )
}

export default Buildings