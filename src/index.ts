// // import fastify from "fastify";
// // import { Telegraf } from "telegraf";

// // const bot = new Telegraf(process.env.BOT_TOKEN!);
// // const port = (process.env.PORT && +process.env.PORT) || 4040;
// // // let webhook;
// // // const webhook = await bot.createWebhook({
// // //   domain: "https://steam-market-bot.onrender.com",
// // // });

// // const server = fastify({
// //   logger: true,
// // });

// // server.get("/", async (request, reply) => {
// //   return { message: "Hello, world!" };
// // });

// // server.post("/test", async (request, reply) => {
// //   return { message: "Hello, world!" };
// // });

// // server.listen({ port, host: "0.0.0.0" }, (err, address) => {
// //   if (err) {
// //     console.error(err);
// //     process.exit(1);
// //   }
// //   console.log(`Server is listening on ${address}`);
// // });

// import { fastify } from "fastify";
// import { Telegraf } from "telegraf";
// import dotenv from "dotenv";
// dotenv.config();

// // Rest of the code...
// const port = (process.env.PORT && +process.env.PORT) || 6050;
// // console.log("process.env.TELEGRAM_BOT_TOKEN:", process.env.TELEGRAM_BOT_TOKEN);
// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
// const app = fastify();

// bot.on("text", (ctx) => ctx.reply("Hello"));

// bot
//   .launch({
//     webhook: { domain: "https://steam-market-bot.onrender.com", port: 2030 },
//   })
//   .then(() => console.log("Webhook bot listening on port", port));

// const server = fastify({
//   logger: true,
// });

// server.get("/", async (request, reply) => {
//   return { message: "Hello, world!" };
// });

// server.post("/new-message", async (request, reply) => {
//   return { message: "Hello, it's a new message!" };
// });

// server.listen({ port, host: "0.0.0.0" }, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server is listening on ${address}`);
// });

import { fastify } from "fastify";
import { Bot, webhookCallback } from "grammy";
import dotenv from "dotenv";
dotenv.config();

const port = (process.env.PORT && +process.env.PORT) || 6050;
const token = process.env.TELEGRAM_BOT_TOKEN as string;
const bot = new Bot(token);

bot.command("start", (ctx) =>
  ctx.reply("Welcome! Up and running with webhook.")
);
bot.on("message", (ctx) => ctx.reply("It's replaced message!"));

const server = fastify({
  logger: true,
});

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
