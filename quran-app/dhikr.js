/* ===================================================================
   Quran & Me — Dhikr (Remembrance)
   Common daily phrases of remembrance, with an expanded look at
   Istighfar and Tasbih al-Zahra (a distinctly Shia daily practice).
   Hadith counts (e.g. "70 times a day") are as commonly reported in
   Sahih al-Bukhari and Sahih Muslim — treat as widely-cited tradition,
   not a precise historical count.
   =================================================================== */

const ISTIGHFAR_DEEPDIVE = {
  title: "Istighfar — Seeking Forgiveness",
  arabic: "أَسْتَغْفِرُ اللَّهَ",
  transliteration: "Astaghfirullah",
  translation: "I seek the forgiveness of Allah",
  root: "From the Arabic root غ-ف-ر (ghafara), meaning 'to cover' or 'to conceal.' The same root gives us mighfar, a soldier's helmet — something that covers and protects the head. Istighfar is literally asking God to cover your sin, shielding you from its consequences, not merely to erase a record.",
  meaning: "Saying Astaghfirullah is more than an apology — it's a conscious turning back to God after a slip, acknowledging the mistake, and asking Him to cover it with His mercy. Scholars distinguish it from tawbah (repentance): istighfar is the request for covering/forgiveness itself, while tawbah is the fuller commitment to change direction. In practice, most people do both together.",
  reasons: [
    { title: "Provision from the sky", detail: "In Surah Nuh (71:10-11), Noah tells his people: 'Seek forgiveness from your Lord — He is ever a Perpetual Forgiver — He will send [rain from] the sky upon you in [continuing] showers.'" },
    { title: "Increase in wealth and children", detail: "The same passage continues (71:12): 'And give you increase in wealth and children and provide for you gardens and provide for you rivers.'" },
    { title: "A way out of every difficulty", detail: "A well-known hadith (reported in Abu Dawud and elsewhere) states: 'Whoever makes istighfar a constant habit, Allah will make a way out for him from every distress, and a relief from every anxiety, and will provide for him from where he does not expect.'" },
    { title: "It purifies the heart", detail: "The Prophet taught that every sin leaves a mark on the heart; sincere istighfar is what removes that mark before it hardens into something permanent (reported in Ibn Majah / Tirmidhi traditions on the heart being polished by repentance)." },
    { title: "It's loved by God, and raises rank", detail: "The Quran says (2:222) 'Indeed, Allah loves those who are constantly repentant.' Istighfar isn't just damage control — it's an act God finds beloved in itself, regardless of how small the sin was." }
  ],
  howMany: "The Prophet himself is reported to have said 'I seek Allah's forgiveness and turn to Him more than seventy times a day' (Sahih al-Bukhari), and in another narration, 'more than a hundred times a day' (Sahih Muslim) — despite being sinless, showing istighfar is as much about closeness to God as it is about specific mistakes. A simple starting habit: 33 or 100 times after each of the five daily prayers, or a set of 100 first thing in the morning and last thing at night.",
  when: "Anytime — but especially: right after a mistake, during the last third of the night, after each prayer, and in the last ten nights of Ramadan."
};

const TASBIH_ZAHRA = {
  title: "Tasbih al-Zahra (Fatimah's Rosary)",
  intro: "Taught by the Prophet to his daughter Fatimah az-Zahra when she asked for help with the physical exhaustion of housework — he told her this dhikr was better than a servant. It's recited after every one of the five daily obligatory prayers and is one of the most beloved and widely practiced dhikrs in Shia tradition.",
  steps: [
    { count: 34, ar: "اللَّهُ أَكْبَرُ", tr: "Allahu Akbar", en: "Allah is the Greatest" },
    { count: 33, ar: "الْحَمْدُ لِلَّهِ", tr: "Alhamdulillah", en: "All praise is for Allah" },
    { count: 33, ar: "سُبْحَانَ اللَّهِ", tr: "SubhanAllah", en: "Glory be to Allah" }
  ],
  note: "That's 100 total. Many use the fingers of the right hand (no beads required) to count the 34, then switch hands for the two sets of 33 — exactly as taught in the hadith describing how Fatimah was shown to count on her fingers."
};

