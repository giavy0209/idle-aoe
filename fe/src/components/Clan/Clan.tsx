import Button from "components/Button";
import Modal from "components/Modal";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeClan, actionChangeShowCreateClan } from "store/actions";

const Clan : FC = () => {
    const dispatch = useDispatch()
    const clan = useSelector((state : any) => state.clan)
    const handleCreateClan = () => {
        dispatch(actionChangeShowCreateClan(true))
    }
    return (
        <>
            <Modal show={clan} onClose={()=>dispatch(actionChangeClan(null))}>
                <div className="clans">
                    <Button text="Create Clan" onClick={handleCreateClan} />
                    {
                        clan?.length > 0 ? clan.map(o => <div className="clan">
                            
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