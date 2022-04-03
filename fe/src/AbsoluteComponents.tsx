import { Activity, Attack, BattleDetail, BattleReports, Castles, Clan, ClanDetail, ClanMarket, ClanRequest, CreateClan, Enemy, Market, MarketOffer, Tower, Tranning, Upgrade } from "components";
import { FC } from "react";

const AbsoluteComponents: FC = () => {
    return (
        <>
            <Castles />
            <Activity />
            <Tower />

            <Market />
            <MarketOffer />

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
            <ClanMarket />
        </>
    )
}

export default AbsoluteComponents