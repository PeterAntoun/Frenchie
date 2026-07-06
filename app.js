const STORAGE_KEY = "frenchie-naturalisation-v1";
const OVERRIDE_KEY = "frenchie-naturalisation-answers-v1";
const EXAM_KEY = "frenchie-naturalisation-exams-v1";

// Format officiel de l'examen civique (arrêté du 10 octobre 2025).
const EXAM_FORMAT = {
  total: 40,
  durationMs: 45 * 60 * 1000,
  passCount: 32
};

const deck = parseDeck(RAW_DECK);
let state = loadState();
let overrides = loadOverrides();
let examHistory = loadExamHistory();
let filtered = [];
let currentIndex = 0;
let answered = false;
let exam = null;

const els = {};
[
  "categorySelect", "modeSelect", "dueOnly",
  "xpStat", "streakStat", "masteredStat", "accuracyStat",
  "deckCount", "masteryMeter", "topicLabel", "questionCounter",
  "levelPill", "duePill", "cardProgress", "questionText", "emptyDeck",
  "flashMode", "mcqMode", "writeMode", "revealBtn", "answerPanel", "answerText",
  "choices", "mcqFeedback", "writeAnswer", "checkWriteBtn", "skipWriteBtn",
  "writeFeedback", "writeExpected", "answerEditor", "saveAnswerBtn",
  "questionList", "listSummary", "shuffleBtn", "resetBtn", "exportBtn",
  "trainArea", "examArea", "startExamBtn", "examHistory",
  "examCounter", "examAnsweredPill", "examTimer", "quitExamBtn",
  "examCard", "examProgress", "examCategory", "examQuestion", "examChoices",
  "examPrevBtn", "examNextBtn", "examSubmitBtn", "examHint",
  "examResults", "resultBanner", "resultScore", "resultVerdict",
  "resultThemes", "resultMistakes", "mistakesTitle", "retryExamBtn", "backToTrainingBtn"
].forEach((id) => {
  els[id] = document.getElementById(id);
});

function parseDeck(raw) {
  const lines = raw.trim().split("\n").map((line) => line.trim()).filter(Boolean);
  const cards = [];
  let category = "";

  lines.forEach((line) => {
    if (line.endsWith(":") && !line.includes("|")) {
      category = line.slice(0, -1).trim();
      return;
    }

    const [question, answer = "Réponse à compléter."] = line.split("|");
    cards.push({
      id: slug(`${category}-${question}`),
      category,
      question,
      answer
    });
  });

  return cards;
}

function slug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function loadState() {
  const saved = readJSON(STORAGE_KEY, {});
  return {
    xp: saved.xp || 0,
    streak: saved.streak || 0,
    total: saved.total || 0,
    correct: saved.correct || 0,
    cards: saved.cards || {}
  };
}

function loadOverrides() {
  return readJSON(OVERRIDE_KEY, {});
}

function loadExamHistory() {
  const saved = readJSON(EXAM_KEY, []);
  return Array.isArray(saved) ? saved : [];
}

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function saveOverrides() {
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(overrides));
}

function saveExamHistory() {
  localStorage.setItem(EXAM_KEY, JSON.stringify(examHistory));
}

function getCardStats(id) {
  if (!state.cards[id]) {
    state.cards[id] = { score: 0, seen: 0, correct: 0, due: 0 };
  }
  return state.cards[id];
}

function answerFor(card) {
  return overrides[card.id] || card.answer;
}

