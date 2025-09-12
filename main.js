// Loading screen logic
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }, 1400);
});

// Modal logic
function showModal(id) { document.getElementById(id).classList.remove('hidden'); }
function hideModal(id) { document.getElementById(id).classList.add('hidden'); }

// Card buttons
document.getElementById('leaderboardBtn').onclick = () => showModal('leaderboardModal');
document.getElementById('closeLeaderboard').onclick = () => hideModal('leaderboardModal');

document.getElementById('referralBtn').onclick = () => showModal('referralModal');
document.getElementById('closeReferral').onclick = () => hideModal('referralModal');
document.getElementById('copyReferralBtn').onclick = () => {
    navigator.clipboard.writeText('https://sharkbounty.com/ref/UQBx2...jK7b');
    document.getElementById('referralStatus').textContent = "Referral link copied!";
    setTimeout(() => document.getElementById('referralStatus').textContent = "", 1300);
};

document.getElementById('depositBtn').onclick = () => showModal('depositModal');
document.getElementById('closeDeposit').onclick = () => hideModal('depositModal');
document.getElementById('modalDepositBtn').onclick = () => {
    hideModal('depositModal');
    alert("100 TON deposited to your wallet! (Demo)");
};

document.getElementById('redeemBtn').onclick = () => showModal('redeemModal');
document.getElementById('closeRedeem').onclick = () => hideModal('redeemModal');
document.getElementById('modalRedeemBtn').onclick = () => {
    hideModal('redeemModal');
    alert("Gift redeemed! (Demo)");
};

document.getElementById('historyBtn').onclick = () => showModal('historyModal');
document.getElementById('closeHistory').onclick = () => hideModal('historyModal');

document.getElementById('supportBtn').onclick = () => showModal('supportModal');
document.getElementById('closeSupport').onclick = () => hideModal('supportModal');

document.getElementById('secureBtn').onclick = () => showModal('secureModal');
document.getElementById('closeSecure').onclick = () => hideModal('secureModal');

document.getElementById('notificationBtn').onclick = () => showModal('notificationModal');
document.getElementById('closeNotification').onclick = () => hideModal('notificationModal');

// Copy wallet address
document.getElementById('copyBtn').onclick = () => {
    const walletAddr = document.getElementById('walletAddr').textContent;
    navigator.clipboard.writeText(walletAddr);
    document.getElementById('copyStatus').textContent = "Wallet copied!";
    setTimeout(() => document.getElementById('copyStatus').textContent = "", 1200);
};

// Daily check-in simulation
let checkedIn = false;
document.getElementById('checkinBtn').onclick = () => {
    if (!checkedIn) {
        document.getElementById('checkinStatus').textContent = "Checked in! +1 Energy";
        checkedIn = true;
    } else {
        document.getElementById('checkinStatus').textContent = "Already checked in today!";
    }
    setTimeout(() => {
        document.getElementById('checkinStatus').textContent = "";
    }, 1600);
};
