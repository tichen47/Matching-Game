/*jshint esversion: 6 */

const cards = document.querySelectorAll('.memory-card'); 
const newGame = document.querySelector('.restart');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let remainCard = 16;
let message = "Congratulation";

function flipCard() {
    if(lockBoard) return;
    
    // Double click first card
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard){
        // First click
        hasFlippedCard = true;
        firstCard = this;
        remainCard -= 1;
        return;
    } 

    // Second click
    hasFlippedCard = false;
    secondCard = this;
    remainCard -= 1;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.frame === secondCard.dataset.frame

    isMatch ? disableCards() : unFlipCards();
}

function flipBackFirst(){
    firstCard.classList.remove('flip');
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    if (remainCard === 0) {
        setTimeout(() => {
            alert(message);
            newBoard();
        }, 500);
    }
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        remainCard += 2;
    }, 800);
}


function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

function newBoard() {
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    remainCard = 16;
    shuffle(); 
}

newGame.addEventListener('click', newBoard);
newBoard();
