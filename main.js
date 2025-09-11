// Loading screen logic
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }, 1700); // Show loading for 1.7 seconds
});

// Modal dialog logic
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}
function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}
document.getElementById('depositBtn').onclick = () => showModal('depositModal');
document.getElementById('closeDeposit').onclick = () => hideModal('depositModal');
document.getElementById('redeemBtn').onclick = () => showModal('redeemModal');
document.getElementById('closeRedeem').onclick = () => hideModal('redeemModal');
document.getElementById('supportBtn').onclick = () => showModal('supportModal');
document.getElementById('closeSupport').onclick = () => hideModal('supportModal');

// Copy wallet address
document.getElementById('copyBtn').onclick = () => {
    const walletAddr = document.getElementById('walletAddr').textContent;
    navigator.clipboard.writeText(walletAddr);
    const status = document.getElementById('copyStatus');
    status.textContent = "Copied!";
    setTimeout(() => status.textContent = "", 1200);
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
    }, 1800);
};

// Deposit simulation
document.getElementById('modalDepositBtn').onclick = () => {
    hideModal('depositModal');
    alert("100 TON deposited! (Simulation)");
};
// Redeem simulation
document.getElementById('modalRedeemBtn').onclick = () => {
    hideModal('redeemModal');
    alert("Gift redeemed! (Simulation)");
};
