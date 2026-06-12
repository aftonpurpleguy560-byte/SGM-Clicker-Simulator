// --- Oyun Değişkenleri (Eğer kayıt varsa oradan yükler, yoksa sıfırdan başlar) ---
let coins = Number(localStorage.getItem('coins')) || 0;
let coinsPerClick = Number(localStorage.getItem('coinsPerClick')) || 1;
let coinsPerSecond = Number(localStorage.getItem('coinsPerSecond')) || 0;

let upgrade1Cost = Number(localStorage.getItem('upgrade1Cost')) || 50;
let autoclickCost = Number(localStorage.getItem('autoclickCost')) || 150;

// --- HTML Elemanlarını Seçme ---
const scoreDisplay = document.getElementById('scoreDisplay');
const cpcDisplay = document.getElementById('cpcDisplay');
const cpsDisplay = document.getElementById('cpsDisplay');
const clickerBtn = document.getElementById('clickerBtn');
const upgrade1Btn = document.getElementById('upgrade1Btn');
const autoclickBtn = document.getElementById('autoclickBtn');

// --- Verileri Tarayıcıya Kaydetme Fonksiyonu ---
function saveGame() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('coinsPerSecond', coinsPerSecond);
    localStorage.setItem('upgrade1Cost', upgrade1Cost);
    localStorage.setItem('autoclickCost', autoclickCost);
}

// --- Arayüzü Güncelleme Fonksiyonu ---
function updateUI() {
    scoreDisplay.textContent = Math.floor(coins) + " Coin";
    cpcDisplay.textContent = "Tık Başına: +" + coinsPerClick + " Coin";
    cpsDisplay.textContent = "Saniyede: +" + coinsPerSecond + " Coin";
    
    // Fiyat yazılarını güncelle
    upgrade1Btn.textContent = "Fiyat: " + upgrade1Cost;
    autoclickBtn.textContent = "Fiyat: " + autoclickCost;

    // Yeterli para yoksa butonları devre dışı bırak
    upgrade1Btn.disabled = coins < upgrade1Cost;
    autoclickBtn.disabled = coins < autoclickCost;
}

// --- El ile Tıklama Olayı ---
clickerBtn.addEventListener('click', () => {
    coins += coinsPerClick;
    updateUI();
    saveGame();
});

// --- Market: Bronz Parmak Satın Alma (+1 Tık Gücü) ---
upgrade1Btn.addEventListener('click', () => {
    if (coins >= upgrade1Cost) {
        coins -= upgrade1Cost;
        coinsPerClick += 1;
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5); // Her alımda fiyat %50 artar
        updateUI();
        saveGame();
    }
});

// --- Market: SGM Oto-Bot Satın Alma (+1 Saniyede Kazanç) ---
autoclickBtn.addEventListener('click', () => {
    if (coins >= autoclickCost) {
        coins -= autoclickCost;
        coinsPerSecond += 1;
        autoclickCost = Math.floor(autoclickCost * 1.6); // Her alımda fiyat %60 artar
        updateUI();
        saveGame();
    }
});

// --- Otomatik Zamanlayıcı (Saniyede bir çalışır) ---
setInterval(() => {
    if (coinsPerSecond > 0) {
        coins += coinsPerSecond;
        updateUI();
        saveGame();
    }
}, 1000); // 1000 milisaniye = 1 saniye

// Oyunu ilk açılışta güncelle
updateUI();

