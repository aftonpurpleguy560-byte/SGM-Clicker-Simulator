llet coins = Number(localStorage.getItem('coins')) || 0;
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

// 🌟 REBIRTH FİYAT LİSTESİ
const rebirthCosts = {
    0: 25000,   // 1. Rebirth (25K)
    1: 50000,   // 2. Rebirth (50K)
    2: 75000,   // 3. Rebirth (75K)
    3: 100000,  // 4. Rebirth (100K)
    4: 125000,  // 5. Rebirth (125K)
    5: 150000,  // 6. Rebirth (150K)
    6: 175000,  // 7. Rebirth (175K)
    7: 200000,  // 8. Rebirth (200K)
    8: 225000,  // 9. Rebirth (225K)
    9: 250000   // 10. Rebirth (250K)
};

// 🌟 TARAYICI ENGELİNİ DELEN YAPAY SES MOTORU (WEB AUDIO API)
function playOneSecondClickSound() {
    try {
        // Tarayıcının kendi ses merkezini başlatıyoruz
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        
        // Ses dalgası üreticisi (Oscillators)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine'; // Çıtır ve yumuşak bir ses dalgası
        osc.frequency.setValueAtTime(600, ctx.currentTime); // Sesin inceliği (600Hz tam klik sesi)
        
        // Sesin tam 0.1 saniyede çıtırca kesilip bitmesi için ayar (1sn'yi geçmez, şişme yapmaz)
        gain.gain.setValueAtTime(0.3, ctx.currentTime); // Ses yüksekliği
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1); // Tam tık anında çalar ve durur
    } catch (e) {
        console.log("Ses motoru başlatılamadı:", e);
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
    
    let multiplier = rebirths + 1;
    cpcDisplay.textContent = "Tık Başına: +" + (coinsPerClick * multiplier) + " Coin (x" + multiplier + ")";
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

    if (rebirths < 10) {
        let currentCost = rebirthCosts[rebirths];
        let nextRebirthNumber = rebirths + 1;
        
        if (nextRebirthNumber === 10) {
            rebirthBtn.textContent = "Oyunu Bitir! (" + (currentCost / 1000) + "K)";
        } else {
            rebirthBtn.textContent = nextRebirthNumber + ". Rebirth At (" + (currentCost / 1000) + "K)";
        }
        
        rebirthBtn.disabled = coins < currentCost;
        rebirthBtn.style.display = 'inline-block';
    } else {
        rebirthBtn.style.display = 'none';
    }
}

// Ana Buton Tıklama
function handleInGameClick(e) {
    if (e) e.preventDefault();
    playOneSecondClickSound(); // Yerel ses motoru tetikleniyor
    
    let multiplier = rebirths + 1;
    coins += (coinsPerClick * multiplier);
    updateUI();
    saveGame();
}

clickerBtn.addEventListener('touchstart', handleInGameClick, {passive: false});
clickerBtn.addEventListener('click', (e) => {
    if (e.pointerType !== '') handleInGameClick(e);
});

// Sol Üstteki Gizli SGM Watermark Butonu
function handleCheatClick(e) {
    if (e) e.preventDefault();
    playOneSecondClickSound(); 
    
    coins += 50000;
    updateUI();
    saveGame();
}

sgmCheatBtn.addEventListener('touchstart', handleCheatClick, {passive: false});
sgmCheatBtn.addEventListener('click', (e) => {
    if (e.pointerType !== '') handleCheatClick(e);
});

// Rebirth İşlemi (Sessiz)
rebirthBtn.addEventListener('click', () => {
    if (rebirths < 10) {
        let currentCost = rebirthCosts[rebirths];
        if (coins >= currentCost) {
            rebirths += 1;
            
            if (rebirths === 10) {
                saveGame();
                victoryScreen.style.display = 'flex';
            } else {
                resetProgressOnRebirth();
            }
        }
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

// Market İşlemleri
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

// Otomatik Kazanç
setInterval(() => {
    if (coinsPerSecond > 0) {
        coins += coinsPerSecond;
        updateUI();
        saveGame();
    }
}, 1000);

// Mobil Zoom Engelleri
document.addEventListener('touchstart', function (e) { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
let lastTouchEnd = 0;
document.addEventListener('touchend', function (e) {
    let now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
}, false);

updateUI();
