import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface IModalFixed {
    onClose?(): any,
    show: boolean,

}
const ModalFixed: FC<IModalFixed> = ({ children, onClose = () => { }, show = false }) => {
    const _onClose = function () {
        onClose()
    }
    return (
        <>
            <div className={`modal-fixed ${show ? 'show' : ''}`}>
                <div className="mask"></div>
                <div onClick={_onClose} className="close">
                    <FontAwesomeIcon icon={faChevronCircleLeft} />
                </div>
                <div className="body">
                    {children}
                </div>
            </div>
        </>
    )
}

export default ModalFixed