var game = {
    attempts: 0,
    cards: 4,
    flipped: 0,
}

function cardAppend() {

    for (var i = 0; i < game.cards; i++) {
        var container = document.querySelector(".gameContainer");
        var card = document.createElement("div");
        var cardFront = document.createElement("div");
        var cardBack = document.createElement("div");
        card.classList.add("card");
        cardBack.classList.add("cardBack");
        cardFront.classList.add("cardFront");
        card.appendChild(cardBack);
        card.appendChild(cardFront);
        container.appendChild(card);
    }
}







cardAppend();
