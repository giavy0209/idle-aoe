export default interface IBuildingData {
    name : string,
    upgrade : {
        gold : number,
        iron : number,
        wood : number,
        food : number,
        level : number,
        time : number,
        generate : number
    }[],
}