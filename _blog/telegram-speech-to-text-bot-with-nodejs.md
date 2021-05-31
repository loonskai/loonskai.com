---
title: Telegram speech-to-text bot with Node.js
description: How to create a Telegram bot that will transcribe voice messages into the text using Node.js and speech recognition service.
keywords: [Node.js, DIY]
date: '2021-06-01'
estimated: 10 minutes
---

## Background

High speed and no advertising makes Telegram probably one the best online messaging app in 2021. Their team constantly evolves user experience and introduces cool things that I’m always excited to try out. However, I’m still quite conservative towards one particular feature - **voice messages**. Just as it’s convenient for the sender to send a message using their voice so it may be painful for others to check what their beloved friend wants to tell them. Especially in a noisy or rather completely silent environment.

So I asked myself, what if I could make my life a little bit easier and create, let's say, a Telegram bot that would transcribe these wonderful voice messages into the text?

I realized almost immediately that this idea is not new and there are already many bots that do the same. Furthermore, all voice recognition services are not fully free and I didn't plan to spend additional money just because some (or many) people always use voice messages ¯\\\_(ツ)\_/¯.

Anyway, I thought that this might be a nice chance to create my own Telegram bot that potentially could satisfy someone's needs. So enough talk and let’s see how we can implement this idea using **Node.js.**

## Initialize bot with BotFather

> This bot doesn't run in production and the process is described just for learning purposes and fun. If you're interested you can find the source code on [Github.](https://github.com/loonskai/voice-textify-bot)

Before starting to code we need to initialize our bot. Fortunately, Telegram provides a friendly way to do this by using [BotFather](https://t.me/botfather). You can check [their documentation](https://core.telegram.org/bots#3-how-do-i-create-a-bot) which is very clear so we won't get much into the details here.

In short, after we choose our bot’s name and username, BotFather will give us an **access token** for Telegram HTTP API which we’ll need to use in our Node.js application. We should also not forget to switch the privacy mode off to make our bot automatically process voice messages from the group chats. Send the `/setprivacy` command to BotFather, choose the new bot, click `Disable`, and you’re done.

Before going to the code editor it’s worth quickly recapping the idea of our bot. The functionality will be the following: when someone sends a voice message the bot will automatically ship it to the voice recognition service and then reply to the chat with the transcribed text. Looks simple, right?

## Project setup

Let’s create a new project for our future bot. Create a new file in the `src` folder and call it `index.ts`. For now, let's just put there a dummy `console.log()`:

**./src/index.ts**

```typescript
console.log("Hello");
```

As you can see we’re going to use TypeScript so let's install it together with `ts-node` that will allow us to run the code without compilation:

```
npm i -D typescript ts-node
```

The next required step is to add `tsconfig.json` file in the directory by running `npx typescript --init`. Here is the final version of the configuration:

**./tsconfig.json**

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

Let’s also add `nodemon` to restart our bot application each time we make changes during development:

```
npm -i D nodemon
```

To make it work with TypeScript we need to add some configuration:

**./package.json**

```json
{
  // ...
  "nodemonConfig": {
    "watch": ["src"],
    "ext": "ts,json",
    "exec": "ts-node ./src/index.ts"
  }
  // ...
}
```

Then let's add `eslint` to the project so our code style stays consistent:

```
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**./package.json**

```json
{
  // ...
  "eslintConfig": {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [ "@typescript-eslint" ],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
      "semi": "error",
      "indent": [ "error", 2 ],
      "quotes": [ "error", "single" ]
    }
  }
  // ...
}
```

The next step is to set up the **Docker image** with multi-stage builds. We'll also use **docker-compose**. This will drastically improve both the development and deployment of our bot, especially since we use TypeScript which has a dedicated compilation phase. There is a lot of material on how Docker multi-stage builds work, including [official documentation](https://docs.docker.com/develop/develop-images/multistage-build/).

> Make sure you have both `docker` and `docker-compose` installed on your machine.

**./Dockerfile**

```dockerfile
# Base
FROM node:14-alpine as base
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

# Development
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD [ "/app/node_modules/.bin/nodemon" ]

# Build TypeScript
FROM dev as build
COPY . .
RUN tsc

# Production
FROM base as prod
COPY --from=build /app/dist .
CMD ["node", "index.js"]
```

We use the `base` stage to install production dependencies and `dev` to install development dependencies. Because we use compiled version of the code in production we don’t need to have any development packages there. So we compile the code in a separate `build` stage and copy its result to `prod`. The main benefit of this technique is that it exponentially reduces the size of our production image and allows us to work with a single `Dockerfile` in all environments.

The final thing we need to do is to create `docker-compose.yml.dev`. As we don't need any additional services for our bot application, the configuration should be pretty straightforward:

**./docker-compose.yml.dev**

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
 
Have you noticed the `target` property? Yes, it points to the `dev` stage in our Docker image that we discussed just a moment ago. Now we can run our project locally:

```
docker-compose -f docker-compose.dev.yml up --build
```

## Create bot instance

Let's start implementating it. We will use [Telegraf](https://github.com/influxdata/telegraf ) - the most popular Telegram bot framework for Node.js. We also need `dotenv` to get access to the environment variables in our application. One of them will be the API key that we got from BotFather.

```
npm i telegraf dotenv
```

**./.env**

```
BOT_TOKEN=token_from_botfather
```

Also, we may want to add a `global.d.ts` file to populate the global namespace with the environment variables we’ll use in our application:

**./src/global.d.ts**

```typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
     BOT_TOKEN: string;
    }
  }
}

