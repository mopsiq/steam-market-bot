import { readFileSync } from "fs";
import { IProxy } from "../types/IProxy";

export const proxyGenerator = (path: string): IProxy[] => {
  const list = readFileSync(path).toString("utf-8");

  const lines = list.split("\n").filter((l) => l !== "");

  return lines.map((l, index) => {
    const [host, port, user, password] = l.split(":");

    return {
      url: `http://${user}:${password}@${host}:${port}`,
      usageCounter: 0,
      lastUsed: Date.now(),
      index,
    };
  });
};
