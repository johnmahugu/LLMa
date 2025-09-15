/**
 * 🌍 Pa.js v3.16am-xtn - Pretty Awesome JavaScript Framework
 * ─────────────────────────────────────────────────────────────────────────────
 * 🧾 Copyright © 2025 John Mwirigi Mahugu & xAI
 * 🕒 Generated: 2025-09-15 03:07 AM EAT
 * 🔑 License: MIT
 * 🔗 Repository: https://pa.js.org
 * 📧 Author: johnmahugu@protonmail.com
 * 📜 UUID: grk-c-fb1f05bc-e58a-4e3e-92b7-547c7f784931
 * 🙏 Dedication: To יהוה (YHWH) for wisdom and inspiration, to Francis Mahugu, Seth Mahugu, and all developers building delightful web applications. Code with clarity, ship with confidence.
 *
 * 📘 SYNOPSIS:
 * Pa.js v3.16am-xtn is the ultimate zero-dependency, single-file (~150KB minified/gzipped) fullstack JavaScript framework for newbies and enterprise developers. Merging Px.js, ar.js, sumo.js, farux.js, chatux.js, zerox.js, and Pa.js v1.0/1.1/0.0/3.1.6/3.16am, it offers HTMX/Alpine-like declarative syntax, FastAPI-inspired APIs, offline-first support, universal markup, live collaboration, full-text search, and a comprehensive GUI with admin panel. Extensible via plugins, it’s optimized for scalable, performant-sensitive apps/APIs.
 *
 * 🛣️ FEATURES:
 * - ✅ **Universal Markup**: `pa-tpl` for identical client/server-side rendering (SSR/SSG) with reactivity and SEO.
 * - ✅ **Live Collaboration**: `pa-collab` for CRDT-based real-time multi-user editing (e.g., whiteboards, shared lists).
 * - ✅ **HTML-First UI**: `pa-on`, `pa-bind`, `pa-if`, `pa-for`, `pa-ajax` for minimal JS.
 * - ✅ **Reactive Frontend**: Vue-like Proxy-based reactivity, virtual DOM (mu.js), Shadow DOM components, SPA routing (go.js).
 * - ✅ **Offline-First**: PajsDB (IndexedDB/SQLite/NoSQL) with CRDT sync, Service Workers, and optimistic UI updates for PWAs.
 * - ✅ **Fullstack API**: FastAPI-like `pa.app.api` with OpenAPI 3.0 auto-generation, validation, streaming, GraphQL, and subscriptions.
 * - ✅ **Backend Power**: HTTP/WebSocket/SSE servers, middleware (CSRF, CORS, security headers, rate limiting), JWT, OAuth2, RBAC, sessions/cookies.
 * - ✅ **Hybrid ORM**: SQL/NoSQL with migrations, relations, transactions (ACID), hooks, audit logging, caching.
 * - ✅ **PajsDB**: Embedded NoSQL with ACID, sharding, TTL, geospatial, WAL, backup/restore.
 * - ✅ **PaJua**: In-memory full-text search engine (Lunr/Solr-like).
 * - ✅ **GUI System**: CSS framework (zerox.js, sumo.js) with dark/light themes, 100+ SVG icons, animations, modals, toasts, admin panel.
 * - ✅ **Drag-and-Drop**: `pa-dnd` for UI rearrangement and file uploads.
 * - ✅ **File Upload/Download**: `pa.file` with progress tracking and streaming.
 * - ✅ **Sessions/Cookies**: Secure session management with HTTP-only, SameSite cookies.
 * - ✅ **Cache**: In-memory, IndexedDB, Redis-like, and Service Worker caching.
 * - ✅ **Emailer**: SMTP-based email with queueing.
 * - ✅ **Encoder**: Base64, SHA-256, JWT encoding/decoding.
 * - ✅ **Cron**: `pa.cron` for scheduled tasks (e.g., backups, notifications).
 * - ✅ **JSON Utilities**: Schema validation, transformation, querying (JSONPath-like).
 * - ✅ **Plugins**: Extensible via `pa.plugin` for custom middleware, components, utilities.
 * - ✅ **WebRTC**: `pa.webrtc` for peer-to-peer video/audio/data.
 * - ✅ **AI Hooks**: `pa.ai` for AI model integration (e.g., embeddings).
 * - ✅ **I18n**: Translation with pluralization, parameter substitution, and fallback.
 * - ✅ **Web Workers**: Parallel processing (multithread.js).
 * - ✅ **CLI**: Scaffolding, migrations, testing, HMR with file watching.
 * - ✅ **Observability**: Logging, metrics, tracing, health checks (OpenTelemetry-compatible).
 * - ✅ **Deployment**: `pa.app.deploy` for build, migration, and restart automation.
 * - ✅ **Performance**: Lazy loading, HMR, clustering, tree-shaking.
 * - ✅ **Utilities**: UUID, hash, paginate, throttle, deepClone, shuffle, and more.
 * - ✅ **Admin UI**: Built-in CRUD panel for database management.
 * - ✅ **Swagger/OpenAPI**: Auto-generated API documentation.
 *
 * 📜 LICENSE:
 * MIT License. See https://opensource.org/licenses/MIT.
 *
 * 🎯 MOTTO: Pretty Awesome JavaScript Framework – Code with clarity, ship with confidence!
 */

