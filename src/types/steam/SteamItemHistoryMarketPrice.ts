export type SteamHistoryPrices = [string, number, string];

export interface SteamItemHistoryMarketPrice {
  success: boolean;
  price_prefix: string;
  price_suffix: string;
  prices: SteamHistoryPrices[];
}
