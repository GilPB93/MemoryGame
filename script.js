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

const gameBoard = document.getElementById('game-board'); // Récupère l'élément game-board

// CREER UNE CARTE
function createCard(cardUrl) { // Corrigé : utilisation de cardUrl
    const card = document.createElement('div'); // Crée une nouvelle div
    card.classList.add('card'); // Ajoute la classe 'card' à la div
    card.dataset.value = cardUrl; // Ajoute un attribut 'data-value' à la div avec la valeur de cardUrl

    const cardContent = document.createElement('img'); // Crée un nouvel élément img
    cardContent.classList.add('card-content'); // Ajoute la classe 'card-content' à l'élément img
    cardContent.src = cardUrl; // Corrigé : utilisation de cardUrl directement
    card.appendChild(cardContent); // Ajoute l'élément img à la div

    return card; // Retourne la div
}

// DUPLIQUER LE TABLEAU
function duplicateArray(arraySimple) { // Fonction qui prend un tableau en paramètre et retourne un tableau avec les éléments dupliqués
    let arrayDouble = []; // Crée un nouveau tableau
    arrayDouble.push(...arraySimple); // Ajoute les éléments du tableau simple à la fin du tableau double
    arrayDouble.push(...arraySimple); // Ajoute les éléments du tableau simple à la fin du tableau double
    
    return arrayDouble; // Retourne le tableau double
}

// MELANGER LE TABLEAU
function shuffleArray(arrayToShuffle) {
    const arrayShuffled = arrayToShuffle.sort(() => 0.5 - Math.random()); // Mélange le tableau en utilisant une fonction de tri aléatoire

    return arrayShuffled;
}


let allCards = duplicateArray(cards); 
allCards = shuffleArray(allCards); // Mélange le tableau allCards
allCards.forEach(card => { // Pour chaque élément du tableau allCards
    const cardHtml = createCard(card); // Crée une div avec la fonction createCard
    gameBoard.appendChild(cardHtml); // Ajoute la div à la fin du gameBoard
});
