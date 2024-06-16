import dotenv from "dotenv";
dotenv.config();

export const STEAM_API_KEY = process.env.STEAM_API_KEY;
export const PROXY_LIST_PATH = process.env.PROXY_LIST_PATH || "";
export const DEFAULT_PROXY_URL = process.env.DEFAULT_PROXY_URL || "";
export const STEAM_SESSION_USER_LOGIN =
  process.env.STEAM_SESSION_USER_LOGIN || "";
export const STEAM_SESSION_USER_PASSWORD =
  process.env.STEAM_SESSION_USER_PASSWORD || "";
export const STEAM_SESSION_LOGIN_SECURE =
  process.env.STEAM_SESSION_LOGIN_SECURE || "";
