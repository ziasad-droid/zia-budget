/* ===================================================================
   Quran & Me — Marja' Companion (Sayyid Ali al-Husaini al-Sistani)
   This file is a study index, not a fatwa database. Exact, current
   rulings must always be checked directly on sistani.org — fatwas can
   be updated, and many rulings depend on personal circumstances that
   only a direct question to the Marja's office can resolve. This app
   is an independent study aid and is not affiliated with or endorsed
   by the Office of Grand Ayatollah Sistani.
   =================================================================== */

const MARJA_INFO = {
  name: "Grand Ayatollah Sayyid Ali al-Husaini al-Sistani",
  short: "Sayyid Sistani",
  bio: "Based in Najaf, Iraq, Sayyid Sistani is one of the most widely followed marja' al-taqlid (source of religious emulation) among Shia Muslims worldwide. His office publishes detailed, regularly-updated rulings in Arabic and English, including guidance written specifically for Muslims living in non-Muslim-majority countries.",
  officialSite: "https://www.sistani.org",
  englishSite: "https://www.sistani.org/english/",
  askUrl: "https://www.sistani.org/english/qa/"
};

const TAQLID_INFO = {
  title: "What is Taqlid?",
  body: "Taqlid means following the detailed religious rulings of a qualified, living mujtahid (jurist) who is recognized as the most learned (a'lam) in deriving law from its sources. Someone who has not reached the level of ijtihad themselves is expected to either practice taqlid of such a jurist or act with ihtiyat (precaution) covering all credible scholarly views.",
  identifying: "Sistani's own rulings describe three ways a person can identify the most learned jurist: (1) direct personal certainty, (2) the testimony of at least two reliable ahl al-khibrah — experts capable of judging scholarly rank — or a single reliable expert whose word gives confidence, or (3) a general, well-founded confidence formed from how recognized scholars treat a jurist's standing.",
  url: "https://www.sistani.org/english/book/48/2117/",
  westUrl: "https://www.sistani.org/english/book/46/2026/"
};

const WEST_BOOK = {
  title: "Islamic Laws: A Code of Practice for Muslims in the West",
  description: "Sistani's office produced this book specifically for Muslims living in non-Muslim-majority countries. Each chapter opens with background on the topic, then rules particularly relevant to living in the West, then a question-and-answer section drawn from real questions submitted to the Marja's office.",
  mainUrl: "https://www.sistani.org/english/book/46/",
  pdfUrl: "https://www.sistani.org/files-new/book-pdf/english-book-46.pdf",
  introUrl: "https://www.sistani.org/english/book/46/2018/",
  mirrorUrl: "https://al-islam.org/code-practice-muslims-west-sayyid-ali-hussaini-sistani",
  parts: [
    { part: "Part One — Acts of Worship", chapters: [
      { title: "Migration to Non-Muslim Countries", url: "https://www.sistani.org/english/book/46/2022/" },
      { title: "Taqlid: Following a Jurist", url: "https://www.sistani.org/english/book/46/2026/" },
      { title: "Ritual Purity and Impurity (Taharah)", url: "" },
      { title: "Salat: the Ritual Prayer", url: "" },
      { title: "Sawm: Fasting", url: "https://www.sistani.org/english/book/46/2034/" },
      { title: "Hajj: the Pilgrimage to Mecca", url: "" },
      { title: "Death-Related Issues", url: "" }
    ]},
    { part: "Part Two — Mundane Aspects of Life", chapters: [
      { title: "Eating and Drinking", url: "https://www.sistani.org/english/book/46/2045/" },
      { title: "Dress and Clothing", url: "https://www.sistani.org/english/book/46/2048/" },
      { title: "Dealing with Laws in Non-Muslim Countries", url: "" },
      { title: "Work and Investment", url: "" },
      { title: "Interaction in Social Life", url: "https://www.sistani.org/english/book/46/2056/" },
      { title: "Marriage", url: "https://www.sistani.org/english/book/46/2062/" },
      { title: "Women's Issues", url: "https://www.sistani.org/english/book/46/2065/" },
      { title: "Youths' Issues", url: "" },
      { title: "Music, Singing and Dancing", url: "" },
      { title: "Miscellaneous", url: "https://www.sistani.org/english/book/46/2073/" }
    ]}
  ]
};

/* Searchable topic index — general, descriptive summaries of what each
   chapter/topic covers. These are NOT verbatim fatwas. Always follow the
   link to sistani.org for the exact, current wording of a ruling. */
