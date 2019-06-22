const cards = document.querySelectorAll('.memory-card'); 

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    
    // Double click first card
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard){
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 

    // Second click
    hasFlippedCard = false;
    secondCard = this;

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
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));