interface Asset {
  appid: number;
  contextid: string;
  assetid: string;
  classid: string;
  instanceid: string;
  amount: string;
}

export interface SteamInventoryDescription {
  appid: number;
  classid: string;
  instanceid: string;
  currency: number;
  background_color: string;
  icon_url: string;
  icon_url_large: string;
  descriptions: Array<{
    value: string;
    color: string;
  }>;
  tradable: number;
  actions: Array<{
    link: string;
    name: string;
  }>;
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  commodity: number;
  market_tradable_restriction: number;
  market_marketable_restriction: number;
  marketable: number;
  tags: Array<{
    category: string;
    internal_name: string;
    localized_category_name: string;
    localized_tag_name: string;
    color: string;
  }>;
  market_actions: Array<{
    link: string;
    name: string;
  }>;
}

export interface SteamInventory {
  assets: Asset[];
  descriptions: SteamInventoryDescription[];
  total_inventory_count: number;
  success: number;
  rwgrsn: number;
}