function isDue(card) {
  const stats = getCardStats(card.id);
  return stats.seen > 0 && stats.due <= Date.now();
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function setup() {
  const categories = ["Tous les thèmes", ...new Set(deck.map((card) => card.category))];
  els.categorySelect.innerHTML = categories.map((category) => `<option>${category}</option>`).join("");

  els.categorySelect.addEventListener("change", () => {
    currentIndex = 0;
    applyFilters();
  });
  els.dueOnly.addEventListener("change", () => {
    currentIndex = 0;
    applyFilters();
  });
  els.modeSelect.addEventListener("change", renderCard);
  els.revealBtn.addEventListener("click", revealAnswer);
  document.querySelectorAll("[data-rating]").forEach((button) => {
    button.addEventListener("click", () => rateCurrent(button.dataset.rating));
  });
  els.checkWriteBtn.addEventListener("click", checkWrittenAnswer);
  els.skipWriteBtn.addEventListener("click", () => {
    const card = currentCard();
    if (!card) return;
    els.writeExpected.textContent = `Réponse attendue : ${answerFor(card)}`;
    els.writeFeedback.hidden = false;
  });
  els.saveAnswerBtn.addEventListener("click", saveEditedAnswer);
  els.shuffleBtn.addEventListener("click", shuffleFiltered);
  els.resetBtn.addEventListener("click", resetProgress);
  els.exportBtn.addEventListener("click", exportDeck);

  els.startExamBtn.addEventListener("click", startExam);
  els.quitExamBtn.addEventListener("click", quitExam);
  els.examPrevBtn.addEventListener("click", () => moveExam(-1));
  els.examNextBtn.addEventListener("click", () => moveExam(1));
  els.examSubmitBtn.addEventListener("click", () => finishExam(false));
  els.retryExamBtn.addEventListener("click", startExam);
  els.backToTrainingBtn.addEventListener("click", closeExam);

  document.addEventListener("keydown", handleKeys);

  applyFilters();
  renderExamHistory();
}

function applyFilters() {
  const category = els.categorySelect.value || "Tous les thèmes";
  filtered = deck.filter((card) => category === "Tous les thèmes" || card.category === category);
  if (els.dueOnly.checked) {
    filtered = filtered.filter(isDue);
  }
  filtered.sort((a, b) => {
    const aStats = getCardStats(a.id);
    const bStats = getCardStats(b.id);
    return aStats.score - bStats.score || a.question.localeCompare(b.question, "fr");
  });
  if (currentIndex >= filtered.length) currentIndex = 0;
  renderCard();
  renderList();
  renderStats();
}

function currentCard() {
  return filtered[currentIndex];
}

function renderCard() {
  const card = currentCard();
  const empty = !card;
  answered = false;
  const mode = els.modeSelect.value;

  els.emptyDeck.hidden = !empty;
  els.flashMode.hidden = empty || mode !== "flash";
  els.mcqMode.hidden = empty || mode !== "mcq";
  els.writeMode.hidden = empty || mode !== "write";
  els.answerPanel.hidden = true;
  els.writeFeedback.hidden = true;
  els.writeAnswer.value = "";
  els.mcqFeedback.textContent = "";

  if (empty) {
    els.topicLabel.textContent = "";
    els.questionCounter.textContent = "Aucune carte";
    els.questionText.textContent = "";
    els.answerEditor.value = "";
    els.cardProgress.style.width = "0%";
    renderStats();
    renderList();
    return;
  }

  els.topicLabel.textContent = card.category;
  els.questionCounter.textContent = `Question ${currentIndex + 1} / ${filtered.length}`;
  els.questionText.textContent = card.question;
  els.answerText.textContent = answerFor(card);
  els.answerEditor.value = answerFor(card);
  els.cardProgress.style.width = `${((currentIndex + 1) / filtered.length) * 100}%`;

  if (mode === "mcq") {
    renderChoices(card);
  }

  renderStats();
  renderList();
}

// Les deux premiers mots de la question ("qui etait", "en quelle", …) donnent son type :
// des distracteurs du même type produisent des QCM plausibles.
function questionKey(question) {
  return normalize(question).split(" ").slice(0, 2).join(" ");
}

function buildChoices(card) {
  const correct = answerFor(card);
  const seen = new Set([normalize(correct)]);
  const type = questionKey(card.question);
  const others = deck.filter((item) => item.id !== card.id);
  const sameType = shuffle(others.filter((item) => item.category === card.category && questionKey(item.question) === type));
  const sameCategory = shuffle(others.filter((item) => item.category === card.category && questionKey(item.question) !== type));
  const rest = shuffle(others.filter((item) => item.category !== card.category));
  const distractors = [];

  for (const item of [...sameType, ...sameCategory, ...rest]) {
    const answer = answerFor(item);
    const key = normalize(answer);
    if (seen.has(key)) continue;
    seen.add(key);
    distractors.push(answer);
    if (distractors.length === 3) break;
  }

  return shuffle([correct, ...distractors]);
}

function renderChoices(card) {
  const correct = answerFor(card);
  els.choices.innerHTML = "";
  buildChoices(card).forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => chooseAnswer(button, choice === correct));
    els.choices.appendChild(button);
  });
}

function chooseAnswer(button, isCorrect) {
  if (answered) return;
  answered = true;
  const correct = answerFor(currentCard());
  [...els.choices.children].forEach((choice) => {
    choice.disabled = true;
    if (choice.textContent === correct) choice.classList.add("correct");
  });
  if (!isCorrect) button.classList.add("wrong");
  els.mcqFeedback.textContent = isCorrect ? "Correct. +10 XP" : `Réponse attendue : ${correct}`;
  rateCurrent(isCorrect ? "good" : "again", false);
  setTimeout(nextCard, isCorrect ? 650 : 1700);
}

