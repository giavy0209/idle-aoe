import Modal from "components/Modal";
import { FC } from "react";

interface IConfirm {
    onOk?(): any
    onCancel?(): any,
    title?: string,
    message?: string,
    show: boolean
}
const Confirm: FC<IConfirm> = ({
    onOk = () => { },
    onCancel = () => { },
    title = '',
    message = '',
    show = false
}) => {
    return (
        <Modal onClose={onCancel} show={show}>
            <div className="confirm">
                <div className="title">{title}</div>
                <div className="message">{message}</div>
                <div className="action">
                    <div onClick={onOk} className="ok">OK</div>
                    <div onClick={onCancel} className="cancel">Cancel</div>
                </div>
            </div>
        </Modal>
    )
}

export default Confirm