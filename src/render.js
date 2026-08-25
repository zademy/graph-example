// render(state): the ONLY writer of the stage's visual channels —
// edges, nodes, labels, selection halo, panel, trace pill and count.
// state = { selected: ConceptId, filter: "all" | "review" | "section" }
import { graph } from "./graph.js";
import { record } from "./record.js";
import { concepts, edgePairs, zones, W, H } from "./data.js";

const svgNS = "http://www.w3.org/2000/svg";

const statusStyles = {
  understood: { fill:"#DFAE7B", stroke:"none", radius:5 },
  practicing: { fill:"#12151F", stroke:"#DFAE7B", radius:5 },
  introduced: { fill:"#6E7890", stroke:"none", radius:3.5 },
  "not yet": { fill:"#2A3244", stroke:"none", radius:3.5 }
};

function svgEl(doc, name, attrs = {}) {
  const el = doc.createElementNS(svgNS, name);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  return el;
}

// A concept passes the filter if it matches, or if it IS the selection
// (mirrors Altitude: the traced node stays visible under any filter).
function passesFilter(id, state) {
  if (state.filter === "all") return true;
  if (id === state.selected) return true;
  const n = graph.node(id);
  if (state.filter === "review") return !!n?.review;
  if (state.filter === "section") return n?.section === graph.sectionOf(state.selected);
  return true;
}

function countText(state) {
  const total = concepts.length;
  if (state.filter === "review") {
    const due = concepts.filter(n => n.review).length;
    return `${due} of ${total} concepts due for review`;
  }
  if (state.filter === "section") {
    const section = graph.sectionOf(state.selected);
    const inSection = concepts.filter(n => n.section === section).length;
    return `${inSection} of ${total} concepts in this section`;
  }
  const lit = concepts.filter(n => n.status === "understood" || n.status === "practicing").length;
  return `${lit} of ${total} concepts on the tree`;
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
    t.textContent = z.label;
    zonesLayer.appendChild(t);
  });

  edgePairs.forEach(([a, b], i) => {
    const A = graph.node(a), B = graph.node(b);
    if (!A || !B) return;
    const line = svgEl(doc, "line", {
      x1:A.x, y1:A.y, x2:B.x, y2:B.y, class:"edge",
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

    const style = statusStyles[n.status] || statusStyles["not yet"];
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
      "aria-label":`${n.id}, ${n.status}`
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
    const n = graph.node(state.selected);
    if (!n) return;

    // selection halo ("sol")
    selectionLayer.replaceChildren();
    selectionLayer.append(
      svgEl(doc, "circle", { cx:n.x, cy:n.y, r:20, class:"solar-glow sun-c" }),
      svgEl(doc, "circle", { cx:n.x, cy:n.y, r:17, class:"solar-glow sun-a" }),
      svgEl(doc, "circle", { cx:n.x, cy:n.y, r:11, class:"solar-glow sun-b" })
    );

    const linked = graph.neighbors(state.selected);

    edgeEls.forEach(edge => {
      const touches = edge.dataset.a === state.selected || edge.dataset.b === state.selected;
      const bothVisible = passesFilter(edge.dataset.a, state) && passesFilter(edge.dataset.b, state);
      const isActive = touches && bothVisible;
      edge.classList.toggle("active", isActive);
      edge.classList.toggle("dim", !isActive);
    });

    nodeGroups.forEach((group, id) => {
      const visible = passesFilter(id, state);
      group.classList.toggle("dim", visible && !linked.has(id));
      group.style.opacity = visible ? "" : ".08";
    });

    labelEls.forEach((label, id) => {
      const visible = passesFilter(id, state);
      label.classList.toggle("active", id === state.selected);
      label.classList.toggle("dim", visible && !linked.has(id));
      label.style.display = visible ? "" : "none";
    });

    doc.getElementById("traceName").textContent = state.selected;
    doc.getElementById("countText").textContent = countText(state);
    updatePanel(state.selected);
  }

  function updatePanel(id) {
    const d = record(id);
    const n = graph.node(id);

    sideInner.style.animation = "none";
    void sideInner.offsetWidth;
    sideInner.style.animation = "";

    doc.getElementById("sideName").textContent = id;
    doc.getElementById("statusTag").textContent = d.status;
    doc.getElementById("sideDesc").textContent = d.desc;
    doc.getElementById("ctaBtn").textContent = d.cta;
    doc.getElementById("sideNote").textContent = d.note;

    const light = doc.getElementById("statusLight");
    light.style.background = n?.status === "not yet" ? "#4d576b" : "#dfae7b";
    light.style.boxShadow = n?.status === "not yet"
      ? "0 0 8px rgba(77,87,107,.3)"
      : "0 0 16px rgba(223,174,123,.65)";

    const evidence = doc.getElementById("evidence");
    evidence.replaceChildren();
    d.evidence.forEach(([text, meta]) => {
      const item = doc.createElement("div");
      item.className = "evidence-item";
      item.innerHTML = `<div class="evidence-text"></div><div class="evidence-meta"></div>`;
      item.children[0].textContent = text;
      item.children[1].textContent = meta;
      evidence.appendChild(item);
    });

    const meta = doc.getElementById("meta");
    meta.replaceChildren();
    [
      ["Last reviewed", d.reviewed],
      ["Introduced in", d.introduced],
      ["Unlocks", d.unlocks]
    ].forEach(([k, v]) => {
      const row = doc.createElement("div");
      row.className = "meta-row";
      row.innerHTML = `<span class="k"></span><span class="v"></span>`;
      row.children[0].textContent = k;
      row.children[1].textContent = v;
      meta.appendChild(row);
    });
  }

  return { render };
}
