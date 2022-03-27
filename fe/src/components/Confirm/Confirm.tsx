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
        <>
            {
                show && <div className="confirm">
                    <div onClick={onCancel} className="mask"></div>
                    <div className="body">
                        <div className="title">{title}</div>
                        <div className="message">{message}</div>
                        <div className="action">
                            <div onClick={onOk} className="ok">OK</div>
                            <div onClick={onCancel} className="cancel">Cancel</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Confirm