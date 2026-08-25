// Boot: owns the app state and routes every interaction through
// a single render pass. Nothing else writes to the stage.
import { createGraphView } from "./src/render.js";

const state = { selected: "chat-client", filter: "all" };

const view = createGraphView(document, {
  onSelect: id => {
    state.selected = id;
    view.render(state);
  }
});

const filterButtons = document.querySelectorAll("[data-filter]");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    state.filter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.toggle("active", b.dataset.filter === state.filter));
    view.render(state);
  });
});

view.render(state);
