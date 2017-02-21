/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Asteroid {

  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 1100;
    this.canvasHeight = 750;

    this.endMargin = 40;
    this.endPoint = this.canvasWidth - this.endMargin;

    this.bridgeX = this.canvasWidth / 2;
    this.bridgeY = this.canvasHeight + 400;
    this.bridgeRad = this.canvasWidth * 2/3;
    this.bridgeHeight = Math.floor(this.bridgeRad + this.asteroidRad);



    this.asteroidColors = ["red", "orange", "yellow", "green", "blue", "purple"];
    this.asteroidSpeed = 20;
    this.asteroidRad = 10;
    this.asteroidPush = 60;
    this.intersectionMaxTime = 15;
    this.asteroids = [];

    this.distance = this.distance.bind(this);
    this.bridgeCollisionPoint = this.bridgeCollisionPoint.bind(this);
    this.asteroidConstructor = this.asteroidConstructor.bind(this);
    this.collisionChecker = this.collisionChecker.bind(this);
  }

  // basic distance formula

  distance(x1, y1, x2, y2) {
    return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
  }

  // calculates at what height a given asteroid will hit the bridge

  bridgeCollisionPoint(astX) {
    return -1 * Math.floor(Math.sqrt( (this.bridgeHeight*this.bridgeHeight) - ((astX-this.bridgeX)*(astX-this.bridgeX)) ) - this.bridgeY);
  }

  asteroidConstructor() {
    if (this.sunY < this.canvasHeight) {
      let asteroidX = getRandomInt(0, this.canvasWidth);
      let asteroidY = -1 * this.asteroidRad;
      let asteroidCol = "#292e37";
      let intersectingColor = "red";
      let asteroidCollisionPoint = bridgeCollisionPoint(this.asteroidX);
      let asteroidFalling = true;
      let asteroidRolling = false;
      let asteroidIntersecting = false;
      let intersectingTimer = 0;
      let asteroidDx = -this.asteroidSpeed;
      this.asteroids.push({X: asteroidX, Y: asteroidY, color: asteroidCol, intersectingColor: intersectingColor,
        collisionPoint: asteroidCollisionPoint, falling: asteroidFalling, rolling: asteroidRolling,
        intersecting: asteroidIntersecting, intersectingTimer: intersectingTimer, dX: asteroidDx});
    }
  }

  collisionChecker() {
    this.asteroids.forEach((asteroid) => {
      if (asteroid.intersecting && asteroid.intersectingTimer < intersectionMaxTime) {
        asteroid.intersectingTimer += 1;
      } else if (asteroid.intersecting && asteroid.intersectingTimer === intersectionMaxTime) {
        asteroid.intersecting = false;
        asteroid.intersectingTimer = 0;
      } else if ((Math.floor(distance(asteroid.X, asteroid.Y, dudeX, dudeY)) + 2) < asteroidRad && !asteroid.intersecting) {
        dudeX -= asteroidPush;
        asteroid.intersecting = true;
      }
    });
  }

}

module.exports = Asteroid;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Dude {

  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 1100;
    this.canvasHeight = 750;

    this.endMargin = 40;
    this.endPoint = this.canvasWidth - this.endMargin;

    this.bridgeX = this.canvasWidth / 2;
    this.bridgeY = this.canvasHeight + 400;
    this.bridgeRad = this.canvasWidth * 2/3;
    this.bridgeHeight = Math.floor(this.bridgeRad + this.asteroidRad);


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

    this.jumpDelay = this.jumpDelay.bind(this);
    this.walking = this.walking.bind(this);
  }

  jumpDelay() {
    this.justJumped = false;
  }

  walking() {
    if (this.leftPressed) {
      this.dudeX -= this.walkSpeed;
    } else if (this.rightPressed) {
      this.dudeX += this.walkSpeed;
    }

    // boundaries on where avatar can walk

    if (this.dudeX >= this.endPoint && this.time > 0) {
      this.dudeX = this.endPoint;
      this.gameOver = true;
      this.gameWon = true;
    } else if (this.dudeX >= this.endPoint) {
      this.dudeX = this.endPoint;
    } else if (this.dudeX < this.endMargin) {
      this.dudeX = this.endMargin;
    }

    if (this.time === 0 && !this.gameWon) {
      this.gameOver = true;
      this.gameLost = true;
    }

    // jumping logic

    if (this.spacePressed && !this.falling && !this.justJumped) {
      this.jumping = true;
    }

    // jump height proportional to length of time space bar pressed

    if (this.jumping && this.jumpHeight < this.maxJump) {
      this.jumpHeight += this.jumpSpeed;
    } else if (this.falling && this.jumpHeight > 0) {
      this.jumpHeight -= 2 * this.jumpSpeed;
    }

    // player starts falling if spacebar is released or they reach max jump height

    if (!this.spacePressed && this.jumpHeight > 0) {
      this.jumping = false;
      this.falling = true;
    } else if (this.jumpHeight >= this.maxJump) {
      this.jumping = false;
      this.falling = true;
    }

    if (this.falling && this.jumpHeight <= 0) {
      this.falling = false;
      this.justJumped = true;
      setTimeout(this.jumpDelay, 200);
    }
  }

}

