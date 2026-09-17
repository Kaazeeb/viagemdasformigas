#!/usr/bin/env node
"use strict";

// Shell-only checks: no browser, server, network or npm dependencies.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const context = vm.createContext({ window: {} });
const scripts = ["beijing-final-data.js", "beijing-final-visuals.js", "beijing-final.js"];
for (const file of scripts) vm.runInContext(read(file), context, { filename: file });
const data = context.window.BEIJING_FINAL;
const visuals = context.window.BEIJING_FINAL_VISUALS;
const render = context.window.BEIJING_GUIDE_RENDER;
const html = read("beijing-final.html");
let checks = 0;
function check(label, run) { run(); checks++; console.log("OK: " + label); }

check("quatro dias, 50 etapas e fontes válidas", () => {
  assert.deepEqual(Array.from(data.days, day => day.id), ["24", "25", "26", "27"]);
  const steps = data.days.flatMap(day => day.steps);
  assert.equal(steps.length, 50);
  assert.equal(new Set(steps.map(step => step.id)).size, 50);
  const sources = new Set(data.sources.map(source => source.id));
  for (const step of steps) for (const source of step.sources || []) assert(sources.has(source), source);
});

check("HTML estático corresponde aos dados e renderizadores", () => {
  for (const [block, key] of [["HOTEL", "hotel"], ["ESSENTIALS", "essentials"], ["DAYS", "days"], ["SOURCES", "sources"]]) {
    const match = html.match(new RegExp(`<!-- ${block}:START -->\\s*([\\s\\S]*?)\\s*<!-- ${block}:END -->`));
    assert(match, block);
    assert.equal(match[1], render[key](data), block);
  }
  assert(html.includes(render.review(data)));
});

const decode = value => value.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const tags = Array.from(html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi), match => ({
  name: match[1].toLowerCase(),
  attrs: Object.fromEntries(Array.from(match[2].matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g), attr => [attr[1], decode(attr[2])]))
}));
const ids = tags.flatMap(tag => tag.attrs.id ? [tag.attrs.id] : []);
const imageTags = tags.filter(tag => tag.name === "img" && tag.attrs.src);
const zoomTags = tags.filter(tag => tag.attrs["data-map"]);

check("IDs únicos e todos os arquivos/âncoras locais existem", () => {
  assert.equal(new Set(ids).size, ids.length);
  for (const { attrs } of tags) for (const key of ["href", "src", "data-map", "data-map-original"]) {
    const value = attrs[key];
    if (!value || /^(?:https?:|data:|mailto:|tel:|\/\/)/i.test(value)) continue;
    if (value.startsWith("#")) { if (value.length > 1) assert(ids.includes(value.slice(1)), value); continue; }
    assert(!/^[a-z]+:/i.test(value), value);
    const local = decodeURIComponent(value.split(/[?#]/)[0]);
    assert(fs.statSync(path.join(root, local)).isFile(), local);
  }
});

check("61 imagens com texto alternativo e links nativos de ampliação", () => {
  assert.equal(imageTags.length, 61);
  assert.equal(zoomTags.length, 61);
  for (const { attrs } of imageTags) assert(attrs.alt && attrs.alt.trim().length > 5, attrs.src);
  for (const { name, attrs } of zoomTags) {
    assert.equal(name, "a");
    assert.equal(attrs.href, attrs["data-map-original"]);
  }
});

check("49 recursos aprovados e cobertura das 16 visitas", () => {
  const manifest = JSON.parse(read("assets/itinerary/guide/manifest.json"));
  const resources = new Map(manifest.resources.map(resource => [resource.id, resource]));
  assert.equal(resources.size, 49);
  const visits = data.days.flatMap(day => day.steps).filter(step => step.type === "visit");
  assert.equal(visits.length, 16);
  for (const step of visits) assert(visuals.steps[step.id].photos.length > 0, step.id);
  for (const placement of [visuals.hotel, ...Object.values(visuals.steps)]) {
    for (const item of [...(placement.photos || []), placement.map, placement.referenceMap].filter(Boolean)) {
      assert(resources.get(item.assetId).sourceStatus.startsWith("aprovada-"), item.assetId);
    }
  }
  assert.equal(visuals.steps["25-jingshan"].referenceMap, false);
  assert.equal(visuals.steps["24-lama"].referenceMap.assetId, "dia24-lama-planta-bilingue");
  assert(!html.includes('src="assets/images/streets/qianmen-street/01.webp"'));
});

check("falha de dados/seleção preserva o HTML revisado", () => {
  for (const missing of ["beijing-final-data.js", "beijing-final-visuals.js"]) {
    const fallback = vm.createContext({ window: {}, document: {
      readyState: "complete",
      getElementById() { throw new Error("Tentativa de substituir HTML sem " + missing); },
      querySelectorAll() { return []; }
    } });
    for (const file of scripts.filter(file => file !== missing)) vm.runInContext(read(file), fallback, { filename: file });
  }
});

check("delimitadores do CSS balanceados", () => {
  const css = read("beijing-final.css").replace(/\/\*[\s\S]*?\*\//g, "").replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "");
  const opening = { "}": "{", ")": "(", "]": "[" }, stack = [];
  for (const char of css) {
    if ("{([".includes(char)) stack.push(char);
    else if ("})]".includes(char)) assert.equal(stack.pop(), opening[char]);
  }
  assert.equal(stack.length, 0);
});

console.log(`${checks} grupos de verificações passaram. Layout e interação visual ficam para o teste manual.`);
