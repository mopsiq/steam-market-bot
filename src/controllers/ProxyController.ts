import { proxyGenerator } from "../utils/proxyGenerator";
import { DEFAULT_PROXY_URL, PROXY_LIST_PATH } from "../constants";
import { logger } from "../logger";
import { IProxy } from "../types/IProxy";

class ProxyController {
  private proxyList: IProxy[] = [];

  constructor(path: string) {
    this.proxyList = proxyGenerator(path);
  }

  public getProxy() {
    const proxy = this.proxyList.reduce((prev, current) => {
      return prev.usageCounter < current.usageCounter ? prev : current;
    }, this.proxyList[0]);

    if (!proxy) {
      logger.debug(
        `Used proxy: ${DEFAULT_PROXY_URL}. Counter: none, Last used: none, Index: none`
      );

      return DEFAULT_PROXY_URL;
    }

    this.proxyList[proxy.index].usageCounter++;
    this.proxyList[proxy.index].lastUsed = Date.now();
    logger.debug(
      `Used proxy: ${proxy.url}. Counter: ${proxy.usageCounter}, Last used: ${proxy.lastUsed}, Index: ${proxy.index}`
    );

    return proxy.url;
  }
}

export const Proxy = new ProxyController(PROXY_LIST_PATH);
