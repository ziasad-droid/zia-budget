/* ===================================================================
   Quran & Me — app logic
   Vanilla JS, localStorage-backed, no build step.
   =================================================================== */

const DAY_MS = 86400000;
const REFLECTIONS = [
  "What is one action from today's surah you could put into practice before you sleep tonight?",
  "Which of God's names or attributes stood out to you today, and why?",
  "Who could you show a little more patience (sabr) with today?",
  "What is something you're grateful for right now — have you thanked God for it directly?",
  "Is there a habit you'd like to bring closer to the Quran's guidance this week?",
  "Write a one-line dua in your own words for something on your heart today.",
  "What story or verse from today reminded you of your own life?",
  "Who in your life could you check in on or make du'a for today?",
  "What is one small act of charity (even a kind word) you can give today?",
  "How did today's reading change the way you see a struggle you're facing?",
  "What would it look like to bring more sincerity (ikhlas) into your day tomorrow?",
  "Is there something you need to seek forgiveness for today?",
  "What are you trusting God with right now (tawakkul)?",
  "Which quality of the Ahl al-Bayt described in today's reading do you want to embody?",
  "What is a question this passage raised that you'd like to research further?",
  "How can you make your prayer today a little more present and unhurried?",
  "What is a fear you can hand over to God today?",
  "Who taught you something about faith that you're grateful for?",
  "What does 'success' mean to you after today's reading, versus before?",
  "Write down one verse from today you want to memorize this week."
];

const CATEGORY_LABELS = {
  belief: "Belief & Theology", worship: "Worship", character: "Character",
  hereafter: "The Hereafter", prophets: "Prophets & Revelation",
  family: "Family & Community", law: "Law & Guidance", nature: "Signs in Nature"
};

const state = {
  profile: load("qm_profile", null),
  todos: load("qm_todos", []),
  progress: load("qm_progress", { surahsRead: {}, wordsLearned: {}, namesLearned: {}, history: {} }),
  daily: load("qm_daily", {}),
  screen: "today"
};

if (state.progress && !state.progress.namesLearned) state.progress.namesLearned = {};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
function saveProfile() { save("qm_profile", state.profile); }
function saveTodos() { save("qm_todos", state.todos); }
function saveProgress() { save("qm_progress", state.progress); }
function saveDaily() { save("qm_daily", state.daily); }

function todayKey() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}
function daysSince(iso) {
  const start = new Date(iso + "T00:00:00");
  const now = new Date();
  const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((nowMid - startMid) / DAY_MS));
}
function todayDayIndex() {
  if (!state.profile) return 0;
  return daysSince(state.profile.startDate);
}
function getDaily(key) {
  if (!state.daily[key]) state.daily[key] = { checklist: {}, note: "" };
  return state.daily[key];
}

/* ---------------- Onboarding ---------------- */
function showOnboarding() {
  document.getElementById("onboarding").classList.add("show");
}
function completeOnboarding() {
  const name = document.getElementById("ob-name").value.trim() || "Friend";
  const goal = parseInt(document.getElementById("ob-goal").value, 10) || 1;
  state.profile = { name, goalPerDay: goal, startDate: todayKey(), createdAt: Date.now() };
  saveProfile();
  document.getElementById("onboarding").classList.remove("show");
  renderAll();
}

/* ---------------- Nav ---------------- */
function goTo(screen) {
  state.screen = screen;
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById("screen-" + screen).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(el => el.classList.toggle("active", el.dataset.screen === screen));
  window.scrollTo(0,0);
  if (screen === "surahs") renderSurahList();
  if (screen === "words") renderWordList();
  if (screen === "names") renderNameList();
  if (screen === "dhikr") renderDhikr();
  if (screen === "marja") renderMarja();
  if (screen === "todo") renderTodos();
  if (screen === "progress") renderProgress();
  if (screen === "today") renderToday();
}

