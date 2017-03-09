const Game = require('./game.js');

let game = new Game();
let canvas = document.getElementById("layer3");

game.drawSky();
game.drawFront();

// game.play();

canvas.addEventListener("click", game.play, false);
