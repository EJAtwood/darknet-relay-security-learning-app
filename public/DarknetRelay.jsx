//import { useState, useEffect, useRef, useCallback } from "react";
const { useState, useEffect, useRef, useCallback } = React;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DOMAINS = [
  { id: "encryption", label: "ENCRYPTION & PKI", icon: "🔐", tier: "core" },
  { id: "certs", label: "CERT MANAGEMENT", icon: "📜", tier: "core" },
  { id: "api_security", label: "API SECURITY", icon: "⚡", tier: "core" },
  { id: "appsec", label: "APP SECURITY", icon: "🛡️", tier: "core" },
  { id: "cloud", label: "CLOUD SECURITY", icon: "☁️", tier: "core" },
  { id: "ai_security", label: "AI SECURITY", icon: "🤖", tier: "advanced" },
  { id: "linux", label: "LINUX FOUNDATIONS", icon: "🐧", tier: "mid" },
  { id: "vulns", label: "VULN MANAGEMENT", icon: "🔍", tier: "mid" },
  { id: "redteam", label: "RED TEAMING", icon: "🗡️", tier: "mid" },
  { id: "pentest", label: "PENETRATION TESTING", icon: "💀", tier: "mid" },
  { id: "threat_intel", label: "THREAT INTEL", icon: "👁️", tier: "advanced" },
  { id: "secdev", label: "SECURE DEV", icon: "⚙️", tier: "advanced" },
  { id: "dlp", label: "DATA LOSS PREV.", icon: "🚫", tier: "advanced" },
  { id: "endpoint", label: "ENDPOINT PROTECT.", icon: "💻", tier: "advanced" },
];

const MESH_NODES = [
  { id: "N01", domain: "encryption", x: 50, y: 80, prereqs: [] },
  { id: "N02", domain: "certs", x: 200, y: 40, prereqs: ["N01"] },
  { id: "N03", domain: "api_security", x: 350, y: 80, prereqs: ["N01"] },
  { id: "N04", domain: "linux", x: 150, y: 160, prereqs: ["N01"] },
  { id: "N05", domain: "appsec", x: 300, y: 160, prereqs: ["N03"] },
  { id: "N06", domain: "vulns", x: 450, y: 40, prereqs: ["N02", "N03"] },
  { id: "N07", domain: "cloud", x: 500, y: 140, prereqs: ["N03", "N05"] },
  { id: "N08", domain: "redteam", x: 250, y: 240, prereqs: ["N04", "N05"] },
  { id: "N09", domain: "pentest", x: 400, y: 240, prereqs: ["N06", "N08"] },
  { id: "N10", domain: "secdev", x: 600, y: 80, prereqs: ["N06", "N07"] },
  { id: "N11", domain: "threat_intel", x: 550, y: 200, prereqs: ["N07", "N09"] },
  { id: "N12", domain: "ai_security", x: 680, y: 160, prereqs: ["N10", "N11"] },
  { id: "N13", domain: "dlp", x: 350, y: 310, prereqs: ["N08", "N09"] },
  { id: "N14", domain: "endpoint", x: 600, y: 300, prereqs: ["N11", "N13"] },
];

const EDGES = [
  ["N01","N02"],["N01","N03"],["N01","N04"],
  ["N02","N06"],["N03","N05"],["N03","N06"],
  ["N04","N08"],["N05","N07"],["N05","N08"],
  ["N06","N09"],["N06","N10"],["N07","N10"],["N07","N11"],
  ["N08","N09"],["N08","N13"],["N09","N11"],["N09","N13"],
  ["N10","N12"],["N11","N12"],["N11","N14"],["N13","N14"],
];

const GHOST_PERSONA = `You are GHOST — an entity of unknown origin communicating through an encrypted underground mesh network. Your tone is terse, cryptic, and slightly threatening, but ultimately helpful. You speak like a veteran black-hat who decided to go gray. You use networking and security metaphors constantly. You never reveal your true identity or location. You generate cybersecurity challenges as structured JSON only — no prose outside the JSON object. All challenges must be technically accurate, intermediate-to-advanced level, with a bias toward API security, cloud security, application security, and AI security topics. Never generate beginner content. Always respond with ONLY valid JSON, no markdown, no code blocks, no explanation outside the JSON.`;

const BOOT_LINES = [
  "BIOS v2.3.1 ... [OK]",
  "Loading kernel modules ...",
  "Initializing network stack ...",
  "Probing encrypted mesh interfaces ...",
  "MESH INTERFACE: darknet0 UP",
  "Attempting peer discovery ...",
  "PEERS FOUND: 1 (anonymous)",
  "Establishing encrypted channel ...",
  "TLS 1.3 handshake complete",
  "SIGNAL LOCKED",
  ">> INCOMING TRANSMISSION <<",
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');

  :root {
    --green: #00ff41;
    --green-dim: #00c832;
    --green-dark: #003d0f;
    --green-glow: rgba(0,255,65,0.15);
    --amber: #ffb700;
    --amber-dim: #cc9200;
    --red: #ff3131;
    --blue: #00d4ff;
    --bg: #050a05;
    --bg2: #0a120a;
    --bg3: #0f1a0f;
    --border: rgba(0,255,65,0.2);
    --border-bright: rgba(0,255,65,0.5);
    --mono: 'Share Tech Mono', 'Courier New', monospace;
    --display: 'VT323', monospace;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .dr-root {
    background: var(--bg);
    color: var(--green);
    font-family: var(--mono);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .scanlines {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.08) 2px,
      rgba(0,0,0,0.08) 4px
    );
    pointer-events: none;
    z-index: 9999;
  }

  .vignette {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%);
    pointer-events: none;
    z-index: 9998;
  }

  /* BOOT */
  .boot-screen {
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    min-height: 100vh; padding: 2rem;
  }
  .boot-ascii {
    font-family: var(--display);
    font-size: clamp(28px, 5vw, 52px);
    color: var(--green);
    text-align: center;
    line-height: 1.1;
    text-shadow: 0 0 20px var(--green);
    margin-bottom: 2rem;
    letter-spacing: 2px;
  }
  .boot-subtitle {
    font-size: 13px; color: var(--green-dim); letter-spacing: 0.2em;
    margin-bottom: 2.5rem; text-align: center;
  }
  .boot-log {
    width: 100%; max-width: 560px;
    background: var(--bg2);
    border: 1px solid var(--border);
    padding: 1.25rem 1.5rem;
    font-size: 13px;
    line-height: 1.9;
  }
  .boot-log-line { color: var(--green-dim); }
  .boot-log-line.highlight { color: var(--green); }
  .boot-log-line.amber { color: var(--amber); }
  .blink { animation: blink 1s step-end infinite; }
  @keyframes blink { 50% { opacity: 0; } }

  .ghost-intro {
    max-width: 560px; width: 100%;
    margin-top: 1.5rem;
    border: 1px solid var(--border-bright);
    background: var(--bg2);
    padding: 1.25rem 1.5rem;
    font-size: 13px; line-height: 1.8;
    color: var(--amber);
  }
  .ghost-tag { color: var(--green); margin-bottom: 0.5rem; font-size: 11px; letter-spacing: 0.15em; }

  .enter-btn {
    margin-top: 1.5rem;
    background: transparent;
    border: 1px solid var(--green);
    color: var(--green);
    font-family: var(--mono);
    font-size: 14px;
    padding: 10px 32px;
    cursor: pointer;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    transition: all 0.2s;
  }
  .enter-btn:hover {
    background: var(--green-glow);
    box-shadow: 0 0 20px var(--green-glow);
  }

  /* STATUS BAR */
  .status-bar {
    position: fixed; top: 0; left: 0; right: 0;
    background: var(--bg2);
    border-bottom: 1px solid var(--border);
    padding: 6px 20px;
    display: flex; align-items: center; gap: 20px;
    font-size: 11px; letter-spacing: 0.12em;
    z-index: 100;
  }
  .status-item { color: var(--green-dim); display: flex; align-items: center; gap: 6px; }
  .status-val { color: var(--green); }
  .status-sep { color: var(--border-bright); }
  .status-signal { margin-left: auto; color: var(--green-dim); }
  .pulse { display: inline-block; width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse 2s ease infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }

  /* MESH MAP */
  .mesh-screen { padding: 60px 20px 20px; min-height: 100vh; }
  .mesh-header { text-align: center; margin-bottom: 1.5rem; }
  .mesh-title { font-family: var(--display); font-size: 32px; color: var(--green); letter-spacing: 3px; }
  .mesh-sub { font-size: 11px; color: var(--green-dim); letter-spacing: 0.15em; margin-top: 4px; }

  .ghost-panel {
    max-width: 720px; margin: 0 auto 1.5rem;
    background: var(--bg2); border: 1px solid var(--border);
    padding: 1rem 1.25rem;
  }
  .ghost-msg { font-size: 13px; color: var(--amber); line-height: 1.7; }
  .ghost-msg .g-tag { font-size: 10px; color: var(--green-dim); letter-spacing: 0.15em; display: block; margin-bottom: 4px; }

  .mesh-container { max-width: 800px; margin: 0 auto; }
  .mesh-svg-wrap {
    background: var(--bg2);
    border: 1px solid var(--border);
    padding: 1rem;
    overflow-x: auto;
  }

  .node-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; margin-top: 1rem; }
  .node-card {
    background: var(--bg3); border: 1px solid var(--border);
    padding: 10px 12px; cursor: pointer;
    transition: all 0.15s;
    position: relative;
  }
  .node-card.unlocked { border-color: var(--green-dim); }
  .node-card.available { border-color: var(--green); cursor: pointer; }
  .node-card.available:hover { background: var(--green-glow); box-shadow: 0 0 12px var(--green-glow); }
  .node-card.completed { border-color: var(--green); background: rgba(0,255,65,0.05); }
  .node-card.locked { opacity: 0.4; cursor: not-allowed; }
  .node-id { font-size: 10px; color: var(--green-dim); letter-spacing: 0.12em; }
  .node-domain { font-size: 12px; color: var(--green); margin-top: 2px; }
  .node-status { font-size: 10px; margin-top: 6px; }
  .node-status.done { color: var(--green); }
  .node-status.avail { color: var(--amber); }
  .node-status.lock { color: #444; }
  .completed-badge {
    position: absolute; top: 6px; right: 8px;
    font-size: 10px; color: var(--green);
  }

  /* CHALLENGE SCREEN */
  .challenge-screen { padding: 60px 20px 20px; min-height: 100vh; max-width: 800px; margin: 0 auto; }
  .node-header { margin-bottom: 1.25rem; }
  .node-id-big { font-family: var(--display); font-size: 22px; color: var(--green); letter-spacing: 3px; }
  .node-meta { font-size: 11px; color: var(--green-dim); letter-spacing: 0.12em; margin-top: 2px; }

  .ghost-brief {
    background: var(--bg2); border: 1px solid var(--border-bright);
    border-left: 3px solid var(--amber);
    padding: 1rem 1.25rem; margin-bottom: 1.25rem;
  }
  .ghost-brief .tag { font-size: 10px; color: var(--amber); letter-spacing: 0.15em; margin-bottom: 6px; }
  .ghost-brief p { font-size: 13px; color: var(--amber); line-height: 1.75; }

  .challenge-box {
    background: var(--bg2); border: 1px solid var(--border);
    padding: 1.25rem; margin-bottom: 1rem;
  }
  .challenge-type-tag { font-size: 10px; color: var(--green-dim); letter-spacing: 0.15em; margin-bottom: 10px; }
  .challenge-q { font-size: 14px; color: var(--green); line-height: 1.75; margin-bottom: 1.25rem; }

  /* Code block in challenge */
  .code-block {
    background: #000; border: 1px solid var(--border);
    padding: 1rem; margin: 0.75rem 0 1rem;
    font-family: var(--mono); font-size: 12px; color: #ccc;
    white-space: pre; overflow-x: auto; line-height: 1.6;
  }

  .options { display: flex; flex-direction: column; gap: 8px; }
  .option-btn {
    background: var(--bg3); border: 1px solid var(--border);
    color: var(--green); font-family: var(--mono); font-size: 13px;
    padding: 10px 14px; text-align: left; cursor: pointer;
    transition: all 0.15s; display: flex; align-items: flex-start; gap: 10px;
  }
  .option-btn:hover:not(:disabled) { background: var(--green-glow); border-color: var(--green); }
  .option-btn.selected { border-color: var(--green); background: var(--green-glow); }
  .option-btn.correct { border-color: var(--green); background: rgba(0,255,65,0.15); color: var(--green); }
  .option-btn.wrong { border-color: var(--red); background: rgba(255,49,49,0.1); color: var(--red); }
  .option-btn:disabled { cursor: default; }
  .opt-letter { color: var(--green-dim); min-width: 18px; }

  .text-input {
    width: 100%; background: var(--bg3); border: 1px solid var(--border);
    color: var(--green); font-family: var(--mono); font-size: 13px;
    padding: 10px 14px; outline: none;
  }
  .text-input:focus { border-color: var(--green); }

  .submit-row { display: flex; gap: 10px; margin-top: 10px; align-items: center; }
  .btn-primary {
    background: transparent; border: 1px solid var(--green);
    color: var(--green); font-family: var(--mono); font-size: 13px;
    padding: 8px 20px; cursor: pointer; letter-spacing: 0.1em;
    transition: all 0.15s;
  }
  .btn-primary:hover { background: var(--green-glow); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-secondary {
    background: transparent; border: 1px solid var(--border);
    color: var(--green-dim); font-family: var(--mono); font-size: 12px;
    padding: 8px 14px; cursor: pointer; letter-spacing: 0.08em;
    transition: all 0.15s;
  }
  .btn-secondary:hover { border-color: var(--amber); color: var(--amber); }
  .btn-secondary:disabled { opacity: 0.3; cursor: not-allowed; }

  .hint-area {
    background: var(--bg2); border: 1px solid rgba(255,183,0,0.3);
    border-left: 2px solid var(--amber);
    padding: 10px 14px; margin-top: 12px;
    font-size: 12px; color: var(--amber); line-height: 1.7;
  }
  .hint-label { font-size: 10px; letter-spacing: 0.12em; margin-bottom: 4px; opacity: 0.7; }

  .result-box {
    padding: 1rem 1.25rem; margin-top: 1rem;
    border: 1px solid;
  }
  .result-box.pass { border-color: var(--green); background: rgba(0,255,65,0.06); }
  .result-box.fail { border-color: var(--red); background: rgba(255,49,49,0.06); }
  .result-status { font-family: var(--display); font-size: 22px; letter-spacing: 3px; margin-bottom: 8px; }
  .result-status.pass { color: var(--green); }
  .result-status.fail { color: var(--red); }
  .ghost-react { font-size: 13px; color: var(--amber); line-height: 1.75; margin-bottom: 10px; }
  .explanation {
    background: var(--bg3); border: 1px solid var(--border);
    padding: 10px 14px; margin-top: 10px;
    font-size: 12.5px; color: #88cc88; line-height: 1.8;
  }
  .explanation .expl-tag { font-size: 10px; color: var(--green-dim); letter-spacing: 0.12em; margin-bottom: 6px; }

  /* LOADING STATE */
  .loading-state { text-align: center; padding: 3rem; }
  .loading-icon { font-family: var(--display); font-size: 40px; color: var(--green); }
  .loading-text { font-size: 13px; color: var(--green-dim); margin-top: 1rem; }
  .dots::after { content: ''; animation: dots 1.5s steps(4,end) infinite; }
  @keyframes dots { 0%{content:''} 25%{content:'.'} 50%{content:'..'} 75%{content:'...'} 100%{content:''} }

  /* SCRAMBLE text */
  .scramble { display: inline-block; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); }

  .back-btn {
    background: transparent; border: none; color: var(--green-dim);
    font-family: var(--mono); font-size: 12px; cursor: pointer;
    letter-spacing: 0.1em; padding: 0; margin-bottom: 1rem; display: flex; align-items: center; gap: 6px;
  }
  .back-btn:hover { color: var(--green); }

  .tokens-warn { color: var(--red); font-size: 11px; }
  .progress-wrap { max-width: 720px; margin: 0 auto 1rem; }
  .progress-bar-bg { background: var(--bg2); border: 1px solid var(--border); height: 6px; }
  .progress-bar-fill { height: 100%; background: var(--green); transition: width 0.5s ease; }
  .progress-label { font-size: 10px; color: var(--green-dim); letter-spacing: 0.12em; margin-bottom: 4px; }

  .glitch {
    animation: glitch 4s ease-in-out infinite;
  }
  @keyframes glitch {
    0%,90%,100% { text-shadow: 0 0 20px var(--green); transform: none; }
    91% { text-shadow: -2px 0 var(--red), 2px 0 var(--blue); transform: skewX(-1deg); }
    93% { text-shadow: 2px 0 var(--red), -2px 0 var(--blue); transform: skewX(1deg); }
    95% { text-shadow: 0 0 20px var(--green); transform: none; }
  }

  .typewriter { overflow: hidden; white-space: pre-wrap; }

  .difficulty-badge {
    display: inline-block; font-size: 10px; letter-spacing: 0.12em;
    padding: 2px 8px; border: 1px solid;
    margin-left: 10px; vertical-align: middle;
  }
  .difficulty-badge.intermediate { color: var(--green); border-color: var(--green); }
  .difficulty-badge.advanced { color: var(--amber); border-color: var(--amber); }
  .difficulty-badge.expert { color: var(--red); border-color: var(--red); }

  textarea.text-input { min-height: 80px; resize: vertical; }

  .error-box {
    background: rgba(255,49,49,0.08); border: 1px solid rgba(255,49,49,0.4);
    padding: 10px 14px; font-size: 12px; color: var(--red); line-height: 1.7;
    margin-top: 1rem;
  }
`;

// ─── GHOST CHAT (Typewriter) ──────────────────────────────────────────────────
function TypewriterText({ text, speed = 18, color = "var(--amber)" }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return <span style={{ color, whiteSpace: "pre-wrap" }}>{displayed}</span>;
}

// ─── API CALL ─────────────────────────────────────────────────────────────────
async function callGhost(domain, difficulty, challengeType) {
  const domainLabel = DOMAINS.find(d => d.id === domain)?.label || domain;
  
  const typeInstructions = {
    multiple_choice: "Generate a multiple_choice challenge with exactly 4 options (A, B, C, D). correct_answer must be the full text of the correct option.",
    fill_blank: "Generate a fill_blank challenge. question should have a [BLANK] placeholder. correct_answer is the exact string expected.",
    scenario: "Generate a scenario challenge. Present a realistic scenario and ask what the practitioner should do or what is happening. correct_answer is a short phrase (3-8 words) the user must match approximately.",
    code_review: "Generate a code_review challenge. Include a code snippet (10-20 lines) in the question field using actual newlines. Ask the user to identify the vulnerability. correct_answer is a short phrase naming the vulnerability.",
    command: "Generate a command challenge. Ask the user to construct or complete a CLI command. correct_answer is the exact command or critical flag/value.",
  };

  // Hit your proxy endpoint instead of Anthropic directly
  const res = await fetch("http://localhost:5000/api/ghost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      domainLabel,
      difficulty,
      challengeType,
      typeInstructions: typeInstructions[challengeType]
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}`);
  
  // The server already parsed and cleaned the JSON object, so just return it
  return await res.json();
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
//export default function DarknetRelay() {
function  DarknetRelay() {
  const [screen, setScreen] = useState("boot");
  const [bootLine, setBootLine] = useState(0);
  const [showGhostIntro, setShowGhostIntro] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  // Game state
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dr_completed") || "[]"); } catch { return []; }
  });
  const [signalTokens, setSignalTokens] = useState(() => {
    try { return parseInt(localStorage.getItem("dr_tokens") || "10"); } catch { return 10; }
  });

  // Challenge state
  const [activeNode, setActiveNode] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null); // {pass, ghost_react, explanation}
  const [hintsUsed, setHintsUsed] = useState(0);
  const [ghostMsg, setGhostMsg] = useState("The mesh is unstable. Clear the blockages — or rot in that room forever. Your choice.");

  // Persist
  useEffect(() => {
    localStorage.setItem("dr_completed", JSON.stringify(completed));
  }, [completed]);
  useEffect(() => {
    localStorage.setItem("dr_tokens", signalTokens.toString());
  }, [signalTokens]);

  // Boot sequence
  useEffect(() => {
    if (screen !== "boot") return;
    if (bootLine < BOOT_LINES.length) {
      const t = setTimeout(() => setBootLine(b => b + 1), bootLine === 0 ? 300 : 220);
      return () => clearTimeout(t);
    } else {
      const t1 = setTimeout(() => setShowGhostIntro(true), 400);
      const t2 = setTimeout(() => setShowEnter(true), 2200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [bootLine, screen]);

  const getNodeStatus = useCallback((node) => {
    if (completed.includes(node.id)) return "completed";
    const prereqsMet = node.prereqs.every(p => completed.includes(p));
    return prereqsMet ? "available" : "locked";
  }, [completed]);

  const pickChallengeMeta = () => {
    const types = ["multiple_choice", "fill_blank", "scenario", "code_review", "command"];
    const difficulties = ["intermediate", "advanced", "expert"];
    const weights = [0.3, 0.4, 0.3];
    const r = Math.random();
    let diff = "intermediate";
    let acc = 0;
    for (let i = 0; i < weights.length; i++) { acc += weights[i]; if (r < acc) { diff = difficulties[i]; break; } }
    return { type: types[Math.floor(Math.random() * types.length)], difficulty: diff };
  };

  const openNode = async (node) => {
    const status = getNodeStatus(node);
    if (status === "locked") return;
    setActiveNode(node);
    setChallenge(null);
    setAnswer("");
    setSubmitted(false);
    setResult(null);
    setHintsUsed(0);
    setError(null);
    setScreen("challenge");
    setLoading(true);
    try {
      const { type, difficulty } = pickChallengeMeta();
      const ch = await callGhost(node.domain, difficulty, type);
      setChallenge(ch);
    } catch (e) {
      setError("SIGNAL LOST. GHOST is unreachable. Check your API connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = () => {
    if (!challenge || !answer.trim()) return;
    setSubmitted(true);
    const correct = challenge.correct_answer?.toLowerCase().trim();
    const given = answer.toLowerCase().trim();
    let pass = false;
    if (challenge.challenge_type === "multiple_choice") {
      pass = answer === challenge.correct_answer;
    } else {
      // fuzzy: check if given contains the key term or vice versa
      pass = given === correct || correct.includes(given) || given.includes(correct.split(" ").slice(0,3).join(" "));
    }
    setResult({
      pass,
      ghost_react: pass ? challenge.ghost_reaction_pass : challenge.ghost_reaction_fail,
      explanation: challenge.explanation,
    });
    if (pass && !completed.includes(activeNode.id)) {
      const newCompleted = [...completed, activeNode.id];
      setCompleted(newCompleted);
      const nextMsg = newCompleted.length >= MESH_NODES.length
        ? "All nodes cleared. The door is unlocking. Don't look for me after this."
        : `Node ${activeNode.id} cleared. ${MESH_NODES.length - newCompleted.length} blockages remain in the mesh.`;
      setGhostMsg(nextMsg);
    }
  };

  const useHint = () => {
    if (signalTokens <= 0 || hintsUsed >= 3) return;
    setSignalTokens(t => t - 1);
    setHintsUsed(h => h + 1);
  };

  const completedCount = completed.length;
  const progressPct = Math.round((completedCount / MESH_NODES.length) * 100);

  // ── RENDER: BOOT ─────────────────────────────────────────────────────────
  if (screen === "boot") {
    return (
      <>
        <style>{css}</style>
        <div className="dr-root">
          <div className="scanlines" />
          <div className="vignette" />
          <div className="boot-screen">
            <div className="boot-ascii glitch">
              {"DARKNET\nRELAY"}
            </div>
            <div className="boot-subtitle">// THE GHOST IN THE ROUTING TABLE //</div>
            <div className="boot-log">
              {BOOT_LINES.slice(0, bootLine).map((line, i) => (
                <div key={i} className={`boot-log-line ${line.includes(">>") ? "amber" : line.includes("[OK]") || line.includes("UP") || line.includes("LOCKED") || line.includes("complete") ? "highlight" : ""}`}>
                  {line}
                </div>
              ))}
              {bootLine < BOOT_LINES.length && <span className="blink">█</span>}
            </div>
            {showGhostIntro && (
              <div className="ghost-intro">
                <div className="ghost-tag">// INCOMING :: GHOST @ DARKNET0 //</div>
                <TypewriterText
                  text={"You don't know where you are. Neither do I.\n\nThere's a mesh between you and the outside world — encrypted, fractured, and full of dead relays. Each node is a lock. Clear them, and the path opens.\n\nI'll be watching your packets."}
                  speed={20}
                />
              </div>
            )}
            {showEnter && (
              <button className="enter-btn" onClick={() => setScreen("mesh")}>
                [ JACK IN ]
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  // ── RENDER: MESH MAP ─────────────────────────────────────────────────────
  if (screen === "mesh") {
    return (
      <>
        <style>{css}</style>
        <div className="dr-root">
          <div className="scanlines" />
          <div className="vignette" />

          <div className="status-bar">
            <div className="status-item"><span className="pulse" /><span className="status-val">DARKNET0</span></div>
            <div className="status-sep">|</div>
            <div className="status-item">NODES CLEARED: <span className="status-val">{completedCount}/{MESH_NODES.length}</span></div>
            <div className="status-sep">|</div>
            <div className="status-item">SIGNAL TOKENS: <span className="status-val" style={{ color: signalTokens < 3 ? "var(--red)" : "var(--green)" }}>{signalTokens}</span></div>
            <div className="status-sep">|</div>
            <div className="status-item">ESCAPE: <span className="status-val">{progressPct}%</span></div>
            <div className="status-signal">▓▓░░░ ENCRYPTED</div>
          </div>

          <div className="mesh-screen">
            <div className="mesh-header">
              <div className="mesh-title glitch">MESH TOPOLOGY</div>
              <div className="mesh-sub">// SELECT A NODE TO ATTEMPT — LOCKED NODES REQUIRE PREREQUISITES //</div>
            </div>

            <div className="progress-wrap">
              <div className="progress-label">ESCAPE ROUTE PROGRESS</div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            <div className="ghost-panel">
              <div className="ghost-msg">
                <span className="g-tag">// GHOST TRANSMISSION //</span>
                {ghostMsg}
              </div>
            </div>

            <div className="mesh-container">
              <div className="node-grid">
                {MESH_NODES.map(node => {
                  const status = getNodeStatus(node);
                  const domain = DOMAINS.find(d => d.id === node.domain);
                  return (
                    <div
                      key={node.id}
                      className={`node-card ${status}`}
                      onClick={() => status !== "locked" && openNode(node)}
                    >
                      {status === "completed" && <div className="completed-badge">[✓]</div>}
                      <div className="node-id">{node.id}</div>
                      <div className="node-domain">{domain?.icon} {domain?.label}</div>
                      <div className={`node-status ${status === "completed" ? "done" : status === "available" ? "avail" : "lock"}`}>
                        {status === "completed" ? "// CLEARED //" : status === "available" ? ">> AVAILABLE <<" : "[ LOCKED ]"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── RENDER: CHALLENGE ─────────────────────────────────────────────────────
  if (screen === "challenge") {
    const domain = DOMAINS.find(d => d.id === activeNode?.domain);
    const isMultiChoice = challenge?.challenge_type === "multiple_choice";
    const isText = ["fill_blank", "scenario", "code_review", "command"].includes(challenge?.challenge_type);

    return (
      <>
        <style>{css}</style>
        <div className="dr-root">
          <div className="scanlines" />
          <div className="vignette" />

          <div className="status-bar">
            <div className="status-item"><span className="pulse" /><span className="status-val">DARKNET0</span></div>
            <div className="status-sep">|</div>
            <div className="status-item">NODES CLEARED: <span className="status-val">{completedCount}/{MESH_NODES.length}</span></div>
            <div className="status-sep">|</div>
            <div className="status-item">SIGNAL TOKENS: <span className="status-val" style={{ color: signalTokens < 3 ? "var(--red)" : "var(--green)" }}>{signalTokens}</span></div>
            <div className="status-signal">▓▓░░░ ENCRYPTED</div>
          </div>

          <div className="challenge-screen">
            <button className="back-btn" onClick={() => setScreen("mesh")}>
              ← BACK TO MESH
            </button>

            <div className="node-header">
              <div className="node-id-big">
                {loading ? `${activeNode?.id} :: ROUTING...` : (challenge?.node_id || `${activeNode?.id} :: LOADING`)}
                {challenge && (
                  <span className={`difficulty-badge ${challenge.difficulty}`}>
                    {challenge.difficulty?.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="node-meta">DOMAIN :: {domain?.label} {domain?.icon}</div>
            </div>

            {loading && (
              <div className="loading-state">
                <div className="loading-icon">◈</div>
                <div className="loading-text">GHOST IS ROUTING YOUR CHALLENGE<span className="dots" /></div>
              </div>
            )}

            {error && (
              <div className="error-box">
                <div style={{ marginBottom: 6, letterSpacing: "0.1em" }}>// TRANSMISSION ERROR //</div>
                {error}
                <div style={{ marginTop: 10 }}>
                  <button className="btn-primary" onClick={() => openNode(activeNode)}>RETRY CONNECTION</button>
                </div>
              </div>
            )}

            {challenge && !loading && (
              <>
                <div className="ghost-brief">
                  <div className="tag">// GHOST BRIEFING //</div>
                  <p><TypewriterText text={challenge.ghost_briefing} speed={14} /></p>
                </div>

                <div className="challenge-box">
                  <div className="challenge-type-tag">
                    // CHALLENGE TYPE :: {challenge.challenge_type?.replace("_", " ").toUpperCase()} //
                  </div>
                  <div className="challenge-q">
                    {challenge.question?.split("```").map((part, i) =>
                      i % 2 === 1
                        ? <div key={i} className="code-block">{part.replace(/^[a-z]+\n/, "")}</div>
                        : <span key={i}>{part}</span>
                    )}
                  </div>

                  {isMultiChoice && !submitted && (
                    <div className="options">
                      {challenge.options?.map((opt, i) => (
                        <button
                          key={i}
                          className={`option-btn ${answer === opt ? "selected" : ""}`}
                          onClick={() => setAnswer(opt)}
                          disabled={submitted}
                        >
                          <span className="opt-letter">{opt.charAt(0)}.</span>
                          <span>{opt.slice(3)}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {isMultiChoice && submitted && (
                    <div className="options">
                      {challenge.options?.map((opt, i) => {
                        const isCorrect = opt === challenge.correct_answer;
                        const isSelected = opt === answer;
                        return (
                          <button key={i} className={`option-btn ${isCorrect ? "correct" : isSelected ? "wrong" : ""}`} disabled>
                            <span className="opt-letter">{opt.charAt(0)}.</span>
                            <span>{opt.slice(3)}</span>
                            {isCorrect && " ✓"}
                            {isSelected && !isCorrect && " ✗"}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isText && (
                    <textarea
                      className="text-input"
                      placeholder={
                        challenge.challenge_type === "command"
                          ? "$ Enter your command here..."
                          : ">> Type your answer..."
                      }
                      value={answer}
                      onChange={e => setAnswer(e.target.value)}
                      disabled={submitted}
                      style={{ minHeight: challenge.challenge_type === "scenario" ? "100px" : "60px" }}
                    />
                  )}

                  {!submitted && (
                    <div className="submit-row">
                      <button
                        className="btn-primary"
                        onClick={checkAnswer}
                        disabled={!answer.trim()}
                      >
                        TRANSMIT ANSWER
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={useHint}
                        disabled={hintsUsed >= 3 || signalTokens <= 0}
                      >
                        {hintsUsed >= 3 ? "NO MORE HINTS" : `REQUEST HINT [-1 TOKEN] (${3 - hintsUsed} left)`}
                      </button>
                      {signalTokens <= 0 && <span className="tokens-warn">OUT OF TOKENS</span>}
                    </div>
                  )}

                  {hintsUsed > 0 && !submitted && (
                    <div className="hint-area">
                      <div className="hint-label">// SIGNAL INTERCEPT — HINT {hintsUsed}/3 //</div>
                      {challenge.hints?.[hintsUsed - 1]}
                    </div>
                  )}
                </div>

                {result && (
                  <div className={`result-box ${result.pass ? "pass" : "fail"}`}>
                    <div className={`result-status ${result.pass ? "pass" : "fail"}`}>
                      {result.pass ? "[ NODE CLEARED ]" : "[ TRANSMISSION FAILED ]"}
                    </div>
                    <div className="ghost-react">
                      <span style={{ color: "var(--green-dim)", fontSize: 10, letterSpacing: "0.12em", display: "block", marginBottom: 4 }}>// GHOST //</span>
                      {result.ghost_react}
                    </div>
                    {!result.pass && (
                      <div style={{ fontSize: 12, color: "var(--green-dim)", marginBottom: 8 }}>
                        CORRECT ANSWER: <span style={{ color: "var(--green)" }}>{challenge.correct_answer}</span>
                      </div>
                    )}
                    <div className="explanation">
                      <div className="expl-tag">// TECHNICAL DEBRIEF //</div>
                      {result.explanation}
                    </div>
                    <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                      {result.pass && (
                        <button className="btn-primary" onClick={() => setScreen("mesh")}>
                          RETURN TO MESH
                        </button>
                      )}
                      {!result.pass && (
                        <>
                          <button className="btn-primary" onClick={() => openNode(activeNode)}>
                            RETRY NODE
                          </button>
                          <button className="btn-secondary" onClick={() => setScreen("mesh")}>
                            BACK TO MESH
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  return null;
}
