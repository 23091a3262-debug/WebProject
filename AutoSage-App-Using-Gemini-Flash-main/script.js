
// document.addEventListener("DOMContentLoaded", function () {
//     console.log("script.js loaded!");

//     // Redirect to login.html when clicking the Login button in index.html
//     document.getElementById("loginBtn")?.addEventListener("click", function () {
//         console.log("Login button clicked! Redirecting to login.html");
//         window.location.href = "login.html";
//     });

//     // Redirect to login.html when clicking inside the Search box in index.html
//     document.getElementById("searchBox")?.addEventListener("click", function () {
//         console.log("Search box clicked! Redirecting to login.html");
//         window.location.href = "login.html";
//     });

//     // Handle login
//     function login() {
//         let username = document.getElementById("username").value.trim();
//         let password = document.getElementById("password").value.trim();

//         if (!username || !password) {
//             alert("Please enter both username and password!");
//             return;
//         }

//         // Simulating user authentication (Replace this with an actual backend check)
//         let storedUser = localStorage.getItem("username");
//         if (storedUser && storedUser === username) {
//             alert("Logged in successfully!");
//             window.location.href = "selection.html";
//         } else {
//             alert("Invalid credentials! Please Sign Up first.");
//         }
//     }

//     // Handle Sign-Up
//     function signIn() {
//         let username = document.getElementById("signInUsername").value.trim();
//         let password = document.getElementById("signInPassword").value.trim();

//         if (!username || !password) {
//             alert("Please enter a username and password!");
//             return;
//         }

//       // Store user credentials (Ideally, this should be handled by a backend)
//         localStorage.setItem("username", username);
//         alert("Signed up successfully! Now login.");
//         window.location.href = "login.html";
//     }

//     // Assign the functions globally
//     window.login = login;
//     window.signIn = signIn;
// });
document.addEventListener("DOMContentLoaded", function () {
    console.log("script.js loaded!");

    // Redirect to login.html when clicking the Login button in index.html
    document.getElementById("loginBtn")?.addEventListener("click", function () {
        console.log("Login button clicked! Redirecting to login.html");
        window.location.href = "login.html";
    });

    // Redirect to login.html when clicking inside the Search box in index.html
    document.getElementById("searchBox")?.addEventListener("click", function () {
        console.log("Search box clicked! Redirecting to login.html");
        window.location.href = "login.html";
    });

    // Handle login
    function login() {
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please enter both username and password!");
            return;
        }

        // Simulating user authentication (Replace this with an actual backend check)
        let storedUser = localStorage.getItem("username");
        if (storedUser && storedUser === username) {
            localStorage.setItem("loggedInUser", username); // Store logged-in user
            alert("Logged in successfully!");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials! Please Sign Up first.");
        }
    }

    // Handle Sign-Up
    function signIn() {
        let username = document.getElementById("signInUsername").value.trim();
        let password = document.getElementById("signInPassword").value.trim();

        if (!username || !password) {
            alert("Please enter a username and password!");
            return;
        }

        // Store user credentials (Ideally, this should be handled by a backend)
        localStorage.setItem("username", username);
        alert("Signed up successfully! Now login.");
        window.location.href = "login.html";
    }

    // Display logged-in username in selection.html
    function displayUsername() {
        let loggedInUser = localStorage.getItem("loggedInUser") || "Guest";
        let usernameDisplay = document.getElementById("usernameDisplay");
        if (usernameDisplay) {
            usernameDisplay.textContent = `Logged in as: ${loggedInUser}`;
        }
    }

    // Call displayUsername when selection.html loads
    if (window.location.pathname.includes("selection.html")) {
        displayUsername();
    }

    // Assign the functions globally
    window.login = login;
    window.signIn = signIn;
});
// Display logged-in username in selection.html
function displayUsername() {
    let loggedInUser = localStorage.getItem("loggedInUser") || "Guest";
    let usernameDisplay = document.getElementById("usernameDisplay");
    let profileStatus = document.getElementById("profileStatus"); // Assuming this is the "Not logged in" section

    if (usernameDisplay) {
        usernameDisplay.textContent = `Logged in as: ${loggedInUser}`;
    }

    if (profileStatus) {
        if (loggedInUser !== "Guest") {
            profileStatus.textContent = loggedInUser; // Show username
        } else {
            profileStatus.textContent = "Not logged in"; // Default text
        }
    }
}

// Call displayUsername when selection.html loads
if (window.location.pathname.includes("selection.html")) {
    displayUsername();
}
// Call displayUsername and init dashboard when dashboard.html loads
if (window.location.pathname.includes("dashboard.html")) {
    displayUsername();
    initDashboard();
    updateAuthButtons();
}

// Initialize dashboard: render chart and recent activity
function initDashboard() {
    // retrieve events from localStorage
    const searches = JSON.parse(localStorage.getItem('searchEvents') || '[]');
    const comparisons = JSON.parse(localStorage.getItem('compareEvents') || '[]');
    const recommendations = JSON.parse(localStorage.getItem('recommendEvents') || '[]');

    document.getElementById('totalSearches')?.textContent = searches.length;
    document.getElementById('totalComparisons')?.textContent = comparisons.length;
    document.getElementById('totalRecommendations')?.textContent = recommendations.length;

    // Populate recent activity table (most recent first)
    const recentBody = document.getElementById('recentBody');
    if (recentBody) {
        recentBody.innerHTML = '';
        const combined = [
            ...searches.map(s => ({time: s.time, type: 'Search', details: s.query})),
            ...comparisons.map(c => ({time: c.time, type: 'Compare', details: `${c.a} vs ${c.b}`})),
            ...recommendations.map(r => ({time: r.time, type: 'Recommend', details: r.query}))
        ].sort((a,b)=>new Date(b.time)-new Date(a.time)).slice(0,20);
        for (const row of combined) {
            const tr=document.createElement('tr');
            tr.innerHTML = `<td>${row.time}</td><td>${row.type}</td><td>${row.details}</td>`;
            recentBody.appendChild(tr);
        }
    }

    // simple example chart data (last 7 days)
    const ctx = document.getElementById('activityChart')?.getContext('2d');
    if (ctx) {
        const labels = ['-6d','-5d','-4d','-3d','-2d','-1d','today'];
        const data = {
            labels,
            datasets: [{
                label: 'Activity',
                backgroundColor: '#ffd1a8',
                borderColor: '#ff9100',
                data: labels.map(()=>Math.floor(Math.random()*10)+1),
                fill: true,
            }]
        };
        new Chart(ctx, {type:'line',data,options:{responsive:true,plugins:{legend:{display:false}}}});
    }
}

// Update auth button visibility and wire events
function updateAuthButtons() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loginBtn || !logoutBtn) return;

    if (loggedInUser && loggedInUser !== 'Guest') {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }

    loginBtn.onclick = () => { window.location.href = 'login.html'; };
    logoutBtn.onclick = () => {
        localStorage.removeItem('loggedInUser');
        alert('Logged out');
        window.location.href = 'login.html';
    };
} 
