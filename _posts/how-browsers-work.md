---
title: Draft - How browsers work
excerpt: We go a bit deeper in what actually happens when we see our favourite website in a browser.
coverImage: /assets/blog/how-browsers-work/cover.jpg
date: '2020-03-16T05:35:07.322Z'
---

# [Draft] How browsers work

## Browser's high level structure

![Browser's high level structure](/assets/blog/how-browsers-work/browsers-high-level.png)

- Each separate tab runs its own browser engine instance process
- Browsers DO NOT update their display and don't allow any interactions with the page while a Javascript program is running. There is a `requestAnimationFrame` API to handle this.
- Chrome tries to give each site its own process, including iframes (to enable `SiteIsolation`)
