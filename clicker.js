
let cookieElement = document.getElementById("cookie");
let cookiesElement = document.getElementById("cookies");
let cookiesPerClickElement = document.querySelector(".cookiestat:nth-child(2) .stat-value");
let cookiesPerSecondElement = document.querySelector(".cookiestat:nth-child(3) .stat-value");
let autoClickElement = document.querySelector(".cookiestat:nth-child(4) .stat-value");
let bronzeButton = document.getElementById("bronzeButton");
let silverButton = document.getElementById("silverButton");
let goldButton = document.getElementById("goldButton");
let diamondButton = document.getElementById("diamondButton");
let upgradeClicker = document.getElementById("upgradeclicker"); 
let autoClicker = document.getElementById("autoclicker"); 

let cookies = 0;
let totalClicks = 0;

let bronzeCount = 0;
let bronzeCost = 100;

let silverCount = 0;
let silverCost = 250;

let goldCount = 0;
let goldCost = 500;

let diamondCount = 0;
let diamondCost = 1000;

let multiplier = 1;
let multiplierCost = 50; 

let autoClickers = 0;
let autoClickerCost = 100;

function getTotalCps() {
    return autoClickers * 0.6 + bronzeCount * 1 + silverCount * 5 + goldCount * 25 + diamondCount * 100;
}
function updateUI() {
    let totalCps = getTotalCps();
    
    cookiesElement.innerText = Math.floor(cookies);
    cookiesPerClickElement.innerText = multiplier;
    cookiesPerSecondElement.innerText = totalCps.toFixed(1);
    autoClickElement.innerText = autoClickers;

    upgradeClicker.innerText = "Upgrade clicker (cost: " + multiplierCost + ")";
    autoClicker.innerText = "Auto clicker (cost: " + autoClickerCost + ")";

    bronzeButton.innerText = "Bronze rank: Buy for " + Math.round(bronzeCost) + " cookies";
    silverButton.innerText = "Silver rank: Buy for " + Math.round(silverCost) + " cookies";
    goldButton.innerText = "Gold rank: Buy for " + Math.round(goldCost) + " cookies";
    diamondButton.innerText = "Diamond rank: Buy for " + Math.round(diamondCost) + " cookies";

    setButtonState(bronzeButton, bronzeCost);
    setButtonState(silverButton, silverCost);
    setButtonState(goldButton, goldCost);
    setButtonState(diamondButton, diamondCost);
    setButtonState(upgradeClicker, multiplierCost);
    setButtonState(autoClicker, autoClickerCost);
}
cookieElement.addEventListener('click', function() {
    cookies += multiplier;
    totalClicks++;
    
    cookieElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        cookieElement.style.transform = 'scale(1)';
    }, 100);
    
    updateUI();
});
upgradeClicker.addEventListener('click', function() {
    if (cookies >= multiplierCost) {
        cookies -= multiplierCost;
        multiplierCost = Math.round(multiplierCost * 1.3);
        multiplier++;
        updateUI();
    } else {
        alert("Not enough cookies!");
    }
});
autoClicker.addEventListener('click', function() {
    if (cookies >= autoClickerCost) {
        cookies -= autoClickerCost;
        autoClickerCost = Math.round(autoClickerCost * 1.25);
        autoClickers++;
        updateUI();
    } else {
        alert("Not enough cookies!");
    }
});
bronzeButton.addEventListener('click', function() {
    if (cookies >= bronzeCost) {
        cookies -= bronzeCost;
        bronzeCost = Math.round(bronzeCost * 1.3);
        bronzeCount++;
        updateUI();
    }
});
silverButton.addEventListener('click', function() {
    if (cookies >= silverCost) {
        cookies -= silverCost;
        silverCost = Math.round(silverCost * 1.3);
        silverCount++;
        updateUI();
    }
});
goldButton.addEventListener('click', function() {
    if (cookies >= goldCost) {
        cookies -= goldCost;
        goldCost = Math.round(goldCost * 1.3);
        goldCount++;
        updateUI();
    }
});
diamondButton.addEventListener('click', function() {
    if (cookies >= diamondCost) {
        cookies -= diamondCost;
        diamondCost = Math.round(diamondCost * 1.3);
        diamondCount++;
        updateUI();
    }
});
setInterval(function() {
    let totalCps = getTotalCps();
    if (totalCps > 0) {
        cookies += totalCps;
        updateUI();
    }
}, 1000);

function setButtonState(button, cost) {
    if (cookies >= cost) {
        button.classList.add("available");
        button.classList.remove("unavailable");
        button.disabled = false;
    } else {
        button.classList.add("unavailable");
        button.classList.remove("available");
        button.disabled = true;
    }
}
function saveGame() {
    const gameData = {cookies,totalClicks,bronzeCount,bronzeCost,silverCount,silverCost,goldCount,goldCost,diamondCount,diamondCost,multiplier,multiplierCost,autoClickers,autoClickerCost};
    localStorage.setItem('cookieClickerGame', JSON.stringify(gameData));
}
function loadGame() {
    const savedGame = localStorage.getItem('cookieClickerGame');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        cookies = gameData.cookies || 0;
        totalClicks = gameData.totalClicks || 0;
        bronzeCount = gameData.bronzeCount || 0;
        bronzeCost = gameData.bronzeCost || 100;
        silverCount = gameData.silverCount || 0;
        silverCost = gameData.silverCost || 250;
        goldCount = gameData.goldCount || 0;
        goldCost = gameData.goldCost || 500;
        diamondCount = gameData.diamondCount || 0;
        diamondCost = gameData.diamondCost || 1000;
        multiplier = gameData.multiplier || 1;
        multiplierCost = gameData.multiplierCost || 50;
        autoClickers = gameData.autoClickers || 0;
        autoClickerCost = gameData.autoClickerCost || 100;
        
        console.log('Game loaded from localStorage');
    }
}
function updateUIWithSave() {
    updateUI();
    saveGame();
}
window.addEventListener('DOMContentLoaded', function() {
    loadGame();
    updateUI();
    
    // Start auto-clicker interval
    setInterval(function() {
        let totalCps = getTotalCps();
        if (totalCps > 0) {
            cookies += totalCps;
            updateUIWithSave();
        }
    }, 1000);
});
