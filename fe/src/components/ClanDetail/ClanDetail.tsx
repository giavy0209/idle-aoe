import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import callAPI from "callAPI";
import Button from "components/Button";
import Confirm from "components/Confirm";
import Modal from "components/Modal";
import convertDateAgo from "helpers/convertDateAgo";
import { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeClanDetail, actionChangeShowCreateClan, asyncGetClanDetail, asyncGetClanRequest } from "store/actions/clan";

const ClanDetail: FC = () => {
    const dispatch = useDispatch()
    const [ShowConfirm , setShowConfirm] = useState<any>(null)
    const clanDetail = useSelector((state: any) => state.clanDetail)
    const user = useSelector((state: any) => state.user)
    const isOwner = useMemo(() => {
        if (!clanDetail) return false
        return clanDetail.owner._id === user._id
    }, [clanDetail,user])
    const handleEditClan = () => {
        dispatch(actionChangeShowCreateClan({ show: true, type: 'edit', clan: clanDetail?._id }))
    }
    const handleGetWaitingUser = () => {
        dispatch(asyncGetClanRequest(clanDetail?._id))
    }
    const removeMember = async () => {
        const res = await callAPI.delete(`/clan/user/${ShowConfirm}`)
        if(res.status === 1) {
            toast('Removed 1 member')
            dispatch(asyncGetClanDetail(user?.clan._id))
        }
        setShowConfirm(null)
    }
    return (
        <>
            <Modal onClose={() => dispatch(actionChangeClanDetail(null))} show={clanDetail}  >
                {clanDetail &&
                    <>
                        <div className="clan-detail">
                            {isOwner &&
                                <div className="owner-actions">
                                    <div onClick={handleGetWaitingUser} className="user">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <div onClick={handleEditClan} className="edit">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </div>
                                </div>
                            }
                            <div className="action">

                                <div className="title highlight">Clan Market</div>
                                <div className="title highlight">Leave</div>
                            </div>
                            <div className="title">{clanDetail.name}</div>
                            <div className="description">{clanDetail.description}</div>
                            <div className="exp">EXP : {clanDetail.exp}</div>
                            <div className="exp">Members : {clanDetail.members}/30</div>
                            {clanDetail.website && <div className="website">Chat group : {clanDetail.website}</div>}
                            <div className="members">
                                <div className="head">
                                    <span>User</span>
                                    <span>Population</span>
                                    <span>Last</span>
                                </div>
                                {
                                    clanDetail.users.map(o => <div key={o._id} className="member">
                                        <div className="name">{o._id === clanDetail.owner._id ? 'Leader' : 'Member'} {o.username}</div>
                                        <div className="population">{o.population}</div>
                                        <div className="last">{o.sockets.length > 0 ? 'Now' : convertDateAgo(o.lastOnline) }</div>
                                        {
                                            (isOwner && o._id !== clanDetail.owner._id) && <Button onClick={()=>setShowConfirm(o._id)} text="Request Leave" />
                                        }
                                    </div>)
                                }
                            </div>
                        </div>
                    </>
                }
            </Modal>
            <Confirm onOk={removeMember} onCancel={() => setShowConfirm(null)} show={!!ShowConfirm} title="Are you sure?" message="This member will be remove from your clan" />
        </>
    )
}

export default ClanDetail