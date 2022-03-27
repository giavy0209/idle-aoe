import goldore from 'assets/images/goldore.webp'
import ironore from 'assets/images/ironore.webp'
import wood from 'assets/images/wood.webp'
import food from 'assets/images/food.webp'
import { FC, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetUpgrade } from 'store/actions'

const _resources : {
    name : string,
    building : string,
    img: any,
}[] = [
    {
        name : 'Gold',
        building : 'Gold Mine',
        img : goldore,
    },
    {
        name : 'Iron',
        building : 'Iron Mine',
        img : ironore,
    },
    {
        name : 'Wood',
        building : 'Lumberjacks',
        img : wood
    },
    {
        name : 'Food',
        building : 'Farms',
        img : food
    }
]

const Resources : FC = function  () {
    const dispatch = useDispatch()
    const stateResources = useSelector((state : any) => state.resources)
    const stateBuildings = useSelector((state : any) => state.buildings)
    const worldSpeed = useSelector((state : any) => state.user?.world.speed)
    
    const resources : any[] = useMemo(() => {
        if(!stateResources) return []
        if(!stateBuildings) return []
        return _resources.map(o => {
            let value = stateResources.find(_state => _state.type.name === o.name)?.value
            const rate = stateBuildings.find(_state => _state.building.name === o.building)?.value
            if((!value && value !== 0) || !rate) return {}
            return {
                building : o.building,
                name : o.name,
                img : o.img,
                value,
                rate
            }
        })
    },[stateResources,stateBuildings])
    
    const handleUpgrade = useCallback((building) => {
        dispatch(asyncGetUpgrade(building))
    },[dispatch])
    return (
        <div id='resources' className="resources">
            {
                resources.map(({name, img,value,rate,building}) => 
                    <div onClick={()=>handleUpgrade(building)} key={name} className="type">
                        <div className="value">{Math.round(value)}</div>
                        <img src={img} alt="" />
                        <div className="name">{name}</div>
                        <div className="rate">{rate * worldSpeed}/h</div>
                    </div>
                )
            }
        </div>
    )
}

export default Resources