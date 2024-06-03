import { request } from "undici";

export const makeRequest = async <T>(requestURL: string): Promise<T | null> => {
  const { headers, body } = await request(requestURL);

  if (headers && headers["content-type"] === "text/html") {
    return body.text() as T;
  }

  return body.json() as T;
};
