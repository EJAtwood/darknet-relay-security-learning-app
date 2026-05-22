# 🌐 Darknet Relay Security Learning App & Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Anthropic](https://img.shields.io/badge/AI--Engine-Claude--Sonnet-orange.svg)](https://www.anthropic.com/)

> **TRANSMISSION LOCKED... INITIALIZING MESH INTERFACE: darknet0 UP**
> 
> *There's a mesh between you and the outside world — encrypted, fractured, and full of dead relays. Each node is a lock. Clear them, and the path opens. I'll be watching your packets.* — **GHOST**

---

## 📝 Project Description

**Darknet Relay Security Learning App & Game** is an interactive, gamified educational platform designed to teach advanced network security, onion routing mechanics, and deep-dive technical vulnerabilities. Stepping into a terminal-inspired underground mesh network, users must navigate a complex dependency tree of security challenges managed by a cryptic, veteran gray-hat entity known only as **GHOST**.

The application features a unique **"Ghost in the Routing Table"** concept, simulating routing table poisoning, eclipse attacks, and traffic hijacking. It serves as an engaging tool for students, CTF players, and cybersecurity engineers looking to test their skills against real-world attack vectors.

---

## 🛠️ Dynamic AI Architecture

Unlike static quiz apps, this platform leverages live AI telemetry to engineer technically rigorous scenarios on the fly:

* **The GHOST Engine:** Uses a dedicated system persona (`claude-sonnet-4-20250514`) acting as an in-character game master that generates unique, structured JSON challenge payloads.
* **Adaptive Challenge Types:** Features dynamic generation for multiple-choice, fill-in-the-blank, scenario-based remediation, code review (spotting active vulnerabilities), and live command-line syntax verification.
* **Targeted Learning Focus:** Advanced technical modules specifically biased toward **API Security**, **Cloud Infrastructure**, **Application Security (AppSec)**, and **AI Security** threat models.
* **Signal Token Mechanics:** A built-in gamified economy where users spend limited "Signal Tokens" to intercept hints when stuck on complex nodes.

---

## 🗺️ Mesh Network Domains (Syllabus Map)

To escape the network, users must unlock and clear 14 distinct security domains mapped across a strict dependency topology:

| Tier | Core Foundations | Mid-Tier Defenses | Advanced Engineering |
| :--- | :--- | :--- | :--- |
| **Domains** | • Encryption & PKI<br>• Cert Management<br>• API Security<br>• App Security | • Linux Foundations<br>• Vuln Management<br>• Red Teaming<br>• Penetration Testing | • Cloud Security<br>• Threat Intel<br>• Secure Dev (SecDevOps)<br>• Data Loss Prevention<br>• Endpoint Protection<br>• AI Security |

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* An active [Anthropic API Key](https://console.anthropic.com/) (to power the GHOST challenge generation)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/EJAtwood/darknet-relay-security-learning-app.git](https://github.com/EJAtwood/darknet-relay-security-learning-app.git)
   cd darknet-relay-security-learning-app
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your API credentials:

Code snippet
VITE_ANTHROPIC_API_KEY=your_claude_api_key_here
Launch the Development Server:

Bash
npm run dev
Open your browser and navigate to http://localhost:5173 to jack into the mesh.

🎛️ Project Structure
Plaintext
darknet-relay-security-learning-app/
├── DarknetRelay.jsx     # Main React Engine (UI layout, state engine, & API integration)
├── LICENSE              # MIT License open-source terms
└── README.md            # System documentation