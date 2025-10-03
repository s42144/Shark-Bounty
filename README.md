# Shark Bounty — Mobile Web App + Firebase Admin Panel

## Overview
- Mobile-first SPA for players (`index.html`, `style.css`, `script.js`)
- Admin panel for full control (`admin.html`, `admin.css`, `admin.js`)
- Realtime DB with Firebase (Web SDK for game, Admin SDK for panel)
- Game assets: **Replace all `https://yourdomain.com/...` with your actual asset URLs**

## Setup

### 1. Firebase Project
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
- Enable Realtime Database, Authentication (Email/Password for admin panel)
- Add your `firebaseConfig` to both `script.js` and `admin.js`
- Download serviceAccountKey.json for Admin SDK (if using server-side admin)

### 2. Hosting
- Use Firebase Hosting or static hosting for the SPA and admin panel.
- Place all files in your web root.

### 3. Admin Setup
- Set `isAdmin: true` for admin users in `/users/<adminUid>/isAdmin`
- Use Email/Password Auth for admin login

### 4. Database Rules
- Import `firebase.rules` in the Firebase console: Database > Rules

### 5. Service Account (Optional)
- For server-run admin panel, place `serviceAccountKey.json` in `/server` directory
- Use Node.js, Express, and `firebase-admin` to build REST endpoints

### 6. Asset URLs
- Replace all `https://yourdomain.com/...` with your actual CDN or file URLs

### 7. Environment
- Test in Chrome mobile, Safari, or Android/iOS browser

### 8. Development Checklist
- [ ] Implement player SPA with navigation and assets
- [ ] Tap-to-earn with energy regen and batching
- [ ] Plans with claim flow and DB persistence
- [ ] Deposit flow with QR/memo/timer
- [ ] Withdraw request with admin approval
- [ ] Admin panel full CRUD (tasks, deposits, withdrawals, users)
- [ ] DB rules and service account for admin
- [ ] README setup instructions

---

## Firebase Config Example

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
```

---

## Realtime DB Structure Example

```json
{
  "users": { "uid": { "username": "...", "createdAt": 1690000000, ... } },
  "tasks": { "task1": { ... } },
  "deposits": { "dep123": { ... } },
  "withdrawals": { "wd123": { ... } },
  "plans": { "plan_ton": { ... } },
  "leaderboard": { "bySHB": { "uid": 120 } },
  "settings": { "tonRate": 3.2, "depositAddress": "..." }
}
```

---

## Security

- Only admins can modify balances, tasks, deposits, withdrawals.
- Players can only update their own profile/energy.
- All sensitive writes must be server-verified.

---

## Hook Points

- `api.createDepositRequest(payload)`
- `api.approveDeposit(depositId, adminId)`
- `api.createWithdrawRequest(payload)`
- `api.approveWithdraw(withdrawId, adminId)`
- `api.addTask(taskObj)`
- `api.getTasks()`
- `api.syncBalances(uid)`

---

## License

MIT
