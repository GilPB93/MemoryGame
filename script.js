document.addEventListener('DOMContentLoaded', function () {
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
    const statsDisplay = document.getElementById('stats');
    const topScoresDisplay = document.getElementById('top-scores'); // Affichage des 5 meilleurs scores

    if (!topScoresDisplay) {
        console.error("L'élément avec l'ID 'top-scores' n'a pas été trouvé dans le DOM.");
        return;
    }

    let selectedCards = [];
    let isWaiting = false;
    let timerInterval;
    let startTime;

    // Gestion des cookies pour les scores
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let c of cookies) {
            c.trim();
            if (c.startsWith(nameEQ)) return c.substring(nameEQ.length);
        }
        return null;
    }

    function updateStats(newScore) {
        let scores = getCookie('scores');
        scores = scores ? JSON.parse(scores) : [];
    
        // Ajouter le nouveau score
        scores.push(newScore);
    
        // Trier les scores par ordre croissant (meilleur score en premier)
        scores.sort((a, b) => a - b);
    
        // Garder les 5 meilleurs scores
        if (scores.length > 5) {
            scores = scores.slice(0, 5);
        }
    
        setCookie('scores', JSON.stringify(scores), 365);
    
        const totalScores = scores.reduce((sum, score) => sum + score, 0);
        const averageScore = (totalScores / scores.length).toFixed(2);
        const bestScore = scores[0];
    
        statsDisplay.textContent = `Moyenne des scores : ${averageScore} secondes | Meilleur score : ${bestScore} secondes`;
    
        // Vérifier si topScoresDisplay existe avant de modifier son contenu
        if (topScoresDisplay) {
            topScoresDisplay.innerHTML = '<h3>Top 5 Scores:</h3>';
            scores.forEach((score, index) => {
                const scoreElement = document.createElement('p');
                scoreElement.textContent = `#${index + 1}: ${score} secondes`;
                topScoresDisplay.appendChild(scoreElement);
            });
        } else {
            console.error("L'élément 'top-scores' est introuvable !");
        }
    }
    

    function loadStats() {
        const scores = getCookie('scores');
        if (scores) {
            updateStats(0); // Met à jour l'affichage sans ajouter de nouveau score
        } else {
            statsDisplay.textContent = 'Aucun score enregistré pour l\'instant';
            topScoresDisplay.innerHTML = '<h3>Top 5 Scores:</h3><p>Aucun score enregistré</p>';
        }
    }

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
                        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                        alert(`Bravo, vous avez gagné ! Temps total : ${elapsedTime} secondes`);
                        updateStats(elapsedTime);
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
    loadStats();
    restartGame();
});
