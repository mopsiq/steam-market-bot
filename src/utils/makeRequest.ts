import { fetch, ProxyAgent } from "undici";
import { Proxy } from "../controllers/ProxyController";

export const makeRequest = async <T>(requestURL: string): Promise<T | null> => {
  const res = await fetch(requestURL, {
    dispatcher: new ProxyAgent(Proxy.getProxy()),
    headers: {
      Cookie:
        "steamLoginSecure=76561198023328482%7C%7CeyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEVFRl8yNDdGRkVFMF9DRTRDNCIsICJzdWIiOiAiNzY1NjExOTgwMjMzMjg0ODIiLCAiYXVkIjogWyAid2ViOmNvbW11bml0eSIgXSwgImV4cCI6IDE3MTgxMjg1NDksICJuYmYiOiAxNzA5NDAxMjA2LCAiaWF0IjogMTcxODA0MTIwNiwgImp0aSI6ICIwRUU3XzI0ODkzNkVEXzhBQjM3IiwgIm9hdCI6IDE3MTczNDA3MjUsICJydF9leHAiOiAxNzM1NDU5NDYzLCAicGVyIjogMCwgImlwX3N1YmplY3QiOiAiOTEuMTk2LjU1LjExIiwgImlwX2NvbmZpcm1lciI6ICI5MS4xOTYuNTUuMTEiIH0.1EXY7kALu_onDvJW2JeYBKCNa_aV_x4luCjfQGEadnlP0V2d0xaSEmoCf21ZR90qVvBpRISHY9J3VGZ74HDSBw",
    },
  });

  if (res.headers && res.headers.get("content-type") === "text/html") {
    return (await res.text()) as T;
  }

  return (await res.json()) as T;
};
