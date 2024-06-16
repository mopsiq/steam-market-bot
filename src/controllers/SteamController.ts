import { SteamService } from "../services/SteamService";
import { MarketTimePresets } from "../types/steam";
import { getHistoryPriceStats } from "../utils/getHistoryPriceStats";

export class SteamController {
  static async getHistoryPriceByPeriod(
    appid: number,
    marketHashName: string,
    period: MarketTimePresets
  ) {
    const historyPrice = await SteamService.getMarketHistoryPrice(
      appid,
      marketHashName,
      period
    );

    if (!historyPrice) {
      return null;
    }

    return {
      ...getHistoryPriceStats(historyPrice.prices),
      currency: historyPrice.currency,
    };
  }
}
