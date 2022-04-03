import callAPI from "callAPI"
export const CHANGE_SHOW_MARKET_OFFER = 'CHANGE_SHOW_MARKET_OFFER'

export const actionChangeShowMarketOffer = function (showMarketOffer) {
    return {
        type: CHANGE_SHOW_MARKET_OFFER,
        payload: { showMarketOffer }
    }
}

export const CHANGE_MARKET_OFFER = 'CHANGE_MARKET_OFFER'

export const actionChangeMarketOffer = function (marketOffer) {
    return {
        type: CHANGE_MARKET_OFFER,
        payload: { marketOffer }
    }
}

export const asyncGetMarketOffer = (castle?: string) => async dispatch => {
    const { data } = await callAPI.get(`/market${castle ? '?castle=' + castle : ''}`)
    dispatch(actionChangeMarketOffer(data))
}

export const CHANGE_CLAN_MARKET = 'CHANGE_CLAN_MARKET'

export const actionChangeClanMarket = function (clanMarket) {
    return {
        type: CHANGE_CLAN_MARKET,
        payload: { clanMarket }
    }
}

export const asyncGetClanMarket = (userId?: string) => async dispatch => {
    const { data } = await callAPI.get(`/market/clan`)
    dispatch(actionChangeClanMarket(data))
}