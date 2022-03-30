import callAPI from "callAPI";
import Button from "components/Button";
import Modal from "components/Modal";
import { FC, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionChangeShowTower } from "store/actions";

interface IData {
    unit: string,
    type: string,
    value: number,
    population: number
}

const Tower: FC = () => {
    const dispatch = useDispatch()
    const showTower = useSelector((state: any) => state.showTower)
    const _units = useSelector((state: any) => state.units)
    const tower = useSelector((state: any) => state.buildings?.find(o => o.building.name === 'Tower'))
    const [Data, setData] = useState<IData[]>([])
    const units = useMemo(() => {
        if (!_units) return []
        return _units.filter(o => o.total > 0 || o.inTower > 0)
    }, [_units])

    const usedCapacity = useMemo(() => {
        if (!_units) return 0
        let used = 0
        _units.forEach(o => used += o.unit.population * o.inTower)
        Data.forEach(data => {
            console.log(data);

            if (data.type === 'movein') used += data.population * data.value
        })
        return used
    }, [_units, Data])

    const validInput = (e, value, data) => {
        value = Number(value)
        if (!value && value !== 0) value = 1

        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.class${data._id} input[type='radio']`)

        let checkedType = ''

        inputs.forEach(input => {
            if (input.checked) {
                checkedType = input.getAttribute('value') as string
            }
        })

        let max = 0

        switch (checkedType) {
            case 'movein':
                max = data.total
                break;
            case 'moveout':
                max = data.inTower
                break;
            default:
                break;
        }

        if (value > max) value = max
        e.target.value = value

        if (value > 0) {
            const findData = Data.find(o => o.unit === data._id)
            if (findData) {
                findData.value = value
            } else {
                Data.push({
                    unit: data._id,
                    type: checkedType,
                    value: value,
                    population: data.unit.population
                })
            }
        } else {
            const findData = Data.findIndex(o => o.unit === data._id)
            Data.splice(findData, 1)
        }
        setData([...Data])
    }

    const onChangeChecked = (id) => {
        const input = document.getElementById(`input${id}`) as HTMLInputElement
        input.value = '0'

        const findData = Data.findIndex(o => o.unit === id)
        if (findData !== -1) {
            Data.splice(findData, 1)
            setData([...Data])
        }
    }

    const moveUnit = async () => {
        const res = await callAPI.patch('/units', { data: Data })
        if (res.status === 1) {
            toast('Move units successfully')
            setData([])
        }
        if (res.status === 101) {
            toast('Your tower is full')
        }
    }

    const onClose = () => {
        dispatch(actionChangeShowTower(false))
        setData([])
    }
    return (
        <Modal show={showTower} onClose={onClose} >
            <div className="tower">
                <div className="title">Tower</div>
                <div className="tower-units">
                    {
                        units.map(o => <div key={o._id} className="tower-unit">
                            <div className="left">
                                <div className="name">{o.unit.name}</div>
                                <p>Defense: {o.total}</p>
                                <p>In Tower : {o.inTower}</p>
                            </div>
                            <div className={`right class${o._id}`}>
                                <div className="row">
                                    <div className="radio">
                                        <input onChange={() => onChangeChecked(o._id)} id={`in${o._id}`} name={o._id} value="movein" type="radio" />
                                        <label htmlFor={`in${o._id}`} className="label">Move To</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="radio">
                                        <input onChange={() => onChangeChecked(o._id)} id={`out${o._id}`} name={o._id} value="moveout" type="radio" />
                                        <label htmlFor={`out${o._id}`} className="label">Move Out</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input">
                                        <input id={`input${o._id}`} type="number" onChange={(e) => validInput(e, e.target.value, o)} />
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
                <div className="capacity">
                    <div className="used" style={{ width: `${usedCapacity / tower.value * 100}px` }}></div>
                    <span>{usedCapacity}/{tower.value}</span>
                </div>
                <Button text="Move" onClick={moveUnit} />
            </div>
        </Modal>
    )
}

export default Tower