/* ---------------- Today / Workbook ---------------- */
function renderToday() {
  if (!state.profile) { showOnboarding(); return; }
  const dIdx = todayDayIndex();
  const surah = SURAHS[dIdx % SURAHS.length];
  const word = VOCAB[dIdx % VOCAB.length];
  const reflection = REFLECTIONS[dIdx % REFLECTIONS.length];
  const key = todayKey();
  const d = getDaily(key);

  document.getElementById("greeting").textContent = greetingFor(state.profile.name);
  document.getElementById("today-date").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  document.getElementById("day-number").textContent = "Day " + (dIdx + 1) + " of your journey";

  document.getElementById("today-surah-name").textContent = surah.tr + " — " + surah.en;
  document.getElementById("today-surah-ar").textContent = surah.ar;
  document.getElementById("today-surah-meta").textContent = surah.place + " · " + surah.verses + " verses · Surah " + surah.n;
  document.getElementById("today-surah-summary").textContent = surah.summary;
  const shiaBox = document.getElementById("today-surah-shia");
  if (surah.shia) { shiaBox.style.display = "block"; shiaBox.querySelector("p").textContent = surah.shia; }
  else { shiaBox.style.display = "none"; }

  document.getElementById("today-word-ar").textContent = word.ar;
  document.getElementById("today-word-tr").textContent = word.tr;
  document.getElementById("today-word-meaning").textContent = word.meaning;
  document.getElementById("today-word-ref").textContent = "e.g. " + word.ref;

  document.getElementById("today-reflection").textContent = reflection;

  const checklistItems = [
    { id: "read", label: "Read & reflect on today's surah", icon: "📖" },
    { id: "word", label: "Learn today's word: " + word.tr, icon: "🔤" },
    { id: "fatiha", label: "Recite Al-Fatiha mindfully", icon: "🤲" },
    { id: "dua", label: "Make a personal dua", icon: "🙏" },
    { id: "journal", label: "Write a one-line journal reflection", icon: "✍️" }
  ];
  const listEl = document.getElementById("today-checklist");
  listEl.innerHTML = checklistItems.map(item => `
    <label class="check-row">
      <input type="checkbox" ${d.checklist[item.id] ? "checked" : ""} onchange="toggleDaily('${item.id}', this.checked)">
      <span class="check-icon">${item.icon}</span>
      <span class="check-label">${escapeHtml(item.label)}</span>
    </label>`).join("");

  document.getElementById("today-note").value = d.note || "";

  const doneCount = checklistItems.filter(i => d.checklist[i.id]).length;
  document.getElementById("today-progress-fill").style.width = (doneCount/checklistItems.length*100) + "%";
  document.getElementById("today-progress-label").textContent = doneCount + " / " + checklistItems.length + " today";

  renderStreak();

  const custom = state.todos.filter(t => !t.done).slice(0, 3);
  const customWrap = document.getElementById("today-todo-preview");
  if (custom.length === 0) {
    customWrap.innerHTML = `<div class="empty-mini">No open goals — add one on the To-Do tab.</div>`;
  } else {
    customWrap.innerHTML = custom.map(t => `
      <label class="check-row">
        <input type="checkbox" onchange="toggleTodo('${t.id}')">
        <span class="check-icon">🎯</span>
        <span class="check-label">${escapeHtml(t.text)}</span>
      </label>`).join("");
  }
}

function greetingFor(name) {
  const h = new Date().getHours();
  const part = h < 5 ? "up late" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 21 ? "Good evening" : "Good evening";
  return `${part}, ${name}`;
}

function toggleDaily(id, checked) {
  const key = todayKey();
  const d = getDaily(key);
  d.checklist[id] = checked;
  if (Object.values(d.checklist).some(Boolean)) state.progress.history[key] = true;
  saveDaily();
  saveProgress();
  renderToday();
}

function saveNote() {
  const key = todayKey();
  const d = getDaily(key);
  d.note = document.getElementById("today-note").value;
  saveDaily();
  toast("Reflection saved");
}

function renderStreak() {
  const dates = Object.keys(state.progress.history).sort();
  let streak = 0;
  let cursor = new Date();
  while (true) {
    const key = cursor.getFullYear() + "-" + String(cursor.getMonth()+1).padStart(2,"0") + "-" + String(cursor.getDate()).padStart(2,"0");
    if (state.progress.history[key]) { streak++; cursor = new Date(cursor.getTime() - DAY_MS); }
    else break;
  }
  const el = document.getElementById("streak-count");
  if (el) el.textContent = streak;
}

