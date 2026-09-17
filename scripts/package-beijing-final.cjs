#!/usr/bin/env node
"use strict";

// Export an already-rendered guide without a server or npm dependencies.
// node scripts/package-beijing-final.cjs /path/outside/repository [--source-dir /path/to/worktree]
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const crypto = require("node:crypto");

const ENTRY = "beijing-final.html";
const CORE = [ENTRY, "beijing-final.css", "beijing-final.js", "beijing-final-data.js", "beijing-final-visuals.js"];

function usage() {
  console.log("Uso: node scripts/package-beijing-final.cjs [diretorio-de-destino] [--source-dir diretorio-do-roteiro]\n" +
    "Execute scripts/render-beijing-final.cjs na origem antes de empacotar.\n" +
    "Sem destino, cria uma pasta nova no diretório temporário do sistema.\n" +
    "O destino deve estar fora da origem e vazio ou ainda não existir.");
}

function parseArgs(args) {
  let source = path.resolve(__dirname, "..");
  let destination;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--help" || args[i] === "-h") { usage(); return null; }
    if (args[i] === "--source-dir") {
      if (!args[i + 1] || args[i + 1].startsWith("--")) throw new Error("Informe um diretório após --source-dir.");
      source = path.resolve(args[++i]);
    } else if (args[i].startsWith("--")) {
      throw new Error(`Opção desconhecida: ${args[i]}`);
    } else if (destination) {
      throw new Error("Informe somente um diretório de destino.");
    } else destination = path.resolve(args[i]);
  }
  return { source, destination };
}

function within(parent, child) {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

// Resolve existing parent symlinks, including when the final directory is new.
function physicalPath(filename) {
  if (fs.existsSync(filename)) return fs.realpathSync(filename);
  return path.join(physicalPath(path.dirname(filename)), path.basename(filename));
}

function decodeHTML(value) {
  const entities = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" };
  return value.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (match, entity) => {
    if (entity[0] !== "#") return entities[entity.toLowerCase()] || match;
    const number = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
    return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : match;
  });
}

// The renderer emits quoted attributes; support unquoted ones in hand-written head/nav markup too.
function attributes(tag) {
  const result = new Map();
  const pattern = /\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const match of tag.matchAll(pattern)) result.set(match[1].toLowerCase(), decodeHTML(match[2] ?? match[3] ?? match[4]));
  return result;
}

