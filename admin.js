// Admin Panel logic (starter kit)

// For production use server-side Node.js + firebase-admin for privileged operations.

// Firebase Admin SDK (for server-side):
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");
// admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: "https://zmex-investments-default-rtdb.asia-southeast1.firebasedatabase.app" });
// const db = admin.database();

// For demo purposes, client-side Firebase Auth + Database:
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHofuS76xf2oGPaJqEtopmcxdoJzjkDL4",
  authDomain: "zmex-investments.firebaseapp.com",
  databaseURL: "https://zmex-investments-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zmex-investments",
  storageBucket: "zmex-investments.firebasestorage.app",
  messagingSenderId: "971623941364",
  appId: "1:971623941364:web:6c65604fc45c3f64e74aa1",
  measurementId: "G-KQ1LYP77JF"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const loginBox = document.getElementById('admin-login');
  const appBox = document.getElementById('admin-app');
  const loginBtn = document.getElementById('admin-login-btn');
  const logoutBtn = document.getElementById('admin-logout');
  const emailInput = document.getElementById('admin-email');
  const passInput = document.getElementById('admin-password');
  const errorBox = document.getElementById('login-error');

  loginBtn.onclick = () => {
    signInWithEmailAndPassword(auth, emailInput.value, passInput.value)
      .then(() => {
        loginBox.style.display = 'none';
        appBox.style.display = 'block';
      })
      .catch(e => errorBox.textContent = "Login failed: " + e.message);
  };
  logoutBtn.onclick = () => {
    signOut(auth).then(() => {
      loginBox.style.display = 'block';
      appBox.style.display = 'none';
    });
  };

  // Navigation
  document.querySelectorAll('#admin-nav button[data-section]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.admin-section').forEach(sec => sec.classList.remove('active'));
      document.getElementById(`admin-${btn.dataset.section}`).classList.add('active');
    };
  });

  // TODO: Implement dashboard, users, tasks, deposits, withdrawals, plans, leaderboard, assets, logs, settings
  // Use onValue(ref(db, ...)) to fetch and display data, update(...) to modify
});