const FATWA_TOPICS = [
  { cat: "Taqlid", title: "Who must do taqlid?", summary: "Anyone who has not reached the level of ijtihad must either follow the most learned living jurist or act with precaution covering all credible views. This applies from the age of religious accountability (taklif).", url: TAQLID_INFO.url },
  { cat: "Taqlid", title: "Changing marja'", summary: "General rulings cover when it is and isn't permitted to move from one marja' to another, and what happens to acts already performed under a previous marja'.", url: TAQLID_INFO.url },
  { cat: "Purity (Taharah)", title: "Types of water", summary: "Water is generally categorized as pure/purifying (mutlaq) or mixed (mudaf), which affects whether it can be used for wudu, ghusl, or removing impurity.", url: WEST_BOOK.mainUrl },
  { cat: "Purity (Taharah)", title: "Wudu (ablution)", summary: "The ritual washing before prayer, generally covering the face and arms in a set order, followed by wiping the head and feet — with detailed conditions on order, continuity (muwalat), and what invalidates it.", url: WEST_BOOK.mainUrl },
  { cat: "Purity (Taharah)", title: "Ghusl (ritual bath)", summary: "A full-body ritual wash required after certain states (such as janabah), with two accepted methods (tartibi and irtimasi) and detailed conditions for each.", url: WEST_BOOK.mainUrl },
  { cat: "Purity (Taharah)", title: "Tayammum (dry ablution)", summary: "A substitute for wudu or ghusl using clean earth/soil-based surfaces, permitted when water is unavailable, harmful, or impractical to use.", url: "https://www.sistani.org/english/book/48/2205/" },
  { cat: "Prayer (Salah)", title: "The five daily prayers", summary: "Dhuhr, Asr, Maghrib, Isha and Fajr are obligatory, with their own valid time windows; many jurists including Sistani permit combining Dhuhr–Asr and Maghrib–Isha within their shared windows.", url: "https://www.sistani.org/english/book/48/2207/" },
  { cat: "Prayer (Salah)", title: "Obligatory components of prayer", summary: "Certain elements of the prayer (such as niyyah, takbirat al-ihram, qiyam, ruku' and sujud) are pillars whose omission invalidates the prayer even if forgotten.", url: "https://www.sistani.org/english/book/48/2229/" },
  { cat: "Prayer (Salah)", title: "Congregational prayer (jama'ah)", summary: "Praying in congregation carries great recommended reward and has its own conditions for the imam and rows of worshippers.", url: "https://www.sistani.org/english/book/48/2268/" },
  { cat: "Prayer (Salah)", title: "Traveler's prayer (qasr)", summary: "A traveler meeting specific distance and intention conditions shortens the four-unit prayers to two units, and does not fast that day — with detailed conditions on what counts as 'travel.'", url: "https://www.sistani.org/english/book/48/2206/" },
  { cat: "Fasting (Sawm)", title: "Who must fast Ramadan", summary: "Fasting is obligatory on adult, sane Muslims who are able to do so; there are specific exemptions and makeup/expiation (qada'/kaffarah) rules for illness, travel, pregnancy, nursing, and old age.", url: WEST_BOOK.parts[0].chapters[4].url },
  { cat: "Fasting (Sawm)", title: "What invalidates a fast", summary: "Eating, drinking, and a defined list of other acts break the fast; intentional versus forgetful breaking carries different consequences.", url: WEST_BOOK.parts[0].chapters[4].url },
  { cat: "Khums", title: "What is khums?", summary: "An annual religious levy of one-fifth on surplus income remaining after a person's and their family's reasonable yearly expenses, split between sahm al-Imam and sahm al-sadah, generally paid to (or with authorization from) the marja'.", url: WEST_BOOK.mainUrl },
  { cat: "Khums", title: "Khums year and calculation", summary: "Most people set a personal khums date (often based on when they became independently earning, or a fixed annual date) and calculate surplus assets and savings as of that date each year.", url: WEST_BOOK.mainUrl },
  { cat: "Zakat", title: "What is zakat?", summary: "A separate obligatory alms tax owed on specific categories of wealth (such as certain livestock, grains, gold and silver coinage) once they reach a minimum threshold (nisab) — distinct from khums.", url: WEST_BOOK.mainUrl },
  { cat: "Hajj", title: "Who must perform Hajj?", summary: "Hajj becomes obligatory once in a lifetime for an adult Muslim who is physically and financially able (istita'ah) to perform it, with detailed conditions on what 'able' means.", url: WEST_BOOK.mainUrl },
  { cat: "Marriage", title: "Marriage contract (aqd)", summary: "A valid Islamic marriage requires a specific verbal contract (offer and acceptance) with agreed terms including the mahr (dowry); temporary (mut'ah) and permanent (da'im) marriage have distinct rules.", url: WEST_BOOK.parts[1].chapters[5].url },
  { cat: "Marriage", title: "Marrying in a non-Muslim country", summary: "The Code of Practice for Muslims in the West addresses questions on civil marriage registration alongside the Islamic contract, and interfaith marriage considerations.", url: WEST_BOOK.parts[1].chapters[5].url },
  { cat: "Divorce", title: "Types of divorce", summary: "Includes revocable (raj'i) and irrevocable (ba'in) divorce, khul' divorce (initiated by the wife with compensation), and mubarah divorce (by mutual dislike) — each with its own iddah (waiting period) rules.", url: "https://www.sistani.org/english/book/48/8207/" },
  { cat: "Divorce", title: "Iddah (waiting period)", summary: "A prescribed waiting period after divorce or a husband's death, with different lengths and purposes depending on the situation (e.g. confirming non-pregnancy, mourning).", url: "https://www.sistani.org/english/book/48/8215/" },
  { cat: "Food & Drink", title: "Halal meat & slaughter (dhabh)", summary: "Meat must come from a permitted animal slaughtered according to Islamic method by an eligible person; the Code of Practice addresses buying meat in Western supermarkets and dining out.", url: "https://www.sistani.org/english/book/46/2045/" },
  { cat: "Food & Drink", title: "Food additives & alcohol-based ingredients", summary: "Guidance covers gelatin, enzymes, emulsifiers, and alcohol used in flavorings or manufacturing — an area the West-specific book addresses in detail with an ingredients appendix.", url: "https://www.sistani.org/english/book/46/2045/" },
  { cat: "Dress & Appearance", title: "Modesty (hijab) requirements", summary: "General requirements of covering for men and women in front of non-mahram individuals, plus questions specific to school, work, and sports settings in Western countries.", url: "https://www.sistani.org/english/book/46/2048/" },
  { cat: "Music & Arts", title: "Music, singing and dancing", summary: "Distinguishes between lahwi (frivolous/arousing) music generally considered impermissible and other forms of music/singing, with nuanced questions on instruments, concerts, and celebrations.", url: WEST_BOOK.mainUrl },
  { cat: "Business & Work", title: "Halal income and interest (riba)", summary: "Interest-based transactions are prohibited; the Code of Practice addresses mortgages, student loans, and conventional banking questions common to Muslims living in the West.", url: WEST_BOOK.mainUrl },
  { cat: "Inheritance", title: "Shares of inheritance", summary: "The Quran and fiqh set fixed shares for specific relatives (spouse, children, parents, and others) grouped into ranked classes that determine who inherits when.", url: "https://www.sistani.org/english/book/48/8236/" },
  { cat: "Inheritance", title: "Spousal inheritance", summary: "A surviving husband and wife inherit fixed fractions of each other's estate, with some differences depending on whether there are children and the nature of the property involved.", url: "https://www.sistani.org/english/book/48/8240/" },
  { cat: "Death-Related Issues", title: "Ghusl, kafan & burial", summary: "Covers the ritual washing and shrouding of the deceased, funeral prayer (salat al-mayyit), and burial requirements, plus practicalities of arranging these in non-Muslim countries.", url: WEST_BOOK.mainUrl },
  { cat: "Migration & Living Abroad", title: "Living in a non-Muslim country", summary: "The opening chapter of the Code of Practice discusses the permissibility and conditions of residing in non-Muslim countries, and maintaining religious commitment while doing so.", url: "https://www.sistani.org/english/book/46/2022/" },
  { cat: "Women's Issues", title: "Women's issues chapter", summary: "Addresses menstruation (hayd) and related prayer/fasting rulings, along with social and family questions specific to women living in Western societies.", url: "https://www.sistani.org/english/book/46/2065/" },
  { cat: "Social Life", title: "Interacting with non-Muslims", summary: "General rules on friendship, business, and social interaction with non-Muslims, including workplace and neighborly conduct.", url: "https://www.sistani.org/english/book/46/2056/" },
  { cat: "Vows & Oaths", title: "Nadhr (vow) and Qasam (oath)", summary: "A religious vow or oath made in God's name creates a binding obligation with specific conditions for validity and expiation if broken.", url: WEST_BOOK.mainUrl },
  { cat: "Enjoining Good", title: "Amr bil Ma'ruf & Nahy anil Munkar", summary: "The obligation to enjoin good and forbid wrong applies within a graded set of conditions and steps (from the heart, to speech, to action), designed to avoid causing greater harm.", url: WEST_BOOK.mainUrl }
];

