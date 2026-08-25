// render(state): the ONLY writer of the stage's visual channels —
// edges, nodes, labels, selection halo, panel, trace pill and count.
// state = { selected: ConceptId, filter: "all" | "review" | "section" }
import { graph } from "./graph.js";
import { record } from "./record.js";
import { concepts, edgePairs, zones, SECTION_LABELS, W, H } from "./data.js";

const svgNS = "http://www.w3.org/2000/svg";

const statusStyles = {
  understood: { fill:"#DFAE7B", stroke:"none", radius:5 },
  practicing: { fill:"#12151F", stroke:"#DFAE7B", radius:5 },
  introduced: { fill:"#6E7890", stroke:"none", radius:3.5 },
  "not yet": { fill:"#2A3244", stroke:"none", radius:3.5 }
};

// One shared switch over the filter: predicate for visibility, text for
// the header count. A concept passes if it matches, or if it IS the
// selection (the traced node stays visible under any filter).
const FILTERS = {
  all: {
    matches: () => true,
    count: () => {
      const lit = concepts.filter(n => n.status === "understood" || n.status === "practicing").length;
      return `${lit} of ${concepts.length} concepts on the tree`;
    }
  },
  review: {
    matches: n => !!n.review,
    count: () => {
      const due = concepts.filter(n => n.review).length;
      return `${due} of ${concepts.length} concepts due for review`;
    }
  },
  section: {
    matches: (n, state) => n.section === graph.sectionOf(state.selected),
    count: (state) => {
      const section = graph.sectionOf(state.selected);
      const inSection = concepts.filter(n => n.section === section).length;
      return `${inSection} of ${concepts.length} concepts in this section`;
    }
  }
};

function passesFilter(id, state) {
  if (id === state.selected) return true;
  return FILTERS[state.filter].matches(graph.node(id), state);
}

function svgEl(doc, name, attrs = {}) {
  const el = doc.createElementNS(svgNS, name);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  return el;
}

