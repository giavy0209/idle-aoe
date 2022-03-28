import { FC } from "react";

interface IButton {
    text : string,
    onClick() : any,
}

const Button : FC<IButton> = ({text , onClick}) => {
    return (
        <>
        <div onClick={onClick} className="button">
            {text}
        </div>
        </>
    )
}

export default Button