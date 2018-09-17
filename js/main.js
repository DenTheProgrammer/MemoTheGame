var game = {
	attempts: 0,
	cards: 24,
	flipped: [],
	solved: 0,
	img: 230,
	//	assosiatedCards: [],
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

function assosiateCards() {
	//////////////////массив url картинок////////
	var imgUrls = [];
	for (i = 0; i < game.img; i++) {
		imgUrls.push("url(../img/" + i + ".svg)");
	}
	//	console.log(imgUrls);

	//////////////////////////////////////

	var cardBackNodelist = document.querySelectorAll(".cardBack");
	var unclassedCards = [];
	for (var i = 0; i < cardBackNodelist.length; i++) {
		unclassedCards.push(cardBackNodelist[i]);
	}

	var randomCard, randomImg;
	for (i = 0; i < game.cards / 2; i++) {
		randomImg = imgUrls[Math.floor(Math.random() * imgUrls.length)];
		imgUrls.splice(imgUrls.indexOf(randomImg), 1);

		randomCard = Math.floor(Math.random() * unclassedCards.length);
		unclassedCards[randomCard].classList.add("pair" + i);
		unclassedCards[randomCard].style.backgroundImage = randomImg;
		unclassedCards.splice(randomCard, 1);

		randomCard = Math.floor(Math.random() * unclassedCards.length);
		unclassedCards[randomCard].classList.add("pair" + i);
		unclassedCards[randomCard].style.backgroundImage = randomImg;
		unclassedCards.splice(randomCard, 1);



	}

}

var clickedTargets = [];
addEventListener("click", function (e) {

	if (e.target.classList[0] === "cardFront") {
		e.target.parentNode.classList.toggle("flip");
		game.attempts++;
		game.flipped.push(e.target.parentNode.children[0].classList[1]);
		clickedTargets.push(e.target);
		console.log(game.flipped);
		//		console.log(clickedTargets);
		if (game.flipped.length === 2) {
			if (game.flipped[0] === game.flipped[1]) {
				game.flipped = [];
				////////animation///////
				var solved1, solved2;
				solved1 = clickedTargets[0];
				solved2 = clickedTargets[1];
				setTimeout(function () {
					solved1.parentElement.classList.add("solved");
					solved2.parentElement.classList.add("solved");
				}, 800);
				///////////////////////
				clickedTargets = [];
				console.log("Совпадение");
				game.solved += 2;
			} else {
				var wrong0, wrong1;
				wrong0 = clickedTargets[0];
				wrong1 = clickedTargets[1];
				clickedTargets = [];
				game.flipped = [];
				setTimeout(function () {
					wrong0.parentElement.classList.toggle("flip");
					wrong1.parentElement.classList.toggle("flip");
				}, 1000);
			}
		}
	}
	if (game.solved === game.cards) {
		setTimeout(function () {
			alert("Победа! Количество попыток: " + game.attempts);
		}, 1000)
	}
})


cardAppend();
assosiateCards();
