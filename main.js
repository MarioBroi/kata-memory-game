//definisco l'array con le varie immagini
const images = [
    'alien.png', 'alien.png', 'bug.png', 'bug.png',
    'duck.png', 'duck.png', 'rocket.png', 'rocket.png',
    'spaceship.png', 'spaceship.png', 'tiktac.png', 'tiktac.png'
];

//creo nuovi array vuoti per le carte girate e le carte combacianti con un contatore di errori
let flippedCards = [];
let matchedCards = [];
let errorCount = 0;

//definisco l'area di gioco e dove mostrare il contatore di errori
const gameBoard = document.getElementById('game-board');
const errorCounter = document.getElementById('error-counter');

/* 
Questa funzione mischia i valori contenuti dentro all'array che gli passiamo
- Cicla dall'ultimo elemento dell'array fino al secondo elemento
- Definisce J che prende un valore random tra 0 e l'indice corrente
- Gli elementi all'indice corrente (i) e l'indice casuale (j) vengono scambiati.
*/
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* 
Con questa funzione creo la tavola da gioco
- Richiamo la funzione shuffle con elemento l'array images
- Ciclo per ogni immagine
- Creo gli elementi: 
    - <div class:"card">
    - <img src="../images/(nome immagine dinamico per ogni card)">
    - l'event listener per aggiungere la funzione flip a click
*/
function createBoard() {
    shuffle(images);
    images.forEach(image => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const imgElement = document.createElement('img');
        imgElement.src = "../images/" + image;
        cardElement.appendChild(imgElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

/* 
Con questa funzione mostriamo l'immagine della card
- Se le carte girate sono meno di 2 e non contengono la classe "flipped"
    - aggiunge la classe flipped e la pusha
    - se le carte girate sono 2 richiama la funzione per controllare se combaciano
*/
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}


/* 
Con questa funzione controlliamo se le carte girate combaciano
- Definisco un array con 2 valori
- Se valore 1 e valore 2 combaciano
    - Aggiunge la classe "matched" ad entrambi
    - Svuota l'array delle carte girate
    - Se le carte che combaciano sono tante quante le carte totali
        - Manda una notifica di vittoria    
    - Altrimenti
        - Incrementa il contro degli errori
        - Rigira le carte rimuovendo la classe "flipped" 
        - Svuota l'array delle carte girate
*/
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.querySelector('img').src === card2.querySelector('img').src) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === images.length) {
            setTimeout(() => alert('Hai vinto!'), 500);
        }
    } else {
        errorCount++;
        errorCounter.textContent = `Errori: ${errorCount}`;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

/* Richiamo la funzione per fer partire il gioco */
createBoard();
