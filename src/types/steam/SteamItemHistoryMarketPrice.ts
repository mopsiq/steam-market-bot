/**
 * Example of the price stats:
 * ['Jun 28 2024 11: +0', 8.60, '1']
 * @date - 'Jun 28 2024 11: +0'
 * @price - 8.60
 * @volume - '1'
 *
 */
export type SteamHistoryPrices = [string, number, string];

export interface SteamItemHistoryMarketPrice {
  success: boolean;
  price_prefix: string;
  price_suffix: string;
  prices: SteamHistoryPrices[];
}
