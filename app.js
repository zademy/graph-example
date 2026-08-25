// Boot: owns the app state and routes every interaction through
// a single render pass. Nothing else writes to the stage.
import { createGraphView } from "./src/render.js";

const state = { selected: "chat-client", filter: "all" };

const view = createGraphView(document, {
  onSelect: (id) => {
    state.selected = id;
    view.render(state);
  },
});

const filterButtons = document.querySelectorAll("[data-filter]");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.filter = btn.dataset.filter;
    filterButtons.forEach((b) =>
      b.classList.toggle("active", b.dataset.filter === state.filter),
    );
    view.render(state);
  });
});

// ---- theme (dark by default, persisted) ----
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(theme === "light"));
}

function storedTheme() {
  try {
    return localStorage?.getItem("theme");
  } catch {
    return null;
  }
}

const stored = storedTheme();
applyTheme(stored === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("theme", next);
  } catch {
    // storage unavailable (sandboxed context) — theme still applies for this session
  }
  applyTheme(next);
});

view.render(state);
