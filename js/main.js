var game = {
	attempts: 0,
	cards: 4,
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
		//		cardBack.classList.add("cardBack" + i); //индекс карточки
		cardFront.classList.add("cardFront");
		//		cardFront.classList.add("cardFront" + i); //индекс карточки
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
				var solved1,solved2;
				solved1=clickedTargets[0];
				solved2=clickedTargets[1];
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



//
//function assosiateCards() {
//	var newNumber;
//	for (var i = 0; i < game.cards; i++) {
//		newNumber = Math.floor(Math.random() * game.cards);
//		if (game.assosiatedCards[i] === undefined) {
//			if ((newNumber !== i) && (game.assosiatedCards.indexOf(newNumber) === -1)) {
//				game.assosiatedCards[i] = newNumber;
//				game.assosiatedCards[newNumber] = i;
//			} else {
//				i--;
//			}
//		} else {
//			continue;
//		}
//	}
//}
//
//document.querySelector(".gameContainer").addEventListener("click", function (e) {
//	if (e.target.classList[0] === "cardFront") {
//		e.target.parentNode.classList.toggle("flip");
//		game.attempts++;
//		game.flipped.push(parseInt(e.target.classList[1].replace(/\D+/g, "")));
//		if (game.flipped.length > 1) {
//			if (game.assosiatedCards[game.flipped[0]] === game.flipped[1]) {
//				console.log("совпадение");
//				game.flipped = [];
//				game.solved += 2;
//				if (game.solved === game.cards) {
//					alert("Победа! Количество попыток: " + game.attempts);
//				}
//
//			} else {
//				setTimeout(function () {
//					document.querySelector(".cardFront" + game.flipped[0]).parentNode.classList.toggle("flip");
//					document.querySelector(".cardFront" + game.flipped[1]).parentNode.classList.toggle("flip");
//					game.flipped = [];
//				}, 1000);
//			}
//		}
//	}
//	console.log(game.flipped);
//})
//
//
//function setImages() {
//	var randomImages = [];
//	var doneImages = [];
//	for (var i = 0; i < game.cards / 2; i++) {
//		var imgIndex = Math.floor(Math.random() * 230); //N+1 где n-колво картинок
//		if (randomImages.indexOf(imgIndex) === -1) {
//			randomImages.push(imgIndex);
//		} else {
//			i--;
//		}
//	}
//	//	console.log(randomImages);
//	var img = 0;
//	for (i = 0; i < game.cards; i++) {
//
//		if (doneImages.indexOf(game.assosiatedCards[i]) === -1) {
//			doneImages.push(game.assosiatedCards[i]);
//			doneImages.push(game.assosiatedCards[game.assosiatedCards[i]]);
//			document.querySelector(".cardBack" + game.assosiatedCards[i]).style.backgroundImage = "url(../img/" + randomImages[img] + ".svg)";
//			document.querySelector(".cardBack" + game.assosiatedCards[game.assosiatedCards[i]]).style.backgroundImage = "url(../img/" + randomImages[img] + ".svg)";
//			img++;
//
//		}
//	}
//}


cardAppend();
assosiateCards();
//setImages();
//console.log(game.assosiatedCards);