/* ---------------- Surahs ---------------- */
let surahFilter = "";
let surahSort = "mushaf";
const SURAH_SORTS = { mushaf: "Mushaf Order", shortest: "Shortest First", longest: "Longest First" };
function sortSurahs(setTo) {
  surahSort = setTo;
  renderSurahList();
}
function renderSurahList() {
  const pickerWrap = document.getElementById("surah-sort-picker");
  pickerWrap.innerHTML = Object.entries(SURAH_SORTS).map(([key, label]) => `
    <button class="pill-btn ${surahSort===key?'pill-active':''}" onclick="sortSurahs('${key}')">${label}</button>`).join("");

  const q = surahFilter.toLowerCase();
  const wrap = document.getElementById("surah-list");
  let filtered = SURAHS.filter(s =>
    !q || s.tr.toLowerCase().includes(q) || s.en.toLowerCase().includes(q) || String(s.n) === q);
  filtered = filtered.slice();
  if (surahSort === "shortest") filtered.sort((a,b) => a.verses - b.verses);
  else if (surahSort === "longest") filtered.sort((a,b) => b.verses - a.verses);
  else filtered.sort((a,b) => a.n - b.n);
  wrap.innerHTML = filtered.map(s => `
    <button class="surah-row" onclick="openSurah(${s.n})">
      <div class="surah-num">${s.n}</div>
      <div class="surah-info">
        <div class="surah-title">${s.tr} <span class="surah-en">— ${s.en}</span></div>
        <div class="surah-sub">${s.place} · ${s.verses} verses</div>
      </div>
      <div class="surah-ar">${s.ar}</div>
      ${state.progress.surahsRead[s.n] ? '<span class="read-badge">✓</span>' : ''}
    </button>`).join("");
  const readCount = Object.keys(state.progress.surahsRead).length;
  document.getElementById("surah-progress-label").textContent = readCount + " / 114 read";
}
function filterSurahs(v) { surahFilter = v; renderSurahList(); }

function openSurah(n) {
  const s = SURAHS.find(x => x.n === n);
  document.getElementById("modal-title").textContent = s.tr + " (" + s.ar + ")";
  const shiaHtml = s.shia ? `<div class="info-box"><div class="info-box-label">Shia note</div><p>${escapeHtml(s.shia)}</p></div>` : "";
  const virtueHtml = s.virtue ? `<div class="info-box"><div class="info-box-label">Virtue &amp; When It's Recited</div><p>${escapeHtml(s.virtue)}</p></div>` : "";
  const themesHtml = s.themes && s.themes.length ? `<div class="theme-tags">${s.themes.map(t => `<span class="theme-tag">${escapeHtml(t)}</span>`).join("")}</div>` : "";
  document.getElementById("modal-body").innerHTML = `
    <div class="modal-meta">${s.place} · ${s.verses} verses · Surah ${s.n} of 114</div>
    <div class="modal-meaning">"${escapeHtml(s.en)}"</div>
    ${themesHtml}
    <p class="modal-summary">${escapeHtml(s.summary)}</p>
    ${shiaHtml}
    ${virtueHtml}
    <label class="check-row" style="margin-top:16px">
      <input type="checkbox" ${state.progress.surahsRead[s.n] ? "checked" : ""} onchange="toggleSurahRead(${s.n}, this.checked)">
      <span class="check-icon">✓</span>
      <span class="check-label">Mark as read</span>
    </label>`;
  openModal();
}
function toggleSurahRead(n, checked) {
  if (checked) state.progress.surahsRead[n] = true; else delete state.progress.surahsRead[n];
  saveProgress();
  renderSurahList();
}

/* ---------------- Vocabulary ---------------- */
let wordFilter = "", wordCat = "";
function renderWordList() {
  const q = wordFilter.toLowerCase();
  const wrap = document.getElementById("word-list");
  const filtered = VOCAB.filter(w =>
    (!q || w.tr.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q)) &&
    (!wordCat || w.cat === wordCat));
  wrap.innerHTML = filtered.map((w, i) => `
    <button class="word-card" onclick="openWord('${w.tr.replace(/'/g,"\\'")}')">
      <div class="word-ar">${w.ar}</div>
      <div class="word-tr">${w.tr}</div>
      <div class="word-cat-tag">${CATEGORY_LABELS[w.cat] || w.cat}</div>
      ${state.progress.wordsLearned[w.tr] ? '<span class="read-badge">✓</span>' : ''}
    </button>`).join("");
  const catWrap = document.getElementById("word-cat-picker");
  const cats = ["", ...Object.keys(CATEGORY_LABELS)];
  catWrap.innerHTML = cats.map(c => `
    <button class="pill-btn ${wordCat===c?'pill-active':''}" onclick="filterWordCat('${c}')">${c ? CATEGORY_LABELS[c] : "All"}</button>`).join("");
  const learned = Object.keys(state.progress.wordsLearned).length;
  document.getElementById("word-progress-label").textContent = learned + " / " + VOCAB.length + " learned";
}
function filterWords(v) { wordFilter = v; renderWordList(); }
function filterWordCat(c) { wordCat = c; renderWordList(); }

