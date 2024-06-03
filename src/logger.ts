import pino from "pino";

export const logger = pino({
  level: "debug",
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {},
        level: "debug",
      },
      {
        target: "pino/file",
        options: { destination: `./app.log` },
        level: "debug",
      },
    ],
  },
});
