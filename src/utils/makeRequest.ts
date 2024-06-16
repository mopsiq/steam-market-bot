import { fetch, HeadersInit, ProxyAgent } from "undici";
import { Proxy } from "../controllers/ProxyController";

export const makeRequest = async <T>(
  requestURL: string,
  headers?: HeadersInit
): Promise<T | null> => {
  const res = await fetch(requestURL, {
    dispatcher: new ProxyAgent(Proxy.getProxy()),
    headers,
  });

  if (res.headers && res.headers.get("content-type") === "text/html") {
    return (await res.text()) as T;
  }

  return (await res.json()) as T;
};
