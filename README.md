<img width="1288" height="631" alt="Screenshot 2025-08-08 122723" src="https://github.com/user-attachments/assets/070f4d44-042a-4fc9-b042-0c9a5716b15d" />
Live site URL : https://assignment-11-2e54a.web.app/


# 🌱 Event Platform - ServeCircle

This is a simple event management web application built with **React**, **Tailwind CSS**, **React Router**, and a **Node.js + MongoDB** backend. Users can register, log in, view upcoming events, and create new ones.

---

## 🧩 Features

- ✅ User Authentication (login/register)
- 📅 Create and manage your own events
- 🔍 Filter events by type (Workshop, Awareness, etc.)
- 🔁 Loading spinner and toast notifications
- 💻 Fully responsive design using Tailwind CSS
- 🔐 Token-based session handling (stored in `localStorage`)

---

## 🛠 Tech Stack

### Frontend:

- React
- React Router DOM
- Tailwind CSS
- React Hot Toast
- react-simple-typewriter

**  ✅ Core features**
User authentication (Email/Password + optional social login). Password validation: at least one uppercase, one lowercase, min length 6.

JWT-based authorization for private routes (Create Event, Manage Events, Joined Events, Event Details).

Create Event (private): title, description, type (cleanup/plantation/donation/etc.), thumbnail URL, location, date (future-only), organizer name & email (readonly).

Upcoming Events (public): grid of future events (past events excluded).

Event Details (private dynamic page): full event info + Join Event button that stores join record in DB.

Joined Events (private): list of events the current user joined, sorted by event date.

Manage Events (private): creator can view & update (optional delete) their events.

Search & Filter (backend-supported): search by event name and filter by event type (implemented via API query params).

Dark/Light theme toggle across the app.

Banner carousel (3+ slides) and other home sections: features, gallery, newsletter UI.

Form validations & toasts/sweet alerts for success/errors.

Loading spinners while data loads.

**🗂 API** (example endpoints)
Base URL: https://your-backend-url.com/api (or http://localhost:5000/api)

POST /auth/login — login (returns JWT)

POST /auth/register — register user (returns JWT)

GET /events?search=...&type=...&limit=...&upcoming=true — list events (supports search & filter)

GET /events/featured — 6 featured upcoming events (by soonest date)

GET /events/:id — event details (private route)

POST /events — create event (private)

PUT /events/:id — update event (private, owner only)

DELETE /events/:id — delete event (optional, owner only)

POST /events/:id/join — join event (private)

GET /users/:email/events — events created by a user (private)

GET /users/:email/joined — events the user joined (private)

Protected routes require header:

makefile
Copy
Edit
Authorization: Bearer <JWT_TOKEN>
Example curl (protected):

bash
Copy
Edit
curl -H "Authorization: Bearer eyJ..." https://your-backend-url.com/api/events/featured
⚙️ Environment variables
Backend (.env)
ini
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/social-events?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
# If using social login (Google/GitHub), add client IDs & secrets here
Frontend (.env for Vite; prefix with VITE_)
ini
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
VITE_JWT_STORAGE_KEY=accessToken   # or use 'token'
# If using Firebase for social login, include VITE_FIREBASE_* keys here
💻 Run locally — Quick start
**1. Clone both repos**
bash
Copy
Edit
# Frontend
git clone https://github.com/yourusername/social-events-frontend.git
# Backend
git clone https://github.com/yourusername/social-events-backend.git
**2. Start backend**
bash
Copy
Edit
cd social-events-backend
cp .env.example .env           # fill values
npm install
npm run dev                    # (use nodemon) or `node server.js`
**3. Start frontend**
bash
Copy
Edit
cd social-events-frontend
cp .env.example .env           # set VITE_API_BASE_URL to your backend
npm install
npm run dev                    # runs Vite dev server (usually http://localhost:5173)
**4. Visit**
Open http://localhost:5173 (or the Vite dev URL) and test flows:

Register → login → create event (future date) → view upcoming events → join events → manage events.

🔐 JWT & auth flow (short)
Frontend sends credentials to POST /auth/login (or register).

Backend validates and creates a JWT signed with JWT_SECRET (token payload should include user email & id).

Frontend stores the token (recommended: localStorage.setItem('accessToken', token) or HttpOnly cookie if you implement server-side cookies).

For protected requests, frontend adds header:

js
Copy
Edit
axios.get('/api/events/featured', {
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
});
Backend middleware verifies token, sets req.user, and allows/denies access.

✅ Validation rules (frontend + backend)
Password: must include at least one uppercase, one lowercase and be at least 6 characters — show immediate toast errors.

Event Date: react-datepicker should set minDate={new Date()} so users can't pick past dates. Backend also checks if deadline > Date.now().

🧩 Dependencies (key packages)
Frontend
nginx
Copy
Edit
react react-dom react-router-dom axios tailwindcss
react-hot-toast react-datepicker react-simple-typewriter
swiper react-modal clsx
Backend
nginx
Copy
Edit
express mongoose jsonwebtoken bcryptjs cors dotenv nodemon
**🧪 Testing & seed data**
Provide a seed.js script in backend to create sample events & users for development.

Use Postman or Insomnia to test API endpoints (attach JWT to Authorization header).

Add a postman_collection.json to the repo for quick API testing.

**🚀 Deployment (brief)**
Frontend: deploy to Vercel / Netlify. Set environment variables in the hosting dashboard and point build to npm run build.

Backend: deploy to Render / Heroku / Railway. Set MONGO_URI and JWT_SECRET as env vars. If using Firebase/Admin, store service account securely (not in public repo).

Database: use MongoDB Atlas; add your production IPs / VPC settings.

**📚 Resources**
JWT: https://jwt.io/introduction

MongoDB + Mongoose guide: https://mongoosejs.com/docs/

react-datepicker docs: https://reactdatepicker.com/

Tailwind docs: https://tailwindcss.com/docs


