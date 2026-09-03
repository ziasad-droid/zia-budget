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
  progress: load("qm_progress", { surahsRead: {}, wordsLearned: {}, history: {} }),
  daily: load("qm_daily", {}),
  screen: "today"
};

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
function renderSurahList() {
  const q = surahFilter.toLowerCase();
  const wrap = document.getElementById("surah-list");
  const filtered = SURAHS.filter(s =>
    !q || s.tr.toLowerCase().includes(q) || s.en.toLowerCase().includes(q) || String(s.n) === q);
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
  document.getElementById("modal-body").innerHTML = `
    <div class="modal-meta">${s.place} · ${s.verses} verses · Surah ${s.n} of 114</div>
    <div class="modal-meaning">"${escapeHtml(s.en)}"</div>
    <p class="modal-summary">${escapeHtml(s.summary)}</p>
    ${shiaHtml}
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
  const doneTodos = state.todos.filter(t => t.done).length;
  const activeDays = Object.keys(state.progress.history).length;

  document.getElementById("stat-surahs").textContent = readCount + " / 114";
  document.getElementById("stat-words").textContent = learnedCount + " / " + VOCAB.length;
  document.getElementById("stat-goals").textContent = doneTodos + " / " + state.todos.length;
  document.getElementById("stat-days").textContent = activeDays;

  document.getElementById("bar-surahs").style.width = (readCount/114*100) + "%";
  document.getElementById("bar-words").style.width = (learnedCount/VOCAB.length*100) + "%";

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
  state.progress = { surahsRead: {}, wordsLearned: {}, history: {} };
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
