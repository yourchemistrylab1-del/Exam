/* ============================================================
   YCL MOCK TEST PLATFORM — APP LOGIC
   Frontend-only. No server, no build step. Everything below
   runs against the static data in data.js and the browser's
   own localStorage for auto-save / repeat-attempt blocking.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- DOM shorthand ---------------- */
  const $ = (id) => document.getElementById(id);
  const showScreen = (id) => {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("screen--active"));
    $(id).classList.add("screen--active");
    window.scrollTo(0, 0);
  };
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------- tiny toast feedback ("Answer saved" etc.) ---------------- */
  function toast(message) {
    const stack = $("toast-stack");
    if (!stack) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="toast-dot"></span><span>${message}</span>`;
    stack.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }

  /* ---------------- button ripple micro-interaction ---------------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn || reduceMotionQuery.matches) return;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--rx", (e.clientX - rect.left) + "px");
    btn.style.setProperty("--ry", (e.clientY - rect.top) + "px");
    btn.classList.remove("is-rippling");
    void btn.offsetWidth; // restart animation
    btn.classList.add("is-rippling");
  });

  /* ============================================================
     AMBIENT BACKGROUND — a slow-drifting molecular network.
     Nodes wander gently; nearby nodes link with a faint bond line,
     nodding to the Physics/Chemistry/Biology subject matter without
     ever competing with the exam UI in front of it. Falls back to a
     static field for prefers-reduced-motion so it never distracts
     during a timed test.
     ============================================================ */
  (function initMolecularField() {
    const canvas = document.getElementById("starfield-canvas");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const reduceMotion = reduceMotionQuery.matches;

    let nodes = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = null;
    const LINK_DIST = 140;

    function nodeCountFor(w, h) {
      const area = w * h;
      return Math.round(Math.min(90, Math.max(30, area / 24000)));
    }

    function buildNodes(w, h) {
      const count = nodeCountFor(w, h);
      nodes = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.3 + 0.6,
        hue: Math.random() < 0.78 ? "teal" : "amber",
        base: Math.random() * 0.3 + 0.25,
        amp: Math.random() * 0.35 + 0.15,
        speed: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2
      }));
    }

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes(w, h);
      if (reduceMotion) draw(w, h, 0);
    }

    function colorFor(n, alpha) {
      return n.hue === "teal" ? `rgba(72,214,168,${alpha})` : `rgba(224,167,62,${alpha})`;
    }

    function draw(w, h, t) {
      ctx.clearRect(0, 0, w, h);

      // bonds between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(143,163,150,${0.09 * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // nodes
      nodes.forEach((n) => {
        const twinkle = reduceMotion ? n.base + n.amp * 0.5 : n.base + n.amp * (0.5 + 0.5 * Math.sin(t * 0.001 * n.speed + n.phase));
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = colorFor(n, twinkle);
        ctx.fill();
      });
    }

    function step(w, h) {
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      });
    }

    function tick(t) {
      const w = window.innerWidth, h = window.innerHeight;
      step(w, h);
      draw(w, h, t);
      rafId = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) rafId = requestAnimationFrame(tick);
  })();

  /* ============================================================
     CONFETTI BURST — celebratory pulse of colour for a strong
     scorecard. Purely decorative, skipped under reduced motion.
     ============================================================ */
  function fireConfetti() {
    const canvas = $("confetti-canvas");
    if (!canvas || !canvas.getContext || reduceMotionQuery.matches) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth, h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ["#48D6A8", "#E0A73E", "#B98CF2", "#F1616A", "#EFF5F1"];
    const pieces = new Array(90).fill(0).map(() => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.4,
      vx: (Math.random() - 0.5) * 2.2,
      vy: Math.random() * 2 + 2,
      size: Math.random() * 6 + 4,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, w, h);
      let stillFalling = false;
      pieces.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.rot += p.vr;
        if (p.y < h + 20) stillFalling = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - elapsed / 3800);
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });
      if (stillFalling && elapsed < 3800) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- storage keys ---------------- */
  const sessionKey = (id) => `ycl_session_${id}`;
  const completedKey = (id) => `ycl_completed_${id}`;
  const FONT_SCALE_KEY = "ycl_font_scale";
  const FONT_SCALE_MIN = 0.85, FONT_SCALE_MAX = 1.35, FONT_SCALE_STEP = 0.1;

  /* ============================================================
     TEXT SIZE CONTROL (persists across sessions on this device)
     ============================================================ */
  function applyFontScale(scale) {
    document.documentElement.style.setProperty("--qp-font-scale", scale.toFixed(2));
    localStorage.setItem(FONT_SCALE_KEY, scale.toFixed(2));
  }
  function currentFontScale() {
    const stored = parseFloat(localStorage.getItem(FONT_SCALE_KEY));
    return isNaN(stored) ? 1 : stored;
  }
  applyFontScale(currentFontScale());

  $("btn-font-inc").addEventListener("click", () => {
    applyFontScale(Math.min(FONT_SCALE_MAX, currentFontScale() + FONT_SCALE_STEP));
  });
  $("btn-font-dec").addEventListener("click", () => {
    applyFontScale(Math.max(FONT_SCALE_MIN, currentFontScale() - FONT_SCALE_STEP));
  });

  /* ---------------- keyboard shortcuts panel toggle ---------------- */
  $("btn-shortcuts").addEventListener("click", () => {
    const panel = $("shortcuts-panel");
    const nowHidden = !panel.hidden;
    panel.hidden = nowHidden;
    $("btn-shortcuts").setAttribute("aria-expanded", String(!nowHidden));
  });

  /* ---------------- app state ---------------- */
  let state = null; // populated on login / resume
  let timerHandle = null;
  let questionEnterTime = null;
  let historyGuardActive = false;

  const questions = QUESTION_BANK;
  const totalQuestions = questions.length;

  /* ============================================================
     SCREEN 0 — LOGIN
     ============================================================ */
  $("login-exam-name").textContent = EXAM_CONFIG.examName;

  $("btn-login-continue").addEventListener("click", () => {
    const id = $("input-id").value.trim();
    const password = $("input-password").value;
    const name = $("input-name").value.trim();
    const errBox = $("login-error");
    errBox.hidden = true;

    if (!id || !password || !name) {
      errBox.textContent = "Enter your Student ID, password, and full name to continue.";
      errBox.hidden = false;
      return;
    }

    if (id.toUpperCase() !== DEMO_CREDENTIALS.studentId.toUpperCase() || password !== DEMO_CREDENTIALS.password) {
      errBox.textContent = "Incorrect Student ID or password. Check your credentials and try again.";
      errBox.hidden = false;
      return;
    }

    if (localStorage.getItem(completedKey(id))) {
      $("blocked-message").textContent =
        `A scorecard was already generated for ID "${id}" on this device. Repeat attempts are blocked once a test is completed. If this is a mistake, ask your instructor to reset the session.`;
      showScreen("screen-blocked");
      return;
    }

    const saved = localStorage.getItem(sessionKey(id));
    if (saved) {
      // Crash-recovery: resume straight into the exam.
      state = JSON.parse(saved);
      state.studentName = name || state.studentName;
      enterExamScreen(true);
      return;
    }

    state = createFreshState(id, name);
    populateInstructions();
    showScreen("screen-instructions");
  });

  $("btn-blocked-back").addEventListener("click", () => showScreen("screen-login"));

  function createFreshState(id, name) {
    return {
      studentId: id,
      studentName: name,
      answers: {},          // qid -> optionIndex
      visited: {},           // qid -> true
      marked: {},             // qid -> true
      timePerQuestion: {},    // qid -> seconds
      currentQIndex: 0,
      endTimestamp: null,     // set on exam start
      violations: 0,
      violationLog: [],       // {type, label, time}
      tabSwitches: 0,
      fullscreenExits: 0,
      blockedActions: 0,
      startedAt: null
    };
  }

  /* ============================================================
     SCREEN 1 — INSTRUCTIONS
     ============================================================ */
  function populateInstructions() {
    $("marks-correct-val").textContent = EXAM_CONFIG.marksCorrect;
    $("marks-incorrect-val").textContent = "\u2212" + Math.abs(EXAM_CONFIG.marksIncorrect);
    $("max-violations-val").textContent = EXAM_CONFIG.maxViolations;
    $("violation-max").textContent = EXAM_CONFIG.maxViolations;
    $("modal-violation-max").textContent = EXAM_CONFIG.maxViolations;
    $("chk-agree").checked = false;
    $("btn-start-exam").disabled = true;
  }

  $("chk-agree").addEventListener("change", (e) => {
    $("btn-start-exam").disabled = !e.target.checked;
  });

  $("btn-start-exam").addEventListener("click", async () => {
    try {
      await document.documentElement.requestFullscreen();
    } catch (err) {
      // Fullscreen can be denied (e.g. iframe preview). Continue anyway —
      // the fullscreenchange listener below will just log it as a flag
      // the moment the browser reports we're not in fullscreen.
    }
    state.startedAt = Date.now();
    state.endTimestamp = Date.now() + EXAM_CONFIG.durationMinutes * 60 * 1000;
    saveSession();
    enterExamScreen(false);
  });

  /* ============================================================
     SCREEN 2 — EXAM ENGINE
     ============================================================ */
  function enterExamScreen(isResume) {
    $("exam-student-name").textContent = state.studentName;
    $("exam-student-id").textContent = state.studentId;
    buildSubjectTabs();
    buildPaletteGrid();
    attachSecurityGuards();
    startTimer();
    goToQuestion(state.currentQIndex || 0);
    showScreen("screen-exam");
    updateViolationIndicator();
  }

  function buildSubjectTabs() {
    const wrap = $("subject-tabs");
    wrap.innerHTML = "";
    EXAM_CONFIG.subjects.forEach((subj) => {
      const btn = document.createElement("button");
      btn.className = "subject-tab";
      btn.textContent = subj;
      btn.dataset.subject = subj;
      btn.addEventListener("click", () => {
        const idx = questions.findIndex((q) => q.subject === subj);
        if (idx !== -1) goToQuestion(idx);
      });
      wrap.appendChild(btn);
    });
  }

  function buildPaletteGrid() {
    const grid = $("palette-grid");
    grid.innerHTML = "";
    questions.forEach((q, i) => {
      const btn = document.createElement("button");
      btn.className = "qbtn";
      btn.textContent = i + 1;
      btn.dataset.index = i;
      btn.style.setProperty("--i", i);
      btn.addEventListener("click", () => goToQuestion(i));
      grid.appendChild(btn);
    });
  }

  function goToQuestion(index) {
    const previousIndex = state.currentQIndex;
    if (previousIndex !== undefined && questionEnterTime) {
      recordTimeSpent();
    }
    state.currentQIndex = index;
    const q = questions[index];
    state.visited[q.id] = true;
    questionEnterTime = Date.now();

    const panelEl = document.querySelector(".question-panel");
    if (panelEl) {
      const goingForward = previousIndex === undefined || index >= previousIndex;
      panelEl.style.setProperty("--slide-dir", goingForward ? "14px" : "-14px");
      panelEl.classList.add("is-transitioning");
      requestAnimationFrame(() => requestAnimationFrame(() => panelEl.classList.remove("is-transitioning")));
    }

    $("q-current-num").textContent = index + 1;
    $("q-total-num").textContent = totalQuestions;
    $("q-subject-label").textContent = q.subject;
    $("q-text").textContent = q.text;

    const optWrap = $("q-options");
    optWrap.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    q.options.forEach((optText, i) => {
      const label = document.createElement("label");
      label.className = "qp-option" + (state.answers[q.id] === i ? " is-selected" : "");
      label.innerHTML = `
        <input type="radio" name="qopt" ${state.answers[q.id] === i ? "checked" : ""}>
        <span class="qp-option-letter">${letters[i]}</span>
        <span>${optText}</span>`;
      label.querySelector("input").addEventListener("change", () => {
        state.answers[q.id] = i;
        saveSession();
        renderPalette();
        toast("Answer saved");
        goToQuestion(index); // re-render to show selection state
      });
      optWrap.appendChild(label);
    });

    document.querySelectorAll(".subject-tab").forEach((t) => {
      t.classList.toggle("is-active", t.dataset.subject === q.subject);
    });

    renderPalette();
    saveSession();
  }

  function recordTimeSpent() {
    const q = questions[state.currentQIndex];
    const elapsed = Math.round((Date.now() - questionEnterTime) / 1000);
    state.timePerQuestion[q.id] = (state.timePerQuestion[q.id] || 0) + Math.max(0, elapsed);
  }

  function renderPalette() {
    let answered = 0, notAnswered = 0, marked = 0, notVisited = 0;
    document.querySelectorAll(".qbtn").forEach((btn, i) => {
      const q = questions[i];
      btn.classList.remove("st-answered", "st-notanswered", "st-marked", "st-markedans", "is-current");
      const isAnswered = state.answers[q.id] !== undefined;
      const isMarked = !!state.marked[q.id];
      const isVisited = !!state.visited[q.id];

      if (isMarked && isAnswered) { btn.classList.add("st-markedans"); marked++; answered++; }
      else if (isMarked) { btn.classList.add("st-marked"); marked++; }
      else if (isAnswered) { btn.classList.add("st-answered"); answered++; }
      else if (isVisited) { btn.classList.add("st-notanswered"); notAnswered++; }
      else { notVisited++; }

      if (i === state.currentQIndex) btn.classList.add("is-current");
    });
    $("ps-answered").textContent = answered;
    $("ps-notanswered").textContent = notAnswered;
    $("ps-marked").textContent = marked;
    $("ps-notvisited").textContent = notVisited;

    const fill = $("palette-progress-fill");
    if (fill) fill.style.width = Math.round((answered / totalQuestions) * 100) + "%";

    updateSubjectTabBadges();
  }

  function updateSubjectTabBadges() {
    document.querySelectorAll(".subject-tab").forEach((tab) => {
      const subj = tab.dataset.subject;
      const subjQuestions = questions.filter((q) => q.subject === subj);
      const subjAnswered = subjQuestions.filter((q) => state.answers[q.id] !== undefined).length;
      let badge = tab.querySelector(".subject-tab-badge");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "subject-tab-badge";
        tab.appendChild(badge);
      }
      badge.textContent = `${subjAnswered}/${subjQuestions.length}`;
    });
  }

  function jumpToNextUnanswered() {
    const startFrom = state.currentQIndex + 1;
    let target = -1;
    for (let i = 0; i < totalQuestions; i++) {
      const idx = (startFrom + i) % totalQuestions;
      if (state.answers[questions[idx].id] === undefined) { target = idx; break; }
    }
    if (target === -1) {
      $("btn-jump-unanswered").textContent = "All questions answered ✓";
      setTimeout(() => { $("btn-jump-unanswered").textContent = "Jump to next unanswered"; }, 1800);
      return;
    }
    goToQuestion(target);
  }
  $("btn-jump-unanswered").addEventListener("click", jumpToNextUnanswered);

  /* ---- question-panel actions ---- */
  $("btn-save-next").addEventListener("click", () => {
    if (state.currentQIndex < totalQuestions - 1) goToQuestion(state.currentQIndex + 1);
  });
  $("btn-prev").addEventListener("click", () => {
    if (state.currentQIndex > 0) goToQuestion(state.currentQIndex - 1);
  });
  $("btn-mark-review").addEventListener("click", () => {
    const q = questions[state.currentQIndex];
    state.marked[q.id] = true;
    saveSession();
    if (state.currentQIndex < totalQuestions - 1) goToQuestion(state.currentQIndex + 1);
    else renderPalette();
  });
  $("btn-clear-response").addEventListener("click", () => {
    const q = questions[state.currentQIndex];
    delete state.answers[q.id];
    saveSession();
    goToQuestion(state.currentQIndex);
  });

  /* ---- timer ---- */
  function startTimer() {
    updateTimerDisplay();
    clearInterval(timerHandle);
    timerHandle = setInterval(() => {
      const remainingMs = state.endTimestamp - Date.now();
      if (remainingMs <= 0) {
        clearInterval(timerHandle);
        $("timer-display").textContent = "00:00";
        finishExam("timeout");
        return;
      }
      updateTimerDisplay(remainingMs);
    }, 1000);
  }

  function updateTimerDisplay(remainingMsArg) {
    const remainingMs = remainingMsArg !== undefined ? remainingMsArg : (state.endTimestamp - Date.now());
    const totalSec = Math.max(0, Math.round(remainingMs / 1000));
    const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const ss = String(totalSec % 60).padStart(2, "0");
    $("timer-display").textContent = `${mm}:${ss}`;
    const isCritical = totalSec <= 120;
    $("timer-chip").classList.toggle("is-critical", isCritical);

    const totalDurationMs = EXAM_CONFIG.durationMinutes * 60 * 1000;
    const fill = $("exam-progress-fill");
    const track = document.querySelector(".exam-progress-track");
    if (fill) {
      const pct = Math.max(0, Math.min(100, (remainingMs / totalDurationMs) * 100));
      fill.style.width = pct + "%";
      fill.style.background = isCritical
        ? "linear-gradient(90deg, rgba(241,97,106,0.18), rgba(241,97,106,0.06))"
        : "linear-gradient(90deg, rgba(72,214,168,0.16), rgba(224,167,62,0.16))";
    }
    if (track) track.classList.toggle("is-critical", isCritical);
  }

  /* ---- autosave ---- */
  function saveSession() {
    localStorage.setItem(sessionKey(state.studentId), JSON.stringify(state));
  }

  /* ============================================================
     SECURITY / INTEGRITY MONITORING
     ============================================================ */
  function attachSecurityGuards() {
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("contextmenu", onBlockedAction);
    document.addEventListener("copy", onBlockedAction);
    document.addEventListener("paste", onBlockedAction);
    document.addEventListener("cut", onBlockedAction);

    if (!historyGuardActive) {
      historyGuardActive = true;
      history.pushState({ ycl: true }, "", location.href);
      window.addEventListener("popstate", onPopState);
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("keydown", onExamKeydown);
  }

  function detachSecurityGuards() {
    document.removeEventListener("fullscreenchange", onFullscreenChange);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    document.removeEventListener("contextmenu", onBlockedAction);
    document.removeEventListener("copy", onBlockedAction);
    document.removeEventListener("paste", onBlockedAction);
    document.removeEventListener("cut", onBlockedAction);
    window.removeEventListener("popstate", onPopState);
    window.removeEventListener("beforeunload", onBeforeUnload);
    document.removeEventListener("keydown", onExamKeydown);
    historyGuardActive = false;
  }

  /* ---- keyboard shortcuts (exam screen only, ignored while a modal is open) ---- */
  function onExamKeydown(e) {
    if (!state || state.submitted) return;
    if (!$("modal-violation").hidden || !$("modal-submit").hidden) return;

    if (e.key >= "1" && e.key <= "4") {
      const optIdx = Number(e.key) - 1;
      const q = questions[state.currentQIndex];
      if (optIdx < q.options.length) {
        state.answers[q.id] = optIdx;
        saveSession();
        toast("Answer saved");
        goToQuestion(state.currentQIndex);
      }
    } else if (e.key === "ArrowRight" || e.key === "Enter") {
      e.preventDefault();
      if (state.currentQIndex < totalQuestions - 1) goToQuestion(state.currentQIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (state.currentQIndex > 0) goToQuestion(state.currentQIndex - 1);
    } else if (e.key === "m" || e.key === "M") {
      const q = questions[state.currentQIndex];
      state.marked[q.id] = true;
      saveSession();
      renderPalette();
    } else if (e.key === "c" || e.key === "C") {
      const q = questions[state.currentQIndex];
      delete state.answers[q.id];
      saveSession();
      goToQuestion(state.currentQIndex);
    }
  }

  function onFullscreenChange() {
    if (state && state.submitted) return;
    if (!document.fullscreenElement) {
      state.fullscreenExits++;
      flagViolation("fullscreen", "Full-screen exit detected",
        "Leaving full-screen mid-test is logged to your integrity record. Return to full-screen to continue.");
    }
  }

  function onVisibilityChange() {
    if (state && state.submitted) return;
    if (document.hidden) {
      state.tabSwitches++;
      flagViolation("tabswitch", "Tab or window switch detected",
        "Navigating away from the test window has been logged. Stay on this tab for the rest of the test.");
    }
  }

  function onBlockedAction(e) {
    e.preventDefault();
    if (!state || state.submitted) return;
    state.blockedActions++;
    saveSession();
    // Copy/paste/right-click are blocked silently (no modal spam) but
    // still counted toward the integrity log shown on the scorecard.
  }

  function onPopState() {
    if (!state || state.submitted) return;
    history.pushState({ ycl: true }, "", location.href);
    state.blockedActions++;
    flagViolation("back", "Back navigation blocked",
      "The back/forward button is disabled during the test. This attempt has been logged.");
  }

  function onBeforeUnload(e) {
    if (!state || state.submitted) return;
    e.preventDefault();
    e.returnValue = "";
  }

  function flagViolation(type, title, body) {
    state.violations++;
    state.violationLog.push({ type, time: Date.now() });
    saveSession();
    updateViolationIndicator();

    if (state.violations >= EXAM_CONFIG.maxViolations) {
      finishExam("violations");
      return;
    }

    $("modal-violation-title").textContent = title;
    $("modal-violation-body").textContent = body;
    $("modal-violation-count").textContent = state.violations;
    $("modal-violation").hidden = false;
  }

  $("btn-resume-fullscreen").addEventListener("click", async () => {
    $("modal-violation").hidden = true;
    try { await document.documentElement.requestFullscreen(); } catch (err) { /* ignore */ }
  });

  function updateViolationIndicator() {
    const el = $("violation-indicator");
    $("violation-count").textContent = state.violations;
    el.classList.remove("is-warn", "is-danger");
    if (state.violations >= EXAM_CONFIG.maxViolations - 1) el.classList.add("is-danger");
    else if (state.violations > 0) el.classList.add("is-warn");
    el.classList.remove("just-flagged");
    void el.offsetWidth;
    el.classList.add("just-flagged");
  }

  /* ---- submit flow ---- */
  $("btn-submit-exam").addEventListener("click", () => {
    const answeredCount = Object.keys(state.answers).length;
    $("submit-summary-text").textContent =
      `You have answered ${answeredCount} of ${totalQuestions} questions. Unanswered questions score zero; incorrect answers cost ${Math.abs(EXAM_CONFIG.marksIncorrect)} mark(s) each.`;
    $("modal-submit").hidden = false;
  });
  $("btn-cancel-submit").addEventListener("click", () => { $("modal-submit").hidden = true; });
  $("btn-confirm-submit").addEventListener("click", () => {
    $("modal-submit").hidden = true;
    finishExam("manual");
  });

  /* ============================================================
     SCORING + RESULT
     ============================================================ */
  function finishExam(reason) {
    if (state.submitted) return;
    recordTimeSpent();
    state.submitted = true;
    state.submitReason = reason;
    clearInterval(timerHandle);
    detachSecurityGuards();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    const result = scoreExam();
    state.result = result;

    localStorage.setItem(completedKey(state.studentId), JSON.stringify({
      studentId: state.studentId,
      studentName: state.studentName,
      completedAt: Date.now(),
      result
        }));
    localStorage.removeItem(sessionKey(state.studentId));

    renderResult(result);
    showScreen("screen-result");
  }

  function scoreExam() {
    const subjectStats = {};
    EXAM_CONFIG.subjects.forEach((s) => (subjectStats[s] = { correct: 0, incorrect: 0, unattempted: 0, marks: 0, max: 0 }));

    let correct = 0, incorrect = 0, unattempted = 0, totalMarks = 0;
    const weakTopicCount = {};
    const pacing = [];

    questions.forEach((q) => {
      const st = subjectStats[q.subject];
      st.max += EXAM_CONFIG.marksCorrect;
      const given = state.answers[q.id];
      const timeSpent = state.timePerQuestion[q.id] || 0;
      pacing.push({ id: q.id, subject: q.subject, seconds: timeSpent });

      if (given === undefined) {
        unattempted++; st.unattempted++;
      } else if (given === q.correctIndex) {
        correct++; st.correct++; st.marks += EXAM_CONFIG.marksCorrect; totalMarks += EXAM_CONFIG.marksCorrect;
      } else {
        incorrect++; st.incorrect++; st.marks += EXAM_CONFIG.marksIncorrect; totalMarks += EXAM_CONFIG.marksIncorrect;
        weakTopicCount[q.topic] = (weakTopicCount[q.topic] || 0) + 1;
      }
      if (given === undefined) {
        weakTopicCount[q.topic] = (weakTopicCount[q.topic] || 0) + 1;
      }
    });

    const attempted = correct + incorrect;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const percentile = percentileRank(totalMarks, HISTORICAL_SCORES);
    const estimatedAIR = Math.max(1, Math.round(EXAM_CONFIG.candidatePoolSize * (1 - percentile / 100)));

    const weakTopics = Object.entries(weakTopicCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([topic]) => topic);

    return {
      totalMarks, correct, incorrect, unattempted, accuracy, percentile, estimatedAIR,
      subjectStats, weakTopics, pacing,
      tabSwitches: state.tabSwitches, fullscreenExits: state.fullscreenExits,
      blockedActions: state.blockedActions, violations: state.violations
    };
  }

  function percentileRank(score, historical) {
    if (!historical.length) return 50;
    const countAtOrBelow = historical.filter((s) => s <= score).length;
    return Math.max(1, Math.min(99, Math.round((countAtOrBelow / historical.length) * 100)));
  }

  /* ============================================================
     RESULT SCREEN
     ============================================================ */
  function renderResult(r) {
    $("res-exam-name").textContent = EXAM_CONFIG.examName;
    $("res-student-name").textContent = state.studentName;
    $("res-student-meta").textContent = `ID ${state.studentId} · ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;

    document.querySelectorAll(".stat-cell").forEach((cell, i) => cell.style.setProperty("--i", i));
    document.querySelectorAll(".result-section").forEach((sec, i) => sec.style.setProperty("--si", i));

    const reduceMotion = reduceMotionQuery.matches;
    animateCount($("gauge-percentile"), r.percentile, { suffix: "th", duration: reduceMotion ? 0 : 700 });
    animateCount($("stat-total-marks"), r.totalMarks, { duration: reduceMotion ? 0 : 700 });
    $("stat-air").textContent = "~" + r.estimatedAIR.toLocaleString("en-IN");
    animateCount($("stat-correct"), r.correct, { duration: reduceMotion ? 0 : 600 });
    animateCount($("stat-incorrect"), r.incorrect, { duration: reduceMotion ? 0 : 600 });
    animateCount($("stat-unattempted"), r.unattempted, { duration: reduceMotion ? 0 : 600 });
    animateCount($("stat-accuracy"), r.accuracy, { suffix: "%", duration: reduceMotion ? 0 : 600 });
    $("rank-pool-size").textContent = EXAM_CONFIG.candidatePoolSize.toLocaleString("en-IN");

    drawGauge(r.percentile);
    drawSubjectChart(r.subjectStats);
    drawPacingChart(r.pacing);

    const wrap = $("weak-topics");
    wrap.innerHTML = "";
    if (r.weakTopics.length === 0) {
      wrap.innerHTML = '<span class="weak-topics-empty">No weak topics detected — clean sweep. 🎯</span>';
    } else {
      r.weakTopics.forEach((t, i) => {
        const chip = document.createElement("span");
        chip.className = "weak-topic-chip";
        chip.style.setProperty("--i", i);
        chip.textContent = t;
        wrap.appendChild(chip);
      });
    }

    if (r.percentile >= 90 && !reduceMotion) {
      setTimeout(fireConfetti, 400);
    }

    const integrityWrap = $("integrity-row");
    integrityWrap.innerHTML = "";
    const cells = [
      ["Tab switches", r.tabSwitches],
      ["Full-screen exits", r.fullscreenExits],
      ["Blocked actions", r.blockedActions]
    ];
    cells.forEach(([label, val]) => {
      const cell = document.createElement("div");
      cell.className = "integrity-cell";
      cell.innerHTML = `<span class="stat-value">${val}</span><span class="stat-label">${label}</span>`;
      integrityWrap.appendChild(cell);
    });
  }

  /* ---- count-up animation for scorecard numbers ---- */
  function animateCount(el, endValue, opts) {
    const { suffix = "", duration = 700 } = opts || {};
    if (!el) return;
    if (duration <= 0) { el.textContent = endValue + suffix; return; }
    const startValue = 0;
    const startTime = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(startValue + (endValue - startValue) * eased);
      el.textContent = current + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---- canvas: percentile gauge ---- */
  function drawGauge(percentile) {
    const canvas = $("gauge-canvas");
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2, radius = 90;
    ctx.clearRect(0, 0, w, h);

    const start = Math.PI * 0.75, full = Math.PI * 1.5;
    ctx.lineWidth = 16; ctx.lineCap = "round";

    ctx.strokeStyle = "#1C2740";
    ctx.beginPath();
    ctx.arc(cx, cy, radius, start, start + full);
    ctx.stroke();

    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "#7C8CF8");
    grad.addColorStop(1, "#D9A63E");
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, start, start + full * (percentile / 100));
    ctx.stroke();
  }

  /* ---- canvas: subject-wise bar chart ---- */
  function drawSubjectChart(subjectStats) {
    const canvas = $("subject-chart");
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const subjects = Object.keys(subjectStats);
    const maxAbs = Math.max(...subjects.map((s) => subjectStats[s].max), 1);
    const zeroY = h - 30;
    const scale = (zeroY - 20) / maxAbs;
    const barW = 70;
    const gap = (w - subjects.length * barW) / (subjects.length + 1);

    ctx.strokeStyle = "#26314A";
    ctx.beginPath(); ctx.moveTo(0, zeroY); ctx.lineTo(w, zeroY); ctx.stroke();

    subjects.forEach((subj, i) => {
      const st = subjectStats[subj];
      const x = gap + i * (barW + gap);
      const barH = Math.abs(st.marks) * scale;
      const y = st.marks >= 0 ? zeroY - barH : zeroY;

      ctx.fillStyle = st.marks >= 0 ? "#7C8CF8" : "#E5575D";
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, barW, Math.max(barH, 2), 6) : ctx.rect(x, y, barW, Math.max(barH, 2));
      ctx.fill();

      ctx.fillStyle = "#8B93A8";
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(subj, x + barW / 2, zeroY + 18);
      ctx.fillStyle = "#EDEFF5";
      ctx.font = "bold 13px 'JetBrains Mono', monospace";
      ctx.fillText(st.marks, x + barW / 2, st.marks >= 0 ? y - 8 : y + barH + 16);
    });
  }

  /* ---- canvas: pacing chart ---- */
  function drawPacingChart(pacing) {
    const canvas = $("pacing-chart");
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const maxTime = Math.max(...pacing.map((p) => p.seconds), 30);
    const zeroY = h - 24;
    const scale = (zeroY - 16) / maxTime;
    const barW = (w / pacing.length) * 0.6;
    const step = w / pacing.length;

    pacing.forEach((p, i) => {
      const x = i * step + (step - barW) / 2;
      const barH = p.seconds * scale;
      const y = zeroY - barH;
      ctx.fillStyle = p.seconds > 90 ? "#D9A63E" : "#7C8CF8";
      ctx.fillRect(x, y, barW, Math.max(barH, 1));
      if (pacing.length <= 20) {
        ctx.fillStyle = "#5B6478";
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(i + 1, x + barW / 2, h - 8);
      }
    });
    ctx.strokeStyle = "#26314A";
    ctx.beginPath(); ctx.moveTo(0, zeroY); ctx.lineTo(w, zeroY); ctx.stroke();
  }

  /* ---- scorecard actions ---- */
  $("btn-download-pdf").addEventListener("click", () => {
    const resScreen = $("screen-result");
    resScreen.classList.add("print-mode");
    const cleanup = () => { resScreen.classList.remove("print-mode"); window.removeEventListener("afterprint", cleanup); };
    window.addEventListener("afterprint", cleanup);
    window.print();
  });

  $("btn-view-solutions").addEventListener("click", () => {
    renderSolutions();
    showScreen("screen-solutions");
  });
  $("btn-back-to-result").addEventListener("click", () => showScreen("screen-result"));
  $("btn-print-answerkey").addEventListener("click", () => {
    renderSolutions();
    showScreen("screen-solutions");
    setTimeout(() => window.print(), 150);
  });

  function renderSolutions() {
    $("sol-exam-name").textContent = EXAM_CONFIG.examName + " — Answer key";
    const wrap = $("solutions-list");
    wrap.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    questions.forEach((q, i) => {
      const given = state.answers[q.id];
      const isCorrect = given === q.correctIndex;
      const isSkipped = given === undefined;
      const statusClass = isSkipped ? "sol-status--skipped" : isCorrect ? "sol-status--correct" : "sol-status--incorrect";
      const statusText = isSkipped ? "Unattempted" : isCorrect ? "Correct" : "Incorrect";

      const item = document.createElement("div");
      item.className = "sol-item";
      item.style.setProperty("--i", i);
      item.innerHTML = `
        <div class="sol-item-head">
          <span class="sol-qnum">Q${i + 1} · ${q.subject} · ${q.topic}</span>
          <span class="sol-status ${statusClass}">${statusText}</span>
        </div>
        <p class="sol-qtext">${q.text}</p>
        <div class="sol-options">
          ${q.options.map((opt, oi) => {
            let cls = "";
            if (oi === q.correctIndex) cls = "is-correct";
            else if (oi === given) cls = "is-wrong-pick";
            return `<div class="sol-option ${cls}">${letters[oi]}. ${opt}</div>`;
          }).join("")}
        </div>
        <p class="sol-explain">${q.explanation}</p>`;
      wrap.appendChild(item);
    });
  }

})();
