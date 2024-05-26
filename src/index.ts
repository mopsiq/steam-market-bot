import fastify from "fastify";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN!);
const port = (process.env.PORT && +process.env.PORT) || 4040;
// const webhook = await bot.createWebhook({ domain: webhookDomain });

const server = fastify({
  logger: true,
});

server.get("/", async (request, reply) => {
  return { message: "Hello, world!" };
});

server.post("/test", async (request, reply) => {
  return { message: "Hello, world!" };
});

server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is listening on ${address}`);
});