function openWord(tr) {
  const w = VOCAB.find(x => x.tr === tr);
  document.getElementById("modal-title").textContent = w.tr;
  document.getElementById("modal-body").innerHTML = `
    <div class="word-ar-big">${w.ar}</div>
    <div class="modal-meta">${CATEGORY_LABELS[w.cat]} · appears e.g. ${w.ref}</div>
    <p class="modal-summary">${escapeHtml(w.meaning)}</p>
    <label class="check-row" style="margin-top:16px">
      <input type="checkbox" ${state.progress.wordsLearned[w.tr] ? "checked" : ""} onchange="toggleWordLearned('${w.tr.replace(/'/g,"\\'")}', this.checked)">
      <span class="check-icon">✓</span>
      <span class="check-label">Mark as learned</span>
    </label>`;
  openModal();
}
function toggleWordLearned(tr, checked) {
  if (checked) state.progress.wordsLearned[tr] = true; else delete state.progress.wordsLearned[tr];
  saveProgress();
  renderWordList();
}

/* ---------------- 99 Names ---------------- */
let nameFilter = "", nameCat = "";
function renderNameList() {
  const q = nameFilter.toLowerCase();
  const wrap = document.getElementById("name-list");
  const filtered = NAMES_OF_ALLAH.filter(x =>
    (!q || x.tr.toLowerCase().includes(q) || x.en.toLowerCase().includes(q) || x.meaning.toLowerCase().includes(q)) &&
    (!nameCat || x.cat === nameCat));
  wrap.innerHTML = filtered.map(x => `
    <button class="name-card" onclick="openName(${x.n})">
      <span class="name-num">${x.n}</span>
      <div class="name-ar arabic">${x.ar}</div>
      <div class="name-tr">${x.tr}</div>
      <div class="name-en">${escapeHtml(x.en)}</div>
      ${state.progress.namesLearned[x.n] ? '<span class="read-badge">✓</span>' : ''}
    </button>`).join("");
  const catWrap = document.getElementById("name-cat-picker");
  const cats = ["", ...Object.keys(NAME_CATEGORIES)];
  catWrap.innerHTML = cats.map(c => `
    <button class="pill-btn ${nameCat===c?'pill-active':''}" onclick="filterNameCat('${c}')">${c ? NAME_CATEGORIES[c] : "All"}</button>`).join("");
  const learned = Object.keys(state.progress.namesLearned).length;
  document.getElementById("names-progress-label").textContent = learned + " / 99 learned";
}
function filterNames(v) { nameFilter = v; renderNameList(); }
function filterNameCat(c) { nameCat = c; renderNameList(); }

function openName(n) {
  const x = NAMES_OF_ALLAH.find(v => v.n === n);
  document.getElementById("modal-title").textContent = x.n + ". " + x.tr;
  document.getElementById("modal-body").innerHTML = `
    <div class="name-ar-big arabic">${x.ar}</div>
    <div class="name-en-big">${escapeHtml(x.en)}</div>
    <div class="modal-meta">${NAME_CATEGORIES[x.cat]}</div>
    <p class="modal-summary" style="margin-bottom:10px">${escapeHtml(x.meaning)}</p>
    <div class="info-box"><div class="info-box-label">When to call on it</div><p>${escapeHtml(x.invoke)}</p></div>
    <label class="check-row" style="margin-top:16px">
      <input type="checkbox" ${state.progress.namesLearned[x.n] ? "checked" : ""} onchange="toggleNameLearned(${x.n}, this.checked)">
      <span class="check-icon">✓</span>
      <span class="check-label">Mark as learned</span>
    </label>`;
  openModal();
}
function toggleNameLearned(n, checked) {
  if (checked) state.progress.namesLearned[n] = true; else delete state.progress.namesLearned[n];
  saveProgress();
  renderNameList();
}