export {};
```

Now we’re ready to create our bot:

**./src/index.ts**

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

`Telegraf` class implements event emitter API. Each event handler has a `ctx` object as an argument that we can use for Telegram API requests. For example, to send a message to chat we run `ctx.telegram.sendMessage(chatId, message)`. 

After we define the listeners we can launch the bot with `bot.launch()`. Now when you send any message you we'll get a response from the bot:
![Get the first response from the bot](/assets/blog/telegram-speech-to-text-bot-with-nodejs/ping-pong.jpg)
<span class="img-description">Get the first response from the bot</span>

In our particular case, we need to handle the **voice** event. The context object also encapsulates [update events](https://core.telegram.org/bots/api#getting-updates) data such as client details, chat information, message data, etc. We can retrieve the voice message as well. Telegram returns a link to the audio file so to get actual bytes of data we need to make a separate request. For that, we can use `axios`.

```
npm i axios
```

And if any error occurs we'll send a message so everyone is aware that something is wrong:

**./src/index.ts**

```typescript{2,9,11-13,16}
import { Telegraf } from 'telegraf';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('voice', async ctx => {
  try {
    ctx.telegram.sendMessage(ctx.message.chat.id, 'Processing voice message ...');
    const { href: fileUrl } = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
    const { data: voiceMessageStream } = await axios(fileUrl, { responseType: 'stream' });
  } catch (error) {
    console.log(error);
    ctx.telegram.sendMessage(ctx.message.chat.id, 'Something went wrong');
  }
});

