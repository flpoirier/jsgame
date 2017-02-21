const Draw = require('./draw.js');
const Dude = require('./dude.js');
const Sun = require('./sun.js');
const Star = require('./stars.js');
const Asteroid = require('./asteroids.js');

class Game {

  constructor() {

    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 1100;
    this.canvasHeight = 750;

    this.endMargin = 40;
    this.endPoint = this.canvasWidth - this.endMargin;

    this.asteroidColors = ["red", "orange", "yellow", "green", "blue", "purple"];
    this.asteroidSpeed = 20;
    this.asteroidRad = 10;
    this.asteroidPush = 60;
    this.intersectionMaxTime = 15;
    this.asteroids = [];

    this.bridgeX = this.canvasWidth / 2;
    this.bridgeY = this.canvasHeight + 400;
    this.bridgeRad = this.canvasWidth * 2/3;
    this.bridgeHeight = Math.floor(this.bridgeRad + this.asteroidRad);

    this.stars = [];
    this.numStars = 800;
    this.twinkle = 0;
    this.starsOut = 0;

    this.maxTime = 30;
    this.time = this.maxTime;
    this.minsAndSecs = "";

    this.gameOver = false;
    this.gameWon = false;
    this.gameLost = false;

    this.rightPressed = false;
    this.leftPressed = false;
    this.upPressed = false;
    this.downPressed = false;
    this.spacePressed = false;

    this.dudeX = this.endMargin;
    this.dudeY = 0;
    this.dudeHeight = 75;
    this.dudeRad = 15;
    this.dudeDx = 1;
    this.walkSpeed = 2;

    this.jumping = false;
    this.falling = false;
    this.justJumped = false;
    this.jumpHeight = 0;
    this.jumpSpeed = 5;
    this.maxJump = 60;

    this.sunRad = 20;
    this.sunX = this.canvasWidth / 2;
    this.sunY = this.sunRad;
    this.sunset = 0;

    this.red = 85;
    this.green = 200;
    this.blue = 255;

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.timeString = this.timeString.bind(this);
    this.timeTick = this.timeTick.bind(this);
    this.play = this.play.bind(this);
  }

  // end of constants

  keyDownHandler(e) {
    if(e.keyCode == 39) {
      rightPressed = true;
    }
    else if(e.keyCode == 37) {
      leftPressed = true;
    }
    else if(e.keyCode == 38) {
      upPressed = true;
    }
    else if(e.keyCode == 40) {
      downPressed = true;
    }
    else if(e.keyCode == 32) {
      spacePressed = true;
    }
  }

  keyUpHandler(e) {
    if(e.keyCode == 39) {
      rightPressed = false;
    }
    else if(e.keyCode == 37) {
      leftPressed = false;
    }
    else if(e.keyCode == 38) {
      upPressed = false;
    }
    else if(e.keyCode == 40) {
      downPressed = false;
    }
    else if(e.keyCode == 32) {
      spacePressed = false;
    }
  }

  timeString() {
    let mins = Math.floor(this.time / 60);
    let secs = this.time - (mins * 60);
    if (mins === 0) {
      mins = "00";
    } else {
      mins = `0${mins}`;
    }
    if (secs === 0) {
      secs = "00";
    } else if (secs < 10) {
      secs = `0${secs}`;
    } else if (secs > 10) {
      secs = `${secs}`;
    }
    this.minsAndSecs = `${mins}:${secs}`;
  }

  timeTick() {
    if (this.time > 0) {
      this.time -= 1;
    }
    this.timeString();
  }

  play() {

    this.timeString();

    Star.prototype.starConstructor();

    document.addEventListener("keydown", Game.prototype.keyDownHandler, false);
    document.addEventListener("keyup", Game.prototype.keyUpHandler, false);

    setInterval(Sun.sundown, 30);
    setInterval(Star.starshine, 30);
    setInterval(Dude.walking, 30);
    setInterval(Asteroid.collisionChecker, 30);
    setInterval(Asteroid.asteroidConstructor, 1000);
    setInterval(Asteroid.asteroidConstructor, 2500);
    setInterval(Game.prototype.timeTick, 1000);
    setInterval(Game.prototype.timeString, 1000);
    setInterval(Draw.draw, 30);

  }
}

module.exports = Game;
