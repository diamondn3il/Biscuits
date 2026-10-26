/* The Biscuit Tin — search, Biscuit of the Day, dunk test and the detail view. */
(function () {
  const B = window.BISCUITS;
  const CATS = window.BISCUIT_CATEGORIES;
  const Art = window.BiscuitArt;
  const byId = new Map(B.map((b) => [b.id, b]));
  const $ = (sel, el = document) => el.querySelector(sel);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const norm = (s) =>
    String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’]/g, "");

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  /* ---------- Small bits of shared markup ---------- */

  // Each type of biscuit has its own pastel, defined as a token in styles.css.
  const catVar = (c) => `var(--cat-${c.toLowerCase().replace(/[^a-z]+/g, "-")})`;

  const CUP = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h13v5a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6z" fill="currentColor"/><path d="M16 10h1.5a3 3 0 0 1 0 6H15" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 2.5c-1 1.2 1 1.8 0 3.2M11 2.5c-1 1.2 1 1.8 0 3.2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`;

  function cups(n) {
    let s = `<span class="cups" role="img" aria-label="Dunkability ${n} out of 5">`;
    for (let i = 1; i <= 5; i++) s += `<span class="${i <= n ? "" : "off"}" style="--c:${i}">${CUP}</span>`;
    return s + `</span>`;
  }

  const ovenText = (o) => (o ? `${o.c}°C · ${o.fan}°C fan · Gas Mark ${o.gas}` : "No baking needed");
  const dunkWords = (b) =>
    b.dunkSecs === 0 ? "Please don't" : `About ${b.dunkSecs} second${b.dunkSecs === 1 ? "" : "s"}`;

  function highlight(text, terms) {
    if (!terms.length) return esc(text);
    const re = new RegExp("(" + terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi");
    return String(text)
      .split(re)
      .map((part, i) => (i % 2 ? `<mark>${esc(part)}</mark>` : esc(part)))
      .join("");
  }

  /* ---------- Biscuit of the Day ---------- */

  function seeded(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Every biscuit gets a day before any repeats; the order is reshuffled each cycle.
  function biscuitOfTheDay(date) {
    const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 864e5);
    const cycle = Math.floor(day / B.length);
    const rand = seeded(Math.imul(cycle + 1, 2654435761));
    const order = B.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return B[order[day % B.length]];
  }

  const today = biscuitOfTheDay(new Date());

  function rosette() {
    return `<svg class="rosette" viewBox="0 0 120 172" aria-hidden="true">
      <path d="M46 78 L26 166 L44 154 L54 170 L64 84 Z" fill="#b8263f"/>
      <path d="M74 78 L94 166 L76 154 L66 170 L56 84 Z" fill="#24407a"/>
      <path d="${Art.flutedPath(60, 60, 54, 26, 4)}" fill="#b8263f"/>
      <circle cx="60" cy="60" r="44" fill="#f2c14e"/>
      <circle cx="60" cy="60" r="38" fill="none" stroke="#b8263f" stroke-width="1.6" stroke-dasharray="3 3"/>
      <g font-family="'IBM Plex Mono', ui-monospace, monospace" font-weight="600" fill="#1c2640" text-anchor="middle">
        <text x="60" y="50" font-size="11" letter-spacing="1.5">BISCUIT</text>
        <text x="60" y="64" font-size="9" font-style="italic" font-family="Nunito, system-ui, sans-serif">of the</text>
        <text x="60" y="80" font-size="16" letter-spacing="2">DAY</text>
      </g>
    </svg>`;
  }

  // Teacup drawn in two layers so a dunked biscuit can sit between the tea and the cup's front.
  const cupBack = `<svg class="cup-back" viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="58" cy="95" rx="56" ry="5" fill="#2a1a0c" opacity=".15"/>
      <ellipse cx="56" cy="22" rx="44" ry="9" style="fill:var(--cup);stroke:var(--cup-line)" stroke-width="2"/>
      <ellipse cx="56" cy="23" rx="39" ry="6.5" style="fill:var(--tea)"/>
      <ellipse class="tea-ripple" cx="56" cy="23" rx="22" ry="3.6" fill="none" stroke="#fff" stroke-width="1.4" opacity="0"/>
    </svg>`;
  const cupFront = `<svg class="cup-front" viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="58" cy="92" rx="54" ry="6" style="fill:var(--cup);stroke:var(--cup-line)" stroke-width="2"/>
      <path d="M98 34 h5 a14 14 0 0 1 0 28 h-9" fill="none" style="stroke:var(--cup)" stroke-width="7" stroke-linecap="round"/>
      <path d="M98 34 h5 a14 14 0 0 1 0 28 h-9" fill="none" style="stroke:var(--cup-line)" stroke-width="2" stroke-linecap="round" opacity=".7"/>
      <path d="M12 22 A44 9 0 0 0 100 22 Q100 88 56 88 Q12 88 12 22 Z" style="fill:var(--cup);stroke:var(--cup-line)" stroke-width="2"/>
      <path d="M20 46 Q56 56 92 46" fill="none" stroke="#3e6fb5" stroke-width="2.4" opacity=".8"/>
      <path d="M24 54 Q56 63 88 54" fill="none" stroke="#b8263f" stroke-width="1.6" opacity=".7"/>
      <path d="M22 28 Q24 58 40 76" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/>
    </svg>`;
  const crumbs = `<svg class="crumbs" viewBox="0 0 120 100" aria-hidden="true">
      <circle cx="40" cy="23" r="2.6" fill="#c98e4a"/><circle cx="52" cy="25" r="1.8" fill="#c98e4a"/>
      <circle cx="66" cy="22" r="2.2" fill="#c98e4a"/><circle cx="74" cy="25" r="1.4" fill="#c98e4a"/>
      <circle cx="58" cy="21" r="1.2" fill="#c98e4a"/><circle cx="31" cy="24" r="1.3" fill="#c98e4a"/>
    </svg>`;

  function renderToday() {
    const b = today;
    const date = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    $("#today").innerHTML = `
      <div class="today-card" style="--cat:${catVar(b.category)}">
        <div class="stage" id="stage">
          ${rosette()}
          <div class="plate-doily">${Art.doilySvg()}</div>
          ${cupBack}
          <div class="dunker">${Art.svg(b, { noDoily: true })}</div>
          ${cupFront}
          ${crumbs}
          <svg class="steam" viewBox="0 0 60 60" aria-hidden="true">
            <path d="M18 58 q-8 -10 0 -20 t0 -20" />
            <path d="M30 58 q-8 -10 0 -20 t0 -20" />
            <path d="M42 58 q-8 -10 0 -20 t0 -20" />
          </svg>
        </div>
        <div class="today-text">
          <p class="eyebrow">Biscuit of the Day · ${esc(date)}</p>
          <h2 id="today-title">${esc(b.name)}</h2>
          <p class="aka">“${esc(b.aka)}”</p>
          <p class="blurb">${esc(b.blurb)}</p>
          <dl class="today-facts">
            <div><dt>Introduced</dt><dd>${esc(b.yearLabel)}</dd></div>
            <div><dt>From</dt><dd>${esc(b.origin)}</dd></div>
            <div><dt>Dunkability</dt><dd>${cups(b.dunk)}</dd></div>
          </dl>
          <div class="today-actions">
            <a class="btn primary" href="#${b.id}" data-open="${b.id}">Read the history &amp; recipe</a>
            <button class="btn custard" type="button" id="dunk">Dunk test</button>
          </div>
          <p class="dunk-result" id="dunk-result" aria-live="polite">Will it survive a dunk? There's only one way to find out.</p>
        </div>
      </div>`;
    $("#dunk").addEventListener("click", dunkTest);
  }

  let dunking = false;
  function dunkTest() {
    const b = today;
    const stage = $("#stage");
    const btn = $("#dunk");
    const out = $("#dunk-result");
    if (dunking) return;
    if (stage.classList.contains("lost")) {
      stage.classList.remove("lost", "soggy");
      btn.textContent = "Dunk test";
      out.textContent = "Fished out with a teaspoon and replaced with a fresh one. Ready when you are.";
      return;
    }
    const survives = Math.random() < 0.15 + b.dunk * 0.17;
    stage.classList.remove("soggy");
    dunking = true;
    btn.disabled = true;
    out.textContent = "Dunking…";

    const finish = () => {
      dunking = false;
      btn.disabled = false;
      stage.classList.remove("dunking", "fail");
      if (survives) {
        stage.classList.add("soggy");
        out.innerHTML = `<strong>It survived!</strong> The ${esc(b.name)} came out soggy but proud. ${b.dunkSecs ? `Best dunked for ${dunkWords(b).toLowerCase()}.` : "Even so, best enjoyed dry."}`;
        btn.textContent = "Dunk again";
      } else {
        stage.classList.add("lost");
        out.innerHTML = `<strong>Plop.</strong> The ${esc(b.name)} has gone to the bottom of the mug. Fetch a teaspoon.`;
        btn.textContent = "Fish it out";
      }
    };

    if (reduceMotion) return finish();
    if (!survives) stage.classList.add("fail");
    stage.classList.add("dunking");
    $(".dunker", stage).addEventListener("animationend", finish, { once: true });
    setTimeout(() => {
      const r = stage.getBoundingClientRect();
      burst(r.left + r.width * 0.755, r.top + r.height * 0.66, {
        count: survives ? 10 : 18,
        colors: ["var(--tea)", "#c98e4a", "#b9773f"],
        round: true,
        lift: 90
      });
    }, 1050);
  }

  /* ---------- Search and the grid ---------- */

  const index = B.map((b) => ({
    b,
    name: norm(b.name),
    extra: norm([b.aka, b.tags.join(" ")].join(" ")),
    all: norm([b.name, b.aka, b.category, b.origin, b.maker, b.yearLabel, b.tags.join(" "), b.blurb, b.description, b.history].join(" "))
  }));

  const SORTS = {
    az: (a, b) => a.name.localeCompare(b.name),
    oldest: (a, b) => a.year - b.year || a.name.localeCompare(b.name),
    newest: (a, b) => b.year - a.year || a.name.localeCompare(b.name),
    dunk: (a, b) => b.dunk - a.dunk || b.dunkSecs - a.dunkSecs || a.name.localeCompare(b.name),
    kcal: (a, b) => a.kcal - b.kcal || a.name.localeCompare(b.name)
  };

  const state = { q: "", cat: "all", sort: SORTS[store("bb-sort")] ? store("bb-sort") : "az" };
  let visible = B.slice();

  const terms = () => norm(state.q).split(/\s+/).filter(Boolean);

  // Lower rank sorts first: a name match beats a nickname or tag match, which beats a match in the text.
  function rank(entry, ts) {
    let worst = 0;
    for (const t of ts) {
      if (!entry.all.includes(t)) return -1;
      const r = entry.name.includes(t) ? 0 : entry.extra.includes(t) ? 1 : 2;
      worst = Math.max(worst, r);
    }
    return worst;
  }

  function renderChips(counts, total) {
    const chip = (value, label, n) =>
      `<button class="chip" type="button" data-cat="${esc(value)}" style="--cat:${value === "all" ? "var(--cat-cream-sandwiches)" : catVar(value)}" aria-pressed="${state.cat === value}" ${n === 0 && state.cat !== value ? "disabled" : ""}>${esc(label)} <span class="n">${n}</span></button>`;
    $("#chips").innerHTML = chip("all", "All biscuits", total) + CATS.map((c) => chip(c, c, counts[c] || 0)).join("");
  }

  function card(b, ts, i) {
    return `<li style="--i:${Math.min(i, 12)}"><a class="card" href="#${b.id}" data-open="${b.id}" style="--cat:${catVar(b.category)}">
      <div class="plate">${b.id === today.id ? `<span class="today-flag">Today's pick</span>` : ""}${Art.svg(b, { decorative: true })}</div>
      <div class="body">
        <p class="meta">${esc(b.category)} · ${esc(b.yearLabel)}</p>
        <h3>${highlight(b.name, ts)}</h3>
        <p class="blurb">${highlight(b.blurb, ts)}</p>
        <div class="dunk-row"><span class="dunk-label">Dunkability</span>${cups(b.dunk)}</div>
      </div>
    </a></li>`;
  }

  function render() {
    const ts = terms();
    const matched = [];
    for (const e of index) {
      const r = ts.length ? rank(e, ts) : 0;
      if (r >= 0) matched.push({ b: e.b, r });
    }
    const counts = {};
    for (const m of matched) counts[m.b.category] = (counts[m.b.category] || 0) + 1;
    renderChips(counts, matched.length);

    const list = matched
      .filter((m) => state.cat === "all" || m.b.category === state.cat)
      .sort((x, y) => x.r - y.r || SORTS[state.sort](x.b, y.b));
    visible = list.map((m) => m.b);

    $("#grid").innerHTML = list.map((m, i) => card(m.b, ts, i)).join("");
    $("#empty").hidden = list.length > 0;
    const where = state.cat === "all" ? "" : ` in ${state.cat}`;
    const what = state.q.trim() ? ` matching “${esc(state.q.trim())}”` : "";
    $("#count").innerHTML = list.length
      ? `Showing ${list.length} of ${B.length} biscuits${where}${what}`
      : `0 of ${B.length} biscuits${where}${what}`;
    $("#clear").hidden = !state.q;
  }

  function setQuery(q) {
    state.q = q;
    $("#q").value = q;
    render();
  }

  /* ---------- Detail view ---------- */

  const dlg = $("#detail");
  let current = null;

  function setHash(id) {
    try {
      history.replaceState(null, "", id ? "#" + id : location.pathname + location.search);
    } catch (e) { /* the hash is a nicety; ignore if the frame refuses */ }
  }

  function detailHtml(b) {
    const list = visible.some((v) => v.id === b.id) ? visible : B;
    const i = list.findIndex((v) => v.id === b.id);
    const prev = list[(i - 1 + list.length) % list.length];
    const next = list[(i + 1) % list.length];
    const r = b.recipe;
    return `
      <div class="detail-bar">
        <div class="nav">
          <button class="icon-btn" type="button" data-open="${prev.id}" aria-label="Previous: ${esc(prev.name)}">← <span class="label">${esc(prev.name)}</span></button>
          <button class="icon-btn" type="button" data-open="${next.id}" aria-label="Next: ${esc(next.name)}"><span class="label">${esc(next.name)}</span> →</button>
        </div>
        <button class="icon-btn" type="button" id="close" aria-label="Close">Close ✕</button>
      </div>
      <div class="detail-body">
        <div class="detail-top">
          <div class="detail-art">
            <div class="plate">${Art.svg(b)}</div>
            <dl class="stats">
              <div><dt>Introduced</dt><dd>${esc(b.yearLabel)}</dd></div>
              <div><dt>Birthplace</dt><dd>${esc(b.origin)}</dd></div>
              <div><dt>Made by</dt><dd>${esc(b.maker)}</dd></div>
              <div><dt>Type</dt><dd>${esc(b.category)}</dd></div>
              <div><dt>Dunkability</dt><dd>${cups(b.dunk)}</dd></div>
              <div><dt>Dunk window</dt><dd>${dunkWords(b)}</dd></div>
              <div><dt>Calories</dt><dd>≈ ${b.kcal} kcal each</dd></div>
            </dl>
          </div>
          <div class="detail-text">
            <p class="eyebrow">${esc(b.category)}${b.id === today.id ? " · Today's Biscuit of the Day" : ""}</p>
            <h2 id="detail-title">${esc(b.name)}</h2>
            <p class="aka">“${esc(b.aka)}”</p>
            <p>${esc(b.description)}</p>
            <h3>A short history</h3>
            <p>${esc(b.history)}</p>
            <div class="fact"><p class="eyebrow">Did you know?</p><p>${esc(b.fact)}</p></div>
            <ul class="tag-list" aria-label="Find similar biscuits">
              ${b.tags.map((t) => `<li><button type="button" data-tag="${esc(t)}">${esc(t)}</button></li>`).join("")}
            </ul>
          </div>
        </div>
        <section class="recipe" aria-labelledby="recipe-title">
          <div class="recipe-head">
            <h3 id="recipe-title">Bake your own ${esc(b.name)}</h3>
            <div class="recipe-meta">
              <span class="pill">Makes ${esc(r.makes)}</span>
              <span class="pill">${esc(r.time)}</span>
              <span class="pill">${ovenText(r.oven)}</span>
            </div>
          </div>
          <div class="recipe-cols">
            <div>
              <h4>Ingredients</h4>
              <ul class="ingredients">
                ${r.ingredients.map((ing, n) => `<li><label for="ing-${b.id}-${n}"><input type="checkbox" id="ing-${b.id}-${n}"><span>${esc(ing)}</span></label></li>`).join("")}
              </ul>
            </div>
            <div>
              <h4>Method</h4>
              <ol class="method">${r.method.map((step) => `<li><span>${esc(step)}</span></li>`).join("")}</ol>
            </div>
          </div>
          <p class="recipe-note">A home-kitchen version, not the factory's secret recipe. Tick off ingredients as you go.</p>
        </section>
      </div>`;
  }

  function openDetail(id) {
    const b = byId.get(id);
    if (!b) return;
    current = id;
    dlg.innerHTML = detailHtml(b);
    dlg.style.setProperty("--cat", catVar(b.category));
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    setHash(id);
  }

  dlg.addEventListener("click", (e) => {
    if (e.target === dlg || e.target.closest("#close")) return dlg.close();
    const tag = e.target.closest("[data-tag]");
    if (tag) {
      dlg.close();
      state.cat = "all";
      setQuery(tag.dataset.tag);
      $("#tin").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
  dlg.addEventListener("close", () => {
    current = null;
    setHash(null);
  });
  dlg.addEventListener("keydown", (e) => {
    if (e.target.matches("input")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const btns = dlg.querySelectorAll(".detail-bar .nav [data-open]");
      openDetail(btns[e.key === "ArrowLeft" ? 0 : 1].dataset.open);
    }
  });

  /* ---------- Wiring ---------- */

  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-open]");
    if (!link) return;
    e.preventDefault();
    const r = link.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2;
    const y = e.clientY || r.top + r.height / 2;
    if (!link.closest("dialog")) burst(x, y);
    openDetail(link.dataset.open);
  });

  $("#q").addEventListener("input", (e) => {
    state.q = e.target.value;
    render();
  });
  $("#q").addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.q) {
      e.preventDefault();
      setQuery("");
    }
  });
  $("#clear").addEventListener("click", () => {
    setQuery("");
    $("#q").focus();
  });
  $("#reset").addEventListener("click", () => {
    state.cat = "all";
    setQuery("");
  });
  $("#chips").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-cat]");
    if (!chip) return;
    state.cat = state.cat === chip.dataset.cat && chip.dataset.cat !== "all" ? "all" : chip.dataset.cat;
    render();
  });
  $("#sort").value = state.sort;
  $("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    store("bb-sort", state.sort);
    render();
  });
  $("#surprise").addEventListener("click", () => {
    const pool = B.filter((b) => b.id !== current);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (reduceMotion) return openDetail(pick.id);
    rollAcross(pick);
    setTimeout(() => openDetail(pick.id), 750);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !e.target.matches("input, textarea, select") && !dlg.open) {
      e.preventDefault();
      $("#q").focus();
      $("#tin").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  });
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (byId.has(id) && id !== current) openDetail(id);
  });

  /* ---------- Motion ---------- */

  const CRUMB_COLOURS = ["#c98e4a", "#e2b16a", "#9c5a2a", "#f0d49a", "#5a3420"];

  // Crumbs (or tea droplets) that fly out from a point and fall away.
  function burst(x, y, opts = {}) {
    if (reduceMotion) return;
    const { count = 14, colors = CRUMB_COLOURS, round = false, lift = 70 } = opts;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "particle" + (round ? " drop" : "");
      const size = 4 + Math.random() * 6;
      el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size * (round ? 1 : 0.8)}px;background:${colors[i % colors.length]}`;
      document.body.appendChild(el);
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
      const dist = 30 + Math.random() * lift;
      const dx = Math.cos(angle) * dist, dy = Math.sin(angle) * dist;
      const spin = (Math.random() - 0.5) * 720;
      el.animate(
        [
          { transform: "translate(-50%, -50%)", opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${spin / 2}deg)`, opacity: 1, offset: 0.45 },
          { transform: `translate(calc(-50% + ${dx * 1.4}px), calc(-50% + ${dy + 110}px)) rotate(${spin}deg)`, opacity: 0 }
        ],
        { duration: 700 + Math.random() * 400, easing: "cubic-bezier(.2,.7,.4,1)" }
      ).onfinish = () => el.remove();
    }
  }

  // A biscuit rolls across the bottom of the screen like a cartwheel.
  function rollAcross(b) {
    const el = document.createElement("div");
    el.className = "roller";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = Art.svg(b, { noDoily: true, decorative: true });
    document.body.appendChild(el);
    const travel = window.innerWidth + 220;
    el.animate(
      [
        { transform: "translateX(0) rotate(0deg)" },
        { transform: `translateX(${travel}px) rotate(${(travel / (Math.PI * 110)) * 360}deg)` }
      ],
      { duration: 1100, easing: "cubic-bezier(.45,.05,.55,.95)" }
    ).onfinish = () => el.remove();
  }

  // Split the masthead title into letters so they can drop in one by one.
  function dropInTitle() {
    const h1 = $(".title");
    if (!h1.hasAttribute("aria-label")) h1.setAttribute("aria-label", h1.textContent.replace(/\s+/g, " ").trim());
    let i = 0;
    const walk = (node) => {
      for (const child of [...node.childNodes]) {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const part of child.textContent.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); continue; }
            const word = document.createElement("span");
            word.className = "word";
            word.setAttribute("aria-hidden", "true");
            for (const ch of part) {
              const l = document.createElement("span");
              l.className = "ltr";
              l.style.setProperty("--i", i++);
              l.textContent = ch;
              word.appendChild(l);
            }
            frag.appendChild(word);
          }
          child.replaceWith(frag);
        } else if (!child.matches(".title-tin")) {
          walk(child);
        }
      }
    };
    walk(h1);
  }

  /* ---------- Footer ---------- */

  function renderFooter() {
    const firstOf = CATS.map((c) => B.find((b) => b.category === c && b.id !== today.id) || B.find((b) => b.category === c));
    $("#foot-parade").innerHTML = [today, ...firstOf]
      .map((b, i) => `<a href="#${b.id}" data-open="${b.id}" tabindex="-1" style="--i:${i}">${Art.svg(b, { noDoily: true, decorative: true })}</a>`)
      .join("");
    $("#foot-cats").innerHTML = CATS.map(
      (c) => `<li><button type="button" data-foot-cat="${esc(c)}">${esc(c)}<span class="n">${B.filter((b) => b.category === c).length}</span></button></li>`
    ).join("");
    $("#foot-today").innerHTML = `Today's biscuit: <a href="#${today.id}" data-open="${today.id}">${esc(today.name)}</a>`;
    $("#foot-cats").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-foot-cat]");
      if (!btn) return;
      state.cat = btn.dataset.footCat;
      setQuery("");
      $("#tin").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  // A few biscuits floating around the masthead.
  $("#floaters").innerHTML = ["jammie-dodger", "custard-cream", "party-ring", "jaffa-cake", "iced-gems", "bourbon"]
    .map((id, i) => `<span style="--i:${i}">${Art.svg(byId.get(id), { noDoily: true, decorative: true })}</span>`)
    .join("");

  dropInTitle();
  renderToday();
  renderFooter();
  render();
  const start = location.hash.slice(1);
  if (byId.has(start)) openDetail(start);
})();