/* ===================================================================
   Usul al-Din — the 5 Roots of Religion (belief, not imitated)
   =================================================================== */
const USUL_AL_DIN = [
  { n: 1, ar: "التوحيد", tr: "Tawhid", en: "Divine Oneness", explain: "God is one, without partner, without physical form, and without beginning or end. Everything else in the faith rests on this." },
  { n: 2, ar: "العدل", tr: "Adalah ('Adl)", en: "Divine Justice", explain: "God is perfectly just and never wrongs anyone; human beings have real free will and are justly responsible for their choices. This is the root that most distinguishes Shia theology's structure from other schools." },
  { n: 3, ar: "النبوة", tr: "Nubuwwah", en: "Prophethood", explain: "God sends prophets to guide humanity, culminating in Muhammad as the final prophet and the Quran as the final, uncorrupted revelation." },
  { n: 4, ar: "الإمامة", tr: "Imamah", en: "Divinely Appointed Leadership", explain: "After the Prophet, leadership of the community passed to twelve infallible Imams from his family (Ahl al-Bayt), beginning with Imam Ali, to preserve and interpret the message correctly." },
  { n: 5, ar: "المعاد", tr: "Ma'ad", en: "The Return / Resurrection", explain: "Every soul will be resurrected and held accountable before God on the Day of Judgment, receiving Paradise or punishment justly according to belief and deeds." }
];
const USUL_MNEMONIC = "\"Tall Angels Never Ignore Mercy\" — T-A-N-I-M: Tawhid, Adalah, Nubuwwah, Imamah, Ma'ad. Say the five in order every time you finish a prayer this week; by day three it's automatic.";