function localPath(reference, baseFile = ENTRY) {
  const value = reference.trim();
  if (!value || value[0] === "#" || value.startsWith("//")) return null;
  if (/^[a-z][a-z\d+.-]*:/i.test(value)) {
    if (/^file:/i.test(value)) throw new Error(`Referência file:// não portável em ${baseFile}: ${value}`);
    return null; // External source, data URI, email, etc. No network requests.
  }
  const pathname = decodeURIComponent(value.split(/[?#]/, 1)[0]);
  if (!pathname) return null;
  if (pathname.startsWith("/") || pathname.includes("\\")) throw new Error(`Use um caminho relativo portável em ${baseFile}: ${value}`);
  const relative = path.posix.normalize(path.posix.join(path.posix.dirname(baseFile), pathname));
  if (relative === ".." || relative.startsWith("../")) throw new Error(`Referência fora da origem em ${baseFile}: ${value}`);
  return relative;
}

function exportHTML(sourceHTML) {
  let removed = 0;
  const html = sourceHTML.replace(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi, anchor => {
    const tag = anchor.slice(0, anchor.indexOf(">") + 1);
    const attrs = attributes(tag);
    const href = attrs.get("href");
    if (!href) return anchor;
    const local = localPath(href);
    if (!local || local === ENTRY || !/\.html?$/i.test(local)) return anchor;
    removed++;
    if ((attrs.get("class") || "").split(/\s+/).includes("brand")) {
      const body = anchor.slice(tag.length).replace(/<\/a\s*>$/i, "");
      return `<span class="brand" aria-label="Rota China">${body}</span>`;
    }
    return ""; // Links to the omitted index and sibling city guide.
  });
  return { html, removed };
}

function markupReferences(text, filename) {
  const found = [];
  for (const tag of text.matchAll(/<[a-z][^>]*>/gi)) {
    const attrs = attributes(tag[0]);
    for (const name of ["src", "href", "xlink:href", "data-map", "data-map-original"]) {
      if (attrs.has(name)) found.push({ reference: attrs.get(name), owner: filename, attribute: name });
    }
    if (attrs.has("srcset")) {
      // Local responsive URLs emitted by this repository do not contain literal commas.
      for (const item of attrs.get("srcset").split(",")) {
        const reference = item.trim().split(/\s+/)[0];
        if (reference) found.push({ reference, owner: filename, attribute: "srcset" });
      }
    }
  }
  return found;
}

function cssReferences(text, filename) {
  const found = [];
  for (const match of text.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi)) {
    found.push({ reference: match[1] ?? match[2] ?? match[3], owner: filename, attribute: "url" });
  }
  for (const match of text.matchAll(/@import\s+(?:"([^"]+)"|'([^']+)')/gi)) {
    found.push({ reference: match[1] ?? match[2], owner: filename, attribute: "import" });
  }
  return found;
}

function packageGuide(options) {
  const source = fs.realpathSync(options.source);
  if (!fs.statSync(source).isDirectory()) throw new Error("A origem deve ser um diretório.");
  const destination = options.destination || path.join(os.tmpdir(), `pequim-roteiro-offline-${new Date().toISOString().toLowerCase().replace(/[:.]/g, "-")}`);
  const physicalDestination = physicalPath(destination);
  if (within(source, physicalDestination) || within(physicalDestination, source)) throw new Error("O destino deve ficar fora da origem, sem substituir um diretório que a contenha.");
  if (fs.existsSync(destination) && (!fs.statSync(destination).isDirectory() || fs.readdirSync(destination).length)) {
    throw new Error("O destino já existe e não está vazio. Escolha uma pasta nova; nenhum arquivo foi substituído.");
  }

  for (const filename of CORE) {
    if (!fs.existsSync(path.join(source, filename))) throw new Error(`Arquivo obrigatório ausente: ${filename}. Integre os visuais e renderize o roteiro antes de empacotar.`);
  }
  const sourceHTML = fs.readFileSync(path.join(source, ENTRY), "utf8");
  if (!/data-map-original\s*=/.test(sourceHTML) || !/id="dia-27"/.test(sourceHTML)) {
    throw new Error("HTML sem o roteiro completo renderizado. Execute scripts/render-beijing-final.cjs na origem.");
  }
  const { html, removed } = exportHTML(sourceHTML);
  const initialRefs = markupReferences(html, ENTRY);
  const initialPaths = new Set(initialRefs.map(ref => localPath(ref.reference, ref.owner)).filter(Boolean));
  for (const filename of CORE.slice(1)) {
    if (!initialPaths.has(filename)) throw new Error(`O HTML não referencia ${filename}. Atualize/renderize a origem antes de empacotar.`);
  }

  const files = new Map();
  const pending = [...CORE];
  const externalURLs = new Set();
  const register = ref => {
    const local = localPath(ref.reference, ref.owner);
    if (local) pending.push(local);
    else if (/^https?:\/\//i.test(ref.reference)) externalURLs.add(ref.reference);
  };
  initialRefs.forEach(register);
  while (pending.length) {
    const filename = pending.pop();
    if (files.has(filename)) continue;
    const full = path.join(source, filename);
    if (!fs.existsSync(full)) throw new Error(`Recurso local ausente: ${filename}. Nenhum pacote foi escrito.`);
    if (!within(source, fs.realpathSync(full)) || !fs.statSync(full).isFile()) throw new Error(`Recurso inválido ou fora da origem: ${filename}`);
    const bytes = filename === ENTRY ? Buffer.from(html, "utf8") : fs.readFileSync(full);
    files.set(filename, bytes);
    if (/\.css$/i.test(filename)) cssReferences(bytes.toString("utf8"), filename).forEach(register);
    if (/\.svg$/i.test(filename)) markupReferences(bytes.toString("utf8"), filename).forEach(register);
  }

  const readme = `# Roteiro de Pequim offline\n\n` +
    `Abra **beijing-final.html** em um navegador. Não é necessário servidor, instalação ou conexão para ler o roteiro e ampliar as imagens incluídas.\n\n` +
    `Mantenha esta pasta inteira junta, incluindo assets e os arquivos CSS/JS. Se receber um ZIP, extraia todos os arquivos antes de abrir a página.\n\n` +
    `As fontes externas, reservas, aplicativos de transporte, mapas online e informações atualizadas precisam de internet. Este pacote não confirma disponibilidade de ingressos, acessos ou voos.\n\n` +
    `Alguns telefones restringem HTML/JavaScript local ou abrem o arquivo apenas em pré-visualização. Abra em um navegador compatível e teste navegação/zoom antes da viagem; a impressão do roteiro é uma alternativa de leitura.\n\n` +
    `As imagens originais em maior resolução acompanham o pacote para ampliar os detalhes. Os links para outros guias do site foram removidos; dias, âncoras internas e fontes externas foram preservados.\n\n` +
    `manifesto-offline.json lista os arquivos e SHA-256 para conferir a cópia. As marcações de etapas dependem do armazenamento permitido pelo navegador e não são sincronizadas com outros aparelhos.\n`;
  files.set("README.md", Buffer.from(readme, "utf8"));
  const manifest = {
    entry: ENTRY,
    navigationLinksRemoved: removed,
    externalLinksRequireNetwork: true,
    externalURLs: [...externalURLs].sort(),
    files: [...files].sort(([a], [b]) => a.localeCompare(b)).map(([filename, bytes]) => ({
      path: filename, bytes: bytes.length, sha256: crypto.createHash("sha256").update(bytes).digest("hex")
    }))
  };
  files.set("manifesto-offline.json", Buffer.from(JSON.stringify(manifest, null, 2) + "\n", "utf8"));
  // Preflight completes before creating the destination; copy failures never overwrite source files.
  fs.mkdirSync(destination, { recursive: true });
  for (const [filename, bytes] of files) {
    const target = path.join(destination, filename);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, bytes, { flag: "wx" });
  }
  const bytes = [...files.values()].reduce((sum, data) => sum + data.length, 0);
  console.log(JSON.stringify({ destination, entry: path.join(destination, ENTRY), files: files.size, bytes, navigationLinksRemoved: removed, externalURLs: externalURLs.size }, null, 2));
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options) packageGuide(options);
} catch (error) {
  console.error(`Não foi possível montar o pacote: ${error.message}`);
  process.exitCode = 1;
}
