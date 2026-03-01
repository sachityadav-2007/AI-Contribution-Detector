# AI Contribution Detection Tool
*A tool that analyzes GitHub commits and code to detect AI-generated contributions and improve transparency in software development.*

---

## 1. Problem Statement
Developers increasingly use AI tools like ChatGPT and Copilot to generate commit messages, code snippets, documentation, and pull requests. However, Git platforms currently have no system to detect or track AI-generated contributions, leading to issues in transparency, accountability, and code quality. Catching AI-generated code is critical for maintaining academic integrity, enforcing enterprise compliance, and ensuring open-source maintainers understand the code they are reviewing.

---

## 2. Solution Overview
Our web tool provides an automated way to estimate whether a commit or a piece of code was AI-generated. 
- **Repository Scan**: Paste any public GitHub repository URL and target branch. The tool fetches recent commits via the GitHub API and scores each commit message.
- **Direct Text Analysis**: Paste a raw commit message or code snippet directly into the tool for an instant AI-likelihood score.

---

## 3. Features
* **Direct Text Analysis**: Instantly score pasted code or commit messages.
* **Repository Commit Scan**: Fetch and analyze the latest commits directly from any public GitHub repository.
* **AI Score + Explanation**: Get a 0-100% likelihood score along with clear, bulleted reasons (e.g., "AI-style wording detected", "Short commit message").
* **Risk Badge + Chart**: Visualize repository health with a beautiful distribution bar chart (`recharts`) and color-coded risk badges (🔴 High, 🟡 Medium, 🟢 Low).
* **Branch Support**: Target specific branches (e.g., `main`, `develop`) during repository scans.

---

## 4. Tech Stack
* **Frontend**: React, Tailwind CSS, Recharts, Lucide Icons
* **Backend**: Node.js, Express.js
* **Integrations**: GitHub Public API
* **Build Tool**: Vite

---

## 5. Demo Instructions

### Frontend (React + Vite)
```bash
# From project root
npm install
npm run dev
# → Runs at http://localhost:5173
```

### Backend (Express API)
```bash
cd backend
npm install
node server.js
# → Runs at http://127.0.0.1:5001
```

> **Note**: Both servers must be running. The Vite development server automatically proxies `/analyze` and `/scan-repo` requests to the Express backend to avoid CORS issues.

---

## 6. Roles & Responsibilities

| Member Name | Role | Responsibilities |
| :--- | :--- | :--- |
| Sachit Kumar | Frontend | UI/UX Design, React Components, Recharts Integration |
| Azmol Wasim Hussain | Frontend, Backend | API Proxy Setup, Frontend Wiring, API Testing |
| Yash Borkar | Backend, Database | Express Server, GitHub API Integration, AI Scoring Logic |

---

## 7. System Architecture

### High-Level Flow

Developer/User
↓
Frontend (React Web App)
↓
Backend API (Node.js)
↓
AI Detection Engine
↓
Database
↓
Analytics Dashboard
↓
Response to User

### Architecture Description

Our system has five main components:

1. **Frontend (React Web App)**
   The user pastes a commit message or code snippet and clicks Analyze.

2. **Backend API**
   Receives the request and sends the data to the detection engine.

3. **AI Detection Engine**
   Uses rule-based logic to detect AI-style patterns and calculate an AI Likelihood Score.

4. **Database**
   Stores commit data, AI scores, and analytics information.

5. **Analytics Dashboard**
   Shows AI usage statistics like contributor trends and AI usage percentage.

This architecture helps teams detect AI-generated contributions and maintain transparency in their repositories.

---

## 8. Database Design

Database will store:

* User details
* Repository details
* Commit data
* AI Likelihood scores
* Analytics reports

---

## 9. Dataset Selected

### Dataset Name
Sample GitHub Commit Dataset (Public repositories)

### Source
GitHub public repositories / manually collected commits

### Data Type
Text data (commit messages) + code snippets

### Selection Reason
Needed real commit messages and code samples to identify AI-like patterns.

### Preprocessing Steps
* Remove duplicates
* Clean formatting
* Tokenize text
* Normalize code structure

---

## 10. Model Selected

### Model Name
Rule-based Heuristic Detection (Initial Version)

### Selection Reasoning
Hackathon time limit requires a simple but working prototype.

### Alternatives Considered
* GPT-based classifier
* BERT text classifier
* Code similarity models

### Evaluation Metrics
* Accuracy
* Precision
* Recall
* False Positive Rate

---

## 11. API Documentation & Testing

### API Endpoints List
* `/analyze` – Analyze direct text
* `/scan-repo` – Analyze repository commits (with `repoUrl` and `branch` params)

---

## 12. Module-wise Development & Deliverables

### Checkpoint 1: Research & Planning
* Finalize idea
* Create README
* Define architecture

### Checkpoint 2: Backend Development
* Express server setup
* Rule-based scoring engine
* GitHub API integration

### Checkpoint 3: Frontend Development
* React setup with Vite and Tailwind
* RepositoryAnalyzer forms and tables
* Recharts integration for AI Score distribution

### Checkpoint 4: Model Training
* (To be added / Future Scope)

### Checkpoint 5: Model Integration
* Connected Express score generator to Frontend

### Checkpoint 6: Deployment
* (To be added)

---

## 13. End-to-End Workflow

1. User submits Repository URL or direct text
2. Frontend sends request to backend proxy
3. Backend fetches commits (if repo URL provided) or analyzes direct text
4. Detection logic calculates AI score between 0-100%
5. Results are returned to the frontend
6. Commit arrays are sorted by risk and rendered mapping specific risks
7. Distribution chart tallies results to show overall proportion

---

## 14. Demo & Video

* Live Demo Link: To be added
* Demo Video Link: To be added
* GitHub Repository: To be added

---

## 15. Hackathon Deliverables Summary

* AI Contribution Detection Tool prototype
* Rule-based detection system
* Distribution dashboard
* GitHub repository with documentation

---

## 16. Future Scope & Scalability

### Short-Term
* Improve detection accuracy
* Full private-repo GitHub API integration

### Long-Term
* ML-based detection model replacing Rule-Based heuristics
* Browser extension
* Enterprise compliance dashboard

---

## 17. Known Limitations

* Rule-based detection not 100% accurate
* Limited dataset
* Cannot fully prove AI usage without complex heuristics

---

## 18. Impact

* Improves transparency in software teams
* Helps detect risky AI-generated code
* Supports academic and enterprise integrity policies