/* ===================================================================
   Furu al-Din — the 10 Branches of Religion (practice, follow a marja')
   =================================================================== */
const FURU_AL_DIN = [
  { n: 1, ar: "الصلاة", tr: "Salat", en: "Prayer", group: "Worship", explain: "The five daily obligatory prayers, the central pillar of practice." },
  { n: 2, ar: "الصوم", tr: "Sawm", en: "Fasting", group: "Worship", explain: "Fasting from dawn to sunset, obligatory during the month of Ramadan." },
  { n: 3, ar: "الحج", tr: "Hajj", en: "Pilgrimage", group: "Worship", explain: "Pilgrimage to the Kaaba in Mecca, once in a lifetime for those who are able." },
  { n: 4, ar: "الزكاة", tr: "Zakat", en: "Almsgiving", group: "Worship", explain: "Obligatory charity on specific categories of wealth once they reach a threshold." },
  { n: 5, ar: "الخمس", tr: "Khums", en: "One-Fifth Tax", group: "Worship", explain: "An annual one-fifth levy on surplus income, distinct from zakat." },
  { n: 6, ar: "الجهاد", tr: "Jihad", en: "Struggle", group: "Moral Duty", explain: "Striving in God's way — foremost the inner struggle against one's own ego, and under strict conditions, a defensive struggle for a just cause." },
  { n: 7, ar: "الأمر بالمعروف", tr: "Amr bil Ma'ruf", en: "Enjoining Good", group: "Moral Duty", explain: "Encouraging others toward good conduct, within careful, graded conditions." },
  { n: 8, ar: "النهي عن المنكر", tr: "Nahy anil Munkar", en: "Forbidding Evil", group: "Moral Duty", explain: "Discouraging others from wrongdoing, within the same careful, graded conditions." },
  { n: 9, ar: "التولي", tr: "Tawalla", en: "Loving Devotion", group: "Loyalty", explain: "Expressing love and loyalty to God, the Prophet, the Ahl al-Bayt, and the righteous." },
  { n: 10, ar: "التبري", tr: "Tabarra", en: "Disassociation", group: "Loyalty", explain: "Disassociating from the enemies of God and those who oppressed the Ahl al-Bayt." }
];
const FURU_MNEMONIC = "Group them 5–3–2, not as one list of ten: (1) Worship — Salat, Sawm, Hajj, Zakat, Khums: the 5 acts you *do*. (2) Moral Duty — Jihad, Amr bil Ma'ruf, Nahy anil Munkar: the 3 acts about *right and wrong in the world*. (3) Loyalty — Tawalla, Tabarra: the 2 acts about *whose side you're on*. Learn one group per day for three days, then recite all ten from memory on day four.";

if (typeof module !== "undefined") module.exports = { MARJA_INFO, TAQLID_INFO, WEST_BOOK, FATWA_TOPICS, USUL_AL_DIN, USUL_MNEMONIC, FURU_AL_DIN, FURU_MNEMONIC };
