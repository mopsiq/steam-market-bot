import { fastify } from "fastify";
import formBody from "@fastify/formbody";
import { Bot, webhookCallback } from "grammy";
import dotenv from "dotenv";
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
  logger: true,
});
server.register(formBody);

server.post(`/${token}`, webhookCallback(bot, "fastify"));

server.listen({ port, host: "0.0.0.0" }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  await bot.api.setWebhook(`https://steam-market-bot.onrender.com/${token}`);
  console.log(`Server is listening on ${address}`);
});
