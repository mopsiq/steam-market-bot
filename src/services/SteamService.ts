import { STEAM_API_KEY } from "../constants";
import { makeRequest } from "../utils/makeRequest";
import {
  SteamInventory,
  SteamResponse,
  SteamUser,
  SteamItemMarketPrice,
  SteamItemHistoryMarketPrice,
  MarketTimePresets,
  SteamHistoryPrices,
} from "../types/steam";
import { getMarketPriceSampling } from "../utils/getMarketPriceSampling";

interface SteamInventoryResponse {
  name: string;
  market_hash_name: string;
  market_name: string;
  classid: string;
  tags: Array<{
    category: string;
    internal_name: string;
    localized_category_name: string;
    localized_tag_name: string;
    color: string;
  }>;
}

export class SteamService {
  public static async getSteamIdByURL(steamURL: string) {
    const steamProfileType = steamURL.split("steamcommunity.com")[1];
    const nickname = steamProfileType.split("/")[2];

    if (steamProfileType.match("profiles/")) {
      return nickname;
    }

    const steamID = await makeRequest<SteamResponse<{ steamid: string }>>(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${nickname}`
    );

    return steamID ? steamID.response.steamid : null;
  }

  public static async getUserInfo(steamid: string) {
    if (!steamid) {
      return null;
    }

    const userInfo = await makeRequest<SteamResponse<SteamUser>>(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamid}`
    );

    return userInfo ? userInfo.response.players[0] : null;
  }

  public static async getUserInventory(
    steamid: string,
    appid: number,
    contextid: string,
    count = 5000,
    type = "marketable"
  ): Promise<{
    inventory: SteamInventoryResponse[];
    totalCount: number;
  } | null> {
    if (!steamid) {
      return null;
    }

    const inventory = await makeRequest<SteamInventory>(
      `https://steamcommunity.com/inventory/${steamid}/${appid}/${contextid}?l=english&count=${count}`
    );

    if (!inventory) {
      return null;
    }

    if (inventory.total_inventory_count === 0) {
      return null;
    }

    const response = inventory.descriptions.reduce((acc, item) => {
      if (type === "marketable" && item.marketable === 1) {
        const { name, market_hash_name, market_name, classid, tags } = item;
        acc.push({ name, market_hash_name, market_name, classid, tags });
      }

      return acc;
    }, [] as SteamInventoryResponse[]);

    return { inventory: response, totalCount: response.length };
  }

  public static async getItemMarketPrice(
    appid: number,
    market_hash_name: string,
    currencyNumber = 1
  ): Promise<SteamItemMarketPrice | null> {
    const marketPrice = await makeRequest<SteamItemMarketPrice>(
      `https://steamcommunity.com/market/priceoverview/?currency=${currencyNumber}&appid=${appid}&market_hash_name=${market_hash_name}`
    );

    if (!marketPrice || !marketPrice.success) {
      return null;
    }

    return marketPrice;
  }

  public static async getMarketHistoryPrice(
    appid: number,
    marketHashName: string,
    period: MarketTimePresets
  ): Promise<SteamHistoryPrices[] | null> {
    const marketPriceHistory = await makeRequest<SteamItemHistoryMarketPrice>(
      `https://steamcommunity.com/market/pricehistory/?appid=${appid}&market_hash_name=${marketHashName}`
    );

    if (!marketPriceHistory || !marketPriceHistory.success) {
      return null;
    }

    return getMarketPriceSampling(period, marketPriceHistory.prices);
  }
}
