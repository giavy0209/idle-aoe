import callAPI from "callAPI";
import Button from "components/Button";
import Modal from "components/Modal";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeClan, actionChangeShowCreateClan } from "store/actions/clan";

const Clan : FC = () => {
    const dispatch = useDispatch()

    const clan = useSelector((state : any) => state.clan)
    const handleCreateClan = () => {
        dispatch(actionChangeShowCreateClan({show : true , type : 'create'}))
    }
    const handleRequestJoin =async id => {
        const res = await callAPI.post(`/clan/join/${id}`, {})
        if(res.status === 101) {
            toast('You have already request to join this clan')
        }
        if(res.status === 1) {
            toast('Apply to clan successfully')
        }
    }
    return (
        <>
            <Modal show={clan} onClose={()=>dispatch(actionChangeClan(null))}>
                <div className="clans">
                    <Button text="Create Clan" onClick={handleCreateClan} />
                    {
                        clan?.length > 0 ? clan.map(o => <div key={o._id} className="clan">
                            <div className="row">
                                <span>Owner: </span>
                                <span>{o.owner.username}</span>
                            </div>
                            <div className="row">
                                <span>Name:</span>
                                <span>{o.name}</span>
                            </div>
                            {o.description && <div className="row">
                                <span>Description:</span>
                                <span>{o.description}</span>
                            </div>}
                            {o.website && <div className="row">
                                <span>Group chat:</span>
                                <span>{o.website}</span>
                            </div>}
                            <div className="row">
                                <span>Min Population:</span>
                                <span>{o.minPopulation}</span>
                            </div>
                            <Button onClick={()=>handleRequestJoin(o._id)} text="Join" />
                        </div> )
                        :
                        <p>No clan available</p>
                    }
                </div>
            </Modal>
        </>
    )
}

export default Clan