import { Army, Building, Buildings, Queue, Units } from "components";
import { FC } from "react";

const FixedComponents: FC = () => {
    return (
        <>
            <Queue />
            <Buildings />
            <Building />
            <Army />
            <Units />
        </>
    )
}

export default FixedComponents