bot.launch();
```

After we have the access to the voice messages we need to think about how to translate them to the text. For that, we can use **Microsoft Azure Speech Recognition service** which provides 10,000 free transactions per month and has its own Node.js SDK library.

## Microsoft Azure Speech Recognition

First, we need to initialize the service. Here are the steps of how to start using Speech Services:

- Go to [Azure Portal](https://portal.azure.com/#home) and sign in using your Microsoft account;
- Find the **Cognitive Services** section where you’ll be suggested to start a free trial;
- You will be asked to complete some verification steps which also include providing your payment card details. You should not be worried about any charges as you pay only if you explicitly upgrade the account;
- When you complete the verification process you’ll see the notification about starting your free trial;
![Azure Free trial notification](/assets/blog/telegram-speech-to-text-bot-with-nodejs/complete-verification.jpg)

- Create a new [Cognitive Speech Service](https://portal.azure.com/?quickstart=True#create/Microsoft.CognitiveServicesSpeechServices) by choosing **Free Tier**; 
![Create a new Cognitive Service](/assets/blog/telegram-speech-to-text-bot-with-nodejs/create-cognitive-service.jpg)

- After the initial deployment, we can go to the resource and select keys and resources.
![Deployment is complete](/assets/blog/telegram-speech-to-text-bot-with-nodejs/deployment-is-complete.jpg)
  
We take one of the secret keys and the value of location which we’ll use in our bot application.
![Keys and endpoint](/assets/blog/telegram-speech-to-text-bot-with-nodejs/keys-and-endpoint.jpg)

**./.env**

```{2}
BOT_TOKEN=token_from_botfather
SUBSCRIPTION_KEY=azure_subscription_key
```

**./src/global.d.ts**

```typescript{5}
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