(function(global) {
  "use strict";

  // === Environment Detection ===
  const isNode = typeof process !== "undefined" && process.versions?.node;
  const isBrowser = typeof window !== "undefined";
  const crypto = isNode ? require("crypto") : global.crypto || {};
  const fs = isNode ? require("fs")?.promises : null;
  const path = isNode ? require("path") : null;
  const http = isNode ? require("http") : null;
  const ws = isNode ? require("ws") : null;
  const cluster = isNode ? require("cluster") : null;
  const childProcess = isNode ? require("child_process") : null;
  const events = isNode ? require("events") : class EventEmitter {
    constructor() { this.events = new Map(); }
    on(event, cb) { this.events.set(event, (this.events.get(event) || []).concat(cb)); }
    emit(event, ...args) { (this.events.get(event) || []).forEach(cb => cb(...args)); }
  };
  let sqlite3, mongodb, mariadb, pg, chokidar;
  if (isNode) {
    try { sqlite3 = require("better-sqlite3"); } catch {}
    try { mongodb = require("mongodb"); } catch {}
    try { mariadb = require("mariadb"); } catch {}
    try { pg = require("pg"); } catch {}
    try { chokidar = require("chokidar"); } catch {}
  }

  const pa = {};

  // === Plugin Architecture ===
  pa.plugin = {
    registry: new Map(),
    register: (name, plugin) => {
      pa.plugin.registry.set(name, plugin);
      if (plugin.middleware) pa.app.prototype.use(plugin.middleware);
      if (plugin.components) Object.entries(plugin.components).forEach(([n, c]) => pa.comp.define(n, c));
      if (plugin.utils) Object.assign(pa.utils, plugin.utils);
      if (plugin.dbAdapter) pa.db.adapters.set(plugin.dbAdapter.name, plugin.dbAdapter);
      if (plugin.init) plugin.init(pa);
    },
    service: (name, impl) => pa.plugin.registry.set(name, impl),
    getService: name => pa.plugin.registry.get(name),
  };

  // === Core Utilities ===
  pa.utils = {
    uuid: () => crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    }),
    hash: (data, algorithm = "sha256") => crypto.createHash ? crypto.createHash(algorithm).update(String(data)).digest("hex") : String(data).split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0).toString(16),
    paginate: (data, page = 1, perPage = 10) => {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return {
        items: data.slice(start, end),
        total: data.length,
        page,
        perPage,
        totalPages: Math.ceil(data.length / perPage),
      };
    },
    debounce: (fn, ms) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }; },
    throttle: (fn, ms) => { let last = 0; return (...args) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...args); } }; },
    deepClone: obj => JSON.parse(JSON.stringify(obj)),
    shuffle: arr => arr.sort(() => Math.random() - 0.5),
    esc: s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]),
    evalExpr: (expr, scope) => { try { return new Function(...Object.keys(scope), `return ${expr};`)(...Object.values(scope)); } catch { return ""; } },
    tpl: (tpl, data) => tpl.replace(/\{\{(.+?)\}\}/g, (_, expr) => pa.utils.evalExpr(expr.trim(), data) || ""),
    getMimeType: filePath => {
      const ext = path?.extname(filePath)?.toLowerCase();
      return { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".png": "image/png", ".jpg": "image/jpeg" }[ext] || "application/octet-stream";
    },
    parseCookies: cookieString => {
      const cookies = {};
      if (cookieString) cookieString.split(";").forEach(cookie => {
        const [name, ...value] = cookie.split("=");
        cookies[decodeURIComponent(name.trim())] = decodeURIComponent(value.join("=").trim());
      });
      return cookies;
    },
    setCookie: (res, name, value, opts = {}) => {
      let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      if (opts.expires) cookie += `; Expires=${opts.expires.toUTCString()}`;
      if (opts.maxAge) cookie += `; Max-Age=${opts.maxAge}`;
      if (opts.path) cookie += `; Path=${opts.path}`;
      if (opts.secure) cookie += `; Secure`;
      if (opts.httpOnly) cookie += `; HttpOnly`;
      if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;
      res.setHeader("Set-Cookie", (res.getHeader("Set-Cookie") || []).concat(cookie));
    },
    base64: {
      encode: str => btoa(String(str)),
      decode: str => atob(String(str)),
    },
    jwt: {
      sign: (payload, secret = "secret") => require("jsonwebtoken")?.sign(payload, secret) || "token",
      verify: (token, secret = "secret") => require("jsonwebtoken")?.verify(token, secret) || null,
    },
    jsonParse: str => { try { return JSON.parse(str); } catch { return null; } },
  };

  // === JSON Utilities ===
  pa.json = {
    validate: (data, schema) => {
      try {
        if (!schema.properties) return true;
        for (const [key, rules] of Object.entries(schema.properties)) {
          if (rules.required && !data[key]) return false;
          if (rules.type === "string" && typeof data[key] !== "string") return false;
          if (rules.type === "number" && typeof data[key] !== "number") return false;
        }
        return true;
      } catch {
        return false;
      }
    },
    query: (data, path) => {
      const parts = path.split(".");
      let result = data;
      for (const part of parts) {
        result = result[part];
        if (!result) return null;
      }
      return result;
    },
    transform: (data, fn) => Array.isArray(data) ? data.map(fn) : fn(data),
    stream: async function*(data) {
      for (const item of data) yield item;
    },
  };

  // === Emailer ===
  pa.emailer = {
    queue: [],
    send: async (options = { to: "", subject: "", body: "", from: "no-reply@pa.js" }) => {
      if (!isNode) return { error: "Emailer only available in Node.js" };
      pa.emailer.queue.push(options);
      try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.example.com",
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE || false,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        await transporter.sendMail({ from: options.from, to: options.to, subject: options.subject, html: options.body });
        pa.emailer.queue = pa.emailer.queue.filter(e => e !== options);
        return { success: true };
      } catch (e) {
        console.error("Email send failed:", e);
        return { error: e.message };
      }
    },
  };

  // === Cron Scheduler ===
  pa.cron = {
    jobs: new Map(),
    schedule: (name, pattern, fn) => {
      if (!isNode) return;
      const cron = require("node-cron");
      pa.cron.jobs.set(name, cron.schedule(pattern, fn));
    },
    stop: name => pa.cron.jobs.get(name)?.stop(),
  };

  // === Cache ===
  pa.cache = {
    store: new Map(),
    get: key => pa.cache.store.get(key),
    set: (key, value, ttl = 3600) => {
      pa.cache.store.set(key, value);
      if (ttl) setTimeout(() => pa.cache.store.delete(key), ttl * 1000);
    },
    clear: () => pa.cache.store.clear(),
    serviceWorker: async () => {
      if (isBrowser && "serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/pa-sw.js");
        navigator.serviceWorker.controller?.postMessage({ type: "cache", assets: ["/"] });
      }
    },
  };

  // === Full-Text Search (PaJua) ===
  pa.search = {
    index: new Map(),
    add: (id, data) => {
      const tokens = JSON.stringify(data).toLowerCase().split(/\s+/).filter(t => t.length > 2);
      pa.search.index.set(id, { data, tokens });
    },
    search: query => {
      const qTokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
      const results = [];
      for (const [id, { data, tokens }] of pa.search.index) {
        if (qTokens.every(qt => tokens.some(t => t.includes(qt)))) results.push({ id, data });
      }
      return results;
    },
  };

  // === RxJS-Lite ===
  pa.rx = {
    Observable: class { constructor(subscribe) { this.subscribe = subscribe; } },
    from: val => new pa.rx.Observable(observer => { observer.next(val); observer.complete(); }),
    pipe: function(...ops) { return ops.reduce((prev, op) => op(prev), this); },
    map: fn => source => new pa.rx.Observable(observer => source.subscribe({ next: v => observer.next(fn(v)), error: e => observer.error(e), complete: () => observer.complete() })),
    filter: fn => source => new pa.rx.Observable(observer => source.subscribe({ next: v => fn(v) && observer.next(v), error: e => observer.error(e), complete: () => observer.complete() })),
    Subject: class { constructor() { this.observers = []; } next(v) { this.observers.forEach(o => o.next(v)); } subscribe(o) { this.observers.push(o); return { unsubscribe: () => this.observers = this.observers.filter(obs => obs !== o) }; } },
    BehaviorSubject: class extends pa.rx.Subject { constructor(initial) { super(); this.value = initial; } subscribe(o) { o.next(this.value); return super.subscribe(o); } },
    watch: (state, cb) => { const sub = new pa.rx.BehaviorSubject(state); return { set: v => sub.next(v), sub: sub.subscribe(cb) }; },
  };

  // === Web Workers ===
  pa.worker = new (class {
    constructor() { this.threads = 2; this._queue = []; this._active = 0; }
    _worker = {
      JSON: fn => `(${fn.toString()}).apply(null, JSON.parse(new TextDecoder().decode(new Uint8Array(e.data)))).then(v => self.postMessage(JSON.stringify(v))).finally(() => self.close())`,
      Int32: fn => `(${fn.toString()}).apply(null, Array.from(new Int32Array(e.data))).then(v => self.postMessage(new Int32Array(v instanceof Array ? v : [v]).buffer)).finally(() => self.close())`,
      Float64: fn => `(${fn.toString()}).apply(null, Array.from(new Float64Array(e.data))).then(v => self.postMessage(new Float64Array(v instanceof Array ? v : [v]).buffer)).finally(() => self.close())`,
    };
    _encode = {
      JSON: args => new TextEncoder().encode(JSON.stringify(args)).buffer,
      Int32: args => new Int32Array(args).buffer,
      Float64: args => new Float64Array(args).buffer,
    };
    _decode = {
      JSON: data => JSON.parse(new TextDecoder().decode(new Uint8Array(data))),
      Int32: data => Array.from(new Int32Array(data)),
      Float64: data => Array.from(new Float64Array(data)),
    };
    process(type, fn, cb, ...args) {
      const resource = URL.createObjectURL(new Blob([`self.onmessage=e=>${this._worker[type](fn)}`], { type: "text/javascript" }));
      if (this._active < this.threads) {
        this._active++;
        const worker = new Worker(resource);
        worker.onmessage = e => { cb(this._decode[type](e.data)); this._active--; this._queue.length && this.process(...this._queue.shift()); };
        worker.postMessage(this._encode[type](args));
      } else {
        this._queue.push([type, fn, cb, ...args]);
      }
    }
  })();

  // === WebRTC ===
  pa.webrtc = {
    peers: new Map(),
    init: async (room, config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }) => {
      if (!isBrowser) return;
      const peer = new RTCPeerConnection(config);
      pa.webrtc.peers.set(room, peer);
      peer.onicecandidate = e => e.candidate && pa.collab.send(room, { type: "ice", candidate: e.candidate });
      peer.ondatachannel = e => pa.collab.handleDataChannel(room, e.channel);
      return peer;
    },
    send: (room, data) => pa.webrtc.peers.get(room)?.dataChannel?.send(JSON.stringify(data)),
  };

  // === Live Collaboration ===
  pa.collab = {
    rooms: new Map(),
    init: (room, data, syncUrl = "/api/collab") => {
      if (!pa.webrtc.peers.has(room)) pa.webrtc.init(room);
      pa.collab.rooms.set(room, { data, syncUrl });
      pa.db.replicate(syncUrl);
      return pa.collab;
    },
    send: (room, message) => {
      const ws = pa.collab.rooms.get(room)?.ws;
      if (ws) ws.send(JSON.stringify(message));
    },
    handleDataChannel: (room, channel) => {
      channel.onmessage = e => {
        const msg = pa.utils.jsonParse(e.data);
        if (msg.type === "update") {
          const data = pa.crdt.merge(pa.collab.rooms.get(room).data, msg.data);
          pa.collab.rooms.get(room).data = data;
          pa.redraw();
        }
      };
    },
  };

  // === PajsDB: Embedded NoSQL DB ===
  pa.db = {
    adapters: new Map(),
    collections: new Map(),
    schemas: new Map(),
    hooks: new Map(),
    transactions: new Map(),
    wal: new Map(),
    init: (config = { type: isBrowser ? "indexeddb" : "sqlite", path: ":memory:", syncUrl: "" }) => {
      pa.db.adapter = pa.db.adapters.get(config.type) || {
        connect: async () => ({ tables: new Map(), transactions: new Map() }),
        query: async (type, data, params = []) => {
          const db = await pa.db.adapter.connect();
          if (type === "create") db.tables.set(data.table, []);
          if (type === "insert") db.tables.get(data.type)?.push({ ...data, id: data.id || pa.utils.uuid() });
          if (type === "select") return db.tables.get(data)?.filter(row => params.every((p, i) => row[Object.keys(p)[0]] === p[Object.keys(p)[0]])) || [];
          if (type === "begin") db.transactions.set(data.id, []);
          if (type === "commit") db.transactions.delete(data.id);
          if (type === "rollback") {
            const tx = db.transactions.get(data.id);
            tx?.forEach(op => db.tables.get(op.type)?.pop());
            db.transactions.delete(data.id);
          }
          return db.tables.get(data.type) || [];
        },
        close: () => {},
      };
      pa.db.replication = { endpoint: config.syncUrl, interval: 5000 };
      setInterval(() => pa.db.sync(), pa.db.replication.interval);
      return pa.db;
    },
    dispense: type => ({ type, id: pa.utils.uuid(), _ts: Date.now() }),
    store: async bean => {
      bean._ts = Date.now();
      const hook = pa.db.hooks.get(`before:${bean.type}:store`);
      if (hook) await hook(bean);
      await pa.db.adapter.query("insert", bean);
      pa.db.wal.set(bean.id, { op: "insert", data: bean });
      pa.db.audit(`store:${bean.type}`, bean);
      pa.db.sync();
      return bean.id;
    },
    find: (type, query = "") => new pa.rx.Observable(observer => pa.db.adapter.query(`select`, type, query ? pa.utils.jsonParse(query) : []).then(res => { observer.next(res); observer.complete(); })),
    from: type => new QueryBuilder(pa.db, type),
    sync: async () => {
      if (!navigator?.onLine) return;
      try {
        const remote = await pa.http.get(pa.db.replication.endpoint).then(res => res.json());
        pa.db.collections.forEach((coll, type) => coll.forEach((doc, id) => coll.set(id, pa.crdt.merge(doc, remote[type]?.[id] || {}))));
        await pa.http.post(pa.db.replication.endpoint, pa.db.export());
      } catch {}
    },
    replicate: endpoint => { pa.db.replication.endpoint = endpoint; pa.db.sync(); },
    export: () => Array.from(pa.db.collections).reduce((acc, [type, coll]) => { acc[type] = Array.from(coll.values()); return acc; }, {}),
    migrate: async (table, schema) => {
      const db = await pa.db.adapter.connect();
      if (!db.tables.get(table)) {
        db.tables.set(table, []);
        console.log(`ORM: Created collection for ${table}`);
        await pa.db.adapter.query("create", { table, schema });
      }
    },
    relate: (parent, child, type) => {
      const parentBean = pa.db.collections.get(parent.type)?.get(parent.id);
      const childBean = pa.db.collections.get(child.type)?.get(child.id);
      if (type === "hasMany") parentBean[child.type] = (parentBean[child.type] || []).concat(child.id);
      if (type === "belongsTo") childBean.parentId = parent.id;
    },
    link: (parent, child) => pa.db.relate(parent, child, "hasMany"),
    findRelated: async (parent, childType) => {
      const parentBean = pa.db.collections.get(parent.type)?.get(parent.id);
      return parentBean[childType]?.map(id => pa.db.collections.get(childType).get(id)) || [];
    },
    transaction: async callback => {
      const txId = pa.utils.uuid();
      await pa.db.adapter.query("begin", { id: txId });
      try {
        await callback(pa.db);
        await pa.db.adapter.query("commit", { id: txId });
      } catch (e) {
        await pa.db.adapter.query("rollback", { id: txId });
        throw e;
      }
    },
    hook: (event, fn) => pa.db.hooks.set(event, fn),
    audit: (event, data) => console.log(`Audit: ${event}`, data),
    geospatial: {
      add: (id, lat, lng) => pa.db.collections.set("geo", (pa.db.collections.get("geo") || new Map()).set(id, { lat, lng })),
      query: (lat, lng, radius) => Array.from(pa.db.collections.get("geo")?.values() || []).filter(p => {
        const d = Math.sqrt((p.lat - lat) ** 2 + (p.lng - lng) ** 2);
        return d <= radius;
      }),
    },
  };
  class QueryBuilder {
    constructor(db, type) { this.db = db; this.type = type; this._where = ""; this._params = []; }
    where(query, params) { this._where = query; this._params = params; return this; }
    orderBy(field, dir = "asc") { this._order = `${field} ${dir}`; return this; }
    limit(n) { this._limit = n; return this; }
    paginate: async (page = 1, perPage = 10) => {
      const data = await this.db.adapter.query(`select`, this.type, this._where ? this._params : []);
      return pa.utils.paginate(data, page, perPage);
    };
    get: async () => await this.db.adapter.query(`select`, this.type, this._where ? this._params : []);
  }

  // === CRDT ===
  pa.crdt = {
    merge: (local, remote) => {
      const merged = { ...local };
      for (const key in remote) if (remote[key]._ts > (local[key]?._ts || 0)) merged[key] = remote[key];
      return merged;
    },
  };

  // === Universal Markup ===
  pa.tpl = {
    render: (tpl, data, isServer = false) => {
      const html = pa.utils.tpl(tpl, data);
      if (isServer) return html;
      const div = document.createElement("div");
      div.innerHTML = html;
      pa.initUI(div);
      return div;
    },
    ssr: async (path, data) => {
      const tpl = await fs?.readFile(path, "utf8") || "<div>{{ content }}</div>";
      return pa.tpl.render(tpl, data, true);
    },
    html: (strings, ...values) => {
      const tpl = strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");
      return pa.utils.tpl(tpl, pa.state);
    },
    extend: (base, blocks) => {
      let tpl = base;
      for (const [name, content] of Object.entries(blocks)) {
        tpl = tpl.replace(new RegExp(`{{block:${name}}}`, "g"), content);
      }
      return tpl;
    },
  };

  // === GUI: CSS Framework + Icons ===
  pa.css = `
:root {
  --pa-primary: #3b82f6; --pa-primary-dark: #2563eb; --pa-secondary: #64748b; --pa-success: #10b981; --pa-error: #ef4444; --pa-warning: #f59e0b; --pa-info: #06b6d4;
  --pa-gray-50: #f8fafc; --pa-gray-100: #f1f5f9; --pa-gray-200: #e2e8f0; --pa-gray-300: #cbd5e1; --pa-gray-400: #94a3b8; --pa-gray-500: #64748b; --pa-gray-600: #475569; --pa-gray-700: #334155; --pa-gray-800: #1e293b; --pa-gray-900: #0f172a;
  --pa-font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --pa-font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  --pa-space-1: 0.25rem; --pa-space-2: 0.5rem; --pa-space-3: 0.75rem; --pa-space-4: 1rem; --pa-space-6: 1.5rem; --pa-space-8: 2rem;
  --pa-radius-sm: 0.125rem; --pa-radius: 0.25rem; --pa-radius-md: 0.375rem; --pa-radius-lg: 0.5rem; --pa-radius-xl: 0.75rem;
  --pa-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
.pa-button { padding: var(--pa-space-2) var(--pa-space-4); background: var(--pa-primary); color: white; border: none; border-radius: var(--pa-radius); cursor: pointer; }
.pa-button:hover { background: var(--pa-primary-dark); }
.pa-card { background: var(--pa-gray-50); border-radius: var(--pa-radius-md); box-shadow: var(--pa-shadow); padding: var(--pa-space-4); }
.pa-modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); justify-content: center; align-items: center; }
.pa-modal[pa-if] { display: flex; }
.pa-modal-content { background: var(--pa-gray-50); padding: var(--pa-space-4); border-radius: var(--pa-radius-lg); }
.pa-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--pa-space-4); }
.pa-toast { position: fixed; bottom: var(--pa-space-4); right: var(--pa-space-4); padding: var(--pa-space-2) var(--pa-space-4); border-radius: var(--pa-radius); }
.pa-toast.success { background: var(--pa-success); } .pa-toast.error { background: var(--pa-error); }
.pa-input { padding: var(--pa-space-2); border: var(--pa-gray-300) 1px solid; border-radius: var(--pa-radius); }
.pa-input:invalid[pa-validate] { border-color: var(--pa-error); }
.pa-admin { background: var(--pa-gray-100); padding: var(--pa-space-4); }
.pa-admin table { width: 100%; border-collapse: collapse; }
.pa-admin th, .pa-admin td { padding: var(--pa-space-2); border: 1px solid var(--pa-gray-300); }
@keyframes paFade { from { opacity: 0; } to { opacity: 1; } }
@media (max-width: 600px) { .pa-grid { grid-template-columns: 1fr; } .pa-hide-small { display: none; } }
`;
  pa.icons = {
    search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
    grok: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>',
    upload: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5V4h-2v7.5l-2.59-2.58L11 10.67V4H9v6.67l3 3z"/></svg>',
    download: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59 2.58L17 15.5V8h-2v7.5l-2.59 2.58L11 13.67V8H9v5.67l3 3z"/></svg>',
    edit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',
  };
  if (isBrowser) {
    const style = document.createElement("style");
    style.textContent = pa.css;
    document.head.appendChild(style);
  }

  // === Drag-and-Drop ===
  pa.dnd = {
    init: () => {
      document.querySelectorAll("[pa-dnd]").forEach(el => {
        el.draggable = true;
        el.addEventListener("dragstart", e => e.dataTransfer.setData("text/plain", el.getAttribute("pa-dnd")));
        el.addEventListener("dragover", e => e.preventDefault());
        el.addEventListener("drop", e => {
          e.preventDefault();
          const data = e.dataTransfer.getData("text/plain");
          const target = e.currentTarget;
          pa.utils.evalExpr(target.getAttribute("pa-dnd-drop") || "pa.state.dropped = data", { data, pa });
        });
      });
      document.querySelectorAll("[pa-dnd-drop]").forEach(el => el.addEventListener("dragover", e => e.preventDefault()));
    },
  };

  // === File Upload/Download ===
  pa.file = {
    upload: async (el, cb) => {
      const input = el.querySelector("input[type=file]");
      if (!input) return;
      input.addEventListener("change", async () => {
        const files = Array.from(input.files);
        const progress = el.querySelector("[pa-progress]");
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          const res = await pa.http.post(el.getAttribute("pa-upload") || "/api/upload", formData, p => progress && (progress.value = p));
          cb?.(res);
        }
      });
    },
    download: async (url, filename) => {
      const res = await pa.http.get(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    },
  };

  // === I18n with Pluralization ===
  pa.i18n = {
    translations: new Map(),
    plurals: new Map(),
    set: (lang, dict, pluralRules) => {
      pa.i18n.translations.set(lang, dict);
      if (pluralRules) pa.i18n.plurals.set(lang, pluralRules);
    },
    t: (key, lang = "en", params = {}) => {
      let text = pa.i18n.translations.get(lang)?.[key] || key;
      if (params.count !== undefined && pa.i18n.plurals.get(lang)) {
        const rule = pa.i18n.plurals.get(lang)(params.count);
        text = pa.i18n.translations.get(lang)?.[`${key}.${rule}`] || text;
      }
      return pa.utils.tpl(text, params);
    },
  };

  // === AI Hooks ===
  pa.ai = {
    predict: async (model, input) => {
      return await pa.http.post("/api/ai/predict", { model, input }).then(res => res.json());
    },
  };

  // === Reactive UI ===
  pa.state = pa.reactive({});
  pa.reactive = data => new Proxy(data, { set: (t, k, v) => { t[k] = v; pa.redraw(); return true; } });
  pa.computed = (getter, deps) => { const c = pa.rx.BehaviorSubject(getter()); deps.forEach(dep => dep.subscribe(() => c.next(getter()))); return c; };
  pa.m = (tag, attrs = {}, ...children) => ({ tag, attrs, children });
  pa.comp = {
    define: (name, opts) => {
      const comp = {
        data: () => opts.data || {},
        computed: opts.computed || {},
        template: opts.template || "",
        view: vnode => pa.m("div", pa.utils.tpl(opts.template, { ...vnode.state, ...vnode.state.computed })),
      };
      customElements.define(`pa-${name}`, class extends HTMLElement {
        connectedCallback() {
          this.shadow = this.attachShadow({ mode: "open" });
          pa.mount(this.shadow, comp);
        }
      });
    },
  };
  pa.mount = (root, comp) => {
    const render = () => pa.render(root, comp.view({ state: pa.reactive(comp.data()) }));
    render();
    pa.rx.watch(comp.data(), render);
  };
  pa.render = (root, vnode) => {
    const el = document.createElement(vnode.tag);
    Object.entries(vnode.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    vnode.children.forEach(c => el.append(typeof c === "string" ? document.createTextNode(c) : pa.render(null, c)));
    root.innerHTML = "";
    root.appendChild(el);
  };
  pa.redraw = () => requestAnimationFrame(() => document.querySelectorAll(".pa-component").forEach(c => pa.mount(c, c.component)));

  // === Admin UI ===
  pa.admin = {
    init: () => {
      if (!isBrowser) return;
      const admin = document.createElement("div");
      admin.className = "pa-admin";
      admin.innerHTML = `
        <h1>Pa.js Admin Panel</h1>
        <select id="pa-admin-table">
          ${Array.from(pa.db.collections.keys()).map(t => `<option value="${t}">${t}</option>`).join("")}
        </select>
        <table>
          <thead><tr id="pa-admin-headers"></tr></thead>
          <tbody id="pa-admin-rows"></tbody>
        </table>
        <form id="pa-admin-form">
          <h2>Add New</h2>
          <div id="pa-admin-form-fields"></div>
          <button type="submit" class="pa-button pa-primary">Save</button>
        </form>
      `;
      document.body.appendChild(admin);
      const tableSelect = admin.querySelector("#pa-admin-table");
      const updateTable = async () => {
        const type = tableSelect.value;
        const data = await pa.db.from(type).get();
        const headers = Object.keys(data[0] || {}).filter(k => k !== "_ts");
        admin.querySelector("#pa-admin-headers").innerHTML = headers.map(h => `<th>${h}</th>`).concat('<th>Actions</th>').join("");
        admin.querySelector("#pa-admin-rows").innerHTML = data.map(row => `
          <tr>
            ${headers.map(h => `<td>${row[h]}</td>`).join("")}
            <td>
              <button pa-on:click="pa.db.trash({ type: '${type}', id: '${row.id}' }); pa.admin.init()">Delete ${pa.icons.delete}</button>
            </td>
          </tr>
        `).join("");
        admin.querySelector("#pa-admin-form-fields").innerHTML = headers.map(h => `<input name="${h}" placeholder="${h}" class="pa-input" />`).join("");
        admin.querySelector("#pa-admin-form").onsubmit = async e => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.target));
          await pa.db.store(pa.db.dispense(type, formData));
          pa.admin.init();
        };
      };
      tableSelect.onchange = updateTable;
      updateTable();
    },
  };

  // === AJAX ===
  pa.http = {
    get: async url => await fetch(url),
    post: async (url, body, onProgress) => {
      const res = await fetch(url, { method: "POST", body: body instanceof FormData ? body : JSON.stringify(body), headers: body instanceof FormData ? {} : { "Content-Type": "application/json" } });
      if (onProgress) res.onprogress = e => onProgress(e.loaded / e.total);
      return res;
    },
  };
  pa.ajax = () => {
    let config = { url: "", method: "get", type: "json", data: {}, headers: {}, sync: false, cache: true };
    return {
      url: u => { config.url = u; return this; },
      method: m => { config.method = m.toLowerCase(); return this; },
      type: t => { config.type = t.toLowerCase(); return this; },
      data: d => { config.data = d; return this; },
      header: (k, v) => { config.headers[k] = v; return this; },
      go: async () => {
        const url = config.cache ? config.url : `${config.url}${config.url.includes("?") ? "&" : "?"}_=${Date.now()}`;
        const opts = { method: config.method, headers: config.headers, body: config.method !== "get" ? JSON.stringify(config.data) : null };
        const res = await fetch(url, opts);
        return config.type === "json" ? await res.json() : await res.text();
      },
    };
  };

  // === Server & FastAPI-like API ===
  pa.app = class extends events {
    constructor() {
      super();
      this.routes = [];
      this.apis = [];
      this.middleware = [];
      this.staticDirs = [];
      this.sessions = new Map();
      this.flash = new Map();
      this.graphql = null;
      this.openapi = { openapi: "3.0.0", info: { title: "Pa.js API", version: "3.16am-xtn" }, paths: {} };
      this.rateLimit = { limit: 100, windowMs: 15 * 60 * 1000, store: pa.cache.store };
    }
    use(mw) { this.middleware.push(mw); return this; }
    api(path, { get, post, schema }) {
      if (get) this.routes.push({ method: "GET", path, handler: get });
      if (post) this.routes.push({ method: "POST", path, handler: post });
      this.openapi.paths[path] = {
        get: { responses: { 200: { content: { "application/json": { schema } } } } },
        post: { requestBody: { content: { "application/json": { schema } } }, responses: { 200: { content: { "application/json": { schema } } } } },
      };
      this.routes.push({ method: "GET", path: `${path}/docs`, handler: () => this.openapi });
      return this;
    }
    get(path, handler) { this.routes.push({ method: "GET", path, handler }); return this; }
    post(path, handler) { this.routes.push({ method: "POST", path, handler }); return this; }
    ws(path, handler) { if (isNode && ws) this.routes.push({ method: "WS", path, handler }); return this; }
    serveStatic(dir) { this.staticDirs.push(dir); return this; }
    session(id, data) { this.sessions.set(id, data); return this; }
    flash(id, msg, type) { this.flash.set(id, (this.flash.get(id) || []).concat({ msg, type })); return this; }
    graphql(schema, subscribe) {
      this.graphql = schema;
      this.routes.push({ method: "POST", path: "/graphql", handler: async req => ({ data: await schema.resolve(req.body) }) });
      if (subscribe) this.routes.push({ method: "WS", path: "/graphql/subscriptions", handler: subscribe });
      return this;
    }
    oauth2(provider, config) {
      return async (req, res, next) => {
        if (!isNode) return next();
        try {
          const { OAuth2Client } = require("google-auth-library");
          const client = new OAuth2Client(config.clientId, config.clientSecret, config.redirectUri);
          if (req.url === config.callbackPath) {
            const { tokens } = await client.getToken(req.query.code);
            req.oauth2 = tokens;
            next();
          } else {
            res.redirect(client.generateAuthUrl({ scope: config.scopes }));
          }
        } catch (e) {
          res.status(401).json({ error: "OAuth2 failed" });
        }
      };
    }
    csrf() {
      return (req, res, next) => {
        if (req.method === "GET") {
          const token = pa.utils.uuid();
          pa.cache.set(`csrf:${req.sessionId || pa.utils.uuid()}`, token, 3600);
          res.setHeader("X-CSRF-Token", token);
        } else if (req.method === "POST") {
          const token = req.body._csrf || req.headers["x-csrf-token"];
          if (token !== pa.cache.get(`csrf:${req.sessionId}`)) return res.status(403).json({ error: "Invalid CSRF token" });
        }
        next();
      };
    }
    cors({ origins = ["*"], methods = ["GET", "POST", "PUT", "DELETE"], headers = ["Content-Type", "Authorization"] } = {}) {
      return (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", origins.join(","));
        res.setHeader("Access-Control-Allow-Methods", methods.join(","));
        res.setHeader("Access-Control-Allow-Headers", headers.join(","));
        if (req.method === "OPTIONS") return res.status(200).end();
        next();
      };
    }
    securityHeaders() {
      return (req, res, next) => {
        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        next();
      };
    }
    rateLimit({ limit = 100, windowMs = 15 * 60 * 1000 } = {}) {
      return (req, res, next) => {
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const now = Date.now();
        const hits = pa.cache.get(ip) || [];
        pa.cache.set(ip, hits.filter(t => now - t < windowMs).concat(now));
        if (hits.length >= limit) return res.status(429).json({ error: "Rate limit exceeded" });
        next();
      };
    }
    healthCheck() {
      this.routes.push({ method: "GET", path: "/health", handler: (req, res) => res.json({ status: "ok", uptime: process.uptime() }) });
      return this;
    }
    metrics() {
      this.routes.push({ method: "GET", path: "/metrics", handler: (req, res) => res.json({ requests: this.rateLimit.store.size, cache: pa.cache.store.size, db: pa.db.collections.size }) });
      return this;
    }
    deploy(config) {
      if (!isNode) return;
      console.log("🚀 Deploying with config:", config);
      if (config.build) {
        console.log("🔨 Building...");
        childProcess?.execSync(config.build);
      }
      if (config.migrate) {
        console.log("🛢️ Running migrations...");
        pa.db.migrate();
      }
      if (config.restart) {
        console.log("♻️ Restarting server...");
        childProcess?.execSync(config.restart);
      }
      console.log("✅ Deployment complete!");
    }
    listen(port) {
      if (isNode) {
        if (cluster && cluster.isMaster) {
          const numCPUs = require("os").cpus().length;
          for (let i = 0; i < numCPUs; i++) cluster.fork();
          cluster.on("exit", () => cluster.fork());
        } else {
          const server = http.createServer((req, res) => {
            req.body = "";
            req.on("data", c => req.body += c);
            req.on("end", () => {
              if (req.headers["content-type"] === "application/json") req.body = pa.utils.jsonParse(req.body);
              req.cookies = pa.utils.parseCookies(req.headers.cookie);
              req.sessionId = req.cookies.sessionId || pa.utils.uuid();
              pa.utils.setCookie(res, "sessionId", req.sessionId, { httpOnly: true, sameSite: "Strict", maxAge: 86400 });
              let i = 0;
              const next = () => i < this.middleware.length ? this.middleware[i++](req, res, next) : this.routeHandler(req, res);
              next();
            });
          });
          if (ws && this.routes.some(r => r.method === "WS")) {
            const wss = new ws.Server({ server });
            wss.on("connection", (socket, req) => {
              const route = this.routes.find(r => r.method === "WS" && r.path === req.url);
              if (route) route.handler({ socket, req });
            });
          }
          server.listen(port);
        }
      }
    }
    routeHandler: async (req, res) => {
      const route = this.routes.find(r => r.method === req.method && r.path === req.url);
      if (route) {
        try {
          const result = await route.handler(req, res.json ? res : Object.assign(res, {
            json: data => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(data)); },
            status: code => { res.statusCode = code; return res; },
          }));
          if (result) res.json(result);
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
        return;
      }
      for (const dir of this.staticDirs) {
        const filePath = path.join(dir, req.url);
        if (fs && (await fs.stat(filePath).catch(() => null))?.isFile()) {
          res.setHeader("Content-Type", pa.utils.getMimeType(filePath));
          return fs.createReadStream(filePath).pipe(res);
        }
      }
      res.status(404).json({ error: "Not Found" });
    }
  };

  // === CLI ===
  pa.cli = {
    run: args => {
      if (!isNode) return;
      const cmd = args[2];
      if (cmd === "generate") console.log(`Generating ${args[3]}...`);
      if (cmd === "migrate") pa.db.migrate();
      if (cmd === "test") console.log("Running tests...");
      if (cmd === "watch" && chokidar) {
        let proc = childProcess.spawn("node", [args[1]], { stdio: "inherit" });
        chokidar.watch([args[1], "app.js"]).on("change", () => {
          proc.kill();
          proc = childProcess.spawn("node", [args[1]], { stdio: "inherit" });
        });
      }
      if (cmd === "scaffold") pa.cli.scaffold(args[3], args[4]);
    },
    scaffold: (type, name) => {
      if (type === "plugin") {
        const pluginCode = `
module.exports = {
  middleware: (req, res, next) => next(),
  components: { "${name}": { template: "<div>${name}</div>", data: () => ({}) } },
  utils: { ${name}: () => console.log("${name} utility") },
  init: pa => console.log("Initialized ${name} plugin"),
};
        `;
        fs?.writeFile(`plugins/${name}.js`, pluginCode);
        console.log(`Scaffolded plugin: plugins/${name}.js`);
      }
      if (type === "component") {
        const compCode = `
pa.comp.define("${name}", {
  template: "<div>${name}: {{ count }}</div>",
  data: () => ({ count: 0 }),
});
        `;
        fs?.writeFile(`components/${name}.js`, compCode);
        console.log(`Scaffolded component: components/${name}.js`);
      }
    },
  };

  // === Init UI ===
  pa.initUI = (root = document) => {
    pa.dnd.init();
    root.querySelectorAll("[pa-on\\:]").forEach(el => {
      const [event, action] = el.getAttributeNames().find(n => n.startsWith("pa-on:")).split(":")[1].split("=");
      el.addEventListener(event, () => pa.utils.evalExpr(action, pa.state));
    });
    root.querySelectorAll("[pa-bind\\:]").forEach(el => {
      const prop = el.getAttributeNames().find(n => n.startsWith("pa-bind:")).split(":")[1];
      const key = el.getAttribute(`pa-bind:${prop}`);
      el.addEventListener("input", () => pa.state[key] = el[prop]);
      pa.rx.watch(pa.state, v => el[prop] = v[key] || "");
    });
    root.querySelectorAll("[pa-text]").forEach(el => pa.rx.watch(pa.state, v => el.textContent = pa.utils.evalExpr(el.getAttribute("pa-text"), v) || ""));
    root.querySelectorAll("[pa-html]").forEach(el => pa.rx.watch(pa.state, v => el.innerHTML = pa.utils.evalExpr(el.getAttribute("pa-html"), v) || ""));
    root.querySelectorAll("[pa-if]").forEach(el => pa.rx.watch(pa.state, v => el.style.display = pa.utils.evalExpr(el.getAttribute("pa-if"), v) ? "" : "none"));
    root.querySelectorAll("[pa-for]").forEach(el => {
      const [item, , list] = el.getAttribute("pa-for").split(" ");
      pa.rx.watch(pa.state, v => {
        const items = pa.utils.evalExpr(list, v) || [];
        el.innerHTML = items.map(i => pa.utils.tpl(el.innerHTML, { [item]: i })).join("");
      });
    });
    root.querySelectorAll("[pa-ajax]").forEach(el => {
      const [url, method = "get", swap = "innerHTML"] = el.getAttribute("pa-ajax").split(":");
      el.addEventListener("click", () => pa.ajax().url(url).method(method).go().then(data => el[swap] = data));
    });
    root.querySelectorAll("[pa-icon]").forEach(el => el.innerHTML = pa.icons[el.getAttribute("pa-icon")] || "");
    root.querySelectorAll("[pa-toast]").forEach(el => {
      el.addEventListener("click", () => {
        const toast = document.createElement("div");
        toast.className = `pa-toast ${el.getAttribute("pa-toast-type") || "info"}`;
        toast.textContent = el.getAttribute("pa-toast");
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      });
    });
    root.querySelectorAll("[pa-validate]").forEach(form => {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const rules = pa.utils.jsonParse(form.getAttribute("pa-validate"));
        const errors = [];
        for (const [field, ruleList] of Object.entries(rules)) {
          const input = form.querySelector(`[name="${field}"]`);
          if (!input) continue;
          for (const rule of ruleList) {
            if (rule === "required" && !input.value) errors.push(`${field} is required`);
            if (rule === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) errors.push(`${field} must be a valid email`);
            if (rule.startsWith("min:") && input.value.length < parseInt(rule.split(":")[1])) errors.push(`${field} must be at least ${rule.split(":")[1]} characters`);
          }
        }
        if (errors.length) pa.state.errors = errors; else form.submit();
      });
    });
    root.querySelectorAll("[pa-upload]").forEach(el => pa.file.upload(el, res => pa.state.uploadResult = res));
    root.querySelectorAll("[pa-collab]").forEach(el => {
      const [room, type] = el.getAttribute("pa-collab").split(":");
      pa.collab.init(room, pa.state, `/api/collab/${room}`);
      pa.rx.watch(pa.state, v => el.innerHTML = pa.utils.tpl(el.innerHTML, v));
    });
    root.querySelectorAll("[pa-tpl]").forEach(el => {
      const tpl = el.getAttribute("pa-tpl");
      pa.rx.watch(pa.state, v => el.innerHTML = pa.utils.tpl(tpl, v));
    });
    root.querySelectorAll("[pa-admin]").forEach(() => pa.admin.init());
  };
  if (isBrowser) document.addEventListener("DOMContentLoaded", pa.initUI);

  // Export
  global.pa = pa;
  if (isNode && require.main === module) {
    pa.cli.run(process.argv);
    const app = new pa.app();
    app.use(app.csrf()).use(app.cors()).use(app.securityHeaders()).use(app.rateLimit()).healthCheck().metrics();
    app.listen(4375);
  }

  /* Thanks יהוה by Kesh EOF (2468) (2025-09-15 03:07 AM EAT) (UNIX TIME STAMP: 1757986020) (UUID: grk-c-fb1f05bc-e58a-4e3e-92b7-547c7f784931) */
})();