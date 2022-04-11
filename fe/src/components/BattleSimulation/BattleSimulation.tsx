import Modal from "components/Modal";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeBattleSimulation } from "store/actions/battle";

const BattleSimulation : FC = () => {
    const dispatch = useDispatch()
    const battleSimulation = useSelector((state: any) => state.battleSimulation)
    const [CurrentRound, setCurrentRound] = useState<{[key : string] : any}>({})
    console.log(battleSimulation);
    
    return (
        <>
        <Modal show={!!battleSimulation} onClose={()=>dispatch(actionChangeBattleSimulation(null))} >
            <div className="battle-simulation">

            </div>
        </Modal>
        </>
    )
}

export default BattleSimulation