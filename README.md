# Job Portal

A MERN-stack job portal: job seekers browse/apply via Clerk auth; recruiters
(companies) sign up with JWT auth, post jobs, and manage applicants.

- **Client**: React 19, Vite, Tailwind CSS, Clerk, Quill, react-router
- **Server**: Express 5, MongoDB/Mongoose, JWT, Cloudinary, Clerk webhooks (svix), Sentry

## ⚠️ Before you do anything else

The `.env` files that shipped with this project contained **live credentials**
(MongoDB password, Cloudinary secret, Clerk secret key). Those have been
removed from this copy and replaced with `.env.example` templates. If those
original values were ever shared or committed anywhere:

1. Rotate the MongoDB Atlas database user password (or delete/recreate the user).
2. Regenerate the Cloudinary API secret (Dashboard → Settings → Security).
3. Roll the Clerk secret key and webhook signing secret (Dashboard → API Keys).
4. Pick a new, random `JWT_SECRET` (e.g. `openssl rand -base64 32`).

## Fixes applied in this pass

- Removed real secrets from the repo; added `.env.example` + `.gitignore`.
- `/api/users/*` routes now require a valid Clerk session (`requireAuth()`)
  instead of silently no-op'ing for anonymous requests.
- `changeVisibility` now checks the job exists and belongs to the requesting
  company before touching it (previously threw / had no ownership check).
- CORS now restricted to an `ALLOWED_ORIGINS` allow-list instead of `*`.
- File uploads (resumes/logos) now restricted to image/PDF/doc mime types
  and capped at 5MB instead of accepting any file of any size.
- Added a 404 handler and a final JSON error handler on the API.
- Removed a dead/broken import (`messageInRaw` from `svix`) in the auth middleware.

## Known gaps (not fixed, worth doing next)

- No automated tests (unit or integration) on either client or server.
- No "forgot password" flow for recruiters (link is currently a no-op).
- No pagination on job listings — fine at small scale, will need it later.
- No server-side input validation library (e.g. zod/express-validator).

## Local development

### Server
```bash
cd server
cp .env.example .env   # then fill in real values
npm install
npm run server          # nodemon, auto-restart
```

### Client
```bash
cd client
cp .env.example .env    # then fill in real values
npm install
npm run dev
```

## Deploying

### Backend → Render (or Railway)
1. Push this repo to GitHub.
2. In Render: New → Web Service → connect the repo, root directory `server`.
3. Build command: `npm install`, start command: `npm start`.
4. Add all env vars from `server/.env.example` in the Render dashboard
   (a `render.yaml` blueprint is included in `server/`).
5. Once deployed, note the service URL (e.g. `https://jobportal-api.onrender.com`).

### Frontend → Vercel
1. In Vercel: New Project → import the repo, root directory `client`.
2. Framework preset: Vite. Build command `npm run build`, output `dist`.
3. Add env vars: `VITE_CLERK_PUBLISHABLE_KEY` and `VITE_BACKEND_URL`
   (set this to your Render backend URL from above).
4. Deploy.

### After both are live
- In Render, set `ALLOWED_ORIGINS` to your Vercel domain (e.g.
  `https://your-app.vercel.app`) so CORS allows the frontend to call the API.
- In Clerk's dashboard, add your production frontend domain to allowed origins,
  and point the Clerk webhook (user.created/updated/deleted) at
  `https://<your-render-url>/webhooks`.
