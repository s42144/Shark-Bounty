// Shark Bounty SPA logic (main player app)

// Firebase web SDK config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

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

// Local state
let state = {
  shbBalance: 0,
  usdtBalance: 0,
  energy: 1200,
  lastEnergyTick: Date.now(),
  plans: {},
  depositHistory: [],
  withdrawHistory: [],
  profile: {},
  tapQueue: 0
};

// Load state from localStorage if available
function loadState() {
  const saved = localStorage.getItem('sharkbounty_state');
  if (saved) {
    state = { ...state, ...JSON.parse(saved) };
  }
}
function saveState() {
  localStorage.setItem('sharkbounty_state', JSON.stringify(state));
}

// Debounced save to Firebase
let firebaseDirty = false;
function flushToFirebase() {
  if (!firebaseDirty) return;
  // Replace 'user123' with actual user UID in production
  update(ref(db, 'users/user123'), {
    shbBalance: state.shbBalance,
    usdtBalance: state.usdtBalance,
    energy: state.energy,
    lastEnergyTick: state.lastEnergyTick,
    plans: state.plans,
    depositHistory: state.depositHistory,
    withdrawHistory: state.withdrawHistory,
    profile: state.profile
  });
  firebaseDirty = false;
}
setInterval(flushToFirebase, 5000);

loadState();

// UI bindings
document.addEventListener('DOMContentLoaded', () => {
  // Loading overlay
  const loadingOverlay = document.getElementById('loading-overlay');
  const skipBtn = document.getElementById('skip-loading');
  skipBtn.onclick = () => {
    loadingOverlay.style.display = 'none';
    document.getElementById('app').style.display = 'block';
  };
  document.getElementById('loading-video').onended = skipBtn.onclick;

  // Navigation
  document.querySelectorAll('#bottom-nav button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.route').forEach(sec => sec.classList.remove('active'));
      document.getElementById(`route-${btn.dataset.route}`).classList.add('active');
    };
  });

  // Home tap logic
  const tapCoin = document.getElementById('tap-coin');
  tapCoin.onclick = () => {
    if (state.energy <= 0) {
      showToast('No energy — wait to regenerate');
      return;
    }
    state.shbBalance++;
    state.energy--;
    state.tapQueue++;
    firebaseDirty = true;
    saveState();
    animatePlus();
    animateCoin();
    updateBalances();
  };

  // Energy regen
  setInterval(() => {
    if (state.energy < 1200) {
      state.energy++;
      firebaseDirty = true;
      saveState();
      updateBalances();
    }
  }, 1000);

  // Initial UI
  updateBalances();
});

function updateBalances() {
  document.getElementById('shb-balance').textContent = state.shbBalance;
  document.getElementById('usdt-balance').textContent = state.usdtBalance;
  document.getElementById('energy-count').textContent = state.energy;
}

function animatePlus() {
  const plus = document.getElementById('floating-plus');
  plus.style.opacity = 1;
  plus.style.transform = "translate(-50%,-180%)";
  setTimeout(() => {
    plus.style.opacity = 0;
    plus.style.transform = "translate(-50%,-120%)";
  }, 700);
}
function animateCoin() {
  const coin = document.getElementById('tap-coin');
  coin.style.transform = "scale(1.1)";
  setTimeout(() => coin.style.transform = "", 200);
}
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 1800);
}

// TODO: Implement trade/plans, tasks, wallet, profile logic as per prompt...