function revealAnswer() {
  if (!currentCard()) return;
  els.answerPanel.hidden = false;
}

function checkWrittenAnswer() {
  const card = currentCard();
  if (!card) return;
  const expected = answerFor(card);
  const typed = normalize(els.writeAnswer.value);
  const target = normalize(expected);
  const isClose = typed.length > 2 && (target.includes(typed) || typed.includes(target.slice(0, Math.min(18, target.length))));
  els.writeExpected.textContent = `Réponse attendue : ${expected}`;
  els.writeFeedback.hidden = false;
  if (isClose && !answered) {
    answered = true;
    rateCurrent("good", false);
  }
}

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function rateCurrent(rating, autoAdvance = true) {
  const card = currentCard();
  if (!card) return;
  if (answered && autoAdvance) return;
  answered = true;

  const stats = getCardStats(card.id);
  const points = { again: 0, hard: 4, good: 10 }[rating];
  const scoreDelta = { again: -1, hard: 1, good: 2 }[rating];
  const correct = rating !== "again";

  applyReview(stats, correct, scoreDelta);
  state.xp += points;
  state.total += 1;
  state.correct += correct ? 1 : 0;
  state.streak = correct ? state.streak + 1 : 0;
  saveState();
  renderStats();
  renderList();

  if (autoAdvance) {
    setTimeout(nextCard, 350);
  }
}

// Intervalles de répétition espacée (heures) indexés par score 0-5.
const REVIEW_INTERVALS = [0, 2, 12, 24, 72, 168];

function applyReview(stats, correct, scoreDelta) {
  stats.seen += 1;
  stats.correct += correct ? 1 : 0;
  stats.score = Math.max(0, Math.min(5, stats.score + scoreDelta));
  stats.due = Date.now() + REVIEW_INTERVALS[stats.score] * 60 * 60 * 1000;
}

function nextCard() {
  if (!filtered.length) return;
  currentIndex = (currentIndex + 1) % filtered.length;
  renderCard();
}

function prevCard() {
  if (!filtered.length) return;
  currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
  renderCard();
}

function renderStats() {
  const mastered = deck.filter((card) => getCardStats(card.id).score >= 5).length;
  const due = deck.filter(isDue).length;
  const accuracy = state.total ? Math.round((state.correct / state.total) * 100) : 0;
  const level = Math.floor(state.xp / 150) + 1;
  const filteredMastered = filtered.filter((card) => getCardStats(card.id).score >= 5).length;

  els.xpStat.textContent = state.xp;
  els.streakStat.textContent = state.streak;
  els.masteredStat.textContent = mastered;
  els.accuracyStat.textContent = `${accuracy}%`;
  els.deckCount.textContent = `${filtered.length} questions`;
  els.masteryMeter.style.width = `${filtered.length ? (filteredMastered / filtered.length) * 100 : 0}%`;
  els.levelPill.textContent = `Niveau ${level}`;
  els.duePill.textContent = `À revoir ${due}`;
}

function renderList() {
  els.listSummary.textContent = filtered.length ? `${currentIndex + 1}/${filtered.length}` : "0/0";
  els.questionList.innerHTML = "";
  filtered.forEach((card, index) => {
    const stats = getCardStats(card.id);
    const item = document.createElement("button");
    item.type = "button";
    item.className = `list-item${index === currentIndex ? " active" : ""}`;
    item.innerHTML = `<span class="score-dot">${stats.score}</span><strong></strong><span>${stats.seen}x</span>`;
    item.querySelector("strong").textContent = card.question;
    item.addEventListener("click", () => {
      currentIndex = index;
      renderCard();
    });
    els.questionList.appendChild(item);
  });
}

function saveEditedAnswer() {
  const card = currentCard();
  if (!card) return;
  overrides[card.id] = els.answerEditor.value.trim() || card.answer;
  saveOverrides();
  renderCard();
}

function shuffleFiltered() {
  filtered = shuffle(filtered);
  currentIndex = 0;
  renderCard();
}

function resetProgress() {
  const confirmed = confirm("Réinitialiser XP, série, progression et historique d'examens ?");
  if (!confirmed) return;
  state = { xp: 0, streak: 0, total: 0, correct: 0, cards: {} };
  examHistory = [];
  saveState();
  saveExamHistory();
  renderExamHistory();
  applyFilters();
}

