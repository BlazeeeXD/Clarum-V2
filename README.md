# Clarum.

Understand any codebase in minutes. A deterministic code extractor paired with generative AI to create beautiful, interactive system blueprints and onboarding paths for developers.

## The Architecture
* **Frontend:** React, Vite, Tailwind CSS, React Flow (Apple-inspired UI/UX)
* **Backend:** FastAPI, SQLite, GitPython, Google GenAI (Gemini 2.5 Flash)
* **Graph Engine:** NetworkX + Dagre

## Fail-Safe Demo Links
If you are testing this during a live demo or experiencing API limits, use these pre-cached links. The system will bypass the extraction phase and instantly render the cached system blueprints:
1. `https://github.com/your-username/your-first-cached-repo`
2. `https://github.com/your-username/your-second-cached-repo`

## Local Setup
1. Clone the repo.
2. Add your `GEMINI_API_KEY` to `backend/.env`.
3. Run `uvicorn app.main:app` in `/backend`.
4. Run `npm run dev` in `/frontend`.