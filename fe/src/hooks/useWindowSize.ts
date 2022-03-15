import { useEffect, useState } from "react";

export default function useWindowSize () {
    const [Size, setSize] = useState({width : 0 , height : 0})
    useEffect(() => {
        setSize({
            width : window.innerWidth,
            height : window.innerHeight
        })
        window.onresize = () => {
            setSize({
                width : window.innerWidth,
                height : window.innerHeight
            })
        }
        return () => {
            window.onresize = () => {}
        }
    },[])
    return Size
}