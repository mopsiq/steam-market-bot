import dotenv from "dotenv";
dotenv.config();

export const STEAM_API_KEY = process.env.STEAM_API_KEY;
export const PROXY_LIST_PATH = process.env.PROXY_LIST_PATH || "";
export const DEFAULT_PROXY_URL = process.env.DEFAULT_PROXY_URL || "";
