import Modal from "components/Modal";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeClanDetail } from "store/actions";

const ClanDetail: FC = () => {
    const dispatch = useDispatch()
    const clanDetail = useSelector((state: any) => state.clanDetail)
    console.log(clanDetail);

    return (
        <>
            <Modal onClose={() => dispatch(actionChangeClanDetail(null))} show={clanDetail}  >
                {   clanDetail &&
                    <>
                        <div className="clan-detail">
                            <div className="title">{clanDetail.name}</div>
                            <div className="description">{clanDetail.description}</div>
                            {clanDetail.website && <div className="website">Chat group : {clanDetail.website}</div>}
                        </div>
                        <div className="members">
                            {
                                clanDetail.users.map(o => <div className="members">
                                    
                                </div> )
                            }
                        </div>
                    </>
                }
            </Modal>
        </>
    )
}

export default ClanDetail