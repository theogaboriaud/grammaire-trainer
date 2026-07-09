const STORAGE_KEY = "atelier-grammaire-site-state-v1";
const LEGACY_STORAGE_KEYS = [
  "atelier-grammaire-state-v2",
  "atelier-grammaire-state-v3",
];

const promptLabels = {
  nature: "Nature ?",
  fonction: "Fonction ?",
};

const rawGrammarItems = [
  { id: "nature:nom", label: "nom", category: "nature", aliases: ["un nom"] },
  {
    id: "nature:groupe-nominal",
    label: "groupe nominal",
    category: "nature",
    aliases: ["gn", "groupe nominale"],
  },
  { id: "nature:verbe", label: "verbe", category: "nature", aliases: [] },
  { id: "nature:adjectif", label: "adjectif", category: "nature", aliases: [] },
  { id: "nature:adverbe", label: "adverbe", category: "nature", aliases: [] },
  { id: "nature:pronom", label: "pronom", category: "nature", aliases: [] },
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
    aliases: [
      "complément d'objet direct",
      "complement d'objet direct",
      "complement d objet direct",
    ],
  },
  {
    id: "fonction:coi",
    label: "COI",
    category: "fonction",
    aliases: [
      "complément d'objet indirect",
      "complement d'objet indirect",
      "complement d objet indirect",
    ],
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
    aliases: ["adjectif epithete", "epithete", "épithète"],
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

const exerciseBank = [
  makeExercise("n1", "nature", "nature:nom", "Le ", "chat", " observe la pluie depuis la fenêtre.", "\"chat\" désigne un être : c'est un nom."),
  makeExercise("n2", "nature", "nature:groupe-nominal", "", "Le vieux chêne", " résiste encore au vent.", "L'expression entière forme un groupe nominal."),
  makeExercise("n3", "nature", "nature:verbe", "Les enfants ", "courent", " vers la cour.", "\"courent\" exprime l'action : c'est un verbe."),
  makeExercise("n4", "nature", "nature:adjectif", "Une écharpe ", "rouge", " sèche près du radiateur.", "\"rouge\" précise le nom \"écharpe\" : c'est un adjectif."),
  makeExercise("n5", "nature", "nature:adverbe", "Il répond ", "doucement", " pour ne pas réveiller le bébé.", "\"doucement\" précise la manière : c'est un adverbe."),
  makeExercise("n6", "nature", "nature:pronom", "", "Elle", " connaît déjà la réponse.", "\"Elle\" remplace un groupe nominal : c'est un pronom."),
  makeExercise("n7", "nature", "nature:determinant", "", "Ces", " fleurs parfument toute la pièce.", "\"Ces\" accompagne le nom \"fleurs\" : c'est un déterminant."),
  makeExercise("n8", "nature", "nature:conjonction-coordination", "Maya voulait sortir, ", "mais", " la pluie a commencé.", "\"mais\" relie deux éléments : c'est une conjonction de coordination."),
  makeExercise("n9", "nature", "nature:nom", "Cette ", "maison", " domine toute la vallée.", "\"maison\" nomme une chose : c'est un nom."),
  makeExercise("n10", "nature", "nature:adverbe", "Le train est ", "déjà", " parti.", "\"déjà\" modifie le sens du verbe : c'est un adverbe."),
  makeExercise("n11", "nature", "nature:pronom", "Je ne ", "le", " retrouve plus.", "\"le\" remplace ici un groupe nominal : c'est un pronom."),
  makeExercise("n12", "nature", "nature:determinant", "", "Chaque", " élève relit sa copie.", "\"Chaque\" introduit le nom \"élève\" : c'est un déterminant."),
  makeExercise("n13", "nature", "nature:verbe", "Vous ", "écoutez", " la consigne avec attention.", "\"écoutez\" est le verbe de la phrase."),
  makeExercise("n14", "nature", "nature:adjectif", "Un ciel ", "sombre", " annonçait l'orage.", "\"sombre\" qualifie le nom \"ciel\" : c'est un adjectif."),
  makeExercise("n15", "nature", "nature:groupe-nominal", "", "Une lampe ancienne", " éclaire le salon.", "L'ensemble souligné constitue un groupe nominal."),
  makeExercise("n16", "nature", "nature:conjonction-coordination", "Tu peux choisir du thé ", "ou", " du chocolat.", "\"ou\" coordonne deux choix : c'est une conjonction de coordination."),
  makeExercise("f1", "fonction", "fonction:proposition", "", "Que tu viennes demain", " me rassure.", "L'ensemble souligné forme une proposition."),
  makeExercise("f2", "fonction", "fonction:cod", "Lina mange ", "une pomme", " à la récréation.", "\"une pomme\" reçoit directement l'action du verbe : c'est un COD."),
  makeExercise("f3", "fonction", "fonction:coi", "Je parle ", "à mon voisin", " chaque matin.", "\"à mon voisin\" complète le verbe avec une préposition : c'est un COI."),
  makeExercise("f4", "fonction", "fonction:sujet", "", "Le professeur", " explique la consigne.", "\"Le professeur\" fait l'action : c'est le sujet."),
  makeExercise("f5", "fonction", "fonction:verbe-conjugue", "Nous ", "chantons", " ce refrain ensemble.", "\"chantons\" est le verbe conjugué de la phrase."),
  makeExercise("f6", "fonction", "fonction:attribut-sujet", "Sami semble ", "fatigué", " après la course.", "\"fatigué\" donne une propriété au sujet grâce à un verbe d'état."),
  makeExercise("f7", "fonction", "fonction:adjectif-epithete", "J'admire la maison ", "blanche", " au bout de la rue.", "\"blanche\" est directement rattaché au nom : c'est un adjectif épithète."),
  makeExercise("f8", "fonction", "fonction:complement-verbe", "Il veut ", "partir tôt", " pour éviter les embouteillages.", "\"partir tôt\" complète le verbe \"veut\" : c'est un complément du verbe."),
  makeExercise("f9", "fonction", "fonction:cod", "Nous relisons ", "la dictée", " avant de rendre la copie.", "\"la dictée\" complète directement le verbe : c'est un COD."),
  makeExercise("f10", "fonction", "fonction:sujet", "", "Mes amis", " préparent le spectacle.", "\"Mes amis\" est le sujet du verbe \"préparent\"."),
  makeExercise("f11", "fonction", "fonction:proposition", "", "Qu'il ait réussi", " nous réjouit beaucoup.", "L'ensemble souligné constitue une proposition."),
  makeExercise("f12", "fonction", "fonction:coi", "Tu répondras ", "à la directrice", " demain matin.", "\"à la directrice\" complète le verbe par une préposition : c'est un COI."),
  makeExercise("f13", "fonction", "fonction:verbe-conjugue", "Le vent ", "soufflait", " toute la nuit.", "\"soufflait\" est le verbe conjugué de la phrase."),
  makeExercise("f14", "fonction", "fonction:attribut-sujet", "Cette soupe devient ", "délicieuse", " avec un peu de thym.", "\"délicieuse\" attribue une qualité au sujet."),
  makeExercise("f15", "fonction", "fonction:adjectif-epithete", "Nous traversons une forêt ", "dense", " et silencieuse.", "\"dense\" précise directement le nom \"forêt\" : c'est un adjectif épithète."),
  makeExercise("f16", "fonction", "fonction:complement-verbe", "Les enfants aiment ", "jouer dehors", " après l'école.", "\"jouer dehors\" complète le verbe \"aiment\"."),
  makeExercise("f17", "fonction", "fonction:cc-temps", "Nous partirons ", "demain matin", " si le ciel est clair.", "\"demain matin\" situe l'action dans le temps : c'est un complément circonstanciel de temps."),
  makeExercise("f18", "fonction", "fonction:cc-temps", "Ils révisent ", "chaque soir", " avant le dîner.", "\"chaque soir\" indique quand a lieu l'action."),
  makeExercise("f19", "fonction", "fonction:cc-temps", "Le concert commencera ", "à huit heures", ".", "\"à huit heures\" précise le moment de l'action."),
  makeExercise("f20", "fonction", "fonction:cc-lieu", "Les touristes avancent ", "dans la vieille ville", " sans se presser.", "\"dans la vieille ville\" indique où se déroule l'action."),
  makeExercise("f21", "fonction", "fonction:cc-lieu", "Le chien dort ", "près du feu", " depuis une heure.", "\"près du feu\" indique le lieu."),
  makeExercise("f22", "fonction", "fonction:cc-lieu", "Nous avons pique-niqué ", "au bord du lac", " hier.", "\"au bord du lac\" précise le lieu."),
  makeExercise("f23", "fonction", "fonction:cc-maniere", "Elle referme la porte ", "avec précaution", " pour ne pas faire de bruit.", "\"avec précaution\" indique la manière."),
  makeExercise("f24", "fonction", "fonction:cc-maniere", "Le coureur termine la course ", "sans faiblir", ".", "\"sans faiblir\" précise la manière dont l'action se réalise."),
  makeExercise("f25", "fonction", "fonction:cc-maniere", "Les élèves écoutent ", "en silence", " la lecture.", "\"en silence\" indique la manière."),
  makeExercise("f26", "fonction", "fonction:complement-nom", "J'ai feuilleté un livre ", "de contes africains", " toute l'après-midi.", "\"de contes africains\" complète le nom \"livre\"."),
  makeExercise("f27", "fonction", "fonction:complement-nom", "La maison ", "au toit rouge", " domine le village.", "\"au toit rouge\" complète le nom \"maison\"."),
  makeExercise("f28", "fonction", "fonction:complement-nom", "Un collier ", "en argent", " brillait sous la vitrine.", "\"en argent\" complète le nom \"collier\"."),
  makeExercise("f29", "fonction", "fonction:proposition-subordonnee-relative", "Le roman ", "que tu m'as prêté", " me passionne.", "\"que tu m'as prêté\" complète le nom \"roman\" : c'est une proposition subordonnée relative."),
  makeExercise("f30", "fonction", "fonction:proposition-subordonnee-relative", "La ville ", "où je suis né", " attire encore ma famille.", "\"où je suis né\" est une proposition subordonnée relative."),
  makeExercise("f31", "fonction", "fonction:proposition-subordonnee-relative", "Les enfants ", "qui jouent dans la cour", " attendent la cloche.", "\"qui jouent dans la cour\" complète le nom \"enfants\"."),
  makeExercise("f32", "fonction", "fonction:cod", "Le jardinier taille ", "les rosiers", " avec soin.", "\"les rosiers\" est le COD du verbe \"taille\"."),
  makeExercise("f33", "fonction", "fonction:coi", "Elle pense souvent ", "à ses grands-parents", ".", "\"à ses grands-parents\" est un COI."),
  makeExercise("f34", "fonction", "fonction:sujet", "", "La mer agitée", " impressionne les visiteurs.", "\"La mer agitée\" accomplit l'action : c'est le sujet."),
  makeExercise("f35", "fonction", "fonction:proposition", "", "Que vous soyez ici", " change tout.", "L'ensemble souligné est une proposition."),
];

const appRoot = document.getElementById("training-app");
const answerLookup = new Map();
let autoAdvanceHandle = null;

for (const item of grammarItems) {
  for (const key of item.searchKeys) {
    answerLookup.set(`${item.category}:${key}`, item.id);
  }
}

const configuredActiveIds = getConfiguredActiveIds();
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getConfiguredActiveIds() {
  const fallbackIds = grammarItems
    .map((item) => item.id)
    .filter((id) => id !== "fonction:proposition-subordonnee-relative");
  const candidate = window.grammarTrainerConfig?.activeIds;

  if (!Array.isArray(candidate)) {
    return fallbackIds;
  }

  const sanitized = candidate.filter((id) =>
    grammarItems.some((item) => item.id === id),
  );

  return sanitized.length ? sanitized : fallbackIds;
}

function buildDefaultStats() {
  return Object.fromEntries(
    grammarItems.map((item) => [
      item.id,
      { correct: 0, falsePositives: 0, falseNegatives: 0 },
    ]),
  );
}

function buildDefaultState() {
  return {
    stats: buildDefaultStats(),
    currentQuestion: null,
    lastResult: null,
    answerDraft: "",
    inputError: "",
    answeredCount: 0,
    focusBoosts: {},
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
    return {
      ...base,
      stats: {
        ...base.stats,
        ...sanitizeStats(parsed.stats),
      },
    };
  } catch (error) {
    console.warn("Impossible de relire les scores locaux.", error);
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
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      stats: state.stats,
    }),
  );
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

function getItem(itemId) {
  return grammarItems.find((item) => item.id === itemId);
}

function getActiveItemsByCategory(category) {
  return grammarItems.filter(
    (item) => item.category === category && configuredActiveIds.includes(item.id),
  );
}

function getActiveExercises() {
  return exerciseBank.filter((exercise) =>
    configuredActiveIds.includes(exercise.correctId),
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
  const focusBoost = state.focusBoosts[itemId] || 0;

  return baseline + fnWeight + fpWeight + focusBoost;
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
  const activeExercises = getActiveExercises();
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

function ensureQuestion() {
  if (state.currentQuestion || !getActiveExercises().length) {
    return;
  }

  state.currentQuestion = buildQuestion();
}

function decayFocusBoosts() {
  for (const [itemId, boost] of Object.entries(state.focusBoosts)) {
    const nextBoost = Math.max(0, boost - 0.35);
    if (nextBoost === 0) {
      delete state.focusBoosts[itemId];
    } else {
      state.focusBoosts[itemId] = nextBoost;
    }
  }
}

function clearAutoAdvance() {
  if (autoAdvanceHandle) {
    window.clearTimeout(autoAdvanceHandle);
    autoAdvanceHandle = null;
  }
}

function scheduleNextQuestion() {
  clearAutoAdvance();
  autoAdvanceHandle = window.setTimeout(() => {
    goToNextQuestion();
  }, 2200);
}

function resolveAnswerInput(rawValue, promptType) {
  const normalized = normalizeText(rawValue);
  if (!normalized) {
    return null;
  }

  const activeItems = getActiveItemsByCategory(promptType);
  const exactMatch = activeItems.find((item) =>
    item.searchKeys.includes(normalized),
  );

  if (exactMatch) {
    return exactMatch;
  }

  const lookupId = answerLookup.get(`${promptType}:${normalized}`);
  if (lookupId && configuredActiveIds.includes(lookupId)) {
    return getItem(lookupId);
  }

  const prefixMatches = activeItems.filter((item) =>
    item.searchKeys.some((key) => key.startsWith(normalized)),
  );

  if (prefixMatches.length === 1 && normalized.length >= 3) {
    return prefixMatches[0];
  }

  return null;
}

function getAutocompleteSuggestions(promptType, query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return [];
  }

  return getActiveItemsByCategory(promptType)
    .map((item) => {
      const labelScore = normalizeText(item.label).startsWith(normalizedQuery) ? 0 : 1;
      const aliasScore = item.searchKeys.some((key) => key.startsWith(normalizedQuery)) ? 0 : 1;
      return {
        item,
        score: labelScore * 10 + aliasScore * 5,
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

function answerQuestionFromInput(rawValue) {
  const question = state.currentQuestion;
  if (!question || state.lastResult) {
    return;
  }

  const resolvedItem = resolveAnswerInput(rawValue, question.promptType);
  if (!resolvedItem) {
    state.answerDraft = rawValue;
    state.inputError =
      "Réponse non reconnue. Commence à taper puis choisis une suggestion.";
    render();
    return;
  }

  answerQuestion(resolvedItem.id, rawValue);
}

function answerQuestion(selectedId, rawValue = "") {
  const question = state.currentQuestion;
  if (!question || state.lastResult) {
    return;
  }

  clearAutoAdvance();

  const correctId = question.correctId;
  const isCorrect = selectedId === correctId;

  if (isCorrect) {
    state.stats[correctId].correct += 1;
  } else {
    state.stats[correctId].falseNegatives += 1;
    state.stats[selectedId].falsePositives += 1;
    state.focusBoosts[correctId] = (state.focusBoosts[correctId] || 0) + 1.8;
    state.focusBoosts[selectedId] = (state.focusBoosts[selectedId] || 0) + 0.9;
  }

  state.answeredCount += 1;
  state.answerDraft = "";
  state.inputError = "";
  state.lastResult = {
    isCorrect,
    selectedId,
    rawValue: rawValue.trim(),
  };
  persistState();
  render();
  scheduleNextQuestion();
}

function goToNextQuestion() {
  clearAutoAdvance();
  const currentId = state.currentQuestion?.id || null;
  decayFocusBoosts();
  state.currentQuestion = buildQuestion(currentId);
  state.lastResult = null;
  state.answerDraft = "";
  state.inputError = "";
  render();
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

function renderEmptyState() {
  appRoot.innerHTML = `
    <section class="training-card empty-state">
      <p class="eyebrow">Configuration</p>
      <h2>Aucune notion active</h2>
      <p class="support-copy">
        Vérifie le fichier <code>config.js</code> et ajoute au moins une notion
        grammaticale active pour entraîner le site.
      </p>
    </section>
  `;
}

function render() {
  ensureQuestion();

  if (!getActiveExercises().length || !state.currentQuestion) {
    renderEmptyState();
    return;
  }

  const question = state.currentQuestion;
  const result = state.lastResult;
  const correctItem = getItem(question.correctId);
  const selectedItem = result ? getItem(result.selectedId) : null;
  const activeCount = configuredActiveIds.length;

  appRoot.innerHTML = `
    <section class="training-card">
      <div class="card-topline">
        <div>
          <p class="eyebrow">Entraînement local</p>
          <h2>${promptLabels[question.promptType]}</h2>
        </div>
        <span class="status-pill">${activeCount} notions actives</span>
      </div>

      <p class="sentence">
        ${escapeHtml(question.before)}<span class="target">${escapeHtml(question.target)}</span>${escapeHtml(question.after)}
      </p>

      <form class="answer-form" id="answer-form">
        <label class="metric-label" for="answer-input">
          ${question.promptType === "nature" ? "Écris la nature grammaticale" : "Écris la fonction grammaticale"}
        </label>

        <div class="input-shell">
          <input
            class="answer-input"
            id="answer-input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="${question.promptType === "nature" ? "Ex. adjectif, pronom..." : "Ex. COD, complément du nom, CCT..."}"
            value="${escapeHtml(state.answerDraft)}"
            ${result ? "disabled" : ""}
          />
          <div class="autocomplete-panel" id="autocomplete-panel"></div>
        </div>

        <p class="answer-help">
          Les scores restent sur ce navigateur uniquement et servent à choisir
          les prochaines questions.
        </p>

        <p class="answer-error" id="answer-input-error" ${state.inputError ? "" : "hidden"}>
          ${escapeHtml(state.inputError)}
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
                <strong>${result.isCorrect ? "Vrai" : "Faux"}</strong>
                <p class="muted">
                  ${
                    result.isCorrect
                      ? `Réponse validée : ${escapeHtml(correctItem.label)}.`
                      : `Tu as répondu : ${escapeHtml(selectedItem.label)}. Réponse attendue : ${escapeHtml(correctItem.label)}.`
                  }
                </p>
                <p class="muted">${escapeHtml(question.explanation)}</p>
              </div>
              <button class="secondary-button" id="next-question" type="button">
                Question suivante
              </button>
            </div>
          `
          : ""
      }
    </section>
  `;

  if (!result) {
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

render();
