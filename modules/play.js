const Game = require('./game.js');

let game = new Game();

setInterval(game.draw, 30);

// game.play();

document.addEventListener("click", game.play, false);
