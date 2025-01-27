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
let selectedCards = []; // Crée un tableau vide

// CREER UNE CARTE
function createCard(cardUrl) { // Corrigé : utilisation de cardUrl
    const card = document.createElement('div'); // Crée une nouvelle div
    card.classList.add('card'); // Ajoute la classe 'card' à la div
    card.dataset.value = cardUrl; // Ajoute un attribut 'data-value' à la div avec la valeur de cardUrl

    const cardContent = document.createElement('img'); // Crée un nouvel élément img
    cardContent.classList.add('card-content'); // Ajoute la classe 'card-content' à l'élément img
    cardContent.src = cardUrl; // Corrigé : utilisation de cardUrl directement
    card.appendChild(cardContent); // Ajoute l'élément img à la div

    card.addEventListener('click', onCardClick); // Ajoute un écouteur d'événement 'click' à la div
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
function shuffleArray(arrayToShuffle) { // Fonction qui prend un tableau en paramètre et retourne un tableau mélangé
    const arrayShuffled = arrayToShuffle.sort(() => 0.5 - Math.random()); // Mélange le tableau en utilisant une fonction de tri aléatoire

    return arrayShuffled; // Retourne le tableau mélangé
}

// FLIP CARD
function onCardClick(e){ // Fonction qui prend un événement en paramètre
    const card = e.target.parentElement; // Récupère l'élément parent de l'élément cliqué
    card.classList.add('flip'); // Ajoute la classe 'flip' à l'élément parent
    
    selectedCards.push(card); // Ajoute l'élément parent à la fin du tableau selectedCards
    if(selectedCards.length == 2){ // Si le tableau selectedCards contient 2 éléments
        setTimeout(() => { // Attend 1 seconde avant de valider ou pas la paire
            if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){ // Si les valeurs des éléments du tableau selectedCards sont égales
                //on a trouvé une paire
                selectedCards[0].classList.add("matched"); // Ajoute la classe 'matched' à l'élément 0 du tableau selectedCards
                selectedCards[1].classList.add("matched"); // Ajoute la classe 'matched' à l'élément 1 du tableau selectedCards
                selectedCards[0].removeEventListener('click', onCardClick); // Supprime l'écouteur d'événement 'click' de l'élément 0 du tableau selectedCards
                selectedCards[1].removeEventListener('click', onCardClick); // Supprime l'écouteur d'événement 'click' de l'élément 1 du tableau selectedCards

                const allCardNotMatched = document.querySelectorAll('.card:not(.matched)'); // Récupère tous les éléments avec la classe 'card' qui n'ont pas la classe 'matched'
                if(allCardNotMatched.length == 0){ // Si le tableau allCardNotMatched est vide
                    alert('Bravo, vous avez gagné'); // Affiche une alerte : Le joueur a gagné
                }
            }
            else{
                //on s'est trompé
                
                    selectedCards[0].classList.remove("flip"); // Supprime la classe 'flip' de l'élément 0 du tableau selectedCards
                    selectedCards[1].classList.remove("flip"); // Supprime la classe 'flip' de l'élément 1 du tableau selectedCards
            }
            selectedCards = []; // Réinitialise le tableau selectedCards
        }, 1000)
    }
}


let allCards = duplicateArray(cards); 
allCards = shuffleArray(allCards); // Mélange le tableau allCards
allCards.forEach(card => { // Pour chaque élément du tableau allCards
    const cardHtml = createCard(card); // Crée une div avec la fonction createCard
    gameBoard.appendChild(cardHtml); // Ajoute la div à la fin du gameBoard
});
