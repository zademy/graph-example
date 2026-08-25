(() => {
  const svgNS = "http://www.w3.org/2000/svg";
  const W = 570, H = 495;

  const statusStyles = {
    understood: { fill:"#DFAE7B", stroke:"none", radius:5 },
    practicing: { fill:"#12151F", stroke:"#DFAE7B", radius:5 },
    introduced: { fill:"#6E7890", stroke:"none", radius:3.5 },
    "not yet": { fill:"#2A3244", stroke:"none", radius:3.5 }
  };

  const nodes = [
    {id:"terminal-basics", x:92,y:118,status:"understood",important:true,review:true, section:"terminal"},
    {id:"git-and-commits", x:135,y:168,status:"practicing",important:true,review:true, section:"terminal"},
    {id:"file-system", x:38,y:168,status:"not yet", section:"terminal"},
    {id:"branches", x:97,y:255,status:"not yet", section:"terminal"},
    {id:"push-remotes", x:160,y:229,status:"not yet", section:"terminal"},
    {id:"reading-a-diff", x:190,y:128,status:"introduced", section:"terminal"},
    {id:"dissecting-ai", x:205,y:244,status:"introduced", section:"terminal"},
    {id:"the-browser", x:60,y:288,status:"not yet", section:"web"},
    {id:"dev-server", x:155,y:281,status:"practicing",important:true, section:"web"},
    {id:"html-structure", x:128,y:317,status:"understood",important:true, section:"web"},
    {id:"css-basics", x:90,y:355,status:"understood",important:true, section:"web"},
    {id:"urls-routing", x:180,y:373,status:"not yet", section:"web"},
    {id:"http-requests", x:115,y:393,status:"not yet", section:"web"},

    {id:"variables", x:245,y:228,status:"understood",important:true,selectedRadius:7, section:"javascript"},
    {id:"functions", x:287,y:176,status:"understood",important:true, section:"javascript"},
    {id:"events", x:245,y:290,status:"understood",important:true, section:"javascript"},
    {id:"objects", x:277,y:269,status:"introduced", section:"javascript"},
    {id:"loops", x:300,y:251,status:"not yet", section:"javascript"},
    {id:"arrays", x:330,y:236,status:"not yet", section:"javascript"},
    {id:"json", x:383,y:251,status:"not yet", section:"javascript"},
    {id:"async-await", x:345,y:294,status:"not yet", section:"javascript"},
    {id:"the-dom", x:290,y:324,status:"introduced", section:"javascript"},
    {id:"local-storage", x:375,y:331,status:"not yet", section:"data"},
    {id:"error-messages", x:340,y:362,status:"not yet", section:"data"},
    {id:"debugging", x:300,y:416,status:"not yet", section:"data"},
    {id:"testing-basics", x:370,y:433,status:"not yet", section:"data"},

    {id:"components", x:420,y:140,status:"not yet", section:"react"},
    {id:"props", x:455,y:120,status:"not yet", section:"react"},
    {id:"hooks", x:505,y:153,status:"not yet", section:"react"},
    {id:"state", x:468,y:194,status:"not yet", section:"react"},
    {id:"server-client", x:520,y:187,status:"not yet", section:"react"},
    {id:"next-pages", x:478,y:226,status:"not yet", section:"react"},
    {id:"rendering", x:420,y:231,status:"not yet", section:"react"},
    {id:"conditional-ui", x:510,y:240,status:"not yet", section:"react"},
    {id:"forms", x:465,y:269,status:"not yet", section:"react"},
    {id:"lists-keys", x:430,y:289,status:"not yet", section:"react"},
    {id:"apis", x:478,y:325,status:"not yet", section:"data"},
    {id:"auth", x:530,y:355,status:"not yet", section:"data"},
    {id:"databases", x:420,y:371,status:"not yet", section:"data"},
    {id:"env-vars", x:440,y:422,status:"not yet", section:"data"},
    {id:"deploy", x:492,y:412,status:"not yet", section:"data"}
  ];

  const edgePairs = [
    ["terminal-basics","file-system"],
    ["terminal-basics","git-and-commits"],
    ["terminal-basics","reading-a-diff"],
    ["git-and-commits","reading-a-diff"],
    ["git-and-commits","push-remotes"],
    ["git-and-commits","branches"],
    ["push-remotes","dev-server"],
    ["dev-server","the-browser"],
    ["dev-server","dissecting-ai"],
    ["dev-server","html-structure"],
    ["html-structure","css-basics"],
    ["html-structure","the-dom"],
    ["css-basics","http-requests"],
    ["urls-routing","http-requests"],
    ["urls-routing","the-dom"],

    ["dissecting-ai","variables"],
    ["variables","functions"],
    ["variables","loops"],
    ["variables","events"],
    ["functions","arrays"],
    ["functions","components"],
    ["events","the-dom"],
    ["events","async-await"],
    ["objects","variables"],
    ["objects","the-dom"],
    ["loops","arrays"],
    ["arrays","json"],
    ["json","async-await"],
    ["async-await","apis"],
    ["the-dom","local-storage"],
    ["local-storage","error-messages"],
    ["error-messages","debugging"],
    ["debugging","testing-basics"],

    ["components","props"],
    ["props","hooks"],
    ["components","state"],
    ["state","next-pages"],
    ["state","rendering"],
    ["hooks","server-client"],
    ["next-pages","conditional-ui"],
    ["rendering","lists-keys"],
    ["forms","state"],
    ["forms","lists-keys"],
    ["lists-keys","apis"],
    ["apis","auth"],
    ["apis","databases"],
    ["databases","env-vars"],
    ["env-vars","deploy"],
    ["databases","deploy"],
    ["error-messages","testing-basics"]
  ];

  const details = {
    "variables":{
      status:"practicing",
      desc:"A variable names a piece of data so you can use it later. Scope decides where that name means something.",
      evidence:[
        ["“let for things that change, const for things that don’t.”","your own words · Jul 3, session 9"],
        ["Renamed variables across three files without breaking scope.","observed · Jul 3, session 9"]
      ],
      reviewed:"3 days ago",
      introduced:"Section 2 · The ascent",
      unlocks:"functions, objects, loops",
      cta:"Practicing — check-in Thu",
      note:"Two clean check-ins move this to understood."
    },
    "git-and-commits":{
      status:"practicing",
      desc:"Commits capture meaningful checkpoints. Good history makes your project easier to understand, review and recover.",
      evidence:[
        ["Created a focused commit after verifying the project still ran.","observed · session 8"],
        ["Explained the difference between working tree, staging and commit.","your own words · session 8"]
      ],
      reviewed:"1 day ago",
      introduced:"Section 1 · Base camp",
      unlocks:"branches, push-remotes",
      cta:"Practicing — one more check-in",
      note:"Trace its connected prerequisites to reinforce the concept."
    },
    "functions":{
      status:"understood",
      desc:"Functions group reusable behavior behind a name. Inputs become parameters and the returned value becomes usable elsewhere.",
      evidence:[
        ["Extracted repeated behavior into a function and named its parameters.","observed · session 10"]
      ],
      reviewed:"today",
      introduced:"Section 2 · The ascent",
      unlocks:"arrays, components",
      cta:"Understood — stays lit",
      note:"Future reviews keep this concept from fading."
    },
    "events":{
      status:"understood",
      desc:"Events let your interface react to user actions such as clicks, typing, submit and focus.",
      evidence:[
        ["Connected a click handler that updates the book list.","observed · session 10"]
      ],
      reviewed:"today",
      introduced:"Section 2 · The ascent",
      unlocks:"the-dom, async-await",
      cta:"Understood",
      note:"Evidence-backed mastery."
    }
  };

  const zones = [
    {x:50,y:100,label:"TERMINAL & GIT"},
    {x:263,y:150,label:"JAVASCRIPT"},
    {x:420,y:105,label:"REACT & NEXT"},
    {x:48,y:422,label:"WEB FOUNDATIONS"},
    {x:378,y:462,label:"DATA & SHIPPING"}
  ];

  const nodeMap = new Map(nodes.map(n => [n.id,n]));
  const edgesLayer = document.getElementById("edgesLayer");
  const zonesLayer = document.getElementById("zonesLayer");
  const nodesLayer = document.getElementById("nodesLayer");
  const selectionLayer = document.getElementById("selectionLayer");
  const labelsLayer = document.getElementById("labelsLayer");
  const sideInner = document.getElementById("sideInner");

  const edgeEls = [];
  const nodeGroups = new Map();
  const labelEls = new Map();

  function svgEl(name, attrs={}){
    const el = document.createElementNS(svgNS,name);
    Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k,String(v)));
    return el;
  }

  zones.forEach(z => {
    const t = svgEl("text",{x:z.x,y:z.y,class:"zone"});
    t.textContent = z.label;
    zonesLayer.appendChild(t);
  });

  edgePairs.forEach(([a,b],i) => {
    const A = nodeMap.get(a), B = nodeMap.get(b);
    if(!A || !B) return;
    const line = svgEl("line",{
      x1:A.x,y1:A.y,x2:B.x,y2:B.y,class:"edge",
      "data-a":a,"data-b":b
    });
    line.style.animationDelay = `${-(i%8)*.18}s`;
    edgesLayer.appendChild(line);
    edgeEls.push(line);
  });

  nodes.forEach(n => {
    const g = svgEl("g",{class:"node-set","data-id":n.id});

    if(n.review){
      g.appendChild(svgEl("circle",{cx:n.x,cy:n.y,r:9,class:"review-ring"}));
    }

    const style = statusStyles[n.status];
    const core = svgEl("circle",{
      cx:n.x,cy:n.y,
      r:n.selectedRadius || style.radius,
      fill:style.fill,
      class:"node-core"
    });

    if(style.stroke !== "none"){
      core.setAttribute("stroke",style.stroke);
      core.setAttribute("stroke-width","1.5");
    }

    const hit = svgEl("circle",{
      cx:n.x,cy:n.y,r:16,class:"node-hit",
      tabindex:"0",
      role:"button",
      "aria-label":`${n.id}, ${n.status}`
    });

    hit.addEventListener("click",() => selectNode(n.id));
    hit.addEventListener("keydown",(ev) => {
      if(ev.key === "Enter" || ev.key === " "){
        ev.preventDefault();
        selectNode(n.id);
      }
    });

    g.append(core,hit);
    nodesLayer.appendChild(g);
    nodeGroups.set(n.id,g);

    const label = document.createElement("span");
    label.className = "label" + (n.important ? " important" : "");
    label.textContent = n.id;
    label.style.left = `${n.x/W*100}%`;
    label.style.top = `${n.y/H*100}%`;

    // pequeñas correcciones para separar texto del punto
    const dx = n.x < 100 ? 0 : (n.id === "variables" ? -2 : 0);
    const dy = n.id === "variables" ? -13 : (n.important ? -11 : 10);
    label.style.marginLeft = `${dx}px`;
    label.style.marginTop = `${dy}px`;

    labelsLayer.appendChild(label);
    labelEls.set(n.id,label);
  });

  let selected = "variables";
  let filter = "all";

  function connectedTo(id){
    const set = new Set([id]);
    edgePairs.forEach(([a,b]) => {
      if(a === id) set.add(b);
      if(b === id) set.add(a);
    });
    return set;
  }

  function renderSelection(){
    selectionLayer.replaceChildren();
    const n = nodeMap.get(selected);
    if(!n) return;

    const outer = svgEl("circle",{cx:n.x,cy:n.y,r:20,class:"solar-glow sun-c"});
    const glow  = svgEl("circle",{cx:n.x,cy:n.y,r:17,class:"solar-glow sun-a"});
    const ring  = svgEl("circle",{cx:n.x,cy:n.y,r:11,class:"solar-glow sun-b"});
    selectionLayer.append(outer,glow,ring);

    const linked = connectedTo(selected);

    edgeEls.forEach(edge => {
      const isActive =
        edge.dataset.a === selected ||
        edge.dataset.b === selected;

      edge.classList.toggle("active",isActive);
      edge.classList.toggle("dim",!isActive);
    });

    nodeGroups.forEach((group,id) => {
      group.classList.toggle("dim",!linked.has(id));
    });

    labelEls.forEach((label,id) => {
      label.classList.toggle("active",id === selected);
      label.classList.toggle("dim",!linked.has(id));
    });

    document.getElementById("traceName").textContent = selected;
    updatePanel(selected);
  }

  function genericDetails(id){
    const n = nodeMap.get(id);
    const connected = [...connectedTo(id)].filter(x => x !== id);
    return {
      status:n?.status || "introduced",
      desc:`${id.replaceAll("-"," ")} forma parte del mapa de conocimiento. Selecciona conceptos conectados para seguir sus prerrequisitos y desbloqueos.`,
      evidence:[
        ["Este demo permite asociar evidencia real a cada concepto.","demo interactivo"],
        [`Conectado con ${connected.length} conceptos del grafo.`,`graph relation · local data`]
      ],
      reviewed:n?.status === "not yet" ? "not reviewed yet" : "recently",
      introduced:`${(n?.section || "general").toUpperCase()} section`,
      unlocks:connected.slice(0,4).join(", ") || "—",
      cta:n?.status === "not yet" ? "Not yet — keep climbing" : `${n?.status || "introduced"}`,
      note:"Puedes reemplazar estos datos por los que entregue tu backend."
    };
  }

  function updatePanel(id){
    const d = details[id] || genericDetails(id);
    const n = nodeMap.get(id);

    sideInner.style.animation = "none";
    void sideInner.offsetWidth;
    sideInner.style.animation = "";

    document.getElementById("sideName").textContent = id;
    document.getElementById("statusTag").textContent = d.status;
    document.getElementById("sideDesc").textContent = d.desc;
    document.getElementById("ctaBtn").textContent = d.cta;
    document.getElementById("sideNote").textContent = d.note;

    const light = document.getElementById("statusLight");
    light.style.background = n?.status === "not yet" ? "#4d576b" : "#dfae7b";
    light.style.boxShadow = n?.status === "not yet"
      ? "0 0 8px rgba(77,87,107,.3)"
      : "0 0 16px rgba(223,174,123,.65)";

    const evidence = document.getElementById("evidence");
    evidence.replaceChildren();
    d.evidence.forEach(([text,meta]) => {
      const item = document.createElement("div");
      item.className = "evidence-item";
      item.innerHTML = `<div class="evidence-text"></div><div class="evidence-meta"></div>`;
      item.children[0].textContent = text;
      item.children[1].textContent = meta;
      evidence.appendChild(item);
    });

    const meta = document.getElementById("meta");
    meta.replaceChildren();
    [
      ["Last reviewed",d.reviewed],
      ["Introduced in",d.introduced],
      ["Unlocks",d.unlocks]
    ].forEach(([k,v]) => {
      const row = document.createElement("div");
      row.className = "meta-row";
      row.innerHTML = `<span class="k"></span><span class="v"></span>`;
      row.children[0].textContent = k;
      row.children[1].textContent = v;
      meta.appendChild(row);
    });
  }

  function selectNode(id){
    selected = id;
    renderSelection();
  }

  function applyFilter(mode){
    filter = mode;
    document.querySelectorAll("[data-filter]").forEach(btn => {
      btn.classList.toggle("active",btn.dataset.filter === mode);
    });

    if(mode === "all"){
      nodesLayer.querySelectorAll(".node-set").forEach(g => g.style.opacity = "");
      labelsLayer.querySelectorAll(".label").forEach(l => l.style.display = "");
    }

    if(mode === "review"){
      nodes.forEach(n => {
        const show = !!n.review || n.id === selected;
        nodeGroups.get(n.id).style.opacity = show ? "" : ".08";
        labelEls.get(n.id).style.display = show ? "" : "none";
      });
    }

    if(mode === "section"){
      const currentSection = nodeMap.get(selected)?.section;
      nodes.forEach(n => {
        const show = n.section === currentSection;
        nodeGroups.get(n.id).style.opacity = show ? "" : ".07";
        labelEls.get(n.id).style.display = show ? "" : "none";
      });
    }
  }

  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click",() => applyFilter(btn.dataset.filter));
  });

  selectNode("variables");
})();
