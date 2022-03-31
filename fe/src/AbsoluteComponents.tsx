import { Activity, Attack, BattleDetail, BattleReports, Clan, ClanDetail, ClanRequest, CreateClan, Enemy, Market, Tower, Tranning, Upgrade } from "components";
import { FC } from "react";

const AbsoluteComponents: FC = () => {
    return (
        <>
            <Activity />
            <Tower />
            <Market />

            <Upgrade />
            <Tranning />

            <Enemy />
            <Attack />

            <BattleReports />
            <BattleDetail />

            <Clan />
            <ClanDetail />
            <CreateClan />
            <ClanRequest />
        </>
    )
}

export default AbsoluteComponents