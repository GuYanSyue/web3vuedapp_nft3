if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const a=e=>i(e,l),t={module:{uri:l},exports:o,require:a};s[l]=Promise.all(r.map((e=>t[e]||a(e)))).then((e=>(n(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"about.html",revision:"09562348de0b3dc26c0edf254ffb3a11"},{url:"assets/_...all_.66674ed4.js",revision:null},{url:"assets/_name_.19d4f6e6.js",revision:null},{url:"assets/404.8e414ecf.js",revision:null},{url:"assets/about.40e8e9b5.js",revision:null},{url:"assets/app.5eeb1076.js",revision:null},{url:"assets/home.70994fc7.js",revision:null},{url:"assets/index.84d1b7d8.css",revision:null},{url:"assets/README.45a84c6c.js",revision:null},{url:"assets/virtual_pwa-register.5cd3bc9f.js",revision:null},{url:"assets/workbox-window.prod.es5.d2780aeb.js",revision:null},{url:"index.html",revision:"d2807992353b66433a56d5a38985fcf7"},{url:"readme.html",revision:"82c5a030534f5d8507c2cef784e95c78"},{url:"favicon.svg",revision:"50eaa5ff03f3d89bea3e4450aefa60af"},{url:"safari-pinned-tab.svg",revision:"21a5632e21f7421e63e58f3a8a3e205e"},{url:"pwa-192x192.png",revision:"65f6c00ff3d88d8371df0480c1ba0272"},{url:"pwa-512x512.png",revision:"20a2db7d5040eb315e6acf49c6983de9"},{url:"manifest.webmanifest",revision:"11dbab274032991c7bd0f7d27eb1aa2f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
