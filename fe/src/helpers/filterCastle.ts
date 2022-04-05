export default function filterCastle (data : any[] , castle : any) {
    if(!castle) return data
    return data.filter(o => {
        const _castle = o.castle
        if(_castle._id) return _castle._id === castle._id
        return _castle === castle._id
    })
}