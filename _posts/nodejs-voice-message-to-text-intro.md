---
title: Telegram voice message to text with Node.js. Intro
excerpt: In this article we're starting to implement our own Telegram bot using Node.js. If you prefer text messages over voice in chats then today you will learn how you can make your life a bit easier.
coverImage: /assets/blog/nodejs-voice-message-to-text-intro/cover.jpg
keywords: [Node.js, DIY]
date: '2020-03-16T05:35:07.322Z'
---

# [Draft] How browsers work

## Browser's high level structure

<!-- ![Browser's high level structure](/assets/blog/how-browsers-work/browsers-high-level.png) -->

- Each separate tab runs its own browser engine instance process
- Browsers DO NOT update their display and don't allow any interactions with the page while a Javascript program is running. There is a `requestAnimationFrame` API to handle this.
- Chrome tries to give each site its own process, including iframes (to enable `SiteIsolation`)
