import { FC } from "react";
import { useSelector } from "react-redux";
import loading from 'assets/images/loading.gif'
const Loading : FC = function () {
    const isLoading = useSelector((state : any) => state.isLoading)
    
    return(
        <>
            <div className={`loading ${isLoading ? 'show' : ''}`}>
                <img src={loading} alt="" />
            </div>
        </>
    )
}

export default Loading