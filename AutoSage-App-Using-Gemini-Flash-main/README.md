# AutoSage-App-Using-Gemini-Flash
AutoSage is an AI-powered vehicle expert tool using Gemini Flash technology to provide real-time updates on new two-wheelers and four-wheelers. It offers detailed specs, reviews, and comparisons, helping users make informed decisions. With a user-friendly interface, AutoSage keeps users updated on the latest automotive trends and innovations.

DEMO LINK: https://pradeep200517.github.io/AutoSage-App-Using-Gemini-Flash/

## Dashboard ✅
The project now includes a clear, easy-to-read `dashboard.html` that shows:
- Total counts for Searches, Comparisons, and Recommendations
- A simple activity chart (7-day sample)
- A Recent Activity table populated from localStorage

How to view locally:
1. Start a local server (from project root):
   - Python 3: `py -3 -m http.server 8000`
   - Node: `npx http-server -p 8000`
2. Open `http://localhost:8000/login.html`, Sign Up and Login.
3. After login you will be redirected to `dashboard.html` to see the overview.

Notes:
- Activity is saved locally in the browser (`localStorage`).
- This is a front-end-only demo; there is no server-side authentication or persistent DB.
