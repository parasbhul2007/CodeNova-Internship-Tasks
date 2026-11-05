const bank = [
  {
    id: 1,
    category: "HTML",
    question: "Which HTML element represents the main content of a document?",
    options: ["<header>", "<main>", "<footer>", "<aside>"],
    answer: 1,
    explanation:
      "The <main> element contains the dominant content unique to the page.",
  },
  {
    id: 2,
    category: "HTML",
    question: "Which attribute provides alternative text for an image?",
    options: ["title", "src", "alt", "href"],
    answer: 2,
    explanation: "The alt attribute provides a text alternative for an image.",
  },
  {
    id: 3,
    category: "CSS",
    question:
      "Which CSS layout is designed mainly for one-dimensional layouts?",
    options: ["Grid", "Flexbox", "Float", "Position"],
    answer: 1,
    explanation: "Flexbox lays items out along a row or a column.",
  },
  {
    id: 4,
    category: "CSS",
    question: "Which unit is relative to the root element font size?",
    options: ["em", "rem", "px", "vw"],
    answer: 1,
    explanation: "rem is based on the root html element font size.",
  },
  {
    id: 5,
    category: "CSS",
    question:
      "Which setting includes padding and border inside the declared width?",
    options: [
      "display:block",
      "box-sizing:border-box",
      "overflow:hidden",
      "position:relative",
    ],
    answer: 1,
    explanation:
      "border-box includes content, padding and border in the width.",
  },
  {
    id: 6,
    category: "JavaScript",
    question:
      "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["const", "var", "let", "static"],
    answer: 2,
    explanation: "let declares a block-scoped variable that can be reassigned.",
  },
  {
    id: 7,
    category: "JavaScript",
    question: "What does addEventListener() do?",
    options: [
      "Creates HTML",
      "Attaches an event handler",
      "Changes CSS files",
      "Sends a server request",
    ],
    answer: 1,
    explanation:
      "It registers a function to run when a specified event occurs.",
  },
  {
    id: 8,
    category: "JavaScript",
    question: "Which method selects the first element matching a CSS selector?",
    options: ["getAll()", "querySelector()", "selectFirst()", "findElement()"],
    answer: 1,
    explanation: "document.querySelector() returns the first matching element.",
  },
  {
    id: 9,
    category: "Accessibility",
    question: "What does aria-expanded communicate?",
    options: [
      "Element color",
      "Whether a controlled region is expanded or collapsed",
      "Page language",
      "Image size",
    ],
    answer: 1,
    explanation:
      "aria-expanded exposes the current expanded or collapsed state.",
  },
  {
    id: 10,
    category: "Responsive Design",
    question: "Which CSS at-rule applies styles at a viewport breakpoint?",
    options: ["@supports", "@keyframes", "@media", "@import"],
    answer: 2,
    explanation:
      "A media query applies styles when conditions such as viewport width match.",
  },
];
let index = 0,
  score = 0,
  answered = false;
const $ = (s) => document.querySelector(s);
$("#start").addEventListener("click", () => {
  index = 0;
  score = 0;
  $("#intro").classList.add("hidden");
  $("#result").classList.add("hidden");
  $("#quiz").classList.remove("hidden");
  render();
});
function render() {
  answered = false;
  const q = bank[index];
  $("#category").textContent = q.category;
  $("#count").textContent =
    `Question ${String(index + 1).padStart(2, "0")} / ${bank.length}`;
  $("#question").textContent = q.question;
  $("#score").textContent = score;
  $("#feedback").classList.add("hidden");
  $("#next").disabled = true;
  $("#next").textContent =
    index === bank.length - 1 ? "View results →" : "Next question →";
  $("#answers").innerHTML = "";
  q.options.forEach((option, i) => {
    const b = document.createElement("button");
    b.className = "answer";
    b.type = "button";
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = String.fromCharCode(65 + i);
    const text = document.createElement("span");
    text.textContent = option;
    b.append(letter, text);
    b.addEventListener("click", () => choose(i));
    $("#answers").append(b);
  });
  progress(index);
}
function progress(n) {
  const p = Math.round((n / bank.length) * 100);
  $("#percent").textContent = p + "%";
  $("#fill").style.width = p + "%";
  $("#bar").setAttribute("aria-valuenow", n);
}
function choose(i) {
  if (answered) return;
  answered = true;
  const q = bank[index],
    buttons = [...document.querySelectorAll(".answer")];
  buttons.forEach((b, j) => {
    b.disabled = true;
    if (j === q.answer) b.classList.add("correct");
    if (j === i && i !== q.answer) b.classList.add("incorrect");
  });
  const ok = i === q.answer;
  if (ok) score++;
  $("#score").textContent = score;
  progress(index + 1);
  $("#feedback-title").textContent = ok
    ? "Correct!"
    : "Not quite. Review this:";
  $("#explanation").textContent = q.explanation;
  $("#feedback").classList.remove("hidden");
  $("#next").disabled = false;
}
$("#next").addEventListener("click", () => {
  if (!answered) return;
  index++;
  if (index < bank.length) render();
  else results();
});
function results() {
  $("#quiz").classList.add("hidden");
  $("#result").classList.remove("hidden");
  const pct = Math.round((score / bank.length) * 100);
  $("#final-score").textContent = `${score}/${bank.length}`;
  $("#correct").textContent = score;
  $("#wrong").textContent = bank.length - score;
  $("#accuracy").textContent = pct + "%";
  $("#result-title").textContent =
    pct >= 80
      ? "Excellent work!"
      : pct >= 50
        ? "Good progress!"
        : "Keep practising!";
  $("#result-copy").textContent =
    "Review the explanations and try again to strengthen your frontend fundamentals.";
}
$("#restart").addEventListener("click", () => {
  index = 0;
  score = 0;
  $("#result").classList.add("hidden");
  $("#quiz").classList.remove("hidden");
  render();
});
