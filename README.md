
# CodeCracker: A Competitive Programming Tracker

CodeCracker is a web application that tracks and visualizes user stats from competitive programming platforms like Codeforces.

## Features
- Fetch user stats such as problems solved, ratings, and streaks.
- Visualize progress using charts.
- Responsive design with a modern UI.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Visualization**: Chart.js

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.

### Steps
1. Clone this repository.
2. Install dependencies for both `client` and `server`:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Start the backend server:
   ```bash
   cd server
   node server.js
   ```
4. Start the frontend development server:
   ```bash
   cd client
   npm start
   ```

5. Open `http://localhost:3000` in your browser.

## Deployment
- Use platforms like Vercel for the frontend and Heroku for the backend.
