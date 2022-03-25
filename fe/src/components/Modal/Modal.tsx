import { FC, useEffect, useState } from "react";
interface IModal  {
    onClose?() : any,
    show : boolean,
    
}
const Modal : FC <IModal> = ({children , onClose = ()=>{}, show = false}) => {
    const _onClose = function () {
        onClose()
    }
    return(
        <>
            {show && <div className="modal">
                <div onClick={_onClose} className="mask"></div>
                <div className="body">
                    {children}
                </div>
            </div>}
        </>
    )
}

export default Modal