---
title: Telegram speech to text bot with Node.js
excerpt: How to combine Telegram Bot API with a speech recognition service to transcribe voice messages to text.
keywords: [Node.js, DIY]
date: '2020-03-16T05:35:07.322Z'
estimated: 15 minutes
---

## Table of Contents

## Background

High speed and no advertising makes Telegram maybe one the best options for online communication in 2021. Their team is constantly evolving the user experience and introducing really nice features that I’m always excited to try. Nevertheless, I’m very conservative towards one particular feature - voice messages. Just as it’s convenient for the sender to send a message using their voice so it may be hard and painful for others to check what their beloved friend wants to tell them. Especially in a noisy or rather completely silent environment.

So I asked myself what if I could make my life easier and create a Telegram bot that will transcribe for me these wonderful voice messages into text?

I realized almost immediately that this idea is not new and there are already many existing bots which do this. And furthermore all voice recognition services are payment required although some of them provide trial versions.
But then I thought that this might be a nice opportunity to write my own Telegram bot and see how easily we can customise our own experience with Telegram. So enough talk and let’s see how it can be done with Node.js.

## Initialize bot with BotFather

> The full version of the code is [available on Github.](https://github.com/loonskai/voice-textify-bot)

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

```
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

```
npm -i D nodemon
```

We need to customize its configuration to make it work with TypeScript:

**package.json**

```json
{
  "nodemonConfig": {
    "watch": ["src"],
    "ext": "ts,json",
    "exec": "ts-node ./src/index.ts"
  }
}
```

Add ESLint so our codestyle stays consistent:

```
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**package.json**

```json
{
  "eslintConfig": {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint"
    ],
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

```
docker-compose -f docker-compose.dev.yml up --build
```

## Create bot instance

Finally we got the actual bot implementation code. We will use [Telegraf](https://github.com/influxdata/telegraf ) - the most popular Telegram bot framework for Node.js. Let's install it

```
npm i telegraf
```

Install `dotenv` to get access to the environment variables. One of them will be the API key that we got from BotFather a while back so don’t forget to store it in your `.env` file. I use `BOT_TOKEN` name for it. Also we may want to add global.d.ts to populate the global namespace with the environment variables we’ll be using in our project

**src/global.d.ts**

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
<span class="img-description">Get the first response from the bot</span>

In our case we want to handle **voice** event. Context object also encapsulates update event data such as client details, chat information, message data etc. We can retrieve the voice message as well. Telegram returns a link to the audio file so to get an actual bytes of data we need to make a separate request. For that we can use `axios`. Let's also notify everyone that something is happening:

**src/index.ts**

```typescript
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
```

After we have the access to the voice messages data we need to think about how to translate it to the text. We’re going to use Microsoft Azure Speech Recognition service which provides 10,000 free transactions per month and that perfectly meets our needs.

## Microsoft Azure Speech Recognition

Here are the steps of how to start using Speech Services:

- Go to [Azure Portal](https://portal.azure.com/#home) and sign in using your Microsoft account.
- Find the **"Cognitive Services"** section where you’ll be suggested to start a free trial. 
- You will be asked to complete some verification steps which also includes providing you payment card details. You should not be worried about any charges as you pay only if you explicitly upgrade the account. 
- If you successfully complete the verification process you’ll see the notification about starting your free trial. 
- Create a new [Cognitive Speech Service](https://portal.azure.com/?quickstart=True#create/Microsoft.CognitiveServicesSpeechServices) by choosing our Free Tier. 
- After initial deployment is complete we can go to the resource and select keys and resources.
  
We take one of the secret keys and the value of location which we’ll use in our Node.js application. Store the secret key in your `.env` file as `SUBSCRIPTION_KEY`. After this we’re ready to start implementing this service in our bot application.

Microsoft provides [Speech SDK for Node.js]() that we need to install in our project
npm install microsoft-cognitiveservices-speech-sdk

First of all we need to configure the client. Let’s encapsulate this logic into a fabric function `createRecognizer` which will accept a single configuration object with the following contract:

- `key` - subscription key (from Azure dashboard)
- `region` - region (from Azure dashboard)
- `language` - the language of speech (we’ll use `en-US`)

**src/index.ts**

```typescript
import { configureRecognizer } from './recognizer';

const recognize = configureRecognizer({
  key: process.env.SUBSCRIPTION_KEY,
  region: 'eastus',
  language: 'en-US'
});
```

**src/recognizer.ts**

```typescript
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

Let’s discuss a bit what happens inside `configureRecognizer()`. First we import the `SpeechConfig` object from the SDK library. Its `fromSubscription()` method returns a configuration object that we use in requests to Speech Service. Finally we execute another fabric function `getSpeechRecognize()` that we’ll discuss next.

**src/recognizer.ts**

```typescript
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
```

All the `getSpeechRecognize()` does is just returns another function that has access to the configuration object from closure. This returned function, for its part, does the main job to transcribe the voice message to text. It receives an object with `inputStream` property with the data from the Telegram voice message file. Inside it we use `AudioInputStream.createPushStream()` and `AudioConfig.fromStreamInput()` methods to prepare audio data streams for Speech API. We can’t directly pipe the audio stream to the `pushStream` as it’s not just a regular stream, so we wrap it with `Transform` to call `pushStream.write()` inside as it gets the chunks of data from the voice message.

To start sending data to Speech Service we create an instance of `SpeechRecognizer` class and add a listener to its `recognizeOnceAsync()` method that will run as soon as recognition is finished. Now everything is ready to start so we pipe our voice message input stream into a Speech API audio input stream. After we’re done we close the input stream and return a promise that will be resolved with the recognized text.

But what if I tell you that this code will not work? At least now. At the time I’m writing this there is an unfortunate incompatibility between Telegram voice messages that come in `.opus` audio format, and Speech Service that [doesn’t support it for Node.js SDK yet](https://github.com/microsoft/cognitive-services-speech-sdk-js/issues/351). But the good news is that we can workaround this problem by decoding incoming audio data into a compatible format using **opus-tools.**

## Opus-tools for the rescue

There is an open source [Opus codec](https://opus-codec.org/) with `opusdec` tool that we can use to decode **opus** voice message coming from Telegram into the compatible **wav** format. This tool perfectly works with standard I/O so we don’t need to create any temporary files during the decoding process which is nice.

To use `opusdec` from Node.js we’ll create a separate process using `spawn()` function from the built-in `children_process` library. To get the desired behaviour we need to pass the following arguments:
- `--force-wav` - to decode the input data into wav format
- `--rate 16000` - to use 16000 Hz sample rate that applies to Speech SDK default input format

Plus, we need to pass dashes `-` for input and output sources to use the standard I/O.

```typescript
spawn('opusdec', ['--force-wav', '--rate', 16000, '-', '-' ]);
```

As in our case the audio decoding is a transitional step we need to make the decoding stream both readable and writable to put it in the middle of the streams pipeline. We can accomplish this by creating a duplex stream from `opusdec` channels using `duplexify` library. 

```bash
npm i duplexify
```

Let’s wrap all decoding functionality into helper that will look like this:

**src/opusStream.ts**

```typescript
import { spawn } from 'child_process';
import { Duplex } from 'stream';
import duplexify from 'duplexify';

type Args = {
  forceWav?: boolean
  rate?: number
}
 
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

Now we can modify our `recognize()` method a little to accept transform steam and put it in the middle of the pipeline:

**src/recognize.ts**

```typescript
const getSpeechRecognize = (config: SpeechConfig) => async ({
  inputStream,
  transformStream = new PassThrough()
}: RecognizeArgs): Promise<string> => {
  await promisePipeline(inputStream, outputStream);
  await promisePipeline(inputStream, transformStream, outputStream);
};
```

And then in our main file we just get the resolved text and reply it to the initial voice message by calling `ctx.reply()`:

**src/index.ts**

```typescript
import { opusStream } from './opusStream';

bot.on('voice', async ctx => {
  const text = await recognize({
    inputStream: voiceMessageStream,
    transformStream: opusStream({ forceWav: true, rate: 16000 })
  });
  ctx.reply(text, { reply_to_message_id: ctx.message.message_id });
});
```

Now we should be able to recognize our voice messages:

![Now we’re heard](/assets/blog/telegram-speech-to-text-bot-with-nodejs/done.png)
<span class="img-description">Now we’re heard</span>

## Going live with AWS Elastic Beanstalk

Even though we’re making this bot for learning purposes, it’s important to highlight the final step in every software development process - the deployment part. As our bot is a simple Node.js application running in Docker we can deploy and run it on pretty much any cloud platform. I chose Amazon Elastic Beanstalk as it’s really easy to configure and use. We can also rely on AWS Free Tier which includes the services we are going to use. Just don’t forget to keep track of your free Amazon account billing stats so you won’t be charged lately if that’s not actually a part of your plan.

But first we need to do a small configuration inside our application project. As we use Docker multi-stage build we want to customize deployment configuration. Fortunately it can be easily done with **docker-compose** which is supported by Elastic Beanstalk. That is really nice as we already use this tool for development. However the production version of configuration looks a bit different, so we create a separate `docker-compose.yml` that will be used for production:

**docker-compose.yml**

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

After this we can start AWS configuration. Sign in to your AWS Console and go to Elastic Beanstalk **"Applications"** tab. Click on  **"Create new application"** button and select **"Docker**.
![Create new Elastic Beanstalk application](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-eb-create-app.png)
<span class="img-description">Create new Elastic Beanstalk application</span>

We need to add our secret keys so to keep it simple let’s just use application environment properties. Select **Configure more options**, click **Edit** in the Software section and **Environment properties** at the bottom of the page. 
![Add environment variables](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-eb-env-keys.png)
<span class="img-description">Add environment variables<span>

Click **Save** and **Create app**. Amazon will create all necessary resources for us including environment, security group and storage. In a minute you should be able to use it.

![New Elastic Beanstalk environment is created](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-eb-env-ready.png)
<span class="img-description">New Elastic Beanstalk environment is created<span>

Now to deploy our application we just need to ship the source code to the Beanstalk environment we just created. The cool thing is that we can automate this process by adding continuous delivery with another AWS service **CodePipeline**.

Find CodePipeline in AWS Console and click **"Create pipeline"**. Type the new pipeline name and click next. 
![CodePipeline. Create a pipeline](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-codepipeline-step1.png)
<span class="img-description">CodePipeline. Create a pipeline<span>

Select **"Github (Version 2)"** as the source provider and click **"Connect to Github"**. 

![CodePipeline. Connect to Github](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-codepipeline-step2.png)
<span class="img-description">CodePipeline. Connect to Github<span>

You'll probably be asked to create a new Github connection where you need to select the repository with bot source code. 

The next **"Build stage"** can be skipped for now.

On the last **"Deploy"** stage we select our Beanstalk application so the pipeline will finish by deploying the code there. Finally click **"Next"** and submit the pipeline. In a couple of seconds you should be able to see that our bot application is successfully deployed to Elastic Beanstalk. 

![Bot is deployed](/assets/blog/telegram-speech-to-text-bot-with-nodejs/aws-codepipeline-ready.png)
<span class="img-description">Bot is deployed<span>

## Summary

We just wrote a simple Telegram bot using Node.js. We connected it with Microsoft Azure Speech Recognition service and deployed it to AWS. There’re still some limits related to the payment requirements and Telegram API (like maximum size of the audio file we can operate on). However we were able to see how Telegram API works and tried some Node.js tools to work with streams and child processes. The full version of the code is [available on Github](https://github.com/loonskai/voice-textify-bot).
Thank you.