export function createGraphView(doc, { onSelect } = {}) {
  const edgesLayer = doc.getElementById("edgesLayer");
  const zonesLayer = doc.getElementById("zonesLayer");
  const nodesLayer = doc.getElementById("nodesLayer");
  const selectionLayer = doc.getElementById("selectionLayer");
  const labelsLayer = doc.getElementById("labelsLayer");
  const sideInner = doc.getElementById("sideInner");

  const edgeEls = [];
  const nodeGroups = new Map();
  const labelEls = new Map();

  // ---- static construction (zones, edges, nodes, labels) ----
  zones.forEach(z => {
    const t = svgEl(doc, "text", { x:z.x, y:z.y, class:"zone" });
    t.textContent = SECTION_LABELS[z.section];
    zonesLayer.appendChild(t);
  });

  edgePairs.forEach(([a, b], i) => {
    const from = graph.node(a), to = graph.node(b);
    if (!from || !to) return;
    const line = svgEl(doc, "line", {
      x1:from.x, y1:from.y, x2:to.x, y2:to.y, class:"edge",
      "data-a":a, "data-b":b
    });
    line.style.animationDelay = `${-(i % 8) * .18}s`;
    edgesLayer.appendChild(line);
    edgeEls.push(line);
  });

  concepts.forEach(n => {
    const g = svgEl(doc, "g", { class:"node-set", "data-id":n.id });

    if (n.review) {
      g.appendChild(svgEl(doc, "circle", { cx:n.x, cy:n.y, r:9, class:"review-ring" }));
    }

    // the node's look is driven by the record's status — one owner
    const style = statusStyles[record(n.id).status] || statusStyles["not yet"];
    const core = svgEl(doc, "circle", {
      cx:n.x, cy:n.y,
      r:n.selectedRadius || style.radius,
      fill:style.fill,
      class:"node-core"
    });

    if (style.stroke !== "none") {
      core.setAttribute("stroke", style.stroke);
      core.setAttribute("stroke-width", "1.5");
    }

    const hit = svgEl(doc, "circle", {
      cx:n.x, cy:n.y, r:16, class:"node-hit",
      tabindex:"0",
      role:"button",
      "aria-label":`${n.id}, ${record(n.id).status}`
    });

    if (onSelect) {
      hit.addEventListener("click", () => onSelect(n.id));
      hit.addEventListener("keydown", ev => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          onSelect(n.id);
        }
      });
    }

    g.append(core, hit);
    nodesLayer.appendChild(g);
    nodeGroups.set(n.id, g);

    const label = doc.createElement("span");
    label.className = "label" + (n.important ? " important" : "");
    label.textContent = n.id;
    label.style.left = `${n.x / W * 100}%`;
    label.style.top = `${n.y / H * 100}%`;
    label.style.marginTop = n.important ? "-11px" : "10px";
    labelsLayer.appendChild(label);
    labelEls.set(n.id, label);
  });

  // ---- the single render pass ----
  function render(state) {
    const sel = graph.node(state.selected);
    if (!sel) return;

    // selection halo ("sol")
    selectionLayer.replaceChildren();
    selectionLayer.append(
      svgEl(doc, "circle", { cx:sel.x, cy:sel.y, r:20, class:"solar-glow sun-c" }),
      svgEl(doc, "circle", { cx:sel.x, cy:sel.y, r:17, class:"solar-glow sun-a" }),
      svgEl(doc, "circle", { cx:sel.x, cy:sel.y, r:11, class:"solar-glow sun-b" })
    );

    const linked = graph.neighbors(state.selected);

    edgeEls.forEach(edge => {
      const touches = edge.dataset.a === state.selected || edge.dataset.b === state.selected;
      const bothVisible = passesFilter(edge.dataset.a, state) && passesFilter(edge.dataset.b, state);
      const isActive = touches && bothVisible;
      edge.classList.toggle("active", isActive);
      edge.classList.toggle("dim", !isActive);
    });

    const applyVisibility = (el, id) => {
      const visible = passesFilter(id, state);
      el.classList.toggle("dim", visible && !linked.has(id));
      return visible;
    };

    nodeGroups.forEach((group, id) => {
      group.style.opacity = applyVisibility(group, id) ? "" : "0.08";
    });

    labelEls.forEach((label, id) => {
      label.classList.toggle("active", id === state.selected);
      label.style.display = applyVisibility(label, id) ? "" : "none";
    });

    doc.getElementById("traceName").textContent = state.selected;
    doc.getElementById("countText").textContent = FILTERS[state.filter].count(state);
    updatePanel(state.selected);
  }

  function row(parent, className, cells) {
    const el = doc.createElement("div");
    el.className = className;
    cells.forEach(([cellClass, text]) => {
      const cell = doc.createElement("div");
      cell.className = cellClass;
      cell.textContent = text;
      el.appendChild(cell);
    });
    parent.appendChild(el);
  }

  function updatePanel(id) {
    const rec = record(id);
    const notYet = rec.status === "not yet";

    sideInner.style.animation = "none";
    void sideInner.offsetWidth;
    sideInner.style.animation = "";

    doc.getElementById("sideName").textContent = id;
    doc.getElementById("statusTag").textContent = rec.status;
    doc.getElementById("sideDesc").textContent = rec.desc;
    doc.getElementById("ctaBtn").textContent = rec.cta;
    doc.getElementById("sideNote").textContent = rec.note;

    const light = doc.getElementById("statusLight");
    light.style.background = notYet ? "#4d576b" : "#dfae7b";
    light.style.boxShadow = notYet
      ? "0 0 8px rgba(77,87,107,.3)"
      : "0 0 16px rgba(223,174,123,.65)";

    const evidence = doc.getElementById("evidence");
    evidence.replaceChildren();
    rec.evidence.forEach(([text, meta]) => row(evidence, "evidence-item", [["evidence-text", text], ["evidence-meta", meta]]));

    const meta = doc.getElementById("meta");
    meta.replaceChildren();
    [
      ["Last reviewed", rec.reviewed],
      ["Introduced in", rec.introduced],
      ["Unlocks", rec.unlocks]
    ].forEach(([k, v]) => row(meta, "meta-row", [["k", k], ["v", v]]));
  }

  return { render };
}
