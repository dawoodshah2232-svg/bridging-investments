/* Bridging Investments — portal engine (investor + admin demo) */
(function () {
  "use strict";
  const ROLE = document.body.dataset.role; // "investor" | "admin"
  const authed = localStorage.getItem("bi_role") === ROLE;
  if (!authed && !location.pathname.endsWith("login.html")) { location.replace("login.html"); return; }

  /* ---------- tabs ---------- */
  const tabs = document.querySelectorAll(".side a.tab");
  function go(id) {
    tabs.forEach(t => t.classList.toggle("on", t.dataset.tab === id));
    document.querySelectorAll(".pane").forEach(p => p.classList.toggle("on", p.id === "pane-" + id));
    document.querySelector(".side").classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
    const h = document.querySelector("#pane-" + id + " .page-title");
    if (h) document.title = h.textContent.trim() + " — Bridging Investments";
  }
  tabs.forEach(t => t.addEventListener("click", e => { e.preventDefault(); go(t.dataset.tab); location.hash = t.dataset.tab; }));
  const st = document.querySelector(".side-toggle");
  if (st) st.addEventListener("click", () => document.querySelector(".side").classList.toggle("open"));
  const first = (location.hash || "").replace("#", "") || tabs[0].dataset.tab;
  go(first);

  window.portalLogout = () => { localStorage.removeItem("bi_role"); location.replace("login.html"); };

  /* ---------- toast / modal ---------- */
  window.toast = function (msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.style.cssText = "position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(20px);background:#182028;border:1px solid rgba(255,122,26,.5);color:#f7f4ec;padding:14px 22px;border-radius:14px;z-index:300;font-size:14px;font-weight:600;opacity:0;transition:.3s;max-width:92%;text-align:center"; document.body.appendChild(t); }
    t.textContent = msg; t.style.opacity = 1; t.style.transform = "translateX(-50%)";
    clearTimeout(t._h); t._h = setTimeout(() => { t.style.opacity = 0; }, 3200);
  };
  window.openModal = function (html) {
    let m = document.getElementById("modal");
    if (!m) { m = document.createElement("div"); m.className = "modal"; m.id = "modal"; m.innerHTML = `<div class="modal-bg" onclick="closeModal()"></div><div class="modal-box"><button class="modal-x" onclick="closeModal()">✕</button><div id="modalBody"></div></div>`; document.body.appendChild(m); }
    document.getElementById("modalBody").innerHTML = html;
    m.classList.add("on"); document.body.style.overflow = "hidden";
  };
  window.closeModal = function () { const m = document.getElementById("modal"); if (m) m.classList.remove("on"); document.body.style.overflow = ""; const b = document.querySelector("#modal .modal-box"); if (b) b.classList.remove("wide"); };

  /* ---------- audit trail (demo, localStorage) ---------- */
  window.audit = function (action, detail) {
    try {
      const log = JSON.parse(localStorage.getItem("bi_audit") || "[]");
      const now = new Date();
      const t = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) + " · " +
                now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
      log.unshift({ time: t, actor: document.body.dataset.role === "admin" ? "S. Iqbal" : "A. Khan", action, detail });
      localStorage.setItem("bi_audit", JSON.stringify(log.slice(0, 50)));
      if (typeof renderAudit === "function") renderAudit();
    } catch (e) {}
  };
  window.openDoc = function (url, title) {
    window.openModal(`<h3 style="margin-bottom:4px">${title}</h3>
      <p style="font-size:12.5px;color:var(--dim);margin-bottom:14px">Sample demo document — illustrative only, not a legal instrument.</p>
      <iframe src="${url}" class="doc-frame" title="${title}"></iframe>
      <div style="display:flex;gap:10px;margin-top:16px"><a class="btn btn-primary" style="flex:1" href="${url}" download>Download PDF</a><button class="btn btn-ghost" style="flex:1" onclick="closeModal()">Close</button></div>`);
    const b = document.querySelector("#modal .modal-box"); if (b) b.classList.add("wide");
  };

  /* ---------- canvas helpers ---------- */
  function setup(cv, h) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = cv.clientWidth; cv.width = w * dpr; cv.height = h * dpr;
    const c = cv.getContext("2d"); c.scale(dpr, dpr);
    return [c, w, h];
  }
  window.areaChart = function (id, labels, data, c1, c2) {
    const cv = document.getElementById(id); if (!cv) return;
    const [c, W, H] = setup(cv, 260), max = Math.max(...data) * 1.06, min = Math.min(...data) * 0.94;
    const X = i => 8 + i * (W - 16) / (data.length - 1), Y = v => H - 24 - (v - min) / (max - min) * (H - 60);
    let p = 0;
    (function draw() {
      p = Math.min(1, p + 0.03); c.clearRect(0, 0, W, H);
      const n = Math.max(2, Math.floor(data.length * p));
      c.beginPath();
      for (let i = 0; i < n; i++) i ? c.lineTo(X(i), Y(data[i])) : c.moveTo(X(i), Y(data[i]));
      const g = c.createLinearGradient(0, 0, W, 0); g.addColorStop(0, c1); g.addColorStop(1, c2);
      c.strokeStyle = g; c.lineWidth = 3; c.lineJoin = "round"; c.stroke();
      c.lineTo(X(n - 1), H - 20); c.lineTo(X(0), H - 20); c.closePath();
      const fg = c.createLinearGradient(0, 0, 0, H);
      fg.addColorStop(0, c1 + "44"); fg.addColorStop(1, "transparent");
      c.fillStyle = fg; c.fill();
      c.fillStyle = "#7c868f"; c.font = "11px -apple-system, sans-serif";
      labels.forEach((l, i) => { if (i % 2 === 0) c.fillText(l, X(i) - 8, H - 6); });
      if (p < 1) requestAnimationFrame(draw);
      else { const lx = X(data.length - 1), ly = Y(data[data.length - 1]); c.beginPath(); c.arc(lx, ly, 5, 0, 7); c.fillStyle = c2; c.fill(); c.beginPath(); c.arc(lx, ly, 9, 0, 7); c.strokeStyle = c2 + "66"; c.lineWidth = 2; c.stroke(); }
    })();
  };
  window.donut = function (id, segs) {
    const cv = document.getElementById(id); if (!cv) return;
    const [c, W, H] = setup(cv, 220), cx = W / 2, cy = H / 2, r = Math.min(W, H) / 2 - 14;
    let a = -Math.PI / 2;
    segs.forEach(s => { const a2 = a + s.pct / 100 * Math.PI * 2; c.beginPath(); c.arc(cx, cy, r, a, a2); c.arc(cx, cy, r * 0.62, a2, a, true); c.closePath(); c.fillStyle = s.color; c.fill(); a = a2; });
    c.fillStyle = "#f7f4ec"; c.font = "800 24px -apple-system, sans-serif"; c.textAlign = "center";
    c.fillText(segs[0].center || "", cx, cy + 2);
    c.fillStyle = "#7c868f"; c.font = "11px -apple-system, sans-serif"; c.fillText(segs[0].centerSub || "", cx, cy + 20);
  };
  window.bars = function (id, labels, vals, colors) {
    const cv = document.getElementById(id); if (!cv) return;
    const [c, W, H] = setup(cv, 220), max = Math.max(...vals.map(Math.abs)) * 1.15;
    const bw = (W - 20) / vals.length;
    vals.forEach((v, i) => {
      const h = Math.abs(v) / max * (H - 60), x = 10 + i * bw + bw * 0.22, y = v >= 0 ? H - 30 - h : H - 30;
      const g = c.createLinearGradient(0, y, 0, y + h);
      const col = colors ? colors[i] : (v >= 0 ? "#f0b429" : "#ff7a1a");
      g.addColorStop(0, col); g.addColorStop(1, col + "55");
      c.fillStyle = g;
      const r = 6;
      c.beginPath(); c.roundRect(x, y, bw * 0.56, Math.max(h, 3), r); c.fill();
      c.fillStyle = "#7c868f"; c.font = "10.5px -apple-system, sans-serif"; c.textAlign = "center";
      c.fillText(labels[i], x + bw * 0.28, H - 12);
    });
  };
  window.spark = function (id, data, color) {
    const cv = document.getElementById(id); if (!cv) return;
    const [c, W, H] = setup(cv, 44), max = Math.max(...data), min = Math.min(...data);
    const X = i => i * W / (data.length - 1), Y = v => 4 + (1 - (v - min) / (max - min || 1)) * (H - 8);
    c.beginPath(); data.forEach((v, i) => i ? c.lineTo(X(i), Y(v)) : c.moveTo(X(i), Y(v)));
    c.strokeStyle = color; c.lineWidth = 2; c.stroke();
    c.lineTo(W, H); c.lineTo(0, H); c.closePath();
    c.fillStyle = color + "22"; c.fill();
  };
  window.ring = function (id, pct, color) {
    const el = document.getElementById(id); if (!el) return;
    const R = 34, C = 2 * Math.PI * R;
    el.innerHTML = `<svg width="92" height="92" viewBox="0 0 92 92">
      <circle cx="46" cy="46" r="${R}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="9"/>
      <circle cx="46" cy="46" r="${R}" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"
        stroke-dasharray="${C}" stroke-dashoffset="${C}" transform="rotate(-90 46 46)" style="transition:stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)"/>
      <text x="46" y="51" text-anchor="middle" fill="#f7f4ec" font-size="17" font-weight="800" font-family="-apple-system,sans-serif">${pct}%</text></svg>`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.querySelectorAll("circle")[1].style.strokeDashoffset = C * (1 - pct / 100);
    }));
  };

  /* ---------- command palette ---------- */
  const actions = [...tabs].map(t => ({ label: "Go to " + t.textContent.trim(), tab: t.dataset.tab }));
  actions.push({ label: "Log out", fn: () => portalLogout() });
  let pal = null;
  window.togglePalette = function (force) {
    if (pal && !force) { pal.remove(); pal = null; return; }
    pal = document.createElement("div");
    pal.style.cssText = "position:fixed;inset:0;z-index:400;background:rgba(5,7,9,.7);backdrop-filter:blur(6px);display:grid;place-items:start center;padding-top:16vh";
    pal.innerHTML = `<div style="width:min(560px,92%);background:#141b21;border:1px solid rgba(255,255,255,.14);border-radius:18px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6)">
      <input id="palIn" placeholder="Type a command…  (go to reports, compliance, log out)" style="width:100%;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.1);padding:18px 22px;color:#f7f4ec;font-size:16px;font-family:inherit;outline:0">
      <div id="palList" style="max-height:300px;overflow:auto;padding:8px"></div></div>`;
    pal.addEventListener("click", e => { if (e.target === pal) togglePalette(); });
    document.body.appendChild(pal);
    const inp = pal.querySelector("#palIn"), list = pal.querySelector("#palList");
    const render = q => {
      const hits = actions.filter(a => a.label.toLowerCase().includes(q.toLowerCase()));
      list.innerHTML = hits.map((h, i) => `<div data-i="${actions.indexOf(h)}" style="padding:13px 18px;border-radius:12px;cursor:pointer;font-size:15px;font-weight:600;${i === 0 ? "background:rgba(255,122,26,.14)" : ""}">${h.label}</div>`).join("") || `<div style="padding:20px;color:#7c868f">No matches</div>`;
      list.querySelectorAll("div[data-i]").forEach(d => d.onclick = () => { const a = actions[+d.dataset.i]; togglePalette(); a.fn ? a.fn() : go(a.tab); });
    };
    inp.addEventListener("input", () => render(inp.value));
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { const f = list.querySelector("div[data-i]"); if (f) f.click(); } });
    render(""); inp.focus();
  };
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); togglePalette(true); }
    if (e.key === "Escape" && pal) togglePalette();
  });

  /* ---------- countdowns ---------- */
  document.querySelectorAll("[data-cd]").forEach(el => {
    const target = Date.now() + (+el.dataset.cd) * 36e5;
    const tick = () => {
      let d = Math.max(0, target - Date.now());
      const h = Math.floor(d / 36e5), m = Math.floor(d % 36e5 / 6e4), s = Math.floor(d % 6e4 / 1e3);
      el.textContent = `${h}h ${m}m ${s}s`;
    }; tick(); setInterval(tick, 1000);
  });

  /* ---------- generic demo actions ---------- */
  window.demoApprove = (id, what) => toast(`Demo: ${what} ${id} approved (maker-checker logged)`);
  window.demoReject = (id, what) => toast(`Demo: ${what} ${id} sent back with a note`);
  window.demoToggle = (name, el) => {
    const on = el.dataset.on === "1";
    el.dataset.on = on ? "0" : "1";
    el.innerHTML = on ? "Connect" : "✓ Connected";
    el.className = "btn btn-sm " + (on ? "btn-ghost" : "btn-gold");
    toast(`Demo: ${name} ${on ? "disconnected" : "connected"} — keys stored in vault in production`);
  };
})();
