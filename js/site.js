/* Bridging Investments — public site engine */
(function () {
  "use strict";
  const BASE = document.body.dataset.base || "";

  /* ---------- header ---------- */
  const nav = document.getElementById("siteNav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const burger = document.getElementById("burger"), drawer = document.getElementById("drawer");
  if (burger && drawer) burger.addEventListener("click", () => {
    const open = drawer.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  if (drawer) drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => drawer.classList.remove("open")));

  const page = document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach(a => { if (a.dataset.nav === page) a.classList.add("active"); });

  const yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      e.target.querySelectorAll(".bar i").forEach(b => b.style.width = b.dataset.w + "%");
      io.unobserve(e.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- animated counters ---------- */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || 0);
    const pre = el.dataset.pre || "", suf = el.dataset.suf || "", t0 = performance.now(), dur = 1600;
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3), v = target * ease;
      el.textContent = pre + v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    cio.unobserve(el);
  }), { threshold: 0.4 });
  document.querySelectorAll("[data-count]").forEach(el => cio.observe(el));

  /* ---------- ticker loop ---------- */
  document.querySelectorAll(".ticker-track").forEach(t => { t.innerHTML += t.innerHTML; });

  /* ---------- FAQ accordions ---------- */
  document.querySelectorAll(".acc-q").forEach(q => q.addEventListener("click", () => {
    const acc = q.parentElement, body = acc.querySelector(".acc-a"), open = acc.classList.toggle("open");
    body.style.maxHeight = open ? body.scrollHeight + "px" : 0;
  }));

  /* ---------- hero canvas: particles + equity curve ---------- */
  const cv = document.getElementById("heroCanvas");
  if (cv) {
    const ctx = cv.getContext("2d");
    let W, H, parts = [], t = 0, curveP = 0;
    const N = () => Math.min(70, Math.floor(window.innerWidth / 22));
    function size() { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; }
    size(); window.addEventListener("resize", size);
    function seed() { parts = Array.from({ length: N() }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + .6, s: Math.random() * .35 + .12, o: Math.random() * .5 + .15, hue: Math.random() > .45 ? "255,140,40" : "40,200,130" })); }
    seed();
    const curveY = p => H * 0.78 - (H * 0.5) * (p * p * 0.9 + p * 0.15) - Math.sin(p * 14) * 8;
    function frame() {
      t += 0.008; ctx.clearRect(0, 0, W, H);
      // blobs
      const g1 = ctx.createRadialGradient(W * .8, H * .2, 0, W * .8, H * .2, W * .45);
      g1.addColorStop(0, "rgba(255,122,26,.14)"); g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
      const g2 = ctx.createRadialGradient(W * .15, H * .85, 0, W * .15, H * .85, W * .4);
      g2.addColorStop(0, "rgba(34,197,94,.10)"); g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
      // particles
      parts.forEach(p => {
        p.y -= p.s; p.x += Math.sin(t * 2 + p.y * .02) * .25;
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * W; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(${p.hue},${p.o})`; ctx.fill();
      });
      // equity curve
      if (curveP < 1) curveP = Math.min(1, curveP + 0.004);
      const steps = 90, pts = [];
      for (let i = 0; i <= steps * curveP; i++) { const p = i / steps; pts.push([p * W, curveY(p)]); }
      if (pts.length > 1) {
        const lg = ctx.createLinearGradient(0, 0, W, 0);
        lg.addColorStop(0, "#ff7a1a"); lg.addColorStop(.6, "#ffb020"); lg.addColorStop(1, "#22c55e");
        ctx.beginPath(); pts.forEach((pt, i) => i ? ctx.lineTo(pt[0], pt[1]) : ctx.moveTo(pt[0], pt[1]));
        ctx.strokeStyle = lg; ctx.lineWidth = 3; ctx.shadowColor = "rgba(255,140,40,.7)"; ctx.shadowBlur = 14; ctx.stroke(); ctx.shadowBlur = 0;
        const last = pts[pts.length - 1];
        ctx.beginPath(); ctx.arc(last[0], last[1], 5 + Math.sin(t * 4) * 1.5, 0, 7);
        ctx.fillStyle = "#22c55e"; ctx.fill();
        ctx.lineTo(last[0], H); ctx.lineTo(pts[0][0], H); ctx.closePath();
        const fg = ctx.createLinearGradient(0, H * .3, 0, H);
        fg.addColorStop(0, "rgba(255,140,40,.16)"); fg.addColorStop(1, "transparent");
        ctx.fillStyle = fg; ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ---------- project cards ---------- */
  const statusChip = s => s === "funding" ? '<span class="chip live">● Funding</span>'
    : s === "evaluation" ? '<span class="chip soon">Evaluation</span>' : '<span class="chip review">Under review</span>';
  window.renderProjectCards = function (mountId, list) {
    const m = document.getElementById(mountId); if (!m) return;
    m.innerHTML = list.map((p, i) => {
      const allocated = p.units ? Math.round((p.reserved + p.funded) / p.units * 100) : 0;
      const fundedPct = p.units ? Math.round(p.funded / p.units * 100) : 0;
      const avail = p.units ? p.units - p.reserved - p.funded : 0;
      const img = p.img ? `<img src="${BASE}${p.img}" alt="${p.name}" loading="lazy">`
        : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#1a2230,#0e1318);display:grid;place-items:center;font-size:44px">◈</div>`;
      return `<article class="p-card reveal d${(i % 4) + 1}">
        <div class="p-img">${img}${statusChip(p.status)}</div>
        <div class="p-body">
          <h3>${p.name}</h3>
          <div class="p-meta"><span>📍 ${p.location}</span><span>🏷 ${p.category}</span></div>
          ${p.units ? `<div class="p-econ">
            <div>Unit price<b>${fmtAED(p.unitPrice)}</b></div>
            <div style="text-align:right">Available<b style="color:var(--green)">${avail} units</b></div>
          </div>
          <div class="p-bars">
            <div class="bar-row"><span>Allocated</span><b style="color:var(--orange2)">${allocated}%</b></div>
            <div class="bar o"><i data-w="${allocated}"></i></div>
            <div class="bar-row"><span>Funded</span><b style="color:var(--green)">${fundedPct}%</b></div>
            <div class="bar g"><i data-w="${fundedPct}"></i></div>
          </div>` : `<p style="color:var(--muted);font-size:14px">${p.tagline}</p>`}
          <div class="p-cta">
            <a class="btn btn-primary btn-sm" href="${BASE}project.html?id=${p.id}">${p.status === "funding" ? "View & reserve" : "View details"}</a>
          </div>
        </div></article>`;
    }).join("");
    m.querySelectorAll(".reveal").forEach(el => io.observe(el));
  };

  /* ---------- projects listing + filters ---------- */
  const listMount = document.getElementById("projectList");
  if (listMount && window.BIDEMO) {
    const cat = document.getElementById("fCat"), st = document.getElementById("fStatus"),
      q = document.getElementById("fSearch"), sort = document.getElementById("fSort");
    const cats = [...new Set(BIDEMO.projects.map(p => p.category))];
    cat.innerHTML = `<option value="">All categories</option>` + cats.map(c => `<option>${c}</option>`).join("");
    function apply() {
      let L = BIDEMO.projects.filter(p =>
        (!cat.value || p.category === cat.value) &&
        (!st.value || p.status === st.value) &&
        (!q.value || (p.name + p.location + p.category).toLowerCase().includes(q.value.toLowerCase())));
      if (sort.value === "avail") L = [...L].sort((a, b) => (b.units - b.reserved - b.funded) - (a.units - a.reserved - a.funded));
      if (sort.value === "capital") L = [...L].sort((a, b) => b.capital - a.capital);
      renderProjectCards("projectList", L);
      const empty = document.getElementById("noResults");
      if (empty) empty.style.display = L.length ? "none" : "block";
      document.getElementById("resCount").textContent = L.length + (L.length === 1 ? " project" : " projects");
    }
    [cat, st, sort].forEach(el => el.addEventListener("change", apply));
    q.addEventListener("input", apply);
    apply();
  }

  /* ---------- project detail ---------- */
  const det = document.getElementById("projectDetail");
  if (det && window.BIDEMO) {
    const id = new URLSearchParams(location.search).get("id") || "yacht";
    const p = BIDEMO.projects.find(x => x.id === id) || BIDEMO.projects[0];
    const allocated = p.units ? Math.round((p.reserved + p.funded) / p.units * 100) : 0;
    const fundedPct = p.units ? Math.round(p.funded / p.units * 100) : 0;
    const avail = p.units ? p.units - p.reserved - p.funded : 0;
    det.innerHTML = `
      <div class="two-col" style="align-items:start">
        <div>
          <div class="p-img" style="border-radius:var(--r);border:1px solid var(--line)">
            ${p.img ? `<img src="${BASE}${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;aspect-ratio:16/10">` : ""}
            ${statusChip(p.status)}</div>
          <div class="panel" style="margin-top:22px"><h3>Capital budget</h3><p class="ph-sub">Use of funds — illustrative, from approved documents ${p.version}</p>
            <div class="table-wrap" style="border:0"><table style="min-width:0">
            ${p.budget.map(b => `<tr><td>${b[0]}</td><td class="num" style="text-align:right">${fmtAED(b[1])}</td></tr>`).join("")}
            <tr><td><b>Total capital required</b></td><td class="num" style="text-align:right"><b>${fmtAED(p.capital)}</b></td></tr>
            </table></div></div>
          <div class="panel"><h3>Key risks</h3><p class="ph-sub">Read before reserving. Capital is at risk.</p>
            <ul style="color:var(--muted);font-size:14.5px;padding-left:20px;display:grid;gap:9px">${p.risks.map(r => `<li>${r}</li>`).join("")}</ul></div>
          <div class="panel"><h3>Document room</h3><p class="ph-sub">Approved documents · version-controlled</p>
            ${p.docs.map(d => `<div class="doc-row"><div><b>${d[0]}</b><div class="dm">${d[1]}</div></div><button class="btn btn-ghost btn-sm" onclick="toast('Demo: document preview opens after sign-in')">Preview</button></div>`).join("") || '<p style="color:var(--dim)">No documents published yet.</p>'}</div>
        </div>
        <div>
          <div class="panel" style="border-color:rgba(255,122,26,.35)">
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px"><span class="badge info">${p.code}</span><span class="badge mut">${p.version}</span></div>
            <h3 style="font-size:26px">${p.name}</h3>
            <p class="ph-sub">📍 ${p.location} · ${p.category}</p>
            <p style="color:var(--muted);font-size:15px;margin-bottom:18px">${p.tagline}</p>
            ${p.units ? `
            <div class="p-econ" style="margin-bottom:14px"><div>Unit price<b>${fmtAED(p.unitPrice)}</b></div><div style="text-align:right">Offered<b>${p.units} units</b></div></div>
            <div class="p-bars" style="margin-bottom:18px">
              <div class="bar-row"><span>${p.reserved} reserved · ${p.funded} funded</span><b style="color:var(--orange2)">${allocated}% allocated</b></div>
              <div class="bar o"><i data-w="${allocated}" style="width:${allocated}%"></i></div>
              <div class="bar-row"><span>Funded allocations</span><b style="color:var(--green)">${fundedPct}%</b></div>
              <div class="bar g"><i data-w="${fundedPct}" style="width:${fundedPct}%"></i></div>
              <div class="bar-row"><span><b style="color:var(--green)">${avail} units available</b></span><span>Min ${p.min} · Max ${p.max}</span></div>
            </div>
            <div class="stepper" style="margin-bottom:16px">
              <button id="qMinus" aria-label="Fewer units">−</button><b id="qVal">1</b><button id="qPlus" aria-label="More units">+</button>
              <div style="margin-left:auto;text-align:right"><div style="font-size:12px;color:var(--dim)">Total</div><b id="qTotal" style="font-size:20px;color:var(--orange2)">${fmtAED(p.unitPrice)}</b></div>
            </div>
            <button class="btn btn-primary btn-lg" style="width:100%" id="reserveBtn">Reserve ${p.unitPrice ? "units" : ""} →</button>
            <p style="font-size:12.5px;color:var(--dim);margin-top:12px">A reservation holds units for a limited time. It is <b>not</b> ownership — cleared funds and legal issuance create ownership. Campaign long stop: <b style="color:var(--ivory)">${p.longStop}</b>.</p>`
            : `<button class="btn btn-ghost btn-lg" style="width:100%" onclick="registerInterest('${p.id}')">Register interest</button>
               <p style="font-size:12.5px;color:var(--dim);margin-top:12px">This project is not reservable yet. Register interest and we will notify you when the offer is approved.</p>`}
          </div>
          <div class="panel"><h3>Timeline</h3><div class="timeline" style="margin-top:16px">
            ${p.timeline.map((t, i) => `<div class="tl-item${i > 1 ? " g" : ""}"><b>${t[0]}</b><span>${t[1]}</span></div>`).join("")}
          </div></div>
          <div class="panel"><h3>Structure</h3>
            <div class="doc-row"><div>Issuer<b style="display:block;color:var(--muted);font-weight:400">${p.issuer}</b></div></div>
            <div class="doc-row"><div>Operator<b style="display:block;color:var(--muted);font-weight:400">${p.operator}</b></div></div>
            <div class="doc-row"><div>Offering currency<b style="display:block;color:var(--muted);font-weight:400">AED — single currency</b></div></div>
          </div>
        </div>
      </div>
      <div class="reserve-bar"><div class="container" style="display:flex;align-items:center;gap:14px">
        <div style="font-size:13px"><b>${p.name}</b><div style="color:var(--muted)">${p.units ? fmtAED(p.unitPrice) + " / unit · " + avail + " left" : "Not reservable yet"}</div></div>
        ${p.units ? `<button class="btn btn-primary" style="margin-left:auto" onclick="document.getElementById('reserveBtn').click()">Reserve →</button>` : ""}
      </div></div>`;
    det.querySelectorAll(".bar i").forEach(b => b.style.width = b.dataset.w + "%");
    let qv = 1;
    const qVal = document.getElementById("qVal"), qTotal = document.getElementById("qTotal");
    const upd = () => { qVal.textContent = qv; qTotal.textContent = fmtAED(qv * p.unitPrice); };
    const minus = document.getElementById("qMinus"), plus = document.getElementById("qPlus");
    if (minus) minus.onclick = () => { qv = Math.max(p.min, qv - 1); upd(); };
    if (plus) plus.onclick = () => { qv = Math.min(Math.min(p.max, avail), qv + 1); upd(); };
    const rb = document.getElementById("reserveBtn");
    if (rb) rb.onclick = () => openReserve(p, qv);
    document.title = p.name + " — Bridging Investments";
  }

  /* ---------- reserve modal ---------- */
  window.openReserve = function (p, qty) {
    openModal(`<h3>Reserve ${qty} unit${qty > 1 ? "s" : ""}</h3>
      <p style="color:var(--muted);font-size:14.5px;margin-bottom:18px">${p.name} · ${fmtAED(p.unitPrice)} / unit · Offer ${p.version}</p>
      <div class="p-econ" style="margin-bottom:18px"><div>Commitment<b>${fmtAED(qty * p.unitPrice)}</b></div><div style="text-align:right">Reference<b style="color:var(--green)">RSV-${Math.floor(88000 + Math.random() * 1999)}</b></div></div>
      <p style="font-size:13px;color:var(--dim);margin-bottom:20px">Demo mode: no account is created and no money moves. In production this step requires a verified, eligible investor and creates a time-limited hold with an idempotency key.</p>
      <button class="btn btn-primary btn-lg" style="width:100%" onclick="closeModal();toast('Demo reservation confirmed — check the investor portal tour')">Confirm demo reservation</button>
      <div style="text-align:center;margin-top:14px"><a href="${BASE}investor/login.html" style="color:var(--orange2);font-weight:700;font-size:14px">Have an account? Sign in →</a></div>`);
  };
  window.registerInterest = function (id) {
    openModal(`<h3>Interest registered</h3><p style="color:var(--muted);margin:10px 0 22px">We will notify you when <b>${id}</b> opens for reservations. (Demo — no email was sent.)</p><button class="btn btn-primary" style="width:100%" onclick="closeModal()">Done</button>`);
  };

  /* ---------- modal + toast ---------- */
  window.openModal = function (html) {
    let m = document.getElementById("modal");
    if (!m) { m = document.createElement("div"); m.id = "modal"; m.className = "modal"; m.innerHTML = `<div class="modal-bg" onclick="closeModal()"></div><div class="modal-box"><button class="modal-x" onclick="closeModal()">✕</button><div id="modalBody"></div></div>`; document.body.appendChild(m); }
    document.getElementById("modalBody").innerHTML = html;
    m.classList.add("on"); document.body.style.overflow = "hidden";
  };
  window.closeModal = function () { const m = document.getElementById("modal"); if (m) m.classList.remove("on"); document.body.style.overflow = ""; };
  window.toast = function (msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.style.cssText = "position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(20px);background:#182028;border:1px solid rgba(255,122,26,.5);color:var(--ivory);padding:14px 22px;border-radius:14px;z-index:300;font-size:14px;font-weight:600;opacity:0;transition:.3s;max-width:92%;text-align:center"; document.body.appendChild(t); }
    t.textContent = msg; t.style.opacity = 1; t.style.transform = "translateX(-50%)";
    clearTimeout(t._h); t._h = setTimeout(() => { t.style.opacity = 0; t.style.transform = "translateX(-50%) translateY(20px)"; }, 3200);
  };

  /* ---------- forms → demo success ---------- */
  document.querySelectorAll("form[data-demo]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    const ref = "TCK-" + Math.floor(3000 + Math.random() * 999);
    const box = f.parentElement;
    box.innerHTML = `<div style="text-align:center;padding:30px 10px;animation:fadeUp .4s ease">
      <div style="font-size:52px;margin-bottom:14px">✅</div>
      <h3 style="font-size:24px;margin-bottom:10px">Received — thank you</h3>
      <p style="color:var(--muted);margin-bottom:16px">Your ticket reference is <b style="color:var(--orange2)">${ref}</b>.<br>Our team replies within one business day.</p>
      <span class="badge demo">DEMO — nothing was sent</span></div>`;
    window.scrollTo({ top: box.offsetTop - 120, behavior: "smooth" });
  }));

  /* ---------- countdown (campaign) ---------- */
  document.querySelectorAll("[data-countdown]").forEach(el => {
    const end = new Date(el.dataset.countdown + "T23:59:59+04:00").getTime();
    const tick = () => {
      let d = Math.max(0, end - Date.now());
      const days = Math.floor(d / 864e5); d -= days * 864e5;
      const h = Math.floor(d / 36e5), m = Math.floor(d % 36e5 / 6e4);
      el.textContent = `${days}d ${h}h ${m}m`;
    }; tick(); setInterval(tick, 60000);
  });
})();