module.exports = Dude;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Game {

  constructor(sun, stars, asteroids, dude) {

    this.sun = sun;
    this.stars = stars;
    this.asteroids = asteroids;
    this.dude = dude;

    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 1100;
    this.canvasHeight = 750;

    this.endMargin = 40;
    this.endPoint = this.canvasWidth - this.endMargin;

    this.bridgeX = this.canvasWidth / 2;
    this.bridgeY = this.canvasHeight + 400;
    this.bridgeRad = this.canvasWidth * 2/3;
    this.bridgeHeight = Math.floor(this.bridgeRad + this.asteroidRad);

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

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.timeString = this.timeString.bind(this);
    this.timeTick = this.timeTick.bind(this);
    this.draw = this.draw.bind(this);
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

  draw() {

    this.ctx.fillStyle = `rgb(${this.sun.red},${this.sun.green},${this.sun.blue})`;
    this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

    if (this.blue < 150) {

      for (let starIdx = 0; starIdx < this.starsOut; starIdx ++) {
        let star = this.stars[starIdx];
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(star.starX, star.starY, star.starRad, 0, 2 * Math.PI);
        this.ctx.fill();
      }
    }

    let dist = 450;
    let tempRed = 255;
    let tempGreen = 255;
    let trans = 0.03;

    while (dist >= 0) {

      tempRed = this.sun.red - dist + Math.floor(300*this.sun.sunY/500);
      if (tempRed < this.sun.red) {
        tempRed = this.sun.red;
      }

      tempGreen = this.green - dist + Math.floor(175*this.sun.sunY/500);
      if (tempGreen < this.sun.green) {
        tempGreen = this.sun.green;
      }

      if (!this.sun.skyColored(tempRed, tempGreen)) {
        this.ctx.fillStyle = `rgba(${tempRed},${tempGreen},${this.sun.blue}, ${trans})`;
        this.ctx.beginPath();
        this.ctx.arc(this.sun.sunX, this.sun.sunY, dist, 0, 2 * Math.PI);
        this.ctx.fill();
      }

      dist -= 3;
      if (trans < 1) {
        trans += 0.03;
      }
    }

    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(this.sun.sunX, this.sun.sunY, this.sun.sunRad, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.strokeStyle = "#7b9095";
    this.ctx.lineWidth = 15;
    this.ctx.beginPath();
    this.ctx.arc(this.bridgeX, this.bridgeY, this.bridgeRad, Math.PI, 2 * Math.PI);
    this.ctx.stroke();

    let translatedDudeX = 0;
    if (this.dude.dudeX < this.bridgeX) {
      translatedDudeX = -(this.bridgeX - this.dudeX);
    } else if (this.dude.dudeX > this.bridgeX) {
      translatedDudeX = this.dude.dudeX - this.bridgeX;
    }

    let dudeAngle = Math.PI - Math.acos(translatedDudeX / this.bridgeRad);
    let dudeXDraw = this.dude.dudeX;

    // change dudeX to account for jump

    this.dude.dudeY = this.bridgeY - Math.floor(this.bridgeRad * Math.sin(this.dude.dudeAngle)) - this.dude.jumpHeight - this.dude.dudeRad;


    this.ctx.fillStyle = "purple";
    this.ctx.beginPath();
    this.ctx.arc(this.dude.dudeX, this.dude.dudeY, this.dude.dudeRad, 0, 2 * Math.PI);
    this.ctx.fill();

    this.asteroids.asteroids.forEach((asteroid) => {

      if (!asteroid.intersecting) {
        this.ctx.fillStyle = asteroid.color;
      } else {
        this.ctx.fillStyle = asteroid.intersectingColor;
      }
      this.ctx.beginPath();
      this.ctx.arc(asteroid.X, asteroid.Y, this.asteroids.asteroidRad, 0, 2 * Math.PI);
      this.ctx.fill();

      if (asteroid.Y >= (asteroid.collisionPoint - this.asteroids.asteroidSpeed)) {
        asteroid.falling = false;
        asteroid.Y = asteroid.collisionPoint;
        asteroid.rolling = true;
      }

      if (asteroid.falling) {

        asteroid.Y += this.asteroids.asteroidSpeed;

      } else if (asteroid.rolling) {

        asteroid.X += Math.floor(asteroid.dX / 2);

        let translatedAstX = 0;
        if (asteroid.X < this.bridgeX) {
          translatedAstX = -(this.bridgeX - asteroid.X);
        } else if (asteroid.X > this.bridgeX) {
          translatedAstX = asteroid.X - this.bridgeX;
        }

        let asteroidAngle = Math.PI - Math.acos(translatedAstX / this.bridgeRad);
        asteroid.Y = this.bridgeY - Math.floor(this.bridgeRad * Math.sin(this.asteroids.asteroidAngle)) - this.asteroids.asteroidRad;

      }

    });

    this.ctx.fillStyle = "white";
    this.ctx.font = "30px sans-serif";
    this.ctx.fillText(`${this.minsAndSecs}`, 40, 60);

    if (this.gameWon) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "60px sans-serif";
      this.ctx.fillText("You won!", (this.canvasWidth / 2) - 125, this.canvasHeight / 2);
    } else if (this.gameLost) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "60px sans-serif";
      this.ctx.fillText("You lost!", (this.canvasWidth / 2) - 125, this.canvasHeight / 2);
    }

  }

  // end of draw function

  play() {

    this.timeString();
    this.stars.starConstructor();

    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);

    setInterval(this.sun.sundown, 30);
    setInterval(this.stars.starshine, 30);
    setInterval(this.dude.walking, 30);
    setInterval(this.asteroids.collisionChecker, 30);
    setInterval(this.asteroids.asteroidConstructor, 1000);
    setInterval(this.asteroids.asteroidConstructor, 2500);
    setInterval(this.timeTick, 1000);
    setInterval(this.timeString, 1000);
    setInterval(this.draw, 30);

  }
}

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Star {

  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 1100;
    this.canvasHeight = 750;

    this.endMargin = 40;
    this.endPoint = this.canvasWidth - this.endMargin;

    this.bridgeX = this.canvasWidth / 2;
    this.bridgeY = this.canvasHeight + 400;
    this.bridgeRad = this.canvasWidth * 2/3;
    this.bridgeHeight = Math.floor(this.bridgeRad + this.asteroidRad);


    this.stars = [];
    this.numStars = 800;
    this.twinkle = 0;
    this.starsOut = 0;

    this.getRandomInt = this.getRandomInt.bind(this);
    this.starConstructor = this.starConstructor.bind(this);
    this.starshine = this.starshine.bind(this);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  starConstructor () {
    for (let star = 0; star < this.numStars; star++) {
      let starX = this.getRandomInt(0, this.canvasWidth);
      let starY = this.getRandomInt(-this.canvasHeight, this.canvasHeight);
      let starRad = this.getRandomInt(1,3);
      this.stars.push({starX: starX, starY: starY, starRad: starRad});
    }
  }

  starshine() {
    if (this.blue < 150) {

      this.twinkle += 1;
      // this will break unless numStars is even!!!
      if (this.starsOut < this.numStars) {
        this.starsOut += 2;
      }

      if (this.twinkle === 3) {
        let idx = getRandomInt(0,this.stars.length);
        let star = this.stars[idx];
        if (star.starRad === 0) {
          star.starRad = 1;
        } else if (star.starRad === 1) {
          star.starRad = getRandomInt(0,3);
        } else if (star.starRad === 2) {
          star.starRad = 1;
        }
        this.twinkle = 0;
      }

    }
  }
}

