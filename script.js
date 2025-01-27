const cards = [
    '/img/Card1.png',
    '/img/Card2.png',
    '/img/Card3.png',
    '/img/Card4.png',
    '/img/Card5.png',
    '/img/Card6.png',
    '/img/Card7.png',
    '/img/Card8.png'
];

const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');

let selectedCards = [];
let isWaiting = false;
let timerInterval;
let startTime;

// Chronomètre
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = `Temps : ${elapsedTime} secondes`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    timerDisplay.textContent = 'Temps : 0 secondes';
}

// Créer une carte
function createCard(cardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = cardUrl;
    card.appendChild(cardContent);

    card.addEventListener('click', onCardClick);
    return card;
}

// Dupliquer le tableau
function duplicateArray(arraySimple) {
    return [...arraySimple, ...arraySimple];
}

// Mélanger le tableau
function shuffleArray(arrayToShuffle) {
    return arrayToShuffle.sort(() => 0.5 - Math.random());
}

// Gérer le clic sur une carte
function onCardClick(e) {
    if (isWaiting) return; // Bloquer les clics pendant l'attente

    const card = e.target.parentElement;
    if (card.classList.contains('flip') || card.classList.contains('matched')) return;

    card.classList.add('flip');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        isWaiting = true; // Bloquer les clics
        setTimeout(() => {
            if (selectedCards[0].dataset.value === selectedCards[1].dataset.value) {
                // Paires trouvées
                selectedCards[0].classList.add('matched');
                selectedCards[1].classList.add('matched');
                selectedCards[0].removeEventListener('click', onCardClick);
                selectedCards[1].removeEventListener('click', onCardClick);

                const allCardNotMatched = document.querySelectorAll('.card:not(.matched)');
                if (allCardNotMatched.length === 0) {
                    stopTimer();
                    alert(`Bravo, vous avez gagné ! Temps total : ${timerDisplay.textContent}`);
                }
            } else {
                // Mauvaise paire
                selectedCards[0].classList.remove('flip');
                selectedCards[1].classList.remove('flip');
            }
            selectedCards = [];
            isWaiting = false; // Réactiver les clics
        }, 1000);
    }
}

// Redémarrer la partie
function restartGame() {
    gameBoard.innerHTML = '';
    resetTimer();
    selectedCards = [];
    isWaiting = false;

    let allCards = duplicateArray(cards);
    allCards = shuffleArray(allCards);
    allCards.forEach(card => {
        const cardHtml = createCard(card);
        gameBoard.appendChild(cardHtml);
    });

    startTimer();
}

// Initialisation
restartButton.addEventListener('click', restartGame);
restartGame();