As we already know, Microsoft provides [Speech SDK for Node.js](https://docs.microsoft.com/en-us/javascript/api/microsoft-cognitiveservices-speech-sdk/?view=azure-node-latest) that we'll install next

```
npm install microsoft-cognitiveservices-speech-sdk
```

To start using it we need to configure the client. Let’s encapsulate this logic into a fabric function `createRecognizer()` that will accept a single configuration object with the following keys:

- `key` - subscription key (from Azure dashboard);
- `region` - region (from Azure dashboard);
- `language` - the language of speech (we’ll use `en-US`).

**./src/index.ts**

```typescript{4,10-14}
import { Telegraf } from 'telegraf';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { configureRecognizer } from './recognizer';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const recognize = configureRecognizer({
  key: process.env.SUBSCRIPTION_KEY,
  region: 'eastus',
  language: 'en-US'
});

/* ... */
```

**./src/recognizer.ts**

```typescript{3,11}
import { SpeechConfig } from 'microsoft-cognitiveservices-speech-sdk';

export const configureRecognizer = ({
  key,
  region,
  language
}: RecognizerConfig): ((args: RecognizeArgs) => Promise<string>) | void => {
  try {
    const speechConfig = SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = language;
    return getSpeechRecognize(speechConfig);
  } catch (error) {
    console.error('Recognition service error', error);
  }
};
```

Let’s discuss what happens inside `configureRecognizer()`. First, we import the `SpeechConfig` object from the SDK library. Its `fromSubscription()` method returns a configuration object that is used in requests to Speech Service. Finally we execute another fabric function `getSpeechRecognize()` that we’ll discuss next.

**./src/recognizer.ts**

```typescript{13,15-17,20,26,28,35-37}
import { Transform, PassThrough, pipeline } from 'stream';
import { promisify } from 'util';
import { 
  SpeechConfig,
  AudioConfig,
  AudioInputStream,
  SpeechRecognizer
} from 'microsoft-cognitiveservices-speech-sdk';

const promisePipeline = promisify(pipeline);

const getSpeechRecognize = (config: SpeechConfig) => async ({
  inputStream,
}: RecognizeArgs): Promise<string> => {
  const pushStream = AudioInputStream.createPushStream();
  const audioConfig = AudioConfig.fromStreamInput(pushStream);
  const recognizer = new SpeechRecognizer(config, audioConfig);
  const outputStream = new Transform({
    transform(arrayBuffer, _, callback) {
      pushStream.write(arrayBuffer.slice());
      callback();
    },
  });

  const recognizeOnceAsyncPromise = new Promise<string>((resolve, reject) => {
    recognizer.recognizeOnceAsync(result => {
      recognizer.close();
      resolve(result.text);
    }, err => {
      recognizer.close();
      reject(err);
    });
  });

  await promisePipeline(inputStream, transformStream, outputStream);
  pushStream.close();
  return recognizeOnceAsyncPromise;
};

/* ... */
```

All the `getSpeechRecognize()` does is just return another function that has access to the configuration object from closure. This returned function, for its part, does the main job to transcribe the voice message to text. It receives an object with `inputStream` which is the Telegram voice message stream. `AudioInputStream.createPushStream()` and `AudioConfig.fromStreamInput()` methods prepare audio data streams for Speech API. We can’t directly pipe the audio stream to the `pushStream` as it’s not a regular stream, so we wrap it with `Transform` to call `pushStream.write()` inside as soon as it gets the chunks of data from the voice message.

To start sending data to Speech Service we create an instance of the `SpeechRecognizer` class and add a listener to its `recognizeOnceAsync()` method that will run as soon as recognition is finished. Now everything is ready to start so we pipe our voice message input stream into a Speech API audio input stream by using promisified `pipeline()` helper. After we’re done we close the input stream and return a promise that will be resolved with the recognized text.

But what if I tell you that this code will not work? At least yet. At the time I’m writing this post there is an unfortunate incompatibility between Telegram voice messages that come in **opus** audio format, and Speech Service that [doesn’t support this format for Node.js SDK yet](https://github.com/microsoft/cognitive-services-speech-sdk-js/issues/351). But the good news is that we can work around this problem by decoding incoming audio data into a compatible format using **opus-tools.**

## Opus-tools to the rescue

There is an open-source [Opus codec](https://opus-codec.org/) with **opusdec** tool that we can use to decode **opus** voice message coming from Telegram into compatible **wav** format. A nice bonus is that this tool works with standard I/O so we don’t need to create any temporary files during the decoding process.

As we use Docker we need to make sure that we have this tool installed inside our container.

**./Dockerfile**

```dockerfile{4}
# Base
FROM node:14-alpine as base
# Install Opus utilities for audio convertion
RUN apk update && apk add opus-tools && opusdec --version
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

# ...
```

To use `opusdec` inside Node.js we’ll create a separate process using `spawn()` utility from the built-in `children_process` library. To get the desired behavior we need to pass the following arguments:
- `--force-wav` - to decode the input data into `wav` format;
- `--rate 16000` - to use a 16000 Hz sample rate that applies to Speech SDK default input format.

Plus, we need to pass `-` hyphens for input and output sources to use the standard I/O.

```typescript
spawn('opusdec', ['--force-wav', '--rate', 16000, '-', '-' ]);
```

As in our case, the audio decoding is a transitional step so we need to make the decoding stream both readable and writable and put it in the middle of the streams pipeline. We can accomplish this by creating a duplex stream from `opusdec` channels using `duplexify` library. 

```
npm i duplexify
```

Let’s wrap all decoding functionality into a helper that will look like this (we'll receive `opusdec` arguments as configuration object and construct arguments array separately):

**./src/opusStream.ts**

```typescript{10-12,14,19}
import { spawn } from 'child_process';
import { Duplex } from 'stream';
import duplexify from 'duplexify';

/* ... */

export const opusStream = ({ forceWav = false, rate }: Args): Duplex => {
  let args: string[] = [];

  if (forceWav) args = args.concat(['--force-wav']);
  if (rate) args = args.concat(['--rate', rate.toString()]);
  args = args.concat(['-', '-']);

  const opusdec = spawn('opusdec', args);
  opusdec.on('error', err => {
    console.error('Decoding error', err);
  });

  return duplexify(opusdec.stdin, opusdec.stdout);
};
```

Now we can modify our `recognize()` method to accept transform steam and put it in the middle of the pipeline:

**./src/recognize.ts**

```typescript{4,7}
/* ... */
const getSpeechRecognize = (config: SpeechConfig) => async ({
  inputStream,
  transformStream
}: RecognizeArgs): Promise<string> => {
  /* ... */
  await promisePipeline(inputStream, transformStream, outputStream);
  /* ... */
};
/* ... */
```

And then in our main file we just get the resolved text and reply to the initial voice message by calling `ctx.reply()`:

**./src/index.ts**

```typescript{1,8,11}
import { opusStream } from './opusStream';
/* ... */
bot.on('voice', async ctx => {
  try {
    /* ... */
    const text = await recognize({
      inputStream: voiceMessageStream,
      transformStream: opusStream({ forceWav: true, rate: 16000 })
    });

    ctx.reply(text, { reply_to_message_id: ctx.message.message_id });
  } catch {
    /* ... */
  }
});
```

Now we should be able to recognize our voice messages:

![Now we’re heard](/assets/blog/telegram-speech-to-text-bot-with-nodejs/done.jpg)
<span class="img-description">Now we’re heard</span>

## Going live with AWS Elastic Beanstalk

Even though initially we didn't plan to deploy to production, it’s still important to highlight this final step. As our bot is a simple Node.js application running in Docker we can run it on pretty much any cloud platform. Amazon Elastic Beanstalk is one of them and it’s really easy to use. Just don’t forget to keep track of your Free Tier Amazon account billing stats so you won’t be charged lately if that’s not a part of your plan.

First, we need to do a small configuration inside our project. As we use Docker multi-stage build we need to customize deployment configuration for Elastic Beanstalk. Fortunately, it supports **docker-compose** which is nice as we already use this tool in development. The production version of the configuration, however, will look a bit different. Let's add it as a default `docker-compose.yml` file:

**./docker-compose.yml**

```yaml
version: '3.8'
services:
  bot:
    build:
      context: .
      target: prod
    environment:
      - BOT_TOKEN
      - SUBSCRIPTION_KEY
```

After this, we can start AWS configuration. Sign in to your AWS Console and go to Elastic Beanstalk **Applications** tab. Click on the **Create new application** button and select **Docker.**
![Create a new Elastic Beanstalk application](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-eb-create-app.jpg)
<span class="img-description">Create a new Elastic Beanstalk application</span>

We need to add our secret keys so to keep it simple let’s just use application environment properties. Select **Configure more options**, click **Edit** in the Software section, and find **Environment properties** at the bottom of the page. 
![Add environment variables](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-eb-env-keys.jpg)
<span class="img-description">Add environment variables<span>

Click **Save** and **Create app.** Amazon will create all necessary resources for us including environment, security group, and storage. In a minute you should be able to use it.

![New Elastic Beanstalk environment is created](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-eb-env-ready.jpg)
<span class="img-description">New Elastic Beanstalk environment is created<span>

Now to deploy our application we just need to ship the source code to the Beanstalk environment. The cool thing is that we can automate this process by implementing a continuous delivery using another AWS service called **CodePipeline.**

Find CodePipeline in AWS Console and click **Create pipeline.** Type the new pipeline name and click next. 
![CodePipeline. Create a pipeline](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-codepipeline-step1.jpg)
<span class="img-description">CodePipeline. Create a pipeline<span>

Select **Github (Version 2)** as the source provider and click **Connect to Github.** 

![CodePipeline. Connect to Github](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-codepipeline-step2.jpg)
<span class="img-description">CodePipeline. Connect to Github<span>

You'll probably be asked to create a new Github connection where you need to select the repository with bot source code. 

The **Build stage** can be skipped for now.

On the last **Deploy** stage we select our Beanstalk application where our application will be deployed to. Click **Next** and submit the pipeline. In a couple of seconds, you should be able to see that our bot application is successfully deployed to Elastic Beanstalk and can be used in production. 

![The bot is deployed](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-codepipeline-ready.jpg)
<span class="img-description">The bot is deployed<span>

## Summary

We just wrote a simple Telegram bot using Node.js. We connected it with the Microsoft Azure Speech Recognition service and deployed it to AWS Elastic Beanstalk. There’re still some limits related to the payment requirements and Telegram API (like the maximum size of the audio file we can operate on). However, we were able to see how Telegram API works and tried out some Node.js API to work with streams and child processes. You can find the final version of the code on [Github](https://github.com/loonskai/voice-textify-bot).