module.exports = Star;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Sun {

  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 1100;
    this.canvasHeight = 750;

    this.endMargin = 40;
    this.endPoint = this.canvasWidth - this.endMargin;

    this.bridgeX = this.canvasWidth / 2;
    this.bridgeY = this.canvasHeight + 400;
    this.bridgeRad = this.canvasWidth * 2/3;
    this.bridgeHeight = Math.floor(this.bridgeRad + this.asteroidRad);


    this.sunRad = 20;
    this.sunX = this.canvasWidth / 2;
    this.sunY = this.sunRad;
    this.sunset = 0;

    this.red = 85;
    this.green = 200;
    this.blue = 255;

    this.skyColored = this.skyColored.bind(this);
    this.sundown = this.sundown.bind(this);
  }

  skyColored(r, g) {
    let redDiff = Math.abs(this.red - r);
    let greenDiff = Math.abs(this.green - g);
    if (redDiff === 0 && greenDiff === 0) {
      return true;
    } else {
      return false;
    }
  }

  sundown() {
    this.sunset += 1;

    if (this.sunset === 8 && this.blue > 40) {
      this.red -= 1;
      this.green -= 2;
      this.blue -= 2;
      this.sunset = 0;
    }

    if (this.sunY < this.canvasHeight) {
      this.sunY += 1;
    } else {
      this.sunY += 2;
    }
  }

}

module.exports = Sun;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Sun = __webpack_require__(4);
const Star = __webpack_require__(3);
const Asteroid = __webpack_require__(0);
const Dude = __webpack_require__(1);
const Game = __webpack_require__(2);

let sun = new Sun();
let stars = new Star();
let asteroids = new Asteroid();
let dude = new Dude();
let game = new Game(sun, stars, asteroids, dude);

game.play();


/***/ })
/******/ ]);