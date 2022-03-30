import callAPI from "callAPI";
import {Modal,Button} from "components";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeClanRequest, asyncGetClanDetail, asyncGetClanRequest } from "store/actions";

const ClanRequest : FC = () => {
    const dispatch = useDispatch()
    const clanRequest = useSelector((state : any) => state.clanRequest)
    const user = useSelector((state : any) => state.user)
    const handleAccept = async id => {
        const res = await callAPI.put(`/clan/join/${id}`, {})
        if(res.status === 101) {
            toast('Your clan is full')
        }
        if(res.status === 1) {
            toast('Accepted new member')
        }
        dispatch(asyncGetClanRequest(user?.clan._id))
        dispatch(asyncGetClanDetail(user?.clan._id))
    }
    const handleReject = async id => {
        const res = await callAPI.delete(`/clan/join/${id}`)
        if(res.status === 1) {
            toast('Rejected user')
        }
        dispatch(asyncGetClanRequest(user?.clan._id))
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