/* ---------------- Marja ---------------- */
let dhikrRendered = false;
function renderDhikr() {
  if (dhikrRendered) return;
  document.getElementById("istighfar-ar").textContent = ISTIGHFAR_DEEPDIVE.arabic;
  document.getElementById("istighfar-tr").textContent = ISTIGHFAR_DEEPDIVE.transliteration;
  document.getElementById("istighfar-en").textContent = ISTIGHFAR_DEEPDIVE.translation;
  document.getElementById("istighfar-root").innerHTML = `<strong>Root:</strong> ${escapeHtml(ISTIGHFAR_DEEPDIVE.root)}`;
  document.getElementById("istighfar-meaning").textContent = ISTIGHFAR_DEEPDIVE.meaning;
  document.getElementById("istighfar-reasons").innerHTML = ISTIGHFAR_DEEPDIVE.reasons.map((r, i) => `
    <div class="reason-item">
      <span class="reason-num">${i+1}</span><span class="reason-title">${escapeHtml(r.title)}</span>
      <div class="reason-detail">${escapeHtml(r.detail)}</div>
    </div>`).join("");
  document.getElementById("istighfar-how").textContent = ISTIGHFAR_DEEPDIVE.howMany + " " + ISTIGHFAR_DEEPDIVE.when;

  document.getElementById("tasbih-intro").textContent = TASBIH_ZAHRA.intro;
  document.getElementById("tasbih-steps").innerHTML = TASBIH_ZAHRA.steps.map(s => `
    <div class="tasbih-step">
      <div class="tasbih-count">${s.count}×</div>
      <div class="tasbih-text">
        <div class="tasbih-ar arabic">${s.ar}</div>
        <div class="tasbih-en">${s.tr} — ${escapeHtml(s.en)}</div>
      </div>
    </div>`).join("");
  document.getElementById("tasbih-note").textContent = TASBIH_ZAHRA.note;

  document.getElementById("dhikr-list").innerHTML = DHIKR_LIST.map(d => `
    <div class="dhikr-card">
      <div class="dhikr-ar arabic">${d.ar}</div>
      <div class="dhikr-tr">${d.tr}</div>
      <div class="dhikr-en">${escapeHtml(d.en)}</div>
      <div class="dhikr-meaning">${escapeHtml(d.meaning)}</div>
      <div class="dhikr-meta-row">
        <span class="dhikr-meta-chip">🔢 ${escapeHtml(d.count)}</span>
        <span class="dhikr-meta-chip">🕐 ${escapeHtml(d.when)}</span>
      </div>
    </div>`).join("");

  dhikrRendered = true;
}

let marjaRendered = false;
let topicFilter = "", topicCat = "";

