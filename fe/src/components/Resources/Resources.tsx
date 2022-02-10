

const resources : {
    name : String
}[] = [
    {
        name : 'Gold'
    },
    {
        name : 'Iron'
    },
    {
        name : 'Wood'
    },
    {
        name : 'Food'
    }
]

export default function Resources () {
    return (
        <div className="resources">
            {
                resources.map(({name}) => 
                    <div className="type">
                        <div className="value">100</div>
                        <div className="name">{name}</div>
                        <div className="rate">100/h</div>
                    </div>
                )
            }
        </div>
    )
}