import callAPI from "callAPI";
import Modal from "components/Modal";
import secondsToTime from "helpers/secondsToTime";
import { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeEnemy, actionChangeShowAttack } from "store/actions/battle";
import { actionChangeLoading } from "store/actions/state";

const options: number[] = []

for (let index = 1; index <= 10; index++) {
    options.push(index / 10)
}
const Attack: FC = () => {
    const _units = useSelector((state: any) => state.units)
    const showAttack = useSelector((state: any) => state.showAttack)
    const worldSpeed = useSelector((state: any) => state.user?.world.speed)
    const currentCastle = useSelector((state: any) => state.currentCastle)
    const dispatch = useDispatch()
    const [Units, setUnits] = useState<any[]>([])
    const [AttackSpeed, setAttackSpeed] = useState<number>(1)
    const validInput = (e, value, max, _unit) => {
        value = Number(value)
        if (!value && value !== 0) value = 1
        if (value > max) value = max
        e.target.value = value

        if (value > 0) {
            const findUnit = Units.find(o => o._id === _unit._id)
            if (findUnit) {
                findUnit.total = value
                setUnits([...Units])
            } else {
                Units.push({
                    ..._unit,
                    total: value
                })
                setUnits([...Units])
            }
        }
        if (value === 0) {
            const findUnit = Units.findIndex(o => o._id === _unit._id)
            Units.splice(findUnit, 1)
            setUnits([...Units])
        }
    }

    const units = useMemo(() => {
        if (!_units || !showAttack) return []
        return _units.filter(o => {
            if (showAttack.type === 1) return o.total > 0
            if (showAttack.type === 2) return o.unit.name === 'Quickwalker' && o.total > 0
            return false
        })
    }, [_units, showAttack])

    const slowestUnit = useMemo(() => {
        let slowest = 0
        Units.forEach(unit => {
            if (unit.unit.speed > slowest) slowest = unit.unit.speed
        })
        return slowest
    }, [Units])

    const handleSetMin = (e, _unit) => {
        const input = e.target.parentElement.parentElement.querySelector('input')
        input.value = 0
        const findUnit = Units.findIndex(o => o._id === _unit._id)
        if (findUnit !== -1) {
            Units.splice(findUnit, 1)
            setUnits([...Units])
        }
    }
    const handleSetMax = (e, _unit) => {
        const input = e.target.parentElement.parentElement.querySelector('input')
        input.value = _unit.total

        const findUnit = Units.find(o => o._id === _unit._id)
        if (_unit.total > 0) {
            if (findUnit) {
                findUnit.total = _unit.total
                setUnits([...Units])
            } else {
                Units.push({
                    ..._unit,
                    total: _unit.total
                })
                setUnits([...Units])
            }
        }
    }
    const handleSubmitForm = async e => {
        e.preventDefault()
        dispatch(actionChangeLoading(true))
        const res = await callAPI.post(`/marching?type=${showAttack.type}`, {
            units: Units,
            movingSpeed: AttackSpeed,
            target: showAttack._id,
            fromCastle : currentCastle?._id
        })
        dispatch(actionChangeLoading(false))
        if (res.status === 101) toast('You are not select any unit', { type: 'error' })
        if (res.status === 1) toast('Send army success', { type: 'success' })
        dispatch(actionChangeShowAttack(null))
        dispatch(actionChangeEnemy(null))
        setUnits([...[]])
    }

    const handleSelectAll = () => {
        const selectedUnits: any = []
        units.forEach(unit => {
            selectedUnits.push({
                ...unit,
            })
            const input: any = document.querySelector(`.row input[data-name="${unit.unit.name}"]`)

            if (input) {
                input.value = unit.total
            }
        })
        setUnits([...selectedUnits])
    }

    const handleSelectNone = () => {
        setUnits([...[]])
        const inputs = document.querySelectorAll('.row input')
        inputs.forEach((input: any) => {
            input.value = 0
        })
    }

    const onClose = () => {
        dispatch(actionChangeShowAttack(null))
        setUnits([...[]])
    }
    return (
        <>
            {showAttack && <div className="attack">
                <div onClick={() => dispatch(actionChangeShowAttack(null))} className="mask"></div>

            </div>}
            <Modal onClose={onClose} show={!!showAttack}>
                <div className="attack">
                    <div className="list-units">
                        <div className="title">{showAttack?.type === 1 ? 'Attack' : 'Spy'} {showAttack?.username}</div>
                        {units?.length ? <div className="select">
                            <div onClick={handleSelectAll} className="all">Select all</div>
                            <div onClick={handleSelectNone} className="none">Unselect all</div>
                        </div> : null}
                        <form onSubmit={handleSubmitForm} action="">
                            {
                                units?.length ? units.map(o => <div key={o._id} className="unit">
                                    <div className="row">
                                        <div className="info">
                                            <div className="name">{o.unit.name} </div>
                                            <div className="total">Total: {o.total}</div>
                                            <div className="speed">Speed: {o.unit.speed}</div>
                                            <div className="cargo">Cargo: {o.unit.cargo}</div>
                                        </div>
                                        <div className="input">
                                            <div className="min-max">
                                                <span onClick={e => handleSetMin(e, o)}>Min</span>
                                                <span onClick={e => handleSetMax(e, o)}>Max</span>
                                            </div>
                                            <input data-name={o.unit.name} defaultValue={0} onChange={e => validInput(e, e.target.value, o.total, o)} type="number" name={o._id} />
                                        </div>
                                    </div>
                                </div>)
                                :
                                <p className="no-unit">You have no unit</p>
                            }
                            {
                                units.length > 0 ?
                                    <>
                                        <div className="attack-speed">
                                            <span>Moving Speed:</span>
                                            <select defaultValue={1} onChange={e => setAttackSpeed(Number(e.target.value))} name="" id="">
                                                {
                                                    options.map(o => <option key={o} value={o}>{o * 100}%</option>)
                                                }
                                            </select>
                                        </div>
                                        <div className="moving-time">Moving Time : {secondsToTime(slowestUnit * 60 / AttackSpeed / worldSpeed)}</div>
                                        <button>{showAttack.type === 1 ? 'Attack' : 'Spy'}</button>
                                    </>
                                    :
                                    null
                            }
                        </form>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default Attack