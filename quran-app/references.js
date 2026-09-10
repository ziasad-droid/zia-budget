/* ===================================================================
   Quran & Me — References
   Sources consulted while compiling surah summaries, Shia notes, and
   the vocabulary glossary in this app. Shown in full inside the app
   (Progress tab) so every user can see exactly where the content
   comes from.
   =================================================================== */

const REFERENCES = [
  {
    title: "Tafsir al-Mizan — Sayyid Muhammad Husayn Tabataba'i",
    note: "The primary modern Shia exegesis of the Quran (27 volumes), used as the main grounding for Shia theological notes on verses such as the Verse of Purification (33:33), the Verse of Wilayah (5:55), and Surah Al-Insan.",
    url: "https://al-islam.org/al-mizan-exegesis-quran-sayyid-muhammad-husayn-tabatabai"
  },
  {
    title: "Al-Islam.org — Ahlul Bayt Digital Islamic Library Project",
    note: "General Shia reference library used for surah context, tafsir excerpts, and the lives of the Prophet and Ahl al-Bayt.",
    url: "https://al-islam.org"
  },
  {
    title: "WikiShia — Shia Encyclopedia",
    note: "Used to cross-check Shia narrations on individual surahs, including Sura al-Insan and the events behind key verses.",
    url: "https://en.wikishia.net"
  },
  {
    title: "Imam Ali Foundation (imamali.net)",
    note: "Articles on the revelation circumstances of verses connected to Imam Ali and the Ahl al-Bayt, including the Verse of Wilayah and Surah Al-Insan.",
    url: "https://en.imamali.net"
  },
  {
    title: "Mahajjah — Shia Beliefs Series",
    note: "Reference for the doctrine of Wilayah and the Verse of Wilayah (5:55).",
    url: "https://mahajjah.com"
  },
  {
    title: "List of chapters in the Quran (general reference)",
    note: "Cross-checked for the standard order, Meccan/Medinan classification, and verse counts of all 114 surahs, which are consistent across Sunni and Shia mushafs.",
    url: "https://en.wikipedia.org/wiki/List_of_chapters_in_the_Quran"
  },
  {
    title: "Quran.com",
    note: "General reference for Quran text, translations (including Sahih International and others) and surah metadata.",
    url: "https://quran.com"
  },
  {
    title: "Corpus Quran — Quranic Arabic Corpus",
    note: "Referenced for Arabic root and word-level meanings used in the vocabulary glossary.",
    url: "https://corpus.quran.com"
  },
  {
    title: "Glossary of Islamic terms in Arabic",
    note: "General cross-reference for definitions of core terms (taqwa, tawakkul, tawhid, and others) in the vocabulary list.",
    url: "https://islam.fandom.com/wiki/Glossary_of_Islamic_terms_in_Arabic"
  },
  {
    title: "Quranica — Quranic Arabic Words",
    note: "Supplementary reference for common Quranic Arabic vocabulary.",
    url: "https://quranica.com/articles/quranic-arabic-words/"
  },
  {
    title: "Sistani.org — Islamic Laws: A Code of Practice for Muslims in the West",
    note: "Primary source for the Marja tab's book summary, chapter list, and topic index. This app links directly to specific chapters where available.",
    url: "https://www.sistani.org/english/book/46/"
  },
  {
    title: "Sistani.org — Islamic Laws (general fiqh manual)",
    note: "Source for general topic descriptions (prayer, purity, divorce, inheritance) in the Marja tab's Rulings & Topics Index.",
    url: "https://www.sistani.org/english/book/48/"
  },
  {
    title: "IMAM-US.org — What is Taqlid? / What is Marja'iyya?",
    note: "Reference for the plain-language explanation of taqlid and identifying the most learned jurist.",
    url: "https://imam-us.org/islamic-awareness/islam-101/what-is-taqlid"
  },
  {
    title: "Al-Khoei Foundation — Taqlid",
    note: "Supplementary reference on the rules and practice of taqlid.",
    url: "https://www.al-khoei.org/Questions/taqlid/"
  },
  {
    title: "MyIslam.org — The 99 Names of Allah",
    note: "Primary cross-check for the order, transliteration, and numbering of the 99 Names in the Names tab.",
    url: "https://myislam.org/99-names-of-allah/"
  },
  {
    title: "Al-Islam.org — The Ninety-Nine Attributes of Allah (Yasin T. al-Jibouri)",
    note: "Shia-authored reference on the 99 Names, used alongside myislam.org to cross-check names in the 60s-70s range where lists vary most.",
    url: "https://al-islam.org/ninety-nine-attributes-allah-yasin-t-al-jibouri"
  },
  {
    title: "Sahih al-Bukhari 6307 (Book of Invocations)",
    note: "Source for the hadith on the Prophet seeking forgiveness more than seventy times daily; Sahih Muslim carries a parallel narration citing a hundred times. Used in the Dhikr tab's Istighfar deep-dive.",
    url: "https://sunnah.com/bukhari/80"
  },
  {
    title: "Al-Islam.org — The Tasbih of Fatimah az-Zahra",
    note: "Reference for the origin, method, and etiquette of Tasbih al-Zahra (34x Allahu Akbar, 33x Alhamdulillah, 33x SubhanAllah), taught by the Prophet to his daughter Fatimah.",
    url: "https://al-islam.org/tasbih-fatimah-az-zahra-abbas-azizi"
  },
  {
    title: "WikiShia / al-islam.org — Dua Jawshan Kabir",
    note: "Referenced for the note on Dua Jawshan Kabir (1,000 names/attributes of God) as a Shia devotional practice that extends beyond the standard 99.",
    url: "https://al-islam.org/reflections-supplication-dua-jawshan-al-kabir-mohammad-ali-shomali/reflections-supplication-dua"
  }
];

const REFERENCES_NOTE = "Facts shared by all schools (surah names, order, verse counts, revelation place) are drawn from standard, widely-agreed sources. Historical/interpretive notes marked 'Shia note' throughout the app draw specifically on Shia tafsir and hadith literature, led by Tafsir al-Mizan and al-islam.org, per the app owner's request to lean toward Shia scholarship where available. This app is a personal study aid compiled with AI assistance — always verify rulings and deeper points with a qualified scholar.";

if (typeof module !== "undefined") module.exports = { REFERENCES, REFERENCES_NOTE };
