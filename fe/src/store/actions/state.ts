export const CHANGE_LOADING = 'CHANGE_LOADING'

export const actionChangeLoading = function (isLoading) {
    return {
        type : CHANGE_LOADING,
        payload : {isLoading}
    }
}

export const CHANGE_ARMY = 'CHANGE_ARMY'

export const actionChangeArmy = function (isArmy) {
    return {
        type : CHANGE_ARMY,
        payload : {isArmy}
    }
}

export const CHANGE_SHOW_BUILDING = 'CHANGE_SHOW_BUILDING'

export const actionChangeShowBuilding = function (isShowBuilding) {
    return {
        type : CHANGE_SHOW_BUILDING,
        payload : {isShowBuilding}
    }
}

export const CHANGE_BUILDING_TYPE = 'CHANGE_BUILDING_TYPE'

export const actionChangeBuildingType = function (buildingType) {
    return {
        type : CHANGE_BUILDING_TYPE,
        payload : {buildingType}
    }
}

export const CHANGE_UNIT_TYPE = 'CHANGE_UNIT_TYPE'

export const actionChangeUnitType = function (unitType) {
    return {
        type : CHANGE_UNIT_TYPE,
        payload : {unitType}
    }
}



export const CHANGE_MODAL_ACTIVITY = 'CHANGE_MODAL_ACTIVITY'

export const actionChangeModalActivity = function (modalActivity) {
    return {
        type : CHANGE_MODAL_ACTIVITY,
        payload : {modalActivity}
    }
}
