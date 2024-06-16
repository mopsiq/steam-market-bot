import { SteamHistoryPrices, ISteamHistoryPriceStats } from "../types/steam";

export const getHistoryPriceStats = (
  stats: SteamHistoryPrices[]
): ISteamHistoryPriceStats => {
  const prices = stats.map((p) => p[1]);
  const maxValue = Number(Math.max(...prices).toFixed(2));
  const minValue = Number(Math.min(...prices).toFixed(2));
  const lastValue = Number(prices[prices.length - 1].toFixed(2));
  const changedValue = Number((lastValue - prices[0]).toFixed(2));

  return {
    status: changedValue > 0 ? "increased" : "decreased",
    max: maxValue,
    min: minValue,
    last: lastValue,
    changedByPeriod: {
      value: changedValue,
      percentage: Number(
        (((lastValue - prices[0]) / prices[0]) * 100).toFixed(2)
      ),
    },
  };
};
