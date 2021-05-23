---
title: Telegram speech to text bot with Node.js
excerpt: How to combine Telegram Bot API with a speech recognition service to transcribe voice messages to text.
keywords: [Node.js, DIY]
date: '2020-03-16T05:35:07.322Z'
---

# Telegram speech to text bot with Node.js

## Background

High speed and no advertising makes Telegram maybe one the best options for online communication in 2021. Their team is constantly evolving the user experience and introducing really nice features that I’m always excited to try. Nevertheless, I’m very conservative towards one particular feature - voice messages. Just as it’s convenient for the sender to send a message using their voice so it may be hard and painful for others to check what their beloved friend wants to tell them. Especially in a noisy or rather completely silent environment.

So I asked myself what if I could make my life easier and create a Telegram bot that will transcribe for me these wonderful voice messages into text?

I realized almost immediately that this idea is not new and there are already many existing bots which do this. And furthermore all voice recognition services are payment required although some of them provide trial versions.
But then I thought that this might be a nice opportunity to write my own Telegram bot and see how easily we can customise our own experience with Telegram. So enough talk and let’s see how it can be done with Node.js.

## Initialize bot with BotFather
Before starting to write code we need to initialize our bot. Fortunately Telegram provides a friendly way to do this by using [BotFather](https://t.me/botfather). The documentation is very clear on this process so you can [check it](https://core.telegram.org/bots#3-how-do-i-create-a-bot) for more details.

After we choose our bot’s name and username, BotFather will give us an access token for Telegram HTTP API which we’ll need to use in our Node.js application. We should not forget also to switch the privacy mode off to make our bot automatically process voice messages from group chats. Send the `/setprivacy` command to BotFather, choose the new bot, click `Disable` and you’re done.

It’s worth quickly recapping the idea of our bot. The functionality will be very simple: when someone sends a voice message to the chat the bot will automatically ship it to the voice recognition service and then reply to the chat with the transcribed text. Quite simple, right?
Now we’re ready to open the code editor.

## Project setup

Let’s create a new project for our future bot. Create a new file in the `src` folder and call it `index.ts`. For now let's just log something:

**src/index.ts**

```typescript
console.log("Hello");
```

As you can see we’re going to use TypeScript. Let’s install it together with ts-node which will allow us to run the code without compilation:

```bash
npm i -D typescript ts-node
```

To create the `tsconfig.json` file in our project run `npx typescript --init` command. The final version of configuration will look like this

**tsconfig.json**

```json
{
  "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "outDir": "dist",
      "typeRoots": ["./node_modules/@types", "./typings"]
    },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"],
  "ts-node": {
    "files": true
  }
}
```

Let’s add nodemon to watch the changes in our code during local development:

```bash
npm -i D nodemon
```

We need to customize its configuration to make it work with TypeScript:

**package.json**

```diff
{
+  "nodemonConfig": {
+    "watch": ["src"],
+    "ext": "ts,json",
+    "exec": "ts-node ./src/index.ts"
  }
}
```

Add ESLint so our codestyle stays consistent:

```bash
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**package.json**

```diff
{
+  "eslintConfig": {
+    "root": true,
+    "parser": "@typescript-eslint/parser",
+    "plugins": [
+      "@typescript-eslint"
+    ],
+    "extends": [
+      "eslint:recommended",
+      "plugin:@typescript-eslint/recommended"
+    ],
+    "rules": {
+      "semi": "error",
+      "indent": [ "error", 2 ],
+     "quotes": [ "error", "single" ]
+    }
+  }
}
```

The next step is to set up the Docker image with multi-stage builds together with docker-compose. This will drastically improve both development and deployment of our bot, especially since we use TypeScript which has a dedicated compilation phase. There is a lot of material, including [official documentation](https://docs.docker.com/develop/develop-images/multistage-build/), on how Docker multi-stage builds work.

> Make sure you have docker and docker-compose installed on your machine.

In our case, we use `base` stage to install production dependencies and `dev` to install development dependencies. Because we’re gonna run already compiled code in production, we don’t need `typescript` and other development packages like `eslint` there. We compile the code in a separate `build` stage and copy the final code to `prod`. The main benefit of this technique is that it exponentially reduces the size of our production image and allows us to work with a single `Dockerfile` in all environments.

The final thing we need to do is to create `docker-compose.yml.dev` to run our telegram bot locally. As we don’t use any additional services like databases etc. this file will be quite straightforward:

**docker-compose.yml.dev**

```yaml
version: '3.8'
services:
 bot:
   env_file: .env
   build:
     context: .
     target: dev
   volumes:
     - .:/app:delegated
```
 
Have you noticed the `target` property? Yes, it points to the `dev` stage in our Docker image which we were discussing just a moment ago. Now we can run our project locally:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

## Create bot instance

Finally we got the actual bot implementation code. We will use [Telegraf](https://github.com/influxdata/telegraf ) - the most popular Telegram bot framework for Node.js. Let's install it

```bash
npm i telegraf
```

Install `dotenv` to get access to the environment variables. One of them will be the API key that we got from BotFather a while back so don’t forget to store it in your `.env` file. Also we may want to add global.d.ts to populate the global namespace with the environment variables we’ll be using in our project

**src/global.d.ts**

```typescript
declare global {
 namespace NodeJS {
   interface ProcessEnv {
     BOT_TOKEN: string;
     SUBSCRIPTION_KEY: string;
   }
 }
}
 
export {};
```

Now we’re ready to create the bot instance:

```typescript
import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.on('text', async ctx => {
  ctx.telegram.sendMessage(ctx.message.chat.id, 'pong');
});

bot.launch();
```

`Telegraf` class implements event emitter API so in order to handle `voice` events we simply add an asynchronous function as event listener. It has the `ctx` object as an argument which we can use for Telegram API requests. For example, to send a message to the user we can the `ctx.telegram.sendMessage(chatId, message)` method. To start our bot run `bot.launch()`. Now if we try to send a text message we'll get a response:
![Get the first response from the bot](/assets/blog/telegram-speech-to-text-bot-with-nodejs/ping-pong.png)

In our case we want to handle **voice** event. Context object also encapsulates update event data such as client details, chat information, message data etc. We can retrieve the voice message as well. Telegram returns a link to the audio file so to get an actual bytes of data we need to make a separate request. For that we can use `axios`:

**src/index.ts**

```diff
- const bot = new Telegraf(process.env.BOT_TOKEN);
- bot.on('text', async ctx => {
-   ctx.telegram.sendMessage(ctx.message.chat.id, 'pong');
- });

+ bot.on('voice', async ctx => {
+   try {
+      const { href: fileUrl } = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
+      const { data: voiceMessageStream } = await axios(fileUrl, { responseType: 'stream' });
+   } catch (error) {
+      console.log(error);
+      ctx.telegram.sendMessage(ctx.message.chat.id, 'Something went wrong');
+   }
+ });
```

After we have the access to the voice messages data we need to think about how to translate it to the text.


