Project 1 — Full-Stack Application (Your Own Idea!)
===================================================

Overview
--------
**This is a GROUP PROJECT.** You will work in teams of 2-4 students to build your own full-stack application based on an idea you choose together! Your project must allow users to register, log in, create content, interact with that content, and perform authenticated actions. The project has two parts:

- Backend: Node.js + Express API written in TypeScript. Use Sequelize as the ORM and SQLite for local development (Postgres optional for production). Implement JWT-based authentication and authorization.
- Frontend: React + TypeScript app scaffolded with Vite. Implement component-based UI, client-side routing, and an Auth system that stores the JWT and attaches it to API requests.

**Your Project Idea:**
Choose an application that interests you! Examples:
- A blog platform where users can create posts and comments
- A recipe sharing site where users can post recipes and reviews
- A project management tool where users can create tasks and updates
- A music playlist app where users can create playlists and add songs
- A book review platform where users can review books and comment on reviews
- **Any other idea that fits the technical requirements below!**

Learning goals
--------------
- Build a TypeScript Express API with Sequelize models and associations.
- Implement JWT authentication: register, login, protect routes, and attach user context.
- Build a React + TypeScript frontend with Vite: stateful components, routing, and fetch-based API calls.
- Wire frontend and backend together with secure, authenticated API requests.
- **Collaborate effectively using Git and GitHub:** create branches, make pull requests, review code, and merge changes.
- Document your project and provide run instructions for instructors.

Project requirements (high level)
--------------------------------
You must deliver a working app with the following minimum features:

Backend (required):

- Technology: Node.js, Express, TypeScript, Sequelize.
- Models: At minimum three related models following this pattern:
  - **User** model (required for authentication)
  - **Primary Content Model** (e.g., Post, Recipe, Project, Playlist, Book - your main entity)
  - **Secondary Content Model** (e.g., Comment, Review, Task, Song, Rating - nested/related to primary)
  - **Optional: Additional models** (e.g., Votes, Tags, Categories, Likes)
  
- Required Model Associations:
  - User hasMany PrimaryContent, PrimaryContent belongsTo User
  - User hasMany SecondaryContent, SecondaryContent belongsTo User
  - PrimaryContent hasMany SecondaryContent, SecondaryContent belongsTo PrimaryContent
  - Optional: Additional associations as needed for your project

- Authentication (Required):
  - POST /api/auth/register — create a user with username, email, password (hash with bcrypt).
  - POST /api/auth/login — validate credentials and return a signed JWT.
  - Use a secret stored in environment variable JWT_SECRET. Tokens should have an expiration.
  
- Protected routes must verify JWT and attach the user id to the request object.

- API endpoints (adapt to your project):
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/[your-primary-content] (e.g., /api/posts, /api/recipes)
  - POST /api/[your-primary-content] (authenticated)
  - GET /api/[your-primary-content]/:id
  - POST /api/[your-secondary-content]/:primaryId (authenticated) (e.g., /api/comments/:postId)
  - Optional: Additional endpoints for votes, edits, deletes, etc.

- Database:
  - Use Sequelize and sqlite3 for local development (project should work after npm install without extra DB setup).
  - For classroom submission you may use sequelize.sync() for simplicity; include notes on how to migrate to Postgres if you choose.

Frontend (required):

- Technology: Vite + React + TypeScript.
- Routing & pages (adapt to your project):
  - / — Home page showing your primary content list (e.g., posts, recipes, projects)
  - /login — Login form (email + password)
  - /register — Register form (username, email, password)
  - /[content]/:id — Detail page showing full primary content with related secondary content (e.g., /posts/:id, /recipes/:id)
  - Authenticated users should be able to create both primary and secondary content from the UI

- Auth client-side:
  - Store JWT in localStorage (or cookie) and attach Authorization: Bearer <token> header to protected requests.
  - Provide an Auth context or similar for components to check login state and access user info.
  
- UX:
  - Show login/register options when not authenticated and a logout button when authenticated.
  - Provide simple client-side validation for forms.

Non-functional requirements
---------------------------
- TypeScript: both backend and frontend should use TypeScript with reasonably strict settings.
- Clear README.md for both backend and frontend with run instructions and environment variables.
- Minimal styling is fine — focus on functionality. Use CSS modules, plain CSS, or a small framework.
- Write clean, well-documented code with comments where appropriate.
- **Git/GitHub collaboration (required):**
  - All team members must contribute commits to the repository.
  - Use feature branches for development (no direct commits to main/master).
  - All features must be merged via Pull Requests with at least one team member review.
  - Maintain a clean commit history with descriptive commit messages.

API contract (example requests/responses)
----------------------------------------
**Note:** Adapt these examples to your specific project. Replace "questions" and "answers" with your own entities.

- Register

  POST /api/auth/register
  Body: { username: string, email: string, password: string }
  Response: { token: string, user: { id, username, email } }

- Login

  POST /api/auth/login
  Body: { email: string, password: string }
  Response: { token: string, user: { id, username, email } }

- List primary content (example: posts)

  GET /api/posts
  Response: [ { id, title, body, userId, comments: [{ id, body, userId }] } ]

- Create primary content (authenticated) (example: post)

  POST /api/posts
  Header: Authorization: Bearer <token>
  Body: { title: string, body: string }
  Response: post object

- Create secondary content (authenticated) (example: comment on post)

  POST /api/comments/:postId
  Header: Authorization: Bearer <token>
  Body: { body: string }
  Response: comment object

Grading rubric (suggested)
--------------------------
- 40% Backend correctness
  - Models and associations correct for your chosen project
  - JWT auth implemented and protected routes work
  - API endpoints return expected responses
- 40% Frontend functionality
  - React app boots with Vite and communicates with the backend
  - Login/Register work and protected actions require auth
  - Primary and secondary content pages work correctly
- 10% Code quality & TypeScript usage
- 10% Documentation & run instructions

Stretch goals (optional, extra credit)
------------------------------------
- Add additional interactions (votes, likes, favorites, ratings).
- Allow users to edit/delete their own content.
- Add pagination and search functionality.
- Implement categories, tags, or filtering.
- Add user profiles showing their contributions.
- Use Sequelize migrations instead of sync() and include SQL scripts or migration files.
- Deploy a production-ready version (Heroku/Fly/Render) using Postgres and document deployment steps.

Starter repo layout (suggested)
------------------------------

YourProjectName/
  backend/
    package.json
    tsconfig.json
    src/
      index.ts
      config/database.ts
      models/
        User.ts
        [YourPrimaryModel].ts
        [YourSecondaryModel].ts
      routes/
        authRoutes.ts
        [yourContent]Routes.ts
      middleware/
        auth.ts
      utils/
    README.md
  frontend/
    package.json
    tsconfig.json
    src/
      main.tsx
      auth/
      pages/
        Home.tsx
        Login.tsx
        Register.tsx
        [ContentDetail].tsx
      components/
    README.md

What to submit
---------------
- Push your code to a **shared GitHub repository** and provide the URL.
- Ensure all team members are collaborators on the repository.
- Include a brief description of your project idea in the main README.
- List all team members and their contributions in the README.
- Ensure README in both backend and frontend include commands to run locally.
- Include notes on any extra features you implemented.
- Your repository should show a history of branches, pull requests, and collaborative development.

Help & hints
------------
- **Choose your project wisely:** Pick something you're interested in but keep scope manageable. You need at least 2 related content models plus User.
- Use bcrypt for hashing passwords (npm i bcrypt) and jsonwebtoken for JWT.
- Sequelize: define models in TypeScript and import them into index.ts so associations are established before sync().
- In the frontend, a small AuthContext (React Context) makes the rest of the app simpler.
- When using native fetch, include the Authorization header when token exists.
- For classroom simplicity you can use sqlite3 + sequelize.sync() so you don't need DB setup.
- **Plan your data model first:** Sketch out what your User, Primary Content, and Secondary Content models will be and how they relate.

Project idea examples (remember to adapt the models, routes, and pages):
------------------------------------------------------------------------
1. **Blog Platform:** User, Post (primary), Comment (secondary)
2. **Recipe Site:** User, Recipe (primary), Review (secondary)
3. **Task Manager:** User, Project (primary), Task (secondary)
4. **Music App:** User, Playlist (primary), Song (secondary)
5. **Book Club:** User, Book (primary), Review (secondary)
6. **Fitness Tracker:** User, Workout (primary), Exercise (secondary)
7. **Event Planner:** User, Event (primary), RSVP (secondary)
8. **Forum:** User, Thread (primary), Post (secondary)

Git & GitHub Collaboration Guide
---------------------------------

### Initial Setup (One Team Member)

1. **Create the repository:**
   ```bash
   # On GitHub, create a new repository for your project
   # Then clone it locally
   git clone https://github.com/your-team/your-project-name.git
   cd your-project-name
   ```

2. **Add collaborators:**
   - Go to repository Settings → Collaborators
   - Invite all team members

3. **Set up initial project structure:**
   ```bash
   # Create initial folders
   mkdir backend frontend
   git add .
   git commit -m "Initial project structure"
   git push origin main
   ```

### Daily Workflow (All Team Members)

1. **Start with updated code:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a feature branch:**
   ```bash
   # Use descriptive branch names
   git checkout -b feature/user-authentication
   git checkout -b feature/create-post-endpoint
   git checkout -b fix/login-validation
   ```

3. **Make your changes and commit regularly:**
   ```bash
   # Check what files changed
   git status
   
   # Add specific files or all changes
   git add src/models/User.ts
   git add .
   
   # Commit with a descriptive message
   git commit -m "Add User model with bcrypt password hashing"
   ```

4. **Push your branch to GitHub:**
   ```bash
   git push origin feature/user-authentication
   ```

5. **Create a Pull Request (PR):**
   - Go to your repository on GitHub
   - Click "Pull Requests" → "New Pull Request"
   - Select your branch to merge into `main`
   - Add a title and description explaining your changes
   - Request a review from a teammate
   - Click "Create Pull Request"

6. **Code Review Process:**
   - **Reviewer:** Check the "Files changed" tab
   - Leave comments on specific lines if needed
   - Approve the PR or request changes
   - **Author:** Address any feedback, push new commits if needed

7. **Merge the Pull Request:**
   - Once approved, click "Merge Pull Request"
   - Delete the branch after merging (optional but recommended)

8. **Update your local repository:**
   ```bash
   git checkout main
   git pull origin main
   ```

### Handling Merge Conflicts

If you get a merge conflict:

```bash
# Update your branch with latest main
git checkout your-branch-name
git pull origin main

# Git will tell you which files have conflicts
# Open those files and look for:
# <<<<<<< HEAD
# your changes
# =======
# their changes
# >>>>>>> main

# Edit the files to resolve conflicts
# Remove the conflict markers and keep the correct code

git add .
git commit -m "Resolve merge conflicts"
git push origin your-branch-name
```

### Best Practices for Team Collaboration

- **Commit often** with clear, descriptive messages
- **Pull from main frequently** to avoid large merge conflicts
- **Keep branches focused** on one feature or fix
- **Review PRs promptly** to keep the team moving
- **Communicate** with your team about who's working on what
- **Test your code** before creating a PR
- **Never commit sensitive data** (passwords, API keys, .env files)
- **Use .gitignore** for node_modules, .env, database files, etc.

### Useful Git Commands

```bash
# See all branches
git branch -a

# Switch to existing branch
git checkout branch-name

# See commit history
git log --oneline

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Discard local changes to a file
git checkout -- filename

# See what changed in a file
git diff filename
```

Good luck — build incrementally: start with the API, then the frontend auth, then your content flows. Choose a project you're excited about! Remember to communicate with your team and use Git/GitHub effectively for collaboration.
