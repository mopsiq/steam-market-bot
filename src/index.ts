import { fastify } from "fastify";
import formBody from "@fastify/formbody";
import fastifyMiddie from "@fastify/middie";
import { Bot, webhookCallback } from "grammy";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = (process.env.PORT && +process.env.PORT) || 6050;
const token = process.env.TELEGRAM_BOT_TOKEN as string;
const bot = new Bot(token);
// const bot = new Bot(token, {
//   client: { apiRoot: "https://steam-market-bot.onrender.com" },
// });

bot.command("start", (ctx) => {
  console.log("ctx", ctx);
  return ctx.reply("Welcome! Up and running.");
});

bot.on("message", (ctx) => {
  const chatId = ctx.msg.chat.id;
  const text = "Hello, world!";
});

// const app = express();
// app.use(express.json());
// app.use(webhookCallback(bot, "express"));

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

const server = fastify({
  logger: true,
});
server.register(formBody);
// await server.register(fastifyMiddie);
// server.use(webhookCallback(bot, "fastify"));

server.post("/new-message", async (request, reply) => {
  return { message: "Hello, it's a new message!" };
});

server.post(`/${token}`, webhookCallback(bot, "fastify"));

server.listen({ port, host: "0.0.0.0" }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  await bot.api.setWebhook(`https://steam-market-bot.onrender.com/${token}`);
  console.log(`Server is listening on ${address}`);
});
