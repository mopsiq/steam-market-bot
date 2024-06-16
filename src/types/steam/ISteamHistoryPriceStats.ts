export interface ISteamHistoryPriceStats {
  status: "increased" | "decreased";
  max: number;
  min: number;
  last: number;
  changedByPeriod: {
    value: number;
    percentage: number;
  };
}
