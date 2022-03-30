import callAPI from "callAPI";
import {Modal,Button} from "components";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeClanRequest } from "store/actions";

const ClanRequest : FC = () => {
    const dispatch = useDispatch()
    const clanRequest = useSelector((state : any) => state.clanRequest)
    const handleAccept = async id => {
        const res = await callAPI.post
    }
    const handleReject = async id => {

    }
    return (
        <>
        <Modal onClose={()=>dispatch(actionChangeClanRequest(null))} show={clanRequest} >
            {clanRequest && <div className="clan-requests">
                <div className="title">Waiting for accept</div>
                <div className="head">
                    <span>Username</span>
                    <span>Population</span>
                </div>
                {
                    clanRequest.map(o => <div key={o._id} className="clan-request">
                        <span>{o.user.username}</span>
                        <span>{o.user.population}</span>
                        <div className="actions">
                            <Button onClick={()=>handleAccept(o._id)} text="Accept" />
                            <Button onClick={()=>handleReject(o._id)} text="Reject" />
                        </div>
                    </div> )
                }
            </div>}
        </Modal>
        </>
    )
}

export default ClanRequest