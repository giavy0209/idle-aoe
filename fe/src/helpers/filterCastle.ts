export default function filterCastle (data : any[] , castle : any, castleKey? : string) {
    if(!castleKey) castleKey = 'castle'
    if(!castle) return data
    
    return data.filter(o => {
        const _castle = o[castleKey as string]
        if(_castle._id) return _castle._id === castle._id
        return _castle === castle._id
    })
}