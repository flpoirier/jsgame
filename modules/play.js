const Sun = require('./sun.js');
const Star = require('./stars.js');
const Asteroid = require('./asteroids.js');
const Dude = require('./dude.js');
const Game = require('./game.js');

let sun = new Sun();
let stars = new Star();
let dude = new Dude();
let asteroids = new Asteroid(sun, dude);
let game = new Game(sun, stars, asteroids, dude);

game.play();
