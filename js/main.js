var game = {
    attempts: 0,
    cards: 10,
    flipped: [],
    assosiatedCards: [],
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
        cardFront.classList.add("cardFront" + i); //индекс карточки
        card.appendChild(cardBack);
        card.appendChild(cardFront);
        container.appendChild(card);
    }
}

function assosiateCards() {

    for (var i = 0; i < game.cards; i++) {

        var newNumber = Math.floor(Math.random() * game.cards);

        function isRepeated() {
            for (var j = i - 1; j > -1; j--) {
                if (newNumber == game.assosiatedCards[j]) {
                    return true;
                }
            }
            return false;
        }

        if ((newNumber !== i) && (i==0 || !(isRepeated()))) {
            game.assosiatedCards[i] = newNumber;
        } else {
            i--;
        }
    }
}

document.querySelector(".gameContainer").addEventListener("click", function (e) {
    if (e.target.classList[0] === "cardFront") {
        e.target.parentNode.classList.toggle("flip");
        game.attempts++;
        game.flipped.push(+e.target.classList[1][9]);
        if (game.flipped.length === 2) {
            if (game.assosiatedCards[game.flipped[0]] === game.flipped[1]) {
                console.log("совпадение");
                game.flipped = [];
            } else {
                setTimeout(function () {
                    document.querySelector(".cardFront" + game.flipped[0]).parentNode.classList.toggle("flip");
                    document.querySelector(".cardFront" + game.flipped[1]).parentNode.classList.toggle("flip");
                    game.flipped = [];
                }, 1500);
            }
        }
    }
})





cardAppend();
assosiateCards();