function renderMarja() {
  if (!marjaRendered) {
    document.getElementById("marja-name").textContent = MARJA_INFO.name;
    document.getElementById("marja-bio").textContent = MARJA_INFO.bio;
    document.getElementById("marja-links").innerHTML = `
      <a class="link-chip" href="${MARJA_INFO.officialSite}" target="_blank" rel="noopener">sistani.org</a>
      <a class="link-chip" href="${MARJA_INFO.askUrl}" target="_blank" rel="noopener">Ask a question</a>`;

    document.getElementById("taqlid-body").textContent = TAQLID_INFO.body;
    document.getElementById("taqlid-identify").textContent = TAQLID_INFO.identifying;
    document.getElementById("taqlid-links").innerHTML = `
      <a class="link-chip" href="${TAQLID_INFO.url}" target="_blank" rel="noopener">Full ruling (Islamic Laws)</a>
      <a class="link-chip" href="${TAQLID_INFO.westUrl}" target="_blank" rel="noopener">Code for the West</a>`;

    document.getElementById("usul-list").innerHTML = USUL_AL_DIN.map(u => `
      <div class="foundation-card">
        <div class="foundation-head">
          <span class="foundation-num">${u.n}</span>
          <span class="foundation-name">${u.tr}</span>
          <span class="foundation-ar arabic">${u.ar}</span>
        </div>
        <div class="foundation-en">${escapeHtml(u.en)}</div>
        <div class="foundation-explain">${escapeHtml(u.explain)}</div>
      </div>`).join("");
    document.getElementById("usul-mnemonic").textContent = USUL_MNEMONIC;

    document.getElementById("furu-list").innerHTML = FURU_AL_DIN.map(f => `
      <div class="foundation-card">
        <div class="foundation-head">
          <span class="foundation-num">${f.n}</span>
          <span class="foundation-name">${f.tr}</span>
          <span class="foundation-group">${escapeHtml(f.group)}</span>
          <span class="foundation-ar arabic" style="margin-left:4px">${f.ar}</span>
        </div>
        <div class="foundation-en">${escapeHtml(f.en)}</div>
        <div class="foundation-explain">${escapeHtml(f.explain)}</div>
      </div>`).join("");
    document.getElementById("furu-mnemonic").textContent = FURU_MNEMONIC;

    document.getElementById("west-title").textContent = WEST_BOOK.title;
    document.getElementById("west-desc").textContent = WEST_BOOK.description;
    document.getElementById("west-links").innerHTML = `
      <a class="link-chip" href="${WEST_BOOK.mainUrl}" target="_blank" rel="noopener">Read online</a>
      <a class="link-chip" href="${WEST_BOOK.pdfUrl}" target="_blank" rel="noopener">Download PDF</a>
      <a class="link-chip" href="${WEST_BOOK.mirrorUrl}" target="_blank" rel="noopener">Mirror (al-islam.org)</a>`;
    document.getElementById("west-toc").innerHTML = WEST_BOOK.parts.map(p => `
      <div class="book-part">${escapeHtml(p.part)}</div>
      ${p.chapters.map(c => `
        <div class="book-chapter">
          <span>${escapeHtml(c.title)}</span>
          <a href="${c.url || WEST_BOOK.mainUrl}" target="_blank" rel="noopener">Read →</a>
        </div>`).join("")}`).join("");

    const cats = ["", ...new Set(FATWA_TOPICS.map(t => t.cat))];
    document.getElementById("topic-cat-picker").innerHTML = cats.map(c => `
      <button class="pill-btn ${topicCat===c?'pill-active':''}" onclick="filterTopicCat('${c.replace(/'/g,"\\'")}')">${c || "All"}</button>`).join("");

    marjaRendered = true;
  }
  renderTopicList();
}

function renderTopicList() {
  const q = topicFilter.toLowerCase();
  const filtered = FATWA_TOPICS.filter(t =>
    (!q || t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)) &&
    (!topicCat || t.cat === topicCat));
  const wrap = document.getElementById("topic-list");
  wrap.innerHTML = filtered.length ? filtered.map(t => `
    <div class="topic-item">
      <div class="topic-cat">${escapeHtml(t.cat)}</div>
      <div class="topic-title">${escapeHtml(t.title)}</div>
      <div class="topic-summary">${escapeHtml(t.summary)}</div>
      <a class="topic-link" href="${t.url}" target="_blank" rel="noopener">See the ruling on sistani.org →</a>
    </div>`).join("") : `<div class="empty-mini">No topics match "${escapeHtml(topicFilter)}" — try a broader term.</div>`;
}
function filterTopics(v) { topicFilter = v; renderTopicList(); }
function filterTopicCat(c) {
  topicCat = c;
  document.querySelectorAll("#topic-cat-picker .pill-btn").forEach(b => b.classList.toggle("pill-active", b.textContent === (c || "All")));
  renderTopicList();
}

