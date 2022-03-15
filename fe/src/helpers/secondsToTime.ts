export default function secondsToTime (seconds : number) {
    if(!seconds) return `00:00:00`
    
    let s = seconds.toString()
    if(s.length < 2) s = `0${s}`
    if(seconds < 60) return `00:00:${s}`

    const mins = Math.floor(seconds / 60)
    let m = mins.toString()
    if(m.length < 2) m = `0${m}`
    s = (seconds % 60).toString()
    if(s.length < 2) s = `0${s}`

    if(mins < 60) return `00:${m}:${s}`

    const hours = Math.floor(mins/60)
    let h = hours.toString()
    if(h.length < 2) s = `0${h}`

    m = (mins % 60).toString()
    if(m.length < 2) m = `0${m}`
    return `${h}:${m}:${s}`


}