const DHIKR_LIST = [
{ar:"سُبْحَانَ اللَّهِ",tr:"SubhanAllah",en:"Glory be to Allah",meaning:"Declares God free of every flaw, weakness, or imperfection.",count:"33x after prayer, or 100x anytime",when:"Part of Tasbih al-Zahra; also recited in ruku' and sujud during prayer."},
{ar:"الْحَمْدُ لِلَّهِ",tr:"Alhamdulillah",en:"All praise is for Allah",meaning:"Attributes every form of praise and gratitude to God alone, in ease or hardship.",count:"33x after prayer, or anytime gratitude comes to mind",when:"Said naturally after good news, a meal, a sneeze, or simply throughout the day."},
{ar:"اللَّهُ أَكْبَرُ",tr:"Allahu Akbar",en:"Allah is the Greatest",meaning:"Affirms that nothing — no fear, no problem, no power — is greater than God.",count:"34x after prayer, or anytime",when:"Opens every prayer (takbir); said during Eid, upon good or startling news, and to reset perspective when something feels overwhelming."},
{ar:"لَا إِلَٰهَ إِلَّا اللَّهُ",tr:"La ilaha illallah",en:"There is no god but Allah",meaning:"The core statement of tawhid — the foundation of the entire faith.",count:"100x, or as many as possible in a sitting",when:"Considered the best of all dhikr in several hadith; a strong choice when you have only a minute to spare."},
{ar:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",tr:"La hawla wala quwwata illa billah",en:"There is no power nor strength except with Allah",meaning:"An admission of total reliance on God when facing something beyond your own ability.",count:"As needed",when:"Said in moments of helplessness, frustration, or being overwhelmed by a task."},
{ar:"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ",tr:"Allahumma salli 'ala Muhammadin wa aali Muhammad",en:"O Allah, send blessings on Muhammad and the family of Muhammad",meaning:"Salawat — asking God to honor the Prophet and, in the Shia formula, his family (Ahl al-Bayt) together with him.",count:"10x after prayer, or whenever the Prophet's name is mentioned",when:"Said whenever the Prophet is mentioned, and recommended generously on Fridays."},
{ar:"حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",tr:"Hasbunallahu wa ni'mal Wakil",en:"Allah is sufficient for us, and He is the best Trustee",meaning:"A declaration of trust when you've done everything you can and must now let go of the outcome.",count:"As needed, often 7x or more in difficulty",when:"Said facing hardship, danger, or anxiety about a result out of your hands."},
{ar:"بِسْمِ اللَّهِ",tr:"Bismillah",en:"In the name of Allah",meaning:"Begins an action consciously in God's name, seeking blessing in it.",count:"Once, before starting anything",when:"Before eating, starting a task, leaving the house, or beginning to read."},
{ar:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",tr:"SubhanAllahi wa bihamdih",en:"Glory be to Allah, and praise be to Him",meaning:"Combines glorification and gratitude in one phrase; described in hadith as light on the tongue but heavy on the scale of good deeds.",count:"100x",when:"Morning and evening, as a light daily habit with a described reward of sins being forgiven 'even if like the foam of the sea.'"},
{ar:"سُبْحَانَ رَبِّيَ الْعَظِيمِ",tr:"Subhana Rabbiyal Azim",en:"Glory be to my Lord, the Magnificent",meaning:"Recited while bowing in prayer, glorifying God's greatness specifically.",count:"3x (or more) in each ruku'",when:"During the bowing position (ruku') of every unit of prayer."}
];

if (typeof module !== "undefined") module.exports = { ISTIGHFAR_DEEPDIVE, TASBIH_ZAHRA, DHIKR_LIST };
