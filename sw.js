if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let a={};const o=e=>i(e,l),t={module:{uri:l},exports:a,require:o};s[l]=Promise.all(r.map((e=>t[e]||o(e)))).then((e=>(n(...e),a)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"about.html",revision:"bdffbeb1ae31c8b824bc7b22a3c94cb2"},{url:"assets/_...all_.acf03d2b.js",revision:null},{url:"assets/_name_.7e04b96e.js",revision:null},{url:"assets/404.ac2fde61.js",revision:null},{url:"assets/about.44161b42.js",revision:null},{url:"assets/app.1c196ee0.js",revision:null},{url:"assets/home.d013d3ac.js",revision:null},{url:"assets/index.4a506b6c.css",revision:null},{url:"assets/README.e34e5621.js",revision:null},{url:"assets/virtual_pwa-register.f75bf083.js",revision:null},{url:"assets/workbox-window.prod.es5.d2780aeb.js",revision:null},{url:"index.html",revision:"f54c31b1d8ed2ccf672f7f11c089ccce"},{url:"readme.html",revision:"f73e6cab723f8a6956d33014393b5ec4"},{url:"favicon.svg",revision:"50eaa5ff03f3d89bea3e4450aefa60af"},{url:"safari-pinned-tab.svg",revision:"21a5632e21f7421e63e58f3a8a3e205e"},{url:"pwa-192x192.png",revision:"65f6c00ff3d88d8371df0480c1ba0272"},{url:"pwa-512x512.png",revision:"20a2db7d5040eb315e6acf49c6983de9"},{url:"manifest.webmanifest",revision:"11dbab274032991c7bd0f7d27eb1aa2f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
