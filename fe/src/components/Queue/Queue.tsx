import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Activities from "components/Activities";
import TrainningQueue from "components/TrainningQueue";
import Upgrading from "components/Upgrading";
import { FC, useState } from "react";

const Queue: FC = () => {
    const [ShowQueue, setShowQueue] = useState(false)
    return (
        <>
            <div className={`queue ${ShowQueue ? 'show' : ''}`}>
                <div onClick={()=>setShowQueue(!ShowQueue)} className="toggle">
                    <FontAwesomeIcon icon={ShowQueue ? faChevronDown : faChevronUp} />
                </div>
                <div className="queue-body">
                    <Activities />
                    <TrainningQueue />
                    <Upgrading />
                </div>
            </div>
        </>
    )
}

export default Queue