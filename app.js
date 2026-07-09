const STORAGE_KEY = "atelier-grammaire-state-v3";
const LEGACY_STORAGE_KEYS = ["atelier-grammaire-state-v2"];

const promptLabels = {
  nature: "Nature ?",
  fonction: "Fonction ?",
};

const rawGrammarItems = [
  {
    id: "nature:nom",
    label: "nom",
    category: "nature",
    aliases: ["un nom"],
  },
  {
    id: "nature:groupe-nominal",
    label: "groupe nominal",
    category: "nature",
    aliases: ["gn", "groupe nominale"],
  },
  {
    id: "nature:verbe",
    label: "verbe",
    category: "nature",
    aliases: [],
  },
  {
    id: "nature:adjectif",
    label: "adjectif",
    category: "nature",
    aliases: [],
  },
  {
    id: "nature:adverbe",
    label: "adverbe",
    category: "nature",
    aliases: [],
  },
  {
    id: "nature:pronom",
    label: "pronom",
    category: "nature",
    aliases: [],
  },
  {
    id: "nature:determinant",
    label: "déterminant",
    category: "nature",
    aliases: ["determinant"],
  },
  {
    id: "nature:conjonction-coordination",
    label: "conjonction de coordination",
    category: "nature",
    aliases: ["coordination", "conjonction"],
  },
  {
    id: "fonction:proposition",
    label: "proposition",
    category: "fonction",
    aliases: [],
  },
  {
    id: "fonction:cod",
    label: "COD",
    category: "fonction",
    aliases: ["complément d'objet direct", "complement d'objet direct", "complement d objet direct"],
  },
  {
    id: "fonction:coi",
    label: "COI",
    category: "fonction",
    aliases: ["complément d'objet indirect", "complement d'objet indirect", "complement d objet indirect"],
  },
  {
    id: "fonction:sujet",
    label: "Sujet",
    category: "fonction",
    aliases: ["sujet"],
  },
  {
    id: "fonction:verbe-conjugue",
    label: "Verbe conjugué",
    category: "fonction",
    aliases: ["verbe conjugue", "verbe conjugué"],
  },
  {
    id: "fonction:attribut-sujet",
    label: "Attribut du sujet",
    category: "fonction",
    aliases: ["attribut sujet", "attribut du sujet"],
  },
  {
    id: "fonction:adjectif-epithete",
    label: "adjectif épithète",
    category: "fonction",
    aliases: ["adjectif epithete", "épithète", "epithete"],
  },
  {
    id: "fonction:complement-verbe",
    label: "complément du verbe",
    category: "fonction",
    aliases: ["complement du verbe"],
  },
  {
    id: "fonction:cc-temps",
    label: "complément circonstanciel de temps",
    category: "fonction",
    aliases: [
      "complement circonstanciel de temps",
      "compléments circonstanciels de temps",
      "cct",
      "cc de temps",
      "cc temps",
    ],
  },
  {
    id: "fonction:cc-lieu",
    label: "complément circonstanciel de lieu",
    category: "fonction",
    aliases: [
      "complement circonstanciel de lieu",
      "compléments circonstanciels de lieu",
      "ccl",
      "cc de lieu",
      "cc lieu",
    ],
  },
  {
    id: "fonction:cc-maniere",
    label: "complément circonstanciel de manière",
    category: "fonction",
    aliases: [
      "complement circonstanciel de manière",
      "complement circonstanciel de maniere",
      "compléments circonstanciels de manière",
      "ccm",
      "cc de manière",
      "cc de maniere",
      "cc manière",
      "cc maniere",
    ],
  },
  {
    id: "fonction:complement-nom",
    label: "complément du nom",
    category: "fonction",
    aliases: ["complement du nom", "compléments du nom", "cdn"],
  },
  {
    id: "fonction:proposition-subordonnee-relative",
    label: "proposition subordonnée relative",
    category: "fonction",
    aliases: [
      "proposition subordonnee relative",
      "propositions subordonnées relatives",
      "propositions subordonnees relatives",
      "proposition relative",
      "relative",
      "psr",
    ],
  },
];

const grammarItems = rawGrammarItems.map((item) => ({
  ...item,
  searchKeys: uniqueStrings([item.label, ...item.aliases]).map(normalizeText),
}));

const itemCounts = grammarItems.reduce(
  (counts, item) => ({
    ...counts,
    [item.category]: counts[item.category] + 1,
  }),
  { nature: 0, fonction: 0 },
);

const answerLookup = new Map();
for (const item of grammarItems) {
  for (const key of item.searchKeys) {
    answerLookup.set(key, item.id);
  }
}

const exerciseBank = [
  makeExercise(
    "n1",
    "nature",
    "nature:nom",
    "Le ",
    "chat",
    " observe la pluie depuis la fenêtre.",
    "\"chat\" désigne un être : c'est un nom.",
  ),
  makeExercise(
    "n2",
    "nature",
    "nature:groupe-nominal",
    "",
    "Le vieux chêne",
    " résiste encore au vent.",
    "L'expression entière forme un groupe nominal.",
  ),
  makeExercise(
    "n3",
    "nature",
    "nature:verbe",
    "Les enfants ",
    "courent",
    " vers la cour.",
    "\"courent\" exprime l'action : c'est un verbe.",
  ),
  makeExercise(
    "n4",
    "nature",
    "nature:adjectif",
    "Une écharpe ",
    "rouge",
    " sèche près du radiateur.",
    "\"rouge\" précise le nom \"écharpe\" : c'est un adjectif.",
  ),
  makeExercise(
    "n5",
    "nature",
    "nature:adverbe",
    "Il répond ",
    "doucement",
    " pour ne pas réveiller le bébé.",
    "\"doucement\" précise la manière : c'est un adverbe.",
  ),
  makeExercise(
    "n6",
    "nature",
    "nature:pronom",
    "",
    "Elle",
    " connaît déjà la réponse.",
    "\"Elle\" remplace un groupe nominal : c'est un pronom.",
  ),
  makeExercise(
    "n7",
    "nature",
    "nature:determinant",
    "",
    "Ces",
    " fleurs parfument toute la pièce.",
    "\"Ces\" accompagne le nom \"fleurs\" : c'est un déterminant.",
  ),
  makeExercise(
    "n8",
    "nature",
    "nature:conjonction-coordination",
    "Maya voulait sortir, ",
    "mais",
    " la pluie a commencé.",
    "\"mais\" relie deux éléments : c'est une conjonction de coordination.",
  ),
  makeExercise(
    "n9",
    "nature",
    "nature:nom",
    "Cette ",
    "maison",
    " domine toute la vallée.",
    "\"maison\" nomme une chose : c'est un nom.",
  ),
  makeExercise(
    "n10",
    "nature",
    "nature:adverbe",
    "Le train est ",
    "déjà",
    " parti.",
    "\"déjà\" modifie le sens du verbe : c'est un adverbe.",
  ),
  makeExercise(
    "n11",
    "nature",
    "nature:pronom",
    "Je ne ",
    "le",
    " retrouve plus.",
    "\"le\" remplace ici un groupe nominal : c'est un pronom.",
  ),
  makeExercise(
    "n12",
    "nature",
    "nature:determinant",
    "",
    "Chaque",
    " élève relit sa copie.",
    "\"Chaque\" introduit le nom \"élève\" : c'est un déterminant.",
  ),
  makeExercise(
    "n13",
    "nature",
    "nature:verbe",
    "Vous ",
    "écoutez",
    " la consigne avec attention.",
    "\"écoutez\" est le verbe de la phrase.",
  ),
  makeExercise(
    "n14",
    "nature",
    "nature:adjectif",
    "Un ciel ",
    "sombre",
    " annonçait l'orage.",
    "\"sombre\" qualifie le nom \"ciel\" : c'est un adjectif.",
  ),
  makeExercise(
    "n15",
    "nature",
    "nature:groupe-nominal",
    "",
    "Une lampe ancienne",
    " éclaire le salon.",
    "L'ensemble souligné constitue un groupe nominal.",
  ),
  makeExercise(
    "n16",
    "nature",
    "nature:conjonction-coordination",
    "Tu peux choisir du thé ",
    "ou",
    " du chocolat.",
    "\"ou\" coordonne deux choix : c'est une conjonction de coordination.",
  ),
  makeExercise(
    "f1",
    "fonction",
    "fonction:proposition",
    "",
    "Que tu viennes demain",
    " me rassure.",
    "L'ensemble souligné forme une proposition.",
  ),
  makeExercise(
    "f2",
    "fonction",
    "fonction:cod",
    "Lina mange ",
    "une pomme",
    " à la récréation.",
    "\"une pomme\" reçoit directement l'action du verbe : c'est un COD.",
  ),
  makeExercise(
    "f3",
    "fonction",
    "fonction:coi",
    "Je parle ",
    "à mon voisin",
    " chaque matin.",
    "\"à mon voisin\" complète le verbe avec une préposition : c'est un COI.",
  ),
  makeExercise(
    "f4",
    "fonction",
    "fonction:sujet",
    "",
    "Le professeur",
    " explique la consigne.",
    "\"Le professeur\" fait l'action : c'est le sujet.",
  ),
  makeExercise(
    "f5",
    "fonction",
    "fonction:verbe-conjugue",
    "Nous ",
    "chantons",
    " ce refrain ensemble.",
    "\"chantons\" est le verbe conjugué de la phrase.",
  ),
  makeExercise(
    "f6",
    "fonction",
    "fonction:attribut-sujet",
    "Sami semble ",
    "fatigué",
    " après la course.",
    "\"fatigué\" donne une propriété au sujet grâce à un verbe d'état.",
  ),
  makeExercise(
    "f7",
    "fonction",
    "fonction:adjectif-epithete",
    "J'admire la maison ",
    "blanche",
    " au bout de la rue.",
    "\"blanche\" est directement rattaché au nom : c'est un adjectif épithète.",
  ),
  makeExercise(
    "f8",
    "fonction",
    "fonction:complement-verbe",
    "Il veut ",
    "partir tôt",
    " pour éviter les embouteillages.",
    "\"partir tôt\" complète le verbe \"veut\" : c'est un complément du verbe.",
  ),
  makeExercise(
    "f9",
    "fonction",
    "fonction:cod",
    "Nous relisons ",
    "la dictée",
    " avant de rendre la copie.",
    "\"la dictée\" complète directement le verbe : c'est un COD.",
  ),
  makeExercise(
    "f10",
    "fonction",
    "fonction:sujet",
    "",
    "Mes amis",
    " préparent le spectacle.",
    "\"Mes amis\" est le sujet du verbe \"préparent\".",
  ),
  makeExercise(
    "f11",
    "fonction",
    "fonction:proposition",
    "",
    "Qu'il ait réussi",
    " nous réjouit beaucoup.",
    "L'ensemble souligné constitue une proposition.",
  ),
  makeExercise(
    "f12",
    "fonction",
    "fonction:coi",
    "Tu répondras ",
    "à la directrice",
    " demain matin.",
    "\"à la directrice\" complète le verbe par une préposition : c'est un COI.",
  ),
  makeExercise(
    "f13",
    "fonction",
    "fonction:verbe-conjugue",
    "Le vent ",
    "soufflait",
    " toute la nuit.",
    "\"soufflait\" est le verbe conjugué de la phrase.",
  ),
  makeExercise(
    "f14",
    "fonction",
    "fonction:attribut-sujet",
    "Cette soupe devient ",
    "délicieuse",
    " avec un peu de thym.",
    "\"délicieuse\" attribue une qualité au sujet.",
  ),
  makeExercise(
    "f15",
    "fonction",
    "fonction:adjectif-epithete",
    "Nous traversons une forêt ",
    "dense",
    " et silencieuse.",
    "\"dense\" précise directement le nom \"forêt\" : c'est un adjectif épithète.",
  ),
  makeExercise(
    "f16",
    "fonction",
    "fonction:complement-verbe",
    "Les enfants aiment ",
    "jouer dehors",
    " après l'école.",
    "\"jouer dehors\" complète le verbe \"aiment\".",
  ),
  makeExercise(
    "f17",
    "fonction",
    "fonction:cc-temps",
    "Nous partirons ",
    "demain matin",
    " si le ciel est clair.",
    "\"demain matin\" situe l'action dans le temps : c'est un complément circonstanciel de temps.",
  ),
  makeExercise(
    "f18",
    "fonction",
    "fonction:cc-temps",
    "Ils révisent ",
    "chaque soir",
    " avant le dîner.",
    "\"chaque soir\" indique quand a lieu l'action.",
  ),
  makeExercise(
    "f19",
    "fonction",
    "fonction:cc-temps",
    "Le concert commencera ",
    "à huit heures",
    ".",
    "\"à huit heures\" précise le moment de l'action.",
  ),
  makeExercise(
    "f20",
    "fonction",
    "fonction:cc-lieu",
    "Les touristes avancent ",
    "dans la vieille ville",
    " sans se presser.",
    "\"dans la vieille ville\" indique où se déroule l'action.",
  ),
  makeExercise(
    "f21",
    "fonction",
    "fonction:cc-lieu",
    "Le chien dort ",
    "près du feu",
    " depuis une heure.",
    "\"près du feu\" indique le lieu.",
  ),
  makeExercise(
    "f22",
    "fonction",
    "fonction:cc-lieu",
    "Nous avons pique-niqué ",
    "au bord du lac",
    " hier.",
    "\"au bord du lac\" précise le lieu.",
  ),
  makeExercise(
    "f23",
    "fonction",
    "fonction:cc-maniere",
    "Elle referme la porte ",
    "avec précaution",
    " pour ne pas faire de bruit.",
    "\"avec précaution\" indique la manière.",
  ),
  makeExercise(
    "f24",
    "fonction",
    "fonction:cc-maniere",
    "Le coureur termine la course ",
    "sans faiblir",
    ".",
    "\"sans faiblir\" précise la manière dont l'action se réalise.",
  ),
  makeExercise(
    "f25",
    "fonction",
    "fonction:cc-maniere",
    "Les élèves écoutent ",
    "en silence",
    " la lecture.",
    "\"en silence\" indique la manière.",
  ),
  makeExercise(
    "f26",
    "fonction",
    "fonction:complement-nom",
    "J'ai feuilleté un livre ",
    "de contes africains",
    " toute l'après-midi.",
    "\"de contes africains\" complète le nom \"livre\".",
  ),
  makeExercise(
    "f27",
    "fonction",
    "fonction:complement-nom",
    "La maison ",
    "au toit rouge",
    " domine le village.",
    "\"au toit rouge\" complète le nom \"maison\".",
  ),
  makeExercise(
    "f28",
    "fonction",
    "fonction:complement-nom",
    "Un collier ",
    "en argent",
    " brillait sous la vitrine.",
    "\"en argent\" complète le nom \"collier\".",
  ),
  makeExercise(
    "f29",
    "fonction",
    "fonction:proposition-subordonnee-relative",
    "Le roman ",
    "que tu m'as prêté",
    " me passionne.",
    "\"que tu m'as prêté\" complète le nom \"roman\" : c'est une proposition subordonnée relative.",
  ),
  makeExercise(
    "f30",
    "fonction",
    "fonction:proposition-subordonnee-relative",
    "La ville ",
    "où je suis né",
    " attire encore ma famille.",
    "\"où je suis né\" est une proposition subordonnée relative.",
  ),
  makeExercise(
    "f31",
    "fonction",
    "fonction:proposition-subordonnee-relative",
    "Les enfants ",
    "qui jouent dans la cour",
    " attendent la cloche.",
    "\"qui jouent dans la cour\" complète le nom \"enfants\".",
  ),
  makeExercise(
    "f32",
    "fonction",
    "fonction:cod",
    "Le jardinier taille ",
    "les rosiers",
    " avec soin.",
    "\"les rosiers\" est le COD du verbe \"taille\".",
  ),
  makeExercise(
    "f33",
    "fonction",
    "fonction:coi",
    "Elle pense souvent ",
    "à ses grands-parents",
    ".",
    "\"à ses grands-parents\" est un COI.",
  ),
  makeExercise(
    "f34",
    "fonction",
    "fonction:sujet",
    "",
    "La mer agitée",
    " impressionne les visiteurs.",
    "\"La mer agitée\" accomplit l'action : c'est le sujet.",
  ),
  makeExercise(
    "f35",
    "fonction",
    "fonction:proposition",
    "",
    "Que vous soyez ici",
    " change tout.",
    "L'ensemble souligné est une proposition.",
  ),
];

const dom = {
  welcomePanel: document.getElementById("welcome-panel"),
  profileView: document.getElementById("profile-view"),
  trainingView: document.getElementById("training-view"),
  sessionView: document.getElementById("session-view"),
  navButtons: Array.from(document.querySelectorAll("[data-nav]")),
};

let state = loadState();

function makeExercise(id, promptType, correctId, before, target, after, explanation) {
  return { id, promptType, correctId, before, target, after, explanation };
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[']/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ");
}

function getItemsByCategory(category) {
  return grammarItems.filter((item) => item.category === category);
}

function buildDefaultStats() {
  return Object.fromEntries(
    grammarItems.map((item) => [
      item.id,
      { correct: 0, falsePositives: 0, falseNegatives: 0 },
    ]),
  );
}

function buildDefaultSession() {
  return {
    currentQuestion: null,
    lastResult: null,
    focusBoosts: {},
    answeredCount: 0,
    answerDraft: "",
    inputError: "",
  };
}

function buildDefaultState() {
  return {
    profileName: "",
    isProfileOpen: false,
    activeIds: grammarItems.map((item) => item.id),
    stats: buildDefaultStats(),
    view: "profile",
    session: buildDefaultSession(),
  };
}

function loadState() {
  const base = buildDefaultState();
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ||
      LEGACY_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    if (!raw) {
      return base;
    }

    const parsed = JSON.parse(raw);
    const profileName =
      typeof parsed.profileName === "string" ? parsed.profileName : "";
    const activeIds = Array.isArray(parsed.activeIds)
      ? parsed.activeIds.filter((id) => grammarItems.some((item) => item.id === id))
      : base.activeIds;
    const isProfileOpen = profileName
      ? typeof parsed.isProfileOpen === "boolean"
        ? parsed.isProfileOpen
        : true
      : false;
    const allowedViews = ["profile", "training", "session"];
    const parsedView = allowedViews.includes(parsed.view) ? parsed.view : "profile";
    const nextView = profileName && !isProfileOpen ? "session" : parsedView;

    return {
      ...base,
      profileName,
      isProfileOpen,
      activeIds: activeIds.length ? activeIds : [],
      stats: {
        ...base.stats,
        ...sanitizeStats(parsed.stats),
      },
      view: nextView,
      session: buildDefaultSession(),
    };
  } catch (error) {
    console.warn("Impossible de relire l'état sauvegardé.", error);
    return base;
  }
}

