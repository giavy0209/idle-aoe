import { FC } from "react";
import scrollMid from 'assets/images/scroll-mid.webp'
const ScrollBackground : FC = ({children}) => {
    return(
        <>
        <div className="scroll-background">
            <div className="top">
            </div>
            <div className="mid">
                <img src={scrollMid} alt="" />
                {children}
            </div>
            <div className="bottom">
            </div>
        </div>
        </>
    )
}

export default ScrollBackground