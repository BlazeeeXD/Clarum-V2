# Clarum

# Understand. Build. Use.

Clarum is an AI-powered platform that makes open-source software accessible to everyone.

Whether you're a developer joining an unfamiliar project or someone who simply wants to install a GitHub application without understanding thousands of lines of code, Clarum guides you through the entire journey.

Instead of treating GitHub as a collection of repositories, Clarum transforms it into a software platform where projects can be understood, explored, and installed through guided experiences.

---

## Why Clarum Exists

GitHub is home to millions of incredible open-source projects.

The problem isn't finding them.

The problem is using them.

For developers, the biggest challenge is understanding someone else's architecture.

For everyone else, the biggest challenge is simply getting the software running.

A typical repository expects users to already know:

* Git
* Package managers
* Virtual environments
* Programming languages
* Command-line tools
* Dependency management

Most READMEs assume prior knowledge.

Clarum doesn't.

Every explanation, every installation step, and every recommendation is generated with one philosophy:

> Never assume the user already knows anything.

---

# What Clarum Does

Clarum provides two independent workflows built on top of the same repository analysis engine.

## Learn

Understand how a repository works.

Receive:

* Project overview
* AI architecture summary
* Interactive dependency graph
* Repository blueprint
* First-day learning roadmap

Perfect for:

* Students
* Contributors
* Junior developers
* Engineers joining new teams

---

## Build

Install and use open-source software without decoding complicated documentation.

Receive:

* Step-by-step installation guide
* Dependency explanations
* Download links
* Progress tracking
* Troubleshooting suggestions

Perfect for:

* Non-technical users
* First-time GitHub users
* Open-source enthusiasts
* Developers who just want software working quickly

---

## Projects

Every repository you analyze is saved locally.

Continue exactly where you left off without creating an account.

Project history includes:

* Repository name
* Installation progress
* Last opened date
* Completion status

Everything is stored locally.

No login required.

---

# Core Features

## Repository Understanding

Paste any public GitHub repository and receive:

* Project purpose
* Framework detection
* File statistics
* Architecture overview
* Module breakdown
* Data flow explanation

---

## Interactive Blueprint

Generate an interactive dependency graph showing:

* Internal imports
* File relationships
* Module boundaries
* Repository structure

Powered by:

* NetworkX
* React Flow
* Dagre

---

## AI Architecture Summary

Instead of reading hundreds of source files, Clarum generates a developer-friendly explanation covering:

* Overall architecture
* Core modules
* Responsibilities
* System boundaries
* Data flow

The AI explains architecture—not just code.

---

## Guided Learning Path

Rather than opening random files, Clarum recommends exactly what to read first.

Each recommendation includes:

* File name
* Why it matters
* Learning objective
* Suggested reading order

Making onboarding significantly faster.

---

## Guided Installation

Build mode generates an installation experience instead of traditional documentation.

Each installation step explains:

* What you're doing
* Why it's necessary
* Exactly what to click
* Commands to run
* Expected results

Installation becomes a guided checklist rather than a README.

---

## Installation Overview

Before installation begins, Clarum summarizes:

* Project name
* Repository description
* Estimated setup time
* Number of installation steps
* Difficulty
* Required software
* Supported operating systems

---

## Progress Tracking

Every completed installation step updates a persistent progress tracker.

Users always know:

* Current step
* Remaining work
* Overall completion

Progress is automatically saved locally.

---

## Built-in Troubleshooting

Every installation step includes expandable troubleshooting.

Examples include:

* Command not recognized
* Missing dependency
* Permission issues
* Incorrect software version
* Environment variable problems

Helping users solve common issues without searching through forums.

---

## Local Workspace

Clarum remembers every repository analyzed.

Each project stores:

* Repository URL
* Current progress
* Last opened timestamp
* Installation status

All data remains on the user's computer.

No accounts.

No cloud synchronization.

No unnecessary complexity.

---

# System Architecture

Clarum follows a deterministic-first architecture.

```text
GitHub Repository
        │
        ▼
Repository Validation
        │
        ▼
Repository Scanner
        │
        ├──────────────┐
        ▼              ▼
Dependency Graph   Framework Detection
        │              │
        └──────┬───────┘
               ▼
 Repository Context
               │
               ▼
Gemini Analysis
               │
               ▼
Validated JSON
               │
     ┌─────────┴──────────┐
     ▼                    ▼
 Learn Workflow      Build Workflow
     │                    │
     ▼                    ▼
React Frontend      Installation Guide
```

The repository is scanned only once.

Both Learn and Build consume the same deterministic analysis.

---

# Repository Analysis Pipeline

## Step 1 — Repository Ingestion

Users submit a public GitHub repository URL.

The backend:

* Validates the repository
* Normalizes URLs
* Checks the analysis cache

Previously analyzed repositories are served instantly.

---

## Step 2 — Repository Extraction

Using GitPython:

* Repository cloning
* File tree traversal
* Binary file filtering
* Source code discovery

---

## Step 3 — Deterministic Analysis

The repository scanner extracts:

* File counts
* Languages
* Frameworks
* Imports
* Internal dependencies

NetworkX converts relationships into a directed dependency graph.

---

## Step 4 — AI Synthesis

Gemini receives structured repository metadata rather than raw assumptions.

The model generates:

* Architecture summary
* Learning roadmap
* Developer explanation
* Installation guidance

Structured responses are validated using Pydantic before being returned.

---

## Step 5 — Frontend Rendering

The React frontend consumes validated JSON and renders:

* Blueprint
* Learning path
* Installation guide
* Progress tracker
* Repository overview

No manual configuration required.

---

# Build Workflow

Build mode transforms repositories into installation guides.

```text
Repository URL
      │
      ▼
Repository Analysis
      │
      ▼
Dependency Detection
      │
      ▼
Installation Planner
      │
      ▼
Step Generation
      │
      ▼
Progress Tracker
```

Each installation step includes:

* Explanation
* Required software
* Commands
* Download links
* Completion tracking
* Troubleshooting

The experience is designed for users with little or no programming background.

---

# Learn Workflow

Learn mode focuses on understanding software architecture.

Outputs include:

* Mission brief
* Framework detection
* Dependency visualization
* AI explanation
* Learning roadmap

Designed to reduce onboarding time for developers joining unfamiliar projects.

---

# Frontend Architecture

The frontend follows a simple philosophy:

> One screen. One purpose.

Major sections include:

* Home
* Learn
* Build
* Projects

Built with:

* React 18
* Vite
* Tailwind CSS
* Framer Motion
* React Flow
* Dagre
* Axios

---

## Home

Introduces Clarum.

Provides entry points into:

* Learn
* Build
* Projects

---

## Learn

Displays:

* Repository overview
* Blueprint
* Architecture summary
* Learning roadmap

---

## Build

Displays:

* Installation overview
* Progress tracker
* Guided installation
* Troubleshooting

---

## Projects

Displays locally saved repositories with:

* Name
* Progress
* Status
* Last updated

Allowing users to continue exactly where they stopped.

---

# Backend Architecture

Built using FastAPI and a modular service architecture.

Core modules include:

## Repository Service

Responsible for:

* Repository validation
* Cloning
* Cache lookup

---

## Repository Scanner

Extracts:

* Frameworks
* File statistics
* Imports
* Dependency relationships

---

## Installation Planner

Generates:

* Required software
* Installation sequence
* Platform-specific instructions

---

## AI Service

Responsible for:

* Prompt construction
* Gemini communication
* JSON validation
* Architecture synthesis

---

## Cache Layer

Stores completed analyses to avoid unnecessary rescanning and repeated AI inference.

---

# Engineering Decisions

## Deterministic First

Facts are extracted using deterministic analysis.

The AI explains those facts.

This minimizes hallucinations while maintaining readable explanations.

---

## Async Backend

FastAPI runs as an ASGI application on Uvicorn.

Network-bound operations such as repository access and AI requests execute asynchronously, allowing workers to continue serving other requests while waiting for external services.

---

## Defensive Validation

All AI responses are validated using Pydantic schemas.

The frontend never consumes raw language model output directly.

This creates a stable contract between backend and UI.

---

## Client-side Persistence

Project history and installation progress are stored locally.

Benefits include:

* Faster reloads
* Offline progress
* Privacy
* No authentication

---

## Edge Deployment

The frontend is deployed on Vercel.

Static assets are served from edge locations worldwide for low-latency delivery.

---

## SQLite Abstraction

SQLite provides lightweight persistence during development.

The SQLAlchemy layer allows migration to PostgreSQL without changing application logic when higher concurrency is required.

---

# Tech Stack

## Frontend

* React 18
* Vite
* Tailwind CSS
* React Flow
* Dagre
* Framer Motion
* Axios

---

## Backend

* Python 3.12
* FastAPI
* SQLAlchemy
* SQLite
* GitPython
* NetworkX
* Google Gemini
* Pydantic v2

---

## Deployment

Frontend

* Vercel

Backend

* Render

---

# Local Development

## Requirements

* Node.js 18+
* Python 3.12+
* Git
* Gemini API Key

---

## Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Create:

```env
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=sqlite:///./clarum.db
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Project Structure

```text
clarum/

backend/
│
├── app/
│   ├── api/
│   ├── analyzers/
│   ├── services/
│   ├── models/
│   ├── cache/
│   ├── planners/
│   └── main.py
│
├── requirements.txt
└── clarum.db

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── api/
│   ├── utils/
│   └── App.jsx
│
├── package.json
└── vite.config.js

README.md
```

---

# Example Outputs

## Learn

* Repository overview
* AI architecture summary
* Interactive dependency graph
* Learning roadmap

---

## Build

* Installation overview
* Guided setup
* Progress tracking
* Troubleshooting
* Local project persistence

---

# Roadmap

Future improvements include:

* AI-assisted troubleshooting for uncommon installation errors
* Automatic operating system detection
* Hardware compatibility checks
* Docker environment generation
* One-click dependency verification
* Support for additional repository ecosystems
* Team workspaces and optional cloud synchronization

---

# What This Project Demonstrates

* Repository analysis systems
* Dependency graph generation
* AI-assisted developer tooling
* Guided installation generation
* Asynchronous backend architecture
* Defensive API design
* Structured AI pipelines
* Frontend state management
* Client-side persistence
* Interactive visualization
* Production deployment workflows
* Human-centered software onboarding

---

# Project Status

**Actively Developed**

Clarum is evolving into a platform that makes open-source software easier to understand, easier to install, and easier to return to.

Instead of asking users to learn GitHub before they can use great software, Clarum brings the software to the user—through guided learning, guided installation, and persistent project workspaces.
