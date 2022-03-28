import ScrollBackground from "components/ScrollBackground";
import { FC } from "react";

interface IModal {
    onClose?(): any,
    show: boolean,

}
const Modal: FC<IModal> = ({ children, onClose = () => { }, show = false }) => {
    const _onClose = function () {
        onClose()
    }
    return (
        <>
            {show && <div className="modal">
                <div onClick={_onClose} className="mask"></div>
                <div className="body">
                    <ScrollBackground >
                        {children}
                    </ScrollBackground>
                </div>
            </div>}
        </>
    )
}

export default Modal