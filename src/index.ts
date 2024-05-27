import { fastify } from "fastify";
import formBody from "@fastify/formbody";
import { Bot, webhookCallback } from "grammy";
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

const server = fastify({
  logger: true,
});
server.register(formBody);

server.post("/new-message", async (request, reply) => {
  return { message: "Hello, it's a new message!" };
});

server.post(`/${token}`, webhookCallback(bot, "fastify"));

server.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is listening on ${address}`);
});
