#!/usr/bin/env node
"use strict";

// Keep the complete itinerary readable when JavaScript is unavailable.
// Run from any directory: node scripts/render-beijing-final.cjs
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const context = vm.createContext({ window: {} });
for (const file of ["beijing-final-data.js", "beijing-final.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
}
const data = context.window.BEIJING_FINAL;
const render = context.window.BEIJING_GUIDE_RENDER;
if (!data || !render || data.days.length !== 4) throw new Error("Missing four-day guide data or renderers");
const target = path.join(root, "beijing-final.html");
let html = fs.readFileSync(target, "utf8");
for (const [block, key] of [["HOTEL", "hotel"], ["ESSENTIALS", "essentials"], ["DAYS", "days"], ["SOURCES", "sources"]]) {
  const pattern = new RegExp(`(<!-- ${block}:START -->)[\\s\\S]*?(<!-- ${block}:END -->)`);
  if (!pattern.test(html)) throw new Error(`Missing ${block} HTML markers`);
  html = html.replace(pattern, (_, start, end) => `${start}\n${render[key](data)}\n${end}`);
}
const date = String(data.updatedAt || "").replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
html = html.replace(/(<p class="updated-at" id="updated-at">)[\s\S]*?(<\/p>)/, (_, start, end) => `${start}Informações conferidas em ${date}.${end}`);
fs.writeFileSync(target, html);
console.log(`Rendered ${data.days.length} days / ${data.days.reduce((sum, day) => sum + day.steps.length, 0)} steps into beijing-final.html`);
