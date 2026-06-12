let coins = Number(localStorage.getItem('coins')) || 0;
let coinsPerClick = Number(localStorage.getItem('coinsPerClick')) || 1;
let coinsPerSecond = Number(localStorage.getItem('coinsPerSecond')) || 0;
let rebirths = Number(localStorage.getItem('rebirths')) || 0;

let upgrade1Cost = Number(localStorage.getItem('upgrade1Cost')) || 50;
let autoclickCost = Number(localStorage.getItem('autoclickCost')) || 150;
let upgrade2Cost = Number(localStorage.getItem('upgrade2Cost')) || 800;
let kadirWorkerCost = Number(localStorage.getItem('kadirWorkerCost')) || 3000;
let aiAssistantCost = Number(localStorage.getItem('aiAssistantCost')) || 15000;

const scoreDisplay = document.getElementById('scoreDisplay');
const rebirthDisplay = document.getElementById('rebirthDisplay');
const rebirthBtn = document.getElementById('rebirthBtn');
const cpcDisplay = document.getElementById('cpcDisplay');
const cpsDisplay = document.getElementById('cpsDisplay');
const clickerBtn = document.getElementById('clickerBtn');
const sgmCheatBtn = document.getElementById('sgmCheatBtn');

const upgrade1Btn = document.getElementById('upgrade1Btn');
const autoclickBtn = document.getElementById('autoclickBtn');
const upgrade2Btn = document.getElementById('upgrade2Btn');
const kadirWorkerBtn = document.getElementById('kadirWorkerBtn');
const aiAssistantBtn = document.getElementById('aiAssistantBtn');
const victoryScreen = document.getElementById('victoryScreen');

// 🌟 ARKA PLAN MÜZİĞİ VE SES MOTORU AYARLARI
let bgMusic = null;
let musicStarted = false;

function startMusicAndSounds() {
    if (!musicStarted) {
        // Tarayıcı engelini aşmak için ses objesini tam tıklama anında oluşturuyoruz
        bgMusic = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
        bgMusic.loop = true;
        bgMusic.volume = 0.10; // Kısık sesli fon müziği (%10 ses seviyesi)
        
        bgMusic.play().then(() => {
            musicStarted = true;
        }).catch(e => console.log("Müzik tarayıcı engeline takıldı:", e));
    }
}

function playClickSound() {
    // Tıklama efektini de dinamik oluşturuyoruz ki tarayıcı asla bloklamasın
    try {
        let clickSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
        clickSound.volume = 0.5; // Tıklama sesi seviyesi
        clickSound.play();
    } catch (e) {
        console.log("Ses çalma hatası:", e);
    }
}

function saveGame() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('coinsPerSecond', coinsPerSecond);
    localStorage.setItem('rebirths', rebirths);
    localStorage.setItem('upgrade1Cost', upgrade1Cost);
    localStorage.setItem('autoclickCost', autoclickCost);
    localStorage.setItem('upgrade2Cost', upgrade2Cost);
    localStorage.setItem('kadirWorkerCost', kadirWorkerCost);
    localStorage.setItem('aiAssistantCost', aiAssistantCost);
}

function updateUI() {
    scoreDisplay.textContent = Math.floor(coins) + " Coin";
    rebirthDisplay.textContent = "Rebirth: " + rebirths;
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

    if (rebirths === 0) {
        rebirthBtn.textContent = "Rebirth At (100K)";
        rebirthBtn.disabled = coins < 100000;
    } else if (rebirths === 1) {
        rebirthBtn.textContent = "Oyunu Bitir! (1M)";
        rebirthBtn.disabled = coins < 1000000;
    } else {
        rebirthBtn.style.display = 'none';
    }
}

// Normal Tıklama Butonu Fonksiyonu
function handleInGameClick(e) {
    if (e) e.preventDefault();
    startMusicAndSounds(); // Tarayıcı iznini koparmak için ilk tıkta tetikliyoruz
    playClickSound();      // Çıtır tık sesi
    
    let multiplier = rebirths === 1 ? 2 : 1;
    coins += (coinsPerClick * multiplier);
    updateUI();
    saveGame();
}

clickerBtn.addEventListener('touchstart', handleInGameClick, {passive: false});
clickerBtn.addEventListener('click', (e) => {
    if (e.pointerType !== '') handleInGameClick(e);
});

// SGM Gizli Watermark Butonu Fonksiyonu
function handleCheatClick(e) {
    if (e) e.preventDefault();
    startMusicAndSounds(); 
    playClickSound();      
    
    coins += 50000;
    updateUI();
    saveGame();
}

sgmCheatBtn.addEventListener('touchstart', handleCheatClick, {passive: false});
sgmCheatBtn.addEventListener('click', (e) => {
    if (e.pointerType !== '') handleCheatClick(e);
});

// Rebirth İşlemleri
rebirthBtn.addEventListener('click', () => {
    if (rebirths === 0 && coins >= 100000) {
        rebirths = 1;
        resetProgressOnRebirth();
    } else if (rebirths === 1 && coins >= 1000000) {
        rebirths = 2;
        saveGame();
        victoryScreen.style.display = 'flex';
    }
});

function resetProgressOnRebirth() {
    coins = 0;
    coinsPerClick = 1;
    coinsPerSecond = 0;
    upgrade1Cost = 50;
    autoclickCost = 150;
    upgrade2Cost = 800;
    kadirWorkerCost = 3000;
    aiAssistantCost = 15000;
    updateUI();
    saveGame();
}

function resetEverything() {
    localStorage.clear();
    location.reload();
}

// Market Alışverişleri
upgrade1Btn.addEventListener('click', () => {
    if (coins >= upgrade1Cost) { coins -= upgrade1Cost; coinsPerClick += 1; upgrade1Cost = Math.floor(upgrade1Cost * 1.5); updateUI(); saveGame(); }
});
autoclickBtn.addEventListener('click', () => {
    if (coins >= autoclickCost) { coins -= autoclickCost; coinsPerSecond += 1; autoclickCost = Math.floor(autoclickCost * 1.6); updateUI(); saveGame(); }
});
upgrade2Btn.addEventListener('click', () => {
    if (coins >= upgrade2Cost) { coins -= upgrade2Cost; coinsPerClick += 10; upgrade2Cost = Math.floor(upgrade2Cost * 1.6); updateUI(); saveGame(); }
});
kadirWorkerBtn.addEventListener('click', () => {
    if (coins >= kadirWorkerCost) { coins -= kadirWorkerCost; coinsPerSecond += 15; kadirWorkerCost = Math.floor(kadirWorkerCost * 1.7); updateUI(); saveGame(); }
});
aiAssistantBtn.addEventListener('click', () => {
    if (coins >= aiAssistantCost) { coins -= aiAssistantCost; coinsPerSecond += 100; aiAssistantCost = Math.floor(aiAssistantCost * 1.8); updateUI(); saveGame(); }
});

// Otomatik Üretim Saniyede Bir Çalışır
setInterval(() => {
    if (coinsPerSecond > 0) {
        coins += coinsPerSecond;
        updateUI();
        saveGame();
    }
}, 1000);

// Çift Tıklama Zoom Engeli
document.addEventListener('touchstart', function (e) { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
let lastTouchEnd = 0;
document.addEventListener('touchend', function (e) {
    let now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
}, false);

updateUI();