function sanitizeStats(candidate) {
  if (!candidate || typeof candidate !== "object") {
    return {};
  }

  const next = {};
  for (const item of grammarItems) {
    const stats = candidate[item.id];
    if (!stats || typeof stats !== "object") {
      continue;
    }
    next[item.id] = {
      correct: Number(stats.correct) || 0,
      falsePositives: Number(stats.falsePositives) || 0,
      falseNegatives: Number(stats.falseNegatives) || 0,
    };
  }
  return next;
}

function persistState() {
  const stored = {
    profileName: state.profileName,
    isProfileOpen: state.isProfileOpen,
    activeIds: state.activeIds,
    stats: state.stats,
    view: state.view,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

function hasStoredProfile() {
  return Boolean(state.profileName);
}

function hasOpenProfile() {
  return hasStoredProfile() && state.isProfileOpen;
}

function getResolvedView() {
  if (!hasStoredProfile()) {
    return "profile";
  }

  if (!hasOpenProfile()) {
    return "session";
  }

  return state.view;
}

function canAccessView(view) {
  if (view === "profile") {
    return hasOpenProfile() || !hasStoredProfile();
  }

  if (view === "training") {
    return hasOpenProfile();
  }

  if (view === "session") {
    return hasStoredProfile();
  }

  return false;
}

function getItem(itemId) {
  return grammarItems.find((item) => item.id === itemId);
}

function sumStats(field) {
  return grammarItems.reduce(
    (total, item) => total + (state.stats[item.id]?.[field] || 0),
    0,
  );
}

function getMastery(itemId) {
  const stats = state.stats[itemId];
  const total = stats.correct + stats.falsePositives + stats.falseNegatives;

  if (total === 0) {
    return 45;
  }

  return Math.round((stats.correct / total) * 100);
}

function getWeakness(itemId) {
  const stats = state.stats[itemId];
  const total = stats.correct + stats.falsePositives + stats.falseNegatives;
  const baseline = total === 0 ? 2.4 : 1 + (100 - getMastery(itemId)) / 25;
  const fnWeight = stats.falseNegatives * 0.45;
  const fpWeight = stats.falsePositives * 0.28;
  const focusBoost = state.session.focusBoosts[itemId] || 0;

  return baseline + fnWeight + fpWeight + focusBoost;
}

function getWeakestActiveItems(limit = 3) {
  return grammarItems
    .filter((item) => state.activeIds.includes(item.id))
    .sort((left, right) => {
      const delta = getWeakness(right.id) - getWeakness(left.id);
      if (delta !== 0) {
        return delta;
      }
      return getMastery(left.id) - getMastery(right.id);
    })
    .slice(0, limit);
}

function pickWeighted(candidates) {
  const totalWeight = candidates.reduce((sum, candidate) => sum + candidate.weight, 0);
  const threshold = Math.random() * totalWeight;

  let cursor = 0;
  for (const candidate of candidates) {
    cursor += candidate.weight;
    if (cursor >= threshold) {
      return candidate.value;
    }
  }

  return candidates[candidates.length - 1].value;
}

function buildQuestion(excludedExerciseId = null) {
  const activeExercises = exerciseBank.filter((exercise) =>
    state.activeIds.includes(exercise.correctId),
  );

  if (!activeExercises.length) {
    return null;
  }

  const filtered = activeExercises.filter(
    (exercise) => exercise.id !== excludedExerciseId,
  );
  const pool = filtered.length ? filtered : activeExercises;

  return pickWeighted(
    pool.map((exercise) => ({
      value: exercise,
      weight: getWeakness(exercise.correctId),
    })),
  );
}

function buildPreviewQueue(currentId) {
  const previews = [];
  let previousId = currentId;

  while (previews.length < 3) {
    const nextQuestion = buildQuestion(previousId);
    if (!nextQuestion) {
      break;
    }
    previews.push(nextQuestion);
    previousId = nextQuestion.id;
  }

  return previews;
}

function decayFocusBoosts() {
  for (const [itemId, boost] of Object.entries(state.session.focusBoosts)) {
    const nextBoost = Math.max(0, boost - 0.35);
    if (nextBoost === 0) {
      delete state.session.focusBoosts[itemId];
    } else {
      state.session.focusBoosts[itemId] = nextBoost;
    }
  }
}

function ensureQuestion() {
  if (!hasOpenProfile() || state.session.currentQuestion || !state.activeIds.length) {
    return;
  }
  state.session.currentQuestion = buildQuestion();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function switchView(view) {
  if (!canAccessView(view)) {
    return;
  }
  state.view = view;
  if (view === "training") {
    ensureQuestion();
  }
  persistState();
  render();
  scrollToTop();
}

function createProfile(profileName) {
  state = buildDefaultState();
  state.profileName = profileName.trim();
  state.isProfileOpen = true;
  state.view = "profile";
  persistState();
  render();
  scrollToTop();
}

function enterProfile() {
  if (!hasStoredProfile()) {
    return;
  }

  state.isProfileOpen = true;
  state.view = "profile";
  persistState();
  render();
  scrollToTop();
}

function exitProfile() {
  if (!hasOpenProfile()) {
    return;
  }

  state.isProfileOpen = false;
  state.view = "session";
  state.session = buildDefaultSession();
  persistState();
  render();
  scrollToTop();
}

function deleteProfile() {
  state = buildDefaultState();
  [STORAGE_KEY, ...LEGACY_STORAGE_KEYS].forEach((key) =>
    localStorage.removeItem(key),
  );
  render();
  scrollToTop();
}

function resetProfile() {
  state.stats = buildDefaultStats();
  state.activeIds = grammarItems.map((item) => item.id);
  state.session = buildDefaultSession();
  persistState();
  render();
  scrollToTop();
}

function toggleActive(itemId) {
  if (state.activeIds.includes(itemId)) {
    state.activeIds = state.activeIds.filter((activeId) => activeId !== itemId);
  } else {
    state.activeIds = [...state.activeIds, itemId];
  }

  if (
    state.session.currentQuestion &&
    !state.activeIds.includes(state.session.currentQuestion.correctId)
  ) {
    state.session.currentQuestion = null;
    state.session.lastResult = null;
    state.session.answerDraft = "";
    state.session.inputError = "";
  }

  persistState();
  render();
}

function resolveAnswerInput(rawValue, promptType) {
  const normalized = normalizeText(rawValue);
  if (!normalized) {
    return null;
  }

  const exactMatchId = answerLookup.get(normalized);
  if (exactMatchId) {
    return getItem(exactMatchId);
  }

  const sameCategoryMatches = grammarItems.filter(
    (item) =>
      item.category === promptType &&
      item.searchKeys.some((key) => key.startsWith(normalized)),
  );

  if (sameCategoryMatches.length === 1 && normalized.length >= 3) {
    return sameCategoryMatches[0];
  }

  return null;
}

function answerQuestionFromInput(rawValue) {
  const question = state.session.currentQuestion;
  if (!question || state.session.lastResult) {
    return;
  }

  const resolvedItem = resolveAnswerInput(rawValue, question.promptType);
  if (!resolvedItem) {
    state.session.answerDraft = rawValue;
    state.session.inputError =
      "Réponse non reconnue. Commence à taper puis choisis une autocomplétion proposée.";
    render();
    return;
  }

  answerQuestion(resolvedItem.id, rawValue);
}

function answerQuestion(selectedId, rawValue = "") {
  const question = state.session.currentQuestion;
  if (!question || state.session.lastResult) {
    return;
  }

  const correctId = question.correctId;
  const isCorrect = selectedId === correctId;

  if (isCorrect) {
    state.stats[correctId].correct += 1;
  } else {
    state.stats[correctId].falseNegatives += 1;
    state.stats[selectedId].falsePositives += 1;
    state.session.focusBoosts[correctId] =
      (state.session.focusBoosts[correctId] || 0) + 1.8;
    state.session.focusBoosts[selectedId] =
      (state.session.focusBoosts[selectedId] || 0) + 0.9;
  }

  state.session.answeredCount += 1;
  state.session.answerDraft = "";
  state.session.inputError = "";
  state.session.lastResult = {
    selectedId,
    isCorrect,
    rawValue: rawValue.trim(),
  };
  persistState();
  render();
}

function goToNextQuestion() {
  const currentId = state.session.currentQuestion?.id || null;
  decayFocusBoosts();
  state.session.currentQuestion = buildQuestion(currentId);
  state.session.lastResult = null;
  state.session.answerDraft = "";
  state.session.inputError = "";
  render();
}

function getAutocompleteSuggestions(promptType, query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return [];
  }

  return getItemsByCategory(promptType)
    .map((item) => {
      const labelScore = normalizeText(item.label).startsWith(normalizedQuery) ? 0 : 1;
      const aliasScore = item.searchKeys.some((key) => key.startsWith(normalizedQuery)) ? 0 : 1;
      const activityScore = state.activeIds.includes(item.id) ? 0 : 1;
      return {
        item,
        score: labelScore * 10 + aliasScore * 5 + activityScore,
      };
    })
    .filter(({ item }) =>
      item.searchKeys.some(
        (key) => key.includes(normalizedQuery) || normalizedQuery.includes(key),
      ),
    )
    .sort((left, right) => {
      if (left.score !== right.score) {
        return left.score - right.score;
      }
      return left.item.label.localeCompare(right.item.label, "fr");
    })
    .slice(0, 6)
    .map(({ item }) => item);
}

function getFunctionAutocompleteHelp() {
  return "Abréviations acceptées : COD, COI, CCT, CCL, CCM, CDN, PSR.";
}

function renderWelcomePanel() {
  if (hasStoredProfile()) {
    dom.welcomePanel.classList.remove("is-visible");
    dom.welcomePanel.innerHTML = "";
    return;
  }

  dom.welcomePanel.classList.add("is-visible");
  dom.welcomePanel.innerHTML = `
    <div class="welcome-grid">
      <div class="welcome-copy">
        <p class="eyebrow">Première ouverture</p>
        <h2>Crée un profil pour commencer à t'entraîner</h2>
        <p>
          L'application garde en mémoire les catégories actives, les bonnes
          réponses, les faux positifs et les faux négatifs. L'entraînement
          accentue ensuite les notions les plus fragiles.
        </p>
        <div class="chip-row">
          <span class="chip-button">${itemCounts.nature} natures</span>
          <span class="chip-button">${itemCounts.fonction} fonctions</span>
          <span class="chip-button">réponse libre avec autocomplétion</span>
        </div>
      </div>

      <form class="welcome-form" id="profile-form">
        <div>
          <label for="profile-name">Nom du profil</label>
          <input
            class="text-input"
            id="profile-name"
            name="profileName"
            type="text"
            maxlength="40"
            placeholder="Par exemple : Élève 1"
            required
          />
        </div>

        <button class="primary-button" type="submit">Créer mon profil</button>
        <p class="muted">
          Tu pourras activer ou désactiver les catégories à travailler, puis
          réinitialiser toute la progression plus tard.
        </p>
      </form>
    </div>
  `;

  const form = document.getElementById("profile-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const profileName = String(formData.get("profileName") || "").trim();
    if (!profileName) {
      return;
    }
    createProfile(profileName);
  });
}

function renderProfileView() {
  const weakestItems = getWeakestActiveItems(3);
  const priorityIds = new Set(weakestItems.map((item) => item.id));

  if (!hasOpenProfile()) {
    dom.profileView.classList.remove("is-visible");
    dom.profileView.innerHTML = "";
    return;
  }

  const totalCorrect = sumStats("correct");
  const totalMistakes = sumStats("falseNegatives");
  const totalFalsePositives = sumStats("falsePositives");

  dom.profileView.classList.toggle("is-visible", getResolvedView() === "profile");
  dom.profileView.innerHTML = `
    <div class="profile-grid">
      <div class="stack">
        <article class="panel">
          <div class="training-topline">
            <div>
              <p class="profile-name">Profil actif <strong>${escapeHtml(state.profileName)}</strong></p>
              <h2>Tableau de bord</h2>
            </div>
            <span class="pill">Progression locale</span>
          </div>
          <p class="panel-subtitle">
            Les statistiques sont enregistrées dans ce navigateur. Tu peux
            ajuster les catégories actives à tout moment avant de lancer un
            entraînement.
          </p>

          <div class="summary-grid">
            <div class="summary-card">
              <span class="metric-label">Catégories actives</span>
              <strong>${state.activeIds.length}</strong>
              <p>sur ${grammarItems.length} disponibles</p>
            </div>
            <div class="summary-card">
              <span class="metric-label">Bonnes réponses</span>
              <strong>${totalCorrect}</strong>
              <p>réponses validées</p>
            </div>
            <div class="summary-card">
              <span class="metric-label">Erreurs repérées</span>
              <strong>${totalMistakes + totalFalsePositives}</strong>
              <p>${totalMistakes} faux négatifs, ${totalFalsePositives} faux positifs</p>
            </div>
          </div>
        </article>

        <article class="panel">
          <div class="training-topline">
            <div>
              <p class="section-label">Priorités</p>
              <h3>Points faibles actifs</h3>
            </div>
            <button class="secondary-button" id="open-training" type="button" ${
              state.activeIds.length ? "" : "disabled"
            }>
              S'entraîner
            </button>
          </div>

          ${
            weakestItems.length
              ? `<div class="focus-grid">
                  ${weakestItems
                    .map((item) => {
                      const score = getMastery(item.id);
                      return `
                        <div class="focus-item">
                          <span class="pill ${item.category === "fonction" ? "function" : ""}">${item.category}</span>
                          <h3>${escapeHtml(item.label)}</h3>
                          <p class="weakness">Maîtrise estimée : ${score}%</p>
                        </div>
                      `;
                    })
                    .join("")}
                </div>`
              : `<div class="empty-state">
                  Active au moins une nature ou une fonction pour faire apparaître
                  des priorités d'entraînement.
                </div>`
          }
        </article>

        <article class="panel">
          <div class="training-topline">
            <div>
              <p class="section-label">Actions</p>
              <h3>Gestion du profil</h3>
            </div>
          </div>
          <div class="toolbar">
            <button class="secondary-button" id="reset-profile" type="button">
              Réinitialiser la progression
            </button>
          </div>
        </article>
      </div>

      <article class="panel">
        <div class="training-topline">
          <div>
            <p class="section-label">Natures et fonctions</p>
            <h2>Sélection des catégories actives</h2>
          </div>
          <span class="pill">Coche pour entraîner</span>
        </div>
        <p class="panel-subtitle">
          Chaque fiche affiche les faux positifs, les faux négatifs et un taux
          de maîtrise simple pour te donner une vue d'ensemble.
        </p>

        <div class="grammar-grid">
          ${grammarItems
            .map((item) => {
              const stats = state.stats[item.id];
              const mastery = getMastery(item.id);
              const checked = state.activeIds.includes(item.id);
              return `
                <article class="grammar-card ${priorityIds.has(item.id) ? "is-priority" : ""}">
                  <div class="grammar-card-header">
                    <div>
                      <span class="pill ${item.category === "fonction" ? "function" : ""}">
                        ${item.category}
                      </span>
                      <h3>${escapeHtml(item.label)}</h3>
                    </div>
                    <label class="toggle" aria-label="Activer ${escapeHtml(item.label)}">
                      <input type="checkbox" data-toggle-id="${item.id}" ${checked ? "checked" : ""} />
                      <span></span>
                    </label>
                  </div>

                  <div class="stats-grid">
                    <div class="stats-card">
                      <span class="metric-label">Bonnes réponses</span>
                      <strong>${stats.correct}</strong>
                    </div>
                    <div class="stats-card">
                      <span class="metric-label">Maîtrise</span>
                      <strong>${mastery}%</strong>
                    </div>
                    <div class="stats-card">
                      <span class="metric-label">Faux positifs</span>
                      <strong>${stats.falsePositives}</strong>
                    </div>
                    <div class="stats-card">
                      <span class="metric-label">Faux négatifs</span>
                      <strong>${stats.falseNegatives}</strong>
                    </div>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </article>
    </div>
  `;

  const openTrainingButton = document.getElementById("open-training");
  const resetProfileButton = document.getElementById("reset-profile");

  openTrainingButton?.addEventListener("click", () => switchView("training"));
  resetProfileButton?.addEventListener("click", () => resetProfile());

  dom.profileView.querySelectorAll("[data-toggle-id]").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const target = event.currentTarget;
      toggleActive(target.dataset.toggleId);
    });
  });
}

function renderTrainingView() {
  if (!hasOpenProfile()) {
    dom.trainingView.classList.remove("is-visible");
    dom.trainingView.innerHTML = "";
    return;
  }

  ensureQuestion();
  const question = state.session.currentQuestion;
  const result = state.session.lastResult;
  const weakestItems = getWeakestActiveItems(4);

  dom.trainingView.classList.toggle("is-visible", getResolvedView() === "training");

  if (!state.activeIds.length) {
    dom.trainingView.innerHTML = `
      <div class="panel empty-state">
        <h2>Aucune catégorie active</h2>
        <p>
          Retourne au profil pour cocher au moins une nature ou une fonction,
          puis relance l'entraînement.
        </p>
        <button class="primary-button" id="back-to-profile" type="button">
          Retour au profil
        </button>
      </div>
    `;

    document.getElementById("back-to-profile")?.addEventListener("click", () => {
      switchView("profile");
    });
    return;
  }

  const previewQueue = buildPreviewQueue(question?.id);
  const correctItem = question ? getItem(question.correctId) : null;
  const selectedItem = result ? getItem(result.selectedId) : null;

  dom.trainingView.innerHTML = `
    <div class="training-grid">
      <div class="stack">
        <article class="panel">
          <div class="training-topline">
            <div>
              <p class="section-label">Session</p>
              <h2>${escapeHtml(state.profileName)}</h2>
            </div>
            <button class="secondary-button" id="go-profile" type="button">
              Retour au profil
            </button>
          </div>

          <div class="summary-grid">
            <div class="summary-card">
              <span class="metric-label">Questions jouées</span>
              <strong>${state.session.answeredCount}</strong>
              <p>dans cette session</p>
            </div>
            <div class="summary-card">
              <span class="metric-label">Catégories actives</span>
              <strong>${state.activeIds.length}</strong>
              <p>sélectionnées actuellement</p>
            </div>
            <div class="summary-card">
              <span class="metric-label">Bonnes réponses</span>
              <strong>${sumStats("correct")}</strong>
              <p>cumul global du profil</p>
            </div>
          </div>
        </article>

        <article class="panel">
          <div class="training-topline">
            <div>
              <p class="section-label">Accent d'entraînement</p>
              <h3>Catégories à retravailler</h3>
            </div>
          </div>
          <div class="focus-grid">
            ${weakestItems
              .map(
                (item) => `
                  <div class="focus-item">
                    <span class="pill ${item.category === "fonction" ? "function" : ""}">
                      ${item.category}
                    </span>
                    <h3>${escapeHtml(item.label)}</h3>
                    <p class="weakness">Maîtrise : ${getMastery(item.id)}%</p>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>

        <article class="panel">
          <div class="training-topline">
            <div>
              <p class="section-label">Ensuite</p>
              <h3>Phrases à venir</h3>
            </div>
          </div>
          <div class="upcoming-list">
            ${previewQueue
              .map(
                (preview) => `
                  <div class="upcoming-item">
                    <div>
                      <strong>${promptLabels[preview.promptType]}</strong>
                      <small>${escapeHtml(preview.before)}${escapeHtml(preview.target)}${escapeHtml(preview.after)}</small>
                    </div>
                    <span class="pill ${preview.promptType === "fonction" ? "function" : ""}">
                      ${preview.promptType}
                    </span>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      </div>

      <article class="question-card">
        ${
          question
            ? `
              <div class="question-header">
                <div>
                  <p class="question-prompt">${promptLabels[question.promptType]}</p>
                  <h2>${question.promptType === "nature" ? "Écris la nature" : "Écris la fonction"}</h2>
                </div>
                <span class="question-pill">réponse libre</span>
              </div>

              <p class="sentence">
                ${escapeHtml(question.before)}<span class="target">${escapeHtml(question.target)}</span>${escapeHtml(question.after)}
              </p>

              <form class="answer-form" id="answer-form">
                <label class="metric-label" for="answer-input">
                  ${question.promptType === "nature" ? "Ta nature grammaticale" : "Ta fonction grammaticale"}
                </label>
                <div class="input-shell">
                  <input
                    class="answer-input"
                    id="answer-input"
                    type="text"
                    autocomplete="off"
                    spellcheck="false"
                    placeholder="${question.promptType === "nature" ? "Ex. adjectif, pronom..." : "Ex. COD, CCT, complément du nom..."}"
                    value="${escapeHtml(state.session.answerDraft)}"
                    ${result ? "disabled" : ""}
                  />
                  <div class="autocomplete-panel" id="autocomplete-panel"></div>
                </div>
                <p class="answer-help">
                  Commence à taper pour afficher des autocomplétions.
                  ${question.promptType === "fonction" ? getFunctionAutocompleteHelp() : ""}
                </p>
                <p class="answer-error" id="answer-input-error" ${state.session.inputError ? "" : "hidden"}>
                  ${escapeHtml(state.session.inputError)}
                </p>
                ${
                  result
                    ? ""
                    : `
                      <div class="answer-actions">
                        <button class="primary-button" type="submit">Valider</button>
                      </div>
                    `
                }
              </form>

              ${
                result
                  ? `
                    <div class="result-banner ${result.isCorrect ? "is-success" : "is-error"}">
                      <div>
                        <strong>${result.isCorrect ? "Bonne réponse." : "Ce n'était pas la bonne réponse."}</strong>
                        <p class="muted">
                          ${
                            result.isCorrect
                              ? `Réponse validée : ${escapeHtml(correctItem.label)}.`
                              : `Tu as répondu : ${escapeHtml(selectedItem.label)}. Réponse attendue : ${escapeHtml(correctItem.label)}.`
                          }
                        </p>
                        <p class="muted">${escapeHtml(question.explanation)}</p>
                      </div>
                      <button class="primary-button" id="next-question" type="button">
                        Phrase suivante
                      </button>
                    </div>
                  `
                  : ""
              }
            `
            : `
              <div class="empty-state">
                <h2>Pas de question disponible</h2>
                <p>
                  Vérifie que certaines catégories sont actives dans le profil.
                </p>
              </div>
            `
        }
      </article>
    </div>
  `;

  document.getElementById("go-profile")?.addEventListener("click", () => {
    switchView("profile");
  });

  if (question && !result) {
    initializeAutocomplete(question.promptType);
    document.getElementById("answer-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("answer-input");
      answerQuestionFromInput(input?.value || "");
    });
  }

  document.getElementById("next-question")?.addEventListener("click", () => {
    goToNextQuestion();
  });
}

function renderSessionView() {
  if (!hasStoredProfile()) {
    dom.sessionView.classList.remove("is-visible");
    dom.sessionView.innerHTML = "";
    return;
  }

  const resolvedView = getResolvedView();
  const totalCorrect = sumStats("correct");
  const totalMistakes = sumStats("falseNegatives");
  const totalFalsePositives = sumStats("falsePositives");

  dom.sessionView.classList.toggle("is-visible", resolvedView === "session");
  dom.sessionView.innerHTML = `
    <div class="session-grid">
      <div class="stack">
        <article class="panel">
          <div class="training-topline">
            <div>
              <p class="section-label">Session du profil</p>
              <h2>${escapeHtml(state.profileName)}</h2>
            </div>
            <span class="status-pill ${hasOpenProfile() ? "is-open" : "is-closed"}">
              ${hasOpenProfile() ? "Profil ouvert" : "Profil fermé"}
            </span>
          </div>
          <p class="panel-subtitle">
            ${hasOpenProfile()
              ? "Tu peux quitter ce profil sans perdre aucune statistique. Tu pourras le rouvrir plus tard."
              : "Ce profil est enregistré sur cet appareil mais il n'est pas ouvert pour l'instant."}
          </p>

          <div class="summary-grid">
            <div class="summary-card">
              <span class="metric-label">Catégories actives</span>
              <strong>${state.activeIds.length}</strong>
              <p>sur ${grammarItems.length} disponibles</p>
            </div>
            <div class="summary-card">
              <span class="metric-label">Bonnes réponses</span>
              <strong>${totalCorrect}</strong>
              <p>réponses validées</p>
            </div>
            <div class="summary-card">
              <span class="metric-label">Erreurs repérées</span>
              <strong>${totalMistakes + totalFalsePositives}</strong>
              <p>${totalMistakes} faux négatifs, ${totalFalsePositives} faux positifs</p>
            </div>
          </div>
        </article>

        <article class="panel">
          <div class="training-topline">
            <div>
              <p class="section-label">Accès</p>
              <h3>${hasOpenProfile() ? "Sortir du profil" : "Rentrer dans le profil"}</h3>
            </div>
          </div>

          <div class="session-actions">
            <div class="action-block">
              <strong>${hasOpenProfile() ? "Sortie sans suppression" : "Réouverture du profil"}</strong>
              <p class="muted">
                ${hasOpenProfile()
                  ? "La progression reste enregistrée localement. Tu fermes seulement la session actuelle."
                  : "Tu retrouves immédiatement le tableau de bord, les catégories actives et toute la progression enregistrée."}
              </p>
              <div class="toolbar">
                <button class="primary-button" id="${hasOpenProfile() ? "exit-profile" : "enter-profile"}" type="button">
                  ${hasOpenProfile() ? "Sortir du profil" : "Rentrer dans le profil"}
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <article class="panel danger-panel">
        <div class="training-topline">
          <div>
            <p class="section-label">Suppression</p>
            <h2>Supprimer ce profil</h2>
          </div>
          <span class="pill">Action locale</span>
        </div>
        <p class="panel-subtitle">
          Cette action efface le nom du profil, les statistiques, les catégories
          actives et l'historique enregistrés dans ce navigateur.
        </p>

        <div class="action-block">
          <strong>Effacement complet</strong>
          <p class="muted">
            Utilise cette option seulement si tu veux repartir de zéro et créer
            un nouveau profil.
          </p>
          <div class="toolbar">
            <button class="danger-button" id="delete-profile" type="button">
              Supprimer le profil
            </button>
          </div>
        </div>
      </article>
    </div>
  `;

  document.getElementById("enter-profile")?.addEventListener("click", () => {
    enterProfile();
  });

  document.getElementById("exit-profile")?.addEventListener("click", () => {
    exitProfile();
  });

  document.getElementById("delete-profile")?.addEventListener("click", () => {
    const confirmed = window.confirm(
      "Supprimer ce profil et toute sa progression locale ?",
    );
    if (confirmed) {
      deleteProfile();
    }
  });
}

function initializeAutocomplete(promptType) {
  const input = document.getElementById("answer-input");
  const panel = document.getElementById("autocomplete-panel");
  const error = document.getElementById("answer-input-error");

  if (!input || !panel) {
    return;
  }

  const renderSuggestions = () => {
    const suggestions = getAutocompleteSuggestions(promptType, input.value);

    if (!suggestions.length) {
      panel.innerHTML = "";
      return;
    }

    panel.innerHTML = suggestions
      .map(
        (item) => `
          <button
            class="autocomplete-chip"
            type="button"
            data-suggestion-label="${escapeHtml(item.label)}"
          >
            ${escapeHtml(item.label)}
          </button>
        `,
      )
      .join("");

    panel.querySelectorAll("[data-suggestion-label]").forEach((button) => {
      button.addEventListener("click", () => {
        input.value = button.dataset.suggestionLabel;
        if (error) {
          error.hidden = true;
          error.textContent = "";
        }
        input.focus();
        panel.innerHTML = "";
      });
    });
  };

  input.addEventListener("input", () => {
    if (error) {
      error.hidden = true;
      error.textContent = "";
    }
    renderSuggestions();
  });
  input.addEventListener("focus", renderSuggestions);

  requestAnimationFrame(() => {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    renderSuggestions();
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function bindNavigation() {
  dom.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = button.dataset.nav;
      if (!canAccessView(targetView)) {
        return;
      }
      switchView(targetView);
    });
  });
}

function renderNavigation() {
  const resolvedView = getResolvedView();
  dom.navButtons.forEach((button) => {
    const view = button.dataset.nav;
    const isActive = view === resolvedView;
    button.classList.toggle("is-active", isActive);
    button.disabled = !canAccessView(view);
  });
}

function render() {
  renderNavigation();
  renderWelcomePanel();
  renderProfileView();
  renderTrainingView();
  renderSessionView();
}

bindNavigation();
render();
