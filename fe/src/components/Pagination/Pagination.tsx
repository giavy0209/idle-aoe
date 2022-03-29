import { FC, useMemo, useState } from "react";

interface IPagination {
    item? : number,
    total? : number,
    current? : number
}

const Pagination : FC<IPagination> = ({
    item = 10,
    total = 0,
    current = 1,
}) => {
    const [TotalPage, setTotalPage] = useState()
    const pages = useMemo(() => {
        const totalPage = Math.ceil(total / item)
        return Array.from({length: totalPage}, (_, i) => i + 1)
    },[total, item])
    console.log(pages);
    
    return (
        <>
        <div className="pagination">
            {
                pages.map(o => <div className="page">{o}</div> )
            }
        </div>
        </>
    )
}

export default Pagination