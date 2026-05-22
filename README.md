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

<div align="center">
  <img src="docs/Darknet%20Relay%20Mesh%20Node%20Landing%20Page.png" alt="Darknet Relay Boot Sequence" width="48%"/>
  <img src="docs/Darknet%20Relay%20Node%201.png" alt="Active Terminal Interface" width="48%"/>
</div>

<br/>

**Darknet Relay Security Learning App & Game** is an interactive, gamified educational platform designed to teach advanced network security, onion routing mechanics, and deep-dive technical vulnerabilities. Stepping into a terminal-inspired underground mesh network, users must navigate a complex dependency tree of security challenges managed by a cryptic, veteran gray-hat entity known only as **GHOST**. 

The application features a unique **"Ghost in the Routing Table"** concept, simulating routing table poisoning, eclipse attacks, and traffic hijacking. It serves as an engaging tool for students, CTF players, and cybersecurity engineers looking to test their skills against real-world attack vectors.

---

## 🛠️ Dynamic AI Architecture & Proxy Security
Unlike static quiz apps, this platform leverages live AI telemetry to engineer technically rigorous scenarios on the fly. To ensure enterprise-grade security, the application utilizes a **split-process proxy architecture** that isolates sensitive credentials from the browser:

* **The GHOST Engine:** Uses a dedicated system persona (`claude-3-5-sonnet-latest`) acting as an in-character game master that generates unique, structured JSON challenge payloads.
* **Secure Backend Relay:** Built with a Node.js/Express server that acts as a secure reverse-proxy. All API transactions with Anthropic are executed server-side, protecting the private API key from client-side exposure or browser-inspect manipulation.

---

## 🚀 Getting Started & Local Installation

Follow these steps to isolate your environment, configure your secure API proxy, and spin up the GHOST terminal mesh interface locally.

### 1. Environment Isolation (Python venv)
If you are managing your project workspace inside a Python virtual environment to isolate background utility scripts, initialize and activate it first:

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
