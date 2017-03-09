const Game = require('./game.js');

let game = new Game();
let canvas = document.getElementById("layer3");

setInterval(game.draw, 30);

// game.play();

canvas.addEventListener("click", game.play, false);
