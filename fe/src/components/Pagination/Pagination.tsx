import { FC, useMemo, useState } from "react";

interface IPagination {
    item?: number,
    total?: number,
    current?: number,
    onChange?(page : number): any
}

const Pagination: FC<IPagination> = ({
    item = 10,
    total = 0,
    current = 1,
    onChange = () => { }
}) => {
    const pages = useMemo(() => {
        const totalPage = Math.ceil(total / item)
        return Array.from({ length: totalPage }, (_, i) => i + 1)
    }, [total, item])
    
    return (
        <>
            <div className="pagination">
                {
                    pages.map(o => <div onClick={()=>onChange(o)} className={`page ${o === current ? 'active' : ''}`}> <span>{o}</span> </div>)
                }
            </div>
        </>
    )
}

export default Pagination