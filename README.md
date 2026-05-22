# 🌐 Darknet Relay Security Learning App & Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![Anthropic](https://img.shields.io/badge/AI--Engine-Claude--Haiku-orange.svg?style=flat&logo=anthropic)](https://www.anthropic.com/claude/haiku)

> **TRANSMISSION LOCKED... INITIALIZING MESH INTERFACE: darknet0 UP**
> 
> *There's a mesh between you and the outside world — encrypted, fractured, and full of dead relays. Each node is a lock. Clear them, and the path opens. I'll be watching your packets.* — **GHOST**


**Darknet Relay Security Learning App & Game** is an interactive, gamified educational platform designed to teach advanced network security, onion routing mechanics, and deep-dive technical vulnerabilities. Stepping into a terminal-inspired underground mesh network, users must navigate a complex dependency tree of security challenges managed by a cryptic, veteran gray-hat entity known only as **GHOST**. 

The application features a unique **"Ghost in the Routing Table"** concept, simulating routing table poisoning, eclipse attacks, and traffic hijacking. It serves as an engaging tool for students, CTF players, and cybersecurity engineers looking to test their skills against real-world attack vectors.

---
## 📝 Project Description

## 🛠️ Dynamic AI Architecture & Proxy Security
Unlike static quiz apps, this platform leverages live AI telemetry to engineer technically rigorous scenarios on the fly. To ensure enterprise-grade security, the application utilizes a **split-process proxy architecture** that isolates sensitive credentials from the browser:

* **The GHOST Engine:** Uses a dedicated system persona (`claude-haiku-4-5`) acting as an in-character game master that generates unique, structured JSON challenge payloads.
* **Secure Backend Relay:** Built with a Node.js/Express server that acts as a secure reverse-proxy. All API transactions with Anthropic are executed server-side, protecting the private API key from client-side exposure or browser-inspect manipulation.

---

<div align="center">
  <img src="docs/Darknet Relay Mesh Node Landing Page.png" alt="Darknet Relay Boot Sequence" width="45%"/>
  <img src="docs/Darknet Relay Node 1.png" alt="Active Terminal Interface" width="45%"/>
</div>

---

## 🚀 Getting Started & Local Installation

Follow these steps to isolate your environment, configure your secure API proxy, and spin up the GHOST terminal mesh interface locally.

### 1. Environment Isolation (Python venv)
If you are managing your project workspace inside a Python virtual environment to isolate background utility scripts, initialize and activate it first:

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate

Linux/macOS:
Bash
python3 -m venv .venv
source .venv/bin/activate

2. Clone the Repository & Install Dependencies
Clone down the source code and install the required core Node.js packages for both the backend proxy engine and the local static host.

Bash
# Clone the repository
git clone [https://github.com/EJAtwood/darknet-relay-security-learning-app.git](https://github.com/EJAtwood/darknet-relay-security-learning-app.git)
cd darknet-relay-security-learning-app

# Install the required production packages & the latest Anthropic SDK
npm install express dotenv cors @anthropic-ai/sdk@latest

# Install the local development server utility
npm install -g serve
3. Provision an Anthropic API Key
The GHOST engine relies on live telemetry from Claude to formulate unique technical challenges.

Navigate to the Anthropic Developer Console at https://platform.claude.com/dashboard

Create an account and fund your balance (testing can easily be started with a minimum baseline of $5.00).

Go to the API Keys section, generate a new private token, and copy it.

In the root directory of your project, create a file named .env and map your credential:

Code snippet
ANTHROPIC_API_KEY=your_actual_api_key_here
⚠️ Security Guardrail: Ensure your .env and node_modules/ files are added to your local .gitignore so secrets are never staged or accidentally pushed to a public repository.

4. Fire Up the Secure Stack
Because this application utilizes a secure split-process architecture to defend against client-side API manipulation, you must run the backend and frontend services concurrently in separate terminals.

Terminal 1: Initialize the Secure Backend Relay
This launches the Node.js reverse-proxy that signs and handles outbound data streams securely.

Bash
node server/GhostServer.js
Expected Output: Verification log indicating the proxy server is listening on port 5000.

Terminal 2: Host the Interface Core
To keep your backend architecture and environment configurations entirely inaccessible to the browser DOM, explicitly serve only the compiled web root folder:

Bash
npx serve public
Expected Output: A local hosting address (typically http://localhost:3000).

5. Access the Interface
Open your web browser and navigate to the address provided by your static server:

Plaintext
http://localhost:3000
Note: If you experience a blank layout initialization stall, ensure your browser is not universally blocking third-party storage mechanisms for local network boundaries (whitelist http://localhost:3000 inside your browser cookie permissions if a localStorage exception triggers).

📸 Interface Preview
Once the dual-stack architecture stabilizes, the GHOST cryptographic terminal will fully initialize:
=======