function exportDeck() {
  const payload = {
    exportedAt: new Date().toISOString(),
    exams: examHistory,
    cards: deck.map((card) => ({
      category: card.category,
      question: card.question,
      answer: answerFor(card),
      progress: getCardStats(card.id)
    }))
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "frenchie-naturalisation-progress.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

/* ------------------------- Examen blanc ------------------------- */

function startExam() {
  exam = {
    questions: shuffle(deck).slice(0, EXAM_FORMAT.total).map((card) => ({
      card,
      choices: buildChoices(card),
      picked: null
    })),
    index: 0,
    deadline: Date.now() + EXAM_FORMAT.durationMs,
    finished: false,
    timerId: setInterval(tickExamTimer, 500)
  };

  els.trainArea.hidden = true;
  els.examArea.hidden = false;
  els.examCard.hidden = false;
  els.examResults.hidden = true;
  els.examHint.textContent = "";
  tickExamTimer();
  renderExamQuestion();
}

function tickExamTimer() {
  if (!exam || exam.finished) return;
  const remaining = exam.deadline - Date.now();
  if (remaining <= 0) {
    els.examTimer.textContent = "00:00";
    finishExam(true);
    return;
  }
  const minutes = String(Math.floor(remaining / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
  els.examTimer.textContent = `${minutes}:${seconds}`;
  els.examTimer.classList.toggle("warning", remaining < 5 * 60 * 1000);
}

function renderExamQuestion() {
  const total = exam.questions.length;
  const entry = exam.questions[exam.index];
  const answeredCount = exam.questions.filter((question) => question.picked !== null).length;

  els.examCounter.textContent = `Question ${exam.index + 1} / ${total}`;
  els.examAnsweredPill.textContent = `Répondues ${answeredCount}/${total}`;
  els.examProgress.style.width = `${((exam.index + 1) / total) * 100}%`;
  els.examCategory.textContent = entry.card.category;
  els.examQuestion.textContent = entry.card.question;
  els.examPrevBtn.disabled = exam.index === 0;
  els.examNextBtn.disabled = exam.index === total - 1;

  els.examChoices.innerHTML = "";
  entry.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice${entry.picked === choice ? " selected" : ""}`;
    button.textContent = `${index + 1}. ${choice}`;
    button.addEventListener("click", () => pickExamChoice(choice));
    els.examChoices.appendChild(button);
  });
}

function pickExamChoice(choice) {
  const entry = exam.questions[exam.index];
  entry.picked = entry.picked === choice ? null : choice;
  els.examHint.textContent = "";
  renderExamQuestion();
  // Enchaîne automatiquement vers la première question sans réponse.
  if (entry.picked !== null && exam.index < exam.questions.length - 1) {
    setTimeout(() => {
      if (!exam || exam.finished) return;
      moveExam(1);
    }, 250);
  }
}

function moveExam(delta) {
  if (!exam || exam.finished) return;
  exam.index = Math.max(0, Math.min(exam.questions.length - 1, exam.index + delta));
  els.examHint.textContent = "";
  renderExamQuestion();
}

function finishExam(timeUp) {
  if (!exam || exam.finished) return;
  const unanswered = exam.questions.filter((question) => question.picked === null).length;
  if (!timeUp && unanswered > 0) {
    const confirmed = confirm(`${unanswered} question(s) sans réponse. Terminer quand même ?`);
    if (!confirmed) return;
  }

  exam.finished = true;
  clearInterval(exam.timerId);

  const mistakes = [];
  const byTheme = {};
  let score = 0;

  exam.questions.forEach((entry) => {
    const correctAnswer = answerFor(entry.card);
    const isCorrect = entry.picked === correctAnswer;
    if (isCorrect) score += 1;
    else mistakes.push(entry);

    if (!byTheme[entry.card.category]) {
      byTheme[entry.card.category] = { correct: 0, total: 0 };
    }
    byTheme[entry.card.category].total += 1;
    byTheme[entry.card.category].correct += isCorrect ? 1 : 0;

    // Alimente la répétition espacée sans toucher XP ni série.
    applyReview(getCardStats(entry.card.id), isCorrect, isCorrect ? 2 : -1);
  });

  saveState();
  examHistory.push({ date: new Date().toISOString(), score, total: exam.questions.length });
  saveExamHistory();

  renderExamResults(score, byTheme, mistakes, timeUp);
  renderExamHistory();
  renderStats();
}

function renderExamResults(score, byTheme, mistakes, timeUp) {
  const total = exam.questions.length;
  const passed = score >= EXAM_FORMAT.passCount;

  els.examCard.hidden = true;
  els.examResults.hidden = false;
  els.resultBanner.className = `result-banner ${passed ? "pass" : "fail"}`;
  els.resultScore.textContent = `${score} / ${total}`;
  els.resultVerdict.textContent = timeUp
    ? `Temps écoulé. ${passed ? "Réussi malgré tout : il fallait au moins " : "Il fallait au moins "}${EXAM_FORMAT.passCount} bonnes réponses.`
    : passed
      ? `Réussi ! Le seuil officiel est de ${EXAM_FORMAT.passCount}/${total} (80 %).`
      : `Pas encore : il faut au moins ${EXAM_FORMAT.passCount}/${total} (80 %). Continue l'entraînement !`;

  els.resultThemes.innerHTML = "";
  Object.entries(byTheme).forEach(([theme, stats]) => {
    const row = document.createElement("div");
    row.className = "theme-row";
    const pct = Math.round((stats.correct / stats.total) * 100);
    row.innerHTML = `
      <span class="theme-name"></span>
      <div class="meter"><span style="width:${pct}%"></span></div>
      <span class="theme-score">${stats.correct}/${stats.total}</span>
    `;
    row.querySelector(".theme-name").textContent = theme;
    els.resultThemes.appendChild(row);
  });

  els.mistakesTitle.textContent = mistakes.length
    ? `Questions à retravailler (${mistakes.length})`
    : "Sans faute, bravo !";
  els.resultMistakes.innerHTML = "";
  mistakes.forEach((entry) => {
    const item = document.createElement("div");
    item.className = "mistake-item";
    item.innerHTML = `
      <p class="mistake-question"></p>
      <p class="mistake-picked"></p>
      <p class="mistake-correct"></p>
    `;
    item.querySelector(".mistake-question").textContent = entry.card.question;
    item.querySelector(".mistake-picked").textContent = entry.picked === null
      ? "Ta réponse : (aucune)"
      : `Ta réponse : ${entry.picked}`;
    item.querySelector(".mistake-correct").textContent = `Bonne réponse : ${answerFor(entry.card)}`;
    els.resultMistakes.appendChild(item);
  });
}

function quitExam() {
  if (!exam) return;
  if (!exam.finished) {
    const confirmed = confirm("Abandonner l'examen blanc en cours ?");
    if (!confirmed) return;
    clearInterval(exam.timerId);
  }
  closeExam();
}

function closeExam() {
  if (exam && !exam.finished) clearInterval(exam.timerId);
  exam = null;
  els.examArea.hidden = true;
  els.trainArea.hidden = false;
  applyFilters();
}

function renderExamHistory() {
  if (!examHistory.length) {
    els.examHistory.textContent = "Aucune tentative pour l'instant.";
    return;
  }
  const best = Math.max(...examHistory.map((entry) => entry.score));
  const last = examHistory[examHistory.length - 1];
  els.examHistory.textContent = `Meilleur score : ${best}/${EXAM_FORMAT.total} · Dernier : ${last.score}/${last.total} · ${examHistory.length} tentative(s)`;
}

/* ------------------------- Raccourcis clavier ------------------------- */

function handleKeys(event) {
  const target = event.target;
  if (target && (target.tagName === "TEXTAREA" || target.tagName === "INPUT" || target.tagName === "SELECT")) return;

  if (exam && !exam.finished) {
    if (event.key >= "1" && event.key <= "4") {
      const entry = exam.questions[exam.index];
      const choice = entry.choices[Number(event.key) - 1];
      if (choice !== undefined) pickExamChoice(choice);
      event.preventDefault();
    } else if (event.key === "ArrowLeft") {
      moveExam(-1);
    } else if (event.key === "ArrowRight" || event.key === "Enter") {
      moveExam(1);
    }
    return;
  }

  if (els.trainArea.hidden || !currentCard()) return;
  const mode = els.modeSelect.value;

  if (event.key === "ArrowRight") {
    nextCard();
  } else if (event.key === "ArrowLeft") {
    prevCard();
  } else if (mode === "flash") {
    if (event.key === " " || event.key === "Enter") {
      revealAnswer();
      event.preventDefault();
    } else if (!els.answerPanel.hidden && ["1", "2", "3"].includes(event.key)) {
      rateCurrent({ 1: "again", 2: "hard", 3: "good" }[event.key]);
    }
  } else if (mode === "mcq" && event.key >= "1" && event.key <= "4") {
    const button = els.choices.children[Number(event.key) - 1];
    if (button && !button.disabled) button.click();
  }
}

setup();
