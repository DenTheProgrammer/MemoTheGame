var game = {
	attempts: 0,
	cards: 10,
	flipped: [],
	solved: 0,
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
		cardBack.classList.add("cardBack" + i); //индекс карточки
		cardFront.classList.add("cardFront");
		cardFront.classList.add("cardFront" + i); //индекс карточки
		card.appendChild(cardBack);
		card.appendChild(cardFront);
		container.appendChild(card);
	}
}


function assosiateCards() {
	var newNumber;
	for (var i = 0; i < game.cards; i++) {
		newNumber = Math.floor(Math.random() * game.cards);
		if (game.assosiatedCards[i] === undefined) {
			if ((newNumber !== i) && (game.assosiatedCards.indexOf(newNumber) === -1)) {
				game.assosiatedCards[i] = newNumber;
				game.assosiatedCards[newNumber] = i;
			} else {
				i--;
			}
		} else {
			continue;
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
				game.solved += 2;
				if (game.solved === game.cards) {
					alert("Победа!");
				}

			} else {
				setTimeout(function () {
					document.querySelector(".cardFront" + game.flipped[0]).parentNode.classList.toggle("flip");
					document.querySelector(".cardFront" + game.flipped[1]).parentNode.classList.toggle("flip");
					game.flipped = [];
				}, 1000);
			}
		}
	}
})


function setImages() {
	var randomImages = [];
	var doneImages = [];
	for (var i = 0; i < game.cards / 2; i++) {
		var imgIndex = Math.floor(Math.random() * 230); //N+1 где n-колво картинок
		if (randomImages.indexOf(imgIndex) === -1) {
			randomImages.push(imgIndex);
		} else {
			i--;
		}
	}
//	console.log(randomImages);
	var img = 0;
	for (i = 0; i < game.cards; i++) {

		if (doneImages.indexOf(game.assosiatedCards[i]) === -1) {
			doneImages.push(game.assosiatedCards[i]);
			doneImages.push(game.assosiatedCards[game.assosiatedCards[i]]);
			document.querySelector(".cardBack" + game.assosiatedCards[i]).style.backgroundImage = "url(../img/" + randomImages[img] + ".svg)";
			document.querySelector(".cardBack" + game.assosiatedCards[game.assosiatedCards[i]]).style.backgroundImage = "url(../img/" + randomImages[img] + ".svg)";
			img++;

		}
	}
}


cardAppend();
assosiateCards();
setImages();
console.log(game.assosiatedCards);