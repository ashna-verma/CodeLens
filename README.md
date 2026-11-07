# CodeLens
 
Chat with your GitHub repositories. Connect your GitHub account, index any repo, and ask questions about the codebase. Answers are generated with retrieval-augmented generation (RAG) and cite the files they came from.
 
## Features
 
- **GitHub login**: OAuth2 sign-in with session-cookie authentication
- **Repository indexing**: pull a repo, chunk the code, and embed it into a vector database
- **Chat with your code**: ask natural-language questions and get answers grounded in your actual source
- **Citations**: every answer links back to the files and snippets it used
- **Secure by default**: GitHub access tokens are encrypted at rest
- **Dashboard**: sidebar-based UI to manage repositories and conversations
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Streamdown (markdown rendering) |
| Backend | Spring Boot, Spring Security (GitHub OAuth2), Spring AI |
| AI | Google Gemini (chat and embeddings) |
| Database | PostgreSQL 16 with pgvector (HNSW index, cosine similarity) |
| Infrastructure | Docker / Docker Compose |
 
## How It Works
 
1. **Authenticate**: the user signs in with GitHub. The backend stores the access token encrypted and issues a session cookie.
2. **Index**: the backend fetches the selected repository, splits files into chunks, generates embeddings with Gemini, and stores them in Postgres via pgvector.
3. **Retrieve**: a question is embedded and the most similar chunks are found with a cosine-similarity search (HNSW index).
4. **Generate**: the retrieved chunks are passed to Gemini as context, and the answer is streamed back with file citations.
## Project Structure
 
```
CodeLens/
├── backend/                  # Spring Boot API
├── client/                   # Next.js frontend
├── docker/
│   └── postgres/
│       └── init-extensions.sql   # enables pgvector on first startup
└── docker-compose.yml        # Postgres + pgvector
```
 
## Prerequisites
 
- Java 21+ and Maven (or the included wrapper)
- Node.js 20+ and npm
- Docker Desktop
- A [Google AI Studio](https://aistudio.google.com/) API key for Gemini
- A GitHub OAuth App (Settings > Developer settings > OAuth Apps)
  - Homepage URL: `http://localhost:3000`
  - Callback URL: `http://localhost:8080/login/oauth2/code/github`
## Getting Started
 
### 1. Clone the repo
 
```bash
git clone https://github.com/ashna-verma/CodeLens.git
cd CodeLens
```
 
### 2. Start the database
 
```bash
docker-compose up -d
```
 
This starts Postgres 16 with pgvector and runs `init-extensions.sql` on first startup. Check that it is healthy with `docker-compose ps`.
 
### 3. Configure the backend
 
Set these environment variables (or add them to your IDE run configuration):
 
```properties
GEMINI_API_KEY=your-gemini-api-key
GEMINI_CHAT_MODEL=<gemini-chat-model-id>
GEMINI_EMBED_MODEL=gemini-embedding-001
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret
TOKEN_ENCRYPTION_KEY=a-long-random-secret
```
 
Never commit real secrets. Keep them in `.env` files or your IDE, and make sure those are listed in `.gitignore`.
 
### 4. Run the backend
 
```bash
cd backend
./mvnw spring-boot:run
```
 
The API starts on `http://localhost:8080`.
 
### 5. Run the frontend
 
```bash
cd client
npm install
npm run dev
```
 
Open `http://localhost:3000` and sign in with GitHub.
 
## Environment Variables
 
| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | API key for Gemini chat and embeddings |
| `GEMINI_CHAT_MODEL` | Gemini model used for answering questions |
| `GEMINI_EMBED_MODEL` | Gemini model used to embed code chunks |
| `GITHUB_CLIENT_ID` | GitHub OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret |
| `TOKEN_ENCRYPTION_KEY` | Secret used to encrypt stored GitHub tokens |
 
## App Screenshots
1. Login Page
  <img width="1372" height="882" alt="image" src="https://github.com/user-attachments/assets/56a65912-c42e-4727-a975-97729250c944" />
<br> </br>

2. Dashboard
  <img width="1896" height="910" alt="image" src="https://github.com/user-attachments/assets/9145a331-e843-4ce4-8540-68dcfe634475" />
<br> </br>

3. Indexing a project
  <img width="1915" height="912" alt="image" src="https://github.com/user-attachments/assets/ee28189c-a632-4fb4-bd67-27bae2094058" />
<br> </br>

4. Chat Window for an indexed project
  <img width="1912" height="911" alt="image" src="https://github.com/user-attachments/assets/cd7bbcf3-7d7b-4248-842b-be299bbd597e" />
