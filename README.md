# platform Client

Frontend for **LearnPro**, a full-stack online learning platform where users can browse courses, search and filter content, enroll in free or paid courses, track progress, and complete lessons through an interactive learning dashboard.

---

## Features

- User authentication
- Browse featured, popular, and latest courses
- Search, sort, and filter courses
- Pagination for course listings
- Course details page
- Free and paid course enrollment
- Stripe payment integration
- User dashboard with enrolled courses
- In-progress and completed learning sections
- Interactive course player
- Lesson completion tracking
- Responsive UI

---

## Tech Stack

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Stripe.js
- Lucide React

---

## Project Structure

```bash
platform-client/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── .env


Environment Variables
Create a .env file in the root of the frontend project.

Local Development
env

VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
Production
env

VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
Installation
Bash

npm install
Run Locally
Bash

npm run dev
Frontend runs on:

Bash

http://localhost:5173
Build for Production
Bash

npm run build
API Integration
All API calls are handled through a centralized Axios instance in:

Bash

src/utils/api.js
This file:

sets the backend base URL using environment variables
attaches JWT token automatically in the Authorization header
handles global 401 Unauthorized responses
Main Pages
Home – featured and popular courses
Courses – full course listing with search, sorting, filters, and pagination
Course Details – information about a specific course
Login / Register – authentication pages
Checkout – Stripe payment flow for paid courses
Dashboard – enrolled courses and learning overview
Course Player – video lessons and lesson completion tracking
Learning Flow
User signs up or logs in
User browses or searches courses
User enrolls in a free or paid course
Paid courses use Stripe checkout/payment flow
Enrolled courses appear in dashboard
User watches lessons in the course player
User marks lessons as complete
Progress updates and completed courses move to the completed section
Search and Pagination
The frontend sends query parameters such as:

Bash

?page=1&limit=9&sort=newest&search=web
These are used by the backend to return only the required courses.

Stripe Integration
The frontend uses Stripe Elements / Stripe.js for secure payment handling.

Test Card
During development and testing, Stripe’s test card can be used:

txt

4242 4242 4242 4242
This is a Stripe sandbox card and does not perform real payments.

Deployment
The frontend is deployed on Vercel.

Required Vercel Environment Variables
env

VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
Notes
VITE_API_URL must include /api
Stripe publishable key is safe to use on the frontend
Authentication token is stored in localStorage
Protected pages depend on JWT-based authentication from the backend
Responsive styling is built using Tailwind CSS
Author
Anubhab Das






