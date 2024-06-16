import { SteamHistoryPrices, MarketTimePresets } from "../types/steam";
import DateAPI from "dayjs";

const presets = {
  "1h": () => DateAPI().subtract(1, "hour").toDate(),
  "12h": () => DateAPI().subtract(12, "hour").toDate(),
  "1d": () => DateAPI().subtract(1, "day").toDate(),
  "1w": () => DateAPI().subtract(1, "week").toDate(),
  "1m": () => DateAPI().subtract(1, "month").toDate(),
  lastChanges: () => new Date(Date.now()),
};

export const getMarketPriceSampling = (
  date: MarketTimePresets,
  prices: SteamHistoryPrices[]
) => {
  const currentDate = presets[date]();
  const currentYear = DateAPI(currentDate).format("YYYY");

  const priceByCurrentYear = prices.filter(([priceDate]) => {
    const [, , year] = priceDate.split(" ");
    return year === currentYear;
  });

  if (date === "lastChanges") {
    return [
      priceByCurrentYear[priceByCurrentYear.length - 2],
      priceByCurrentYear[priceByCurrentYear.length - 1],
    ];
  } else {
    const fromInMilliseconds = currentDate.valueOf();
    const toInMilliseconds = DateAPI().valueOf();

    return priceByCurrentYear.filter(([val]) => {
      const [month, day, year, hours] = val.replace(":", "").split(" ");
      const formattedVal = `${month} ${day} ${year}`;

      const milliseconds = new Date(formattedVal).setHours(+hours);

      return (
        milliseconds <= toInMilliseconds && milliseconds >= fromInMilliseconds
      );
    });
  }
};
