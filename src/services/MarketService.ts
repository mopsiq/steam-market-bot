import { MarketTimePresets, SteamHistoryPrices } from "../types/steam";
import { getHistoryPriceStats } from "../utils/getHistoryPriceStats";
import { getMarketPriceSampling } from "../utils/getMarketPriceSampling";
import { SteamService } from "./SteamService";

export class MarketService {
  public static getMarketHistoryByPeriod(
    period: MarketTimePresets,
    priceHistory: SteamHistoryPrices[]
  ) {
    if (!period || !priceHistory) {
      return null;
    }

    return { prices: getMarketPriceSampling(period, priceHistory) };
  }

  public static async getMarketItemStats(
    appid: number,
    marketHashName: string,
    period: MarketTimePresets
  ) {
    if (!period || !marketHashName || !appid) {
      return null;
    }

    const priceHistory = await SteamService.getMarketHistoryPrice(
      appid,
      marketHashName
    );

    if (!priceHistory) {
      return null;
    }

    const pricesByPeriod = MarketService.getMarketHistoryByPeriod(
      period,
      priceHistory.prices
    );

    if (!pricesByPeriod) {
      return null;
    }

    return { stats: getHistoryPriceStats(pricesByPeriod.prices) };
  }
}
