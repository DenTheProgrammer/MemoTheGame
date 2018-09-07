var Game = {
    victory: function () {
        if (this.solved === 20)
            return true;
        return false;
    },
    attemps: 0,
    solved: 0,
    guessed: 0
};


$(".card").click(function () {
    $(this).toggleClass("flip");
    Game.attemps++;
    Game.solved++;//for test
});
