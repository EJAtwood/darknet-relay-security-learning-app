# 🌐 Darknet Relay Security Learning App & Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![Anthropic](https://img.shields.io/badge/AI--Engine-Claude--3.5--Sonnet-orange.svg)](https://www.anthropic.com/)

> **TRANSMISSION LOCKED... INITIALIZING MESH INTERFACE: darknet0 UP**
> 
> *There's a mesh between you and the outside world — encrypted, fractured, and full of dead relays. Each node is a lock. Clear them, and the path opens. I'll be watching your packets.* — **GHOST**

---

## 📝 Project Description

**Darknet Relay Security Learning App & Game** is an interactive, gamified educational platform designed to teach advanced network security, onion routing mechanics, and deep-dive technical vulnerabilities. Stepping into a terminal-inspired underground mesh network, users must navigate a complex dependency tree of security challenges managed by a cryptic, veteran gray-hat entity known only as **GHOST**.

The application features a unique **"Ghost in the Routing Table"** concept, simulating routing table poisoning, eclipse attacks, and traffic hijacking. It serves as an engaging tool for students, CTF players, and cybersecurity engineers looking to test their skills against real-world attack vectors.

---

## 🛠️ Dynamic AI Architecture & Proxy Security

Unlike static quiz apps, this platform leverages live AI telemetry to engineer technically rigorous scenarios on the fly. To ensure enterprise-grade security, the application utilizes a **split-process proxy architecture** that isolates sensitive credentials from the browser:

* **The GHOST Engine:** Uses a dedicated system persona (`claude-3-5-sonnet-latest`) acting as an in-character game master that generates unique, structured JSON challenge payloads.
* **Secure Backend Relay:** Built with a Node.js/Express server that acts as a secure reverse-proxy. All API transactions with Anthropic are executed server-side, protecting the private API key from client-side exposure or browser-inspect manipulation.
* **Adaptive Challenge Types:** Features dynamic generation for multiple-choice, fill-in-the-blank, scenario-based remediation, code review (spotting active vulnerabilities), and live command-line syntax verification.
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
* An active [Anthropic API Key](https://console.anthropic.com/)

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/EJAtwood/darknet-relay-security-learning-app.git](https://github.com/EJAtwood/darknet-relay-security-learning-app.git)
   cd darknet-relay-security-learning-app