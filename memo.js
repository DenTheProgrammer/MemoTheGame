var Game = {
    victory: false,
    attemps: 0,
    flipped:0
};

$(".card").click(function () {
    $(this).toggleClass("flip");
    Game.attemps++;
});

    
