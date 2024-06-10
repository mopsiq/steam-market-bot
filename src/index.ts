import { FastifyRequest, fastify } from "fastify";
import formBody from "@fastify/formbody";
import { Bot, webhookCallback } from "grammy";
import dotenv from "dotenv";
import { SteamService } from "./services/SteamService";
import { logger } from "./logger";
dotenv.config();

const port = (process.env.PORT && +process.env.PORT) || 6050;
const token = process.env.TELEGRAM_BOT_TOKEN as string;
const bot = new Bot(token);

bot.command("start", (ctx) => {
  console.log("ctx", ctx);
  return ctx.reply("Welcome! Up and running.");
});

bot.on("message", (ctx) => {
  const chatId = ctx.msg.chat.id;
  const text = "Hello, world!";
  return ctx.reply(text);
});

const server = fastify({
  logger,
});
server.register(formBody);

server.post(`/${token}`, webhookCallback(bot, "fastify"));

server.post(
  "/test",
  async (req: FastifyRequest<{ Body: { url: string } }>, res) => {
    const { url } = req.body;
    console.log("server.post ~ url:", url);

    const steamid = await SteamService.getSteamIdByURL(url);
    if (!steamid) return;
    res.send(steamid);
    // const priceHistory = await SteamService.getMarketHistoryPrice(
    //   730,
    //   "eSports 2014 Summer Case",
    //   "12h"
    // );
    // console.log("priceHistory:", priceHistory);
    // res.send(priceHistory);
  }
);

server.listen({ port, host: "0.0.0.0" }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  await bot.api.setWebhook(`https://steam-market-bot.onrender.com/${token}`);
});

// bot.start(); // only for dev mode