/* ---------------- To-Do ---------------- */
function renderTodos() {
  const wrap = document.getElementById("todo-list");
  if (state.todos.length === 0) {
    wrap.innerHTML = `<div class="empty-state"><div class="empty-icon">🎯</div><p>No goals yet</p><small>Add memorization goals, tafsir to read, or habits to build</small></div>`;
    return;
  }
  const open = state.todos.filter(t => !t.done);
  const done = state.todos.filter(t => t.done);
  const row = t => `
    <div class="row todo-item">
      <input type="checkbox" ${t.done?"checked":""} onchange="toggleTodo('${t.id}')">
      <div class="todo-text ${t.done?'todo-done':''}">
        <div>${escapeHtml(t.text)}</div>
        <div class="todo-cat">${escapeHtml(t.category||"General")}</div>
      </div>
      <button class="delete-btn" onclick="deleteTodo('${t.id}')">×</button>
    </div>`;
  wrap.innerHTML = (open.length ? open.map(row).join("") : '<div class="empty-mini">All caught up 🎉</div>') +
    (done.length ? `<div class="todo-divider">Completed</div>` + done.map(row).join("") : "");
}
function addTodo() {
  const input = document.getElementById("todo-input");
  const cat = document.getElementById("todo-cat-input").value;
  const text = input.value.trim();
  if (!text) return;
  state.todos.unshift({ id: cryptoId(), text, category: cat, done: false, createdAt: Date.now() });
  input.value = "";
  saveTodos();
  renderTodos();
}
function toggleTodo(id) {
  const t = state.todos.find(x => x.id === id);
  if (t) t.done = !t.done;
  saveTodos();
  renderTodos();
  if (state.screen === "today") renderToday();
}
function deleteTodo(id) {
  state.todos = state.todos.filter(x => x.id !== id);
  saveTodos();
  renderTodos();
}
function addStarterGoals() {
  const starters = [
    { text: "Memorize Surah Al-Fatiha with meaning", category: "Memorization" },
    { text: "Memorize Surah Al-Ikhlas, Al-Falaq & An-Nas", category: "Memorization" },
    { text: "Read one volume excerpt of Tafsir al-Mizan", category: "Reading" },
    { text: "Learn the story of Karbala and Surah Al-Insan's link to Ahl al-Bayt", category: "Reading" },
    { text: "Start a weekly family Quran study circle", category: "Habit" },
    { text: "Learn the meaning of every word in Al-Fatiha", category: "Vocabulary" }
  ];
  starters.forEach(s => state.todos.push({ id: cryptoId(), text: s.text, category: s.category, done: false, createdAt: Date.now() }));
  saveTodos();
  renderTodos();
  toast("Starter goals added");
}

/* ---------------- Progress ---------------- */
function renderProgress() {
  const readCount = Object.keys(state.progress.surahsRead).length;
  const learnedCount = Object.keys(state.progress.wordsLearned).length;
  const namesCount = Object.keys(state.progress.namesLearned).length;
  const doneTodos = state.todos.filter(t => t.done).length;
  const activeDays = Object.keys(state.progress.history).length;

  document.getElementById("stat-surahs").textContent = readCount + " / 114";
  document.getElementById("stat-words").textContent = learnedCount + " / " + VOCAB.length;
  document.getElementById("stat-names").textContent = namesCount + " / 99";
  document.getElementById("stat-goals").textContent = doneTodos + " / " + state.todos.length;
  document.getElementById("stat-days").textContent = activeDays;

  document.getElementById("bar-surahs").style.width = (readCount/114*100) + "%";
  document.getElementById("bar-words").style.width = (learnedCount/VOCAB.length*100) + "%";
  document.getElementById("bar-names").style.width = (namesCount/99*100) + "%";

  renderStreak();
  const streakEl = document.getElementById("streak-count-2");
  if (streakEl) streakEl.textContent = document.getElementById("streak-count").textContent;

  renderReferences();
}

function renderReferences() {
  const wrap = document.getElementById("reference-list");
  if (!wrap || wrap.dataset.rendered) return;
  wrap.innerHTML = REFERENCES.map(r => `
    <div class="ref-item">
      <div class="ref-title">${escapeHtml(r.title)}</div>
      <div class="ref-note">${escapeHtml(r.note)}</div>
      <a href="${r.url}" target="_blank" rel="noopener">${r.url}</a>
    </div>`).join("") + `<div class="ref-note" style="margin-top:10px;padding-top:12px;border-top:1px solid var(--border)">${escapeHtml(REFERENCES_NOTE)}</div>`;
  wrap.dataset.rendered = "1";
}

function resetProgress() {
  if (!confirm("Reset all reading progress, learned words, and streaks? Your to-do list and profile stay.")) return;
  state.progress = { surahsRead: {}, wordsLearned: {}, namesLearned: {}, history: {} };
  saveProgress();
  renderProgress();
  toast("Progress reset");
}

/* ---------------- Modal / toast / helpers ---------------- */
function openModal() { document.getElementById("modal-overlay").classList.add("show"); }
function closeModal() { document.getElementById("modal-overlay").classList.remove("show"); }
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1600);
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}
function cryptoId() { return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

/* ---------------- Init ---------------- */
function renderAll() {
  if (state.profile) {
    goTo("today");
  } else {
    showOnboarding();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
  renderAll();
});
