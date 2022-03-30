import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Modal from "components/Modal";
import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeClanDetail, actionChangeShowCreateClan } from "store/actions";

const ClanDetail: FC = () => {
    const dispatch = useDispatch()
    const clanDetail = useSelector((state: any) => state.clanDetail)
    const user = useSelector((state: any) => state.user)
    const isOwner = useMemo(() => {
        if (!clanDetail) return false
        return clanDetail.owner._id === user._id
    }, [clanDetail])
    const handleEditClan = () => {
        dispatch(actionChangeShowCreateClan({ show: true, type: 'edit' , clan : clanDetail._id }))
    }
    return (
        <>
            <Modal onClose={() => dispatch(actionChangeClanDetail(null))} show={clanDetail}  >
                {clanDetail &&
                    <>
                        <div className="clan-detail">
                            {   isOwner &&
                                <div onClick={handleEditClan} className="edit">
                                    <FontAwesomeIcon icon={faEdit} />
                                </div>
                            }
                            <div className="title">{clanDetail.name}</div>
                            <div className="description">{clanDetail.description}</div>
                            <div className="exp">EXP : {clanDetail.exp}</div>
                            {clanDetail.website && <div className="website">Chat group : {clanDetail.website}</div>}
                            <div className="members">
                                <div className="head">
                                    <span>Username</span>
                                    <span>Last Online</span>
                                </div>
                                {
                                    clanDetail.users.map(o => <div key={o._id} className="member">
                                        <div className="name">{o._id === clanDetail.owner._id ? 'Leader' : 'Member'} {o.username}</div>
                                        <div className="last">{o.sockets.length > 0 ? 'Now' : o.lastOnline}</div>
                                        {
                                            (isOwner && o._id !== clanDetail.owner._id) && <Button onClick={() => { }} text="Request Leave" />
                                        }
                                    </div>)
                                }
                            </div>
                        </div>
                    </>
                }
            </Modal>
        </>
    )
}

export default ClanDetail