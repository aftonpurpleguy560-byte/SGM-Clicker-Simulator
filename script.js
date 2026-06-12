// --- Oyun Değişkenleri ---
let coins = Number(localStorage.getItem('coins')) || 0;
let coinsPerClick = Number(localStorage.getItem('coinsPerClick')) || 1;
let coinsPerSecond = Number(localStorage.getItem('coinsPerSecond')) || 0;

let upgrade1Cost = Number(localStorage.getItem('upgrade1Cost')) || 50;
let autoclickCost = Number(localStorage.getItem('autoclickCost')) || 150;
let upgrade2Cost = Number(localStorage.getItem('upgrade2Cost')) || 800;
let kadirWorkerCost = Number(localStorage.getItem('kadirWorkerCost')) || 3000;
let aiAssistantCost = Number(localStorage.getItem('aiAssistantCost')) || 15000;

// --- Elemanları Seçme ---
const scoreDisplay = document.getElementById('scoreDisplay');
const cpcDisplay = document.getElementById('cpcDisplay');
const cpsDisplay = document.getElementById('cpsDisplay');
const clickerBtn = document.getElementById('clickerBtn');

const upgrade1Btn = document.getElementById('upgrade1Btn');
const autoclickBtn = document.getElementById('autoclickBtn');
const upgrade2Btn = document.getElementById('upgrade2Btn');
const kadirWorkerBtn = document.getElementById('kadirWorkerBtn');
const aiAssistantBtn = document.getElementById('aiAssistantBtn');

function saveGame() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('coinsPerSecond', coinsPerSecond);
    localStorage.setItem('upgrade1Cost', upgrade1Cost);
    localStorage.setItem('autoclickCost', autoclickCost);
    localStorage.setItem('upgrade2Cost', upgrade2Cost);
    localStorage.setItem('kadirWorkerCost', kadirWorkerCost);
    localStorage.setItem('aiAssistantCost', aiAssistantCost);
}

function updateUI() {
    scoreDisplay.textContent = Math.floor(coins) + " Coin";
    cpcDisplay.textContent = "Tık Başına: +" + coinsPerClick + " Coin";
    cpsDisplay.textContent = "Saniyede: +" + coinsPerSecond + " Coin";
    
    upgrade1Btn.textContent = "Fiyat: " + upgrade1Cost;
    autoclickBtn.textContent = "Fiyat: " + autoclickCost;
    upgrade2Btn.textContent = "Fiyat: " + upgrade2Cost;
    kadirWorkerBtn.textContent = "Fiyat: " + kadirWorkerCost;
    aiAssistantBtn.textContent = "Fiyat: " + aiAssistantCost;

    upgrade1Btn.disabled = coins < upgrade1Cost;
    autoclickBtn.disabled = coins < autoclickCost;
    upgrade2Btn.disabled = coins < upgrade2Cost;
    kadirWorkerBtn.disabled = coins < kadirWorkerCost;
    aiAssistantBtn.disabled = coins < aiAssistantCost;
}

// iOS Gecikmesini Çözen Tıklama Fonksiyonu
function handleInGameClick(e) {
    if (e) e.preventDefault(); // Sayfa kaymasını önler
    coins += coinsPerClick;
    updateUI();
    saveGame();
}

// Hem mobile (touchstart) hem masaüstüne (click) uyumlu yaptık bug kalmadı
clickerBtn.addEventListener('touchstart', handleInGameClick, {passive: false});
clickerBtn.addEventListener('click', (e) => {
    if (e.pointerType !== '') handleInGameClick(e); // Mobilde çift çalışmasın diye koruma
});

// --- MARKET SATIN ALIMLARI ---

upgrade1Btn.addEventListener('click', () => {
    if (coins >= upgrade1Cost) {
        coins -= upgrade1Cost;
        coinsPerClick += 1;
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5);
        updateUI();
        saveGame();
    }
});

autoclickBtn.addEventListener('click', () => {
    if (coins >= autoclickCost) {
        coins -= autoclickCost;
        coinsPerSecond += 1;
        autoclickCost = Math.floor(autoclickCost * 1.6);
        updateUI();
        saveGame();
    }
});

upgrade2Btn.addEventListener('click', () => {
    if (coins >= upgrade2Cost) {
        coins -= upgrade2Cost;
        coinsPerClick += 10;
        upgrade2Cost = Math.floor(upgrade2Cost * 1.6);
        updateUI();
        saveGame();
    }
});

kadirWorkerBtn.addEventListener('click', () => {
    if (coins >= kadirWorkerCost) {
        coins -= kadirWorkerCost;
        coinsPerSecond += 15;
        kadirWorkerCost = Math.floor(kadirWorkerCost * 1.7);
        updateUI();
        saveGame();
    }
});

aiAssistantBtn.addEventListener('click', () => {
    if (coins >= aiAssistantCost) {
        coins -= aiAssistantCost;
        coinsPerSecond += 100;
        aiAssistantCost = Math.floor(aiAssistantCost * 1.8);
        updateUI();
        saveGame();
    }
});

// Otomatik Kazanç Döngüsü
setInterval(() => {
    if (coinsPerSecond > 0) {
        coins += coinsPerSecond;
        updateUI();
        saveGame();
    }
}, 1000);

updateUI();

