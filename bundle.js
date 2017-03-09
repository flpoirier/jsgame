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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

	let game = new Game();
	let canvas = document.getElementById("myCanvas");

	setInterval(game.draw, 30);

	// game.play();

	canvas.addEventListener("click", game.play, false);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Sun = __webpack_require__(2);
	const Star = __webpack_require__(3);
	const Asteroid = __webpack_require__(4);
	const Dude = __webpack_require__(5);

	// sprite source: http://media.photobucket.com/user/JRuff/media/Art/Improved%20versions/Sprite%20Animations/ed-sprite-walk.gif.html
	// other sprites i considered: https://www.pinterest.com/pin/397794579560723889/

	class Game {

	  constructor() {

	    this.canvas = document.getElementById("myCanvas");
	    this.ctx = this.canvas.getContext("2d");
	    this.canvasWidth = 1100;
	    this.canvasHeight = 750;

	    this.soundicon = document.getElementById("soundicon");
	    this.music = document.getElementById("audio");

	    this.spriteNum = 0;
	    this.sprite = document.getElementById(this.spriteNum);
	    this.changeSprite = this.changeSprite.bind(this);

	    // bonus round img:
	    // this.nick = document.getElementById("nick");
	    // this.nickRad = this.nick.width/2;

	    this.sun = new Sun();
	    this.stars = new Star();
	    this.dude = new Dude(this.sprite, this.changeSprite);
	    this.asteroids = new Asteroid(this.sun, this.dude);

	    this.stone = document.getElementById("bridgeImg");
	    this.pattern = this.ctx.createPattern(this.stone, 'repeat');

	    this.bridgeX = this.canvasWidth / 2;
	    this.bridgeY = this.canvasHeight + 400;
	    this.bridgeRad = this.canvasWidth * 2/3;
	    this.bridgeHeight = Math.floor(this.bridgeRad + this.asteroidRad);

	    this.maxTime = 30;
	    this.time = this.maxTime;
	    this.minsAndSecs = "";

	    this.playing = false;
	    this.gameOver = false;
	    this.gameWon = false;
	    this.gameLost = false;

	    this.youLose = this.youLose.bind(this);
	    this.youWon = this.youWon.bind(this);
	    this.keyDownHandler = this.keyDownHandler.bind(this);
	    this.keyUpHandler = this.keyUpHandler.bind(this);
	    this.timeString = this.timeString.bind(this);
	    this.timeTick = this.timeTick.bind(this);
	    this.draw = this.draw.bind(this);
	    this.play = this.play.bind(this);

	    this.dude.gameWon = this.gameWon;
	    this.dude.youWon = this.youWon;
	    this.dude.youLose = this.youLose;
	    this.dude.time = this.time;
	  }

	  youLose() {
	    this.gameLost = true;
	  }

	  youWon() {
	    this.gameWon = true;
	  }

	  changeSprite() {
	    this.spriteNum += 1;
	    if (this.spriteNum > 7) {
	      this.spriteNum = 0;
	    }
	    this.sprite = document.getElementById(this.spriteNum);
	  }

	  // end of constants

	  keyDownHandler(e) {
	    if(e.keyCode == 39) {
	      this.dude.rightPressed = true;
	    }
	    else if(e.keyCode == 37) {
	      this.dude.leftPressed = true;
	    }
	    else if(e.keyCode == 38) {
	      this.dude.upPressed = true;
	    }
	    else if(e.keyCode == 40) {
	      this.dude.downPressed = true;
	    }
	    else if(e.keyCode == 32) {
	      this.dude.spacePressed = true;
	    }
	  }

	  keyUpHandler(e) {
	    if(e.keyCode == 39) {
	      this.dude.rightPressed = false;
	    }
	    else if(e.keyCode == 37) {
	      this.dude.leftPressed = false;
	    }
	    else if(e.keyCode == 38) {
	      this.dude.upPressed = false;
	    }
	    else if(e.keyCode == 40) {
	      this.dude.downPressed = false;
	    }
	    else if(e.keyCode == 32) {
	      this.dude.spacePressed = false;
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
	    this.dude.time = this.time;
	    this.timeString();
	  }

	  draw() {

	    this.ctx.fillStyle = `rgb(${this.sun.red},${this.sun.green},${this.sun.blue})`;
	    this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

	    if (this.sun.blue < 150) {

	      for (let starIdx = 0; starIdx < this.stars.starsOut; starIdx ++) {
	        let star = this.stars.stars[starIdx];
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

	      tempGreen = this.sun.green - dist + Math.floor(175*this.sun.sunY/500);
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

	    // bonus sun logic:
	    // let nickX = this.sun.sunX - this.nickRad;
	    // let nickY = this.sun.sunY - this.nickRad;
	    // this.ctx.drawImage(this.nick, nickX, nickY, this.nick.width, this.nick.height);

	    // this.ctx.strokeStyle = "#7b9095";
	    // this.ctx.lineWidth = 30;
	    // this.ctx.beginPath();
	    // this.ctx.arc(this.bridgeX, this.bridgeY, this.bridgeRad, Math.PI, 2 * Math.PI);
	    // this.ctx.stroke();

	    // this.ctx.strokeStyle = this.pattern;
	    this.ctx.strokeStyle = "#7b9095";
	    this.ctx.lineWidth = 30;
	    this.ctx.beginPath();
	    this.ctx.arc(this.bridgeX, this.bridgeY, this.bridgeRad, Math.PI, 2 * Math.PI);
	    this.ctx.stroke();

	    // note that the bridge is a drawn circle -- the arc we see is only a
	    // portion of it, centered by width on the middle of the canvas.
	    // translatedDudeX takes into account whether the player is on the left or
	    // the right of the bridge (i.e. whether the path is sloping up or down)

	    let translatedDudeX = 0;
	    if (this.dude.dudeX < this.bridgeX) {
	      translatedDudeX = -(this.bridgeX - this.dude.dudeX);
	    } else if (this.dude.dudeX > this.bridgeX) {
	      translatedDudeX = this.dude.dudeX - this.bridgeX;
	    }

	    // angle in radians

	    let dudeAngle = Math.PI - Math.acos(translatedDudeX / this.bridgeRad);
	    // let dudeXDraw = this.dude.dudeX;

	    // change dudeX to account for jump

	    // this.dude.dudeY = this.bridgeY - Math.floor(this.bridgeRad * Math.sin(dudeAngle)) - this.dude.jumpHeight - this.dude.dudeRad;

	    this.dude.dudeY = this.bridgeY - Math.floor(this.bridgeRad * Math.sin(dudeAngle)) - this.dude.jumpHeight;

	    let translatedDudeY = this.dude.dudeY - this.dude.dudeHeight - 13;

	    // this.ctx.fillStyle = "purple";
	    // this.ctx.beginPath();
	    // this.ctx.arc(this.dude.dudeX, this.dude.dudeY, this.dude.dudeRad, 0, 2 * Math.PI);
	    // this.ctx.fill();

	    let tiltAngle = dudeAngle - Math.PI/2

	    this.ctx.translate(this.dude.dudeX, translatedDudeY);
	    this.ctx.rotate(tiltAngle);

	    if (this.playing) {
	      this.ctx.drawImage(this.sprite, 0, 0, this.dude.dudeWidth, this.dude.dudeHeight);
	    }

	    this.ctx.rotate(-tiltAngle);
	    this.ctx.translate(-this.dude.dudeX, -translatedDudeY);


	    let r = this.dude.dudeWidth;

	    this.dude.tlx = this.dude.dudeX;
	    this.dude.tly = translatedDudeY;

	    this.dude.trx = this.dude.tlx + r * Math.cos(tiltAngle);
	    this.dude.try = this.dude.tly + r * Math.sin(tiltAngle);

	    this.dude.brx = this.dude.trx + r * Math.cos(dudeAngle);
	    this.dude.bry = this.dude.try + r * Math.sin(dudeAngle);

	    this.dude.blx = this.dude.brx - r * Math.cos(tiltAngle);
	    this.dude.bly = this.dude.bry - r * Math.sin(tiltAngle);

	    this.ctx.lineWidth = 3;
	    this.ctx.strokeStyle = "white";
	    this.ctx.beginPath();
	    this.ctx.moveTo(this.dude.tlx,this.dude.tly);
	    this.ctx.lineTo(this.dude.trx,this.dude.try);
	    this.ctx.lineTo(this.dude.brx,this.dude.bry);
	    this.ctx.lineTo(this.dude.blx,this.dude.bly);
	    this.ctx.lineTo(this.dude.tlx,this.dude.tly);
	    this.ctx.stroke();


	    this.asteroids.asteroids.forEach((asteroid) => {

	      if (!asteroid.intersecting) {
	        // this.ctx.fillStyle = asteroid.color;
	        this.ctx.fillStyle = (this.pattern || asteroid.color);
	      } else {
	        this.ctx.fillStyle = asteroid.intersectingColor;
	      }



	      this.ctx.beginPath();
	      this.ctx.arc(asteroid.X, asteroid.Y, this.asteroids.asteroidRad, 0, 2 * Math.PI);
	      this.ctx.fill();

	      // bonus asteroid logic:
	      // this.ctx.drawImage(this.nick, asteroid.X, asteroid.Y-55, 65, 65);

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
	        asteroid.Y = this.bridgeY - Math.floor(this.bridgeRad * Math.sin(asteroidAngle)) - this.asteroids.asteroidRad;

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

	    if (!this.playing) {

	      let centX = this.canvasWidth/2;
	      let centY = this.canvasHeight/2 - 50;

	      // draws circle for play button

	      // this.ctx.fillStyle = "#841f27";
	      this.ctx.fillStyle = (this.pattern || "#841f27");
	      this.ctx.beginPath();
	      this.ctx.arc(centX, centY, 70, 0, 2 * Math.PI);
	      this.ctx.fill();

	      // draws triangle for play button

	      this.ctx.fillStyle = "white";
	      this.ctx.beginPath();
	      this.ctx.moveTo(centX-30, centY-40);
	      this.ctx.lineTo(centX-30, centY+40);
	      this.ctx.lineTo(centX+50, centY);
	      this.ctx.fill();
	    }

	  }

	  // end of draw function

	  play() {

	    this.playing = true;

	    // this.soundicon.className = "fa fa-volume-up";
	    // this.music.play();

	    this.timeString();
	    this.stars.starConstructor();

	    this.canvas.removeEventListener("click", this.play, false);
	    document.addEventListener("keydown", this.keyDownHandler, false);
	    document.addEventListener("keyup", this.keyUpHandler, false);

	    setInterval(this.sun.sundown, 30);
	    setInterval(() => { this.stars.starshine(this.sun.blue); }, 30);
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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
	    this.sunY = -this.sunRad;
	    this.sunset = 0;

	    // during bonus round:
	    // this.sunY = -85;

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	    this.numStars = 400;
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
	      let starY = this.getRandomInt(0, this.canvasHeight);
	      let starRad = this.getRandomInt(1,3);
	      this.stars.push({starX: starX, starY: starY, starRad: starRad});
	    }
	  }

	  starshine(blue) {

	    if (blue < 150) {

	      this.twinkle += 1;
	      // this will break unless numStars is even!!!
	      if (this.starsOut < this.numStars) {
	        this.starsOut += 2;
	      }

	      if (this.twinkle === 3) {
	        let idx = this.getRandomInt(0,this.stars.length);
	        let star = this.stars[idx];
	        if (star.starRad === 0) {
	          star.starRad = 1;
	        } else if (star.starRad === 1) {
	          star.starRad = this.getRandomInt(0,3);
	        } else if (star.starRad === 2) {
	          star.starRad = 1;
	        }
	        this.twinkle = 0;
	      }

	    }
	  }
	}

	module.exports = Star;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Asteroid {

	  constructor(sun, dude) {
	    this.canvas = document.getElementById("myCanvas");
	    this.ctx = this.canvas.getContext("2d");
	    this.canvasWidth = 1100;
	    this.canvasHeight = 750;

	    this.endMargin = 40;
	    this.endPoint = this.canvasWidth - this.endMargin;

	    this.asteroidColors = ["red", "orange", "yellow", "green", "blue", "purple"];
	    this.asteroidSpeed = 10;
	    this.asteroidRad = 15;
	    this.asteroidPush = 60;
	    this.intersectionMaxTime = 15;
	    this.asteroids = [];

	    this.bridgeX = this.canvasWidth / 2;
	    this.bridgeY = this.canvasHeight + 400;
	    this.bridgeRad = this.canvasWidth * 2/3;
	    this.bridgeHeight = Math.floor(this.bridgeRad + this.asteroidRad);

	    this.sun = sun;
	    this.dude = dude;

	    this.distance = this.distance.bind(this);
	    this.getRandomInt = this.getRandomInt.bind(this);
	    this.bridgeCollisionPoint = this.bridgeCollisionPoint.bind(this);
	    this.asteroidConstructor = this.asteroidConstructor.bind(this);
	    this.collisionChecker = this.collisionChecker.bind(this);
	  }

	  // basic distance formula

	  distance(x1, y1, x2, y2) {
	    return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
	  }

	  getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min)) + min;
	  }

	  // calculates at what height a given asteroid will hit the bridge

	  bridgeCollisionPoint(astX) {
	    return -1 * Math.floor(Math.sqrt( (this.bridgeHeight*this.bridgeHeight) - ((astX-this.bridgeX)*(astX-this.bridgeX)) ) - this.bridgeY);
	  }

	  asteroidConstructor() {
	    if (this.sun.sunY < this.canvasHeight) {
	      let asteroidX = this.getRandomInt(0, this.canvasWidth);
	      let asteroidY = -1 * this.asteroidRad;
	      let asteroidCol = "#292e37";
	      let intersectingColor = "red";
	      let asteroidCollisionPoint = this.bridgeCollisionPoint(asteroidX);
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

	  dudeIntersecting(asteroid) {

	    if ((Math.floor(this.distance(asteroid.X, asteroid.Y, (this.dude.dudeX+this.dude.dudeWidth), (this.dude.dudeY-this.dude.dudeHeight/2))) + 2) < this.asteroidRad && !asteroid.intersecting) {
	      return true;
	    }

	    return false;

	  }

	  collisionChecker() {
	    let ast = [];
	    this.asteroids.forEach((asteroid) => {
	      if (asteroid.intersecting && asteroid.intersectingTimer < this.intersectionMaxTime) {
	        asteroid.intersectingTimer += 1;
	      } else if (asteroid.intersecting && asteroid.intersectingTimer === this.intersectionMaxTime) {
	        asteroid.intersecting = false;
	        asteroid.intersectingTimer = 0;
	      } else if (this.dudeIntersecting(asteroid) && !asteroid.intersecting) {
	        this.dude.dudeX -= this.asteroidPush;
	        asteroid.intersecting = true;
	      }
	      if (asteroid.X >= -10) {
	        ast.push(asteroid);
	      }
	    });
	    this.asteroids = ast;
	  }

	}

	module.exports = Asteroid;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class Dude {

	  constructor(img, walkFunc) {
	    this.canvas = document.getElementById("myCanvas");
	    this.ctx = this.canvas.getContext("2d");
	    this.canvasWidth = 1100;
	    this.canvasHeight = 750;

	    this.sprite = img;
	    this.walkFunc = walkFunc;

	    this.endMargin = 0;
	    this.endPoint = this.canvasWidth - this.sprite.width/2;

	    this.asteroidRad = 10;

	    this.bridgeX = this.canvasWidth / 2;
	    this.bridgeY = this.canvasHeight + 400;
	    this.bridgeRad = this.canvasWidth * 2/3;
	    this.bridgeHeight = Math.floor(this.bridgeRad + this.asteroidRad);

	    this.dudeX = this.endMargin;
	    this.dudeY = 0;
	    this.dudeHeight = this.sprite.height;
	    this.dudeWidth = this.sprite.width;
	    this.dudeRad = this.dudeHeight / 2;
	    this.dudeDx = 1;
	    this.walkSpeed = 2;

	    // coordinates for four points of image: top left x, bottom right y, etc.

	    this.tlx = 0;
	    this.tly = 0;
	    this.trx = 0;
	    this.try = 0;
	    this.blx = 0;
	    this.bly = 0;
	    this.brx = 0;
	    this.bry = 0;

	    this.jumping = false;
	    this.falling = false;
	    this.justJumped = false;
	    this.jumpHeight = 0;
	    this.jumpSpeed = 5;
	    this.maxJump = 120;

	    this.rightPressed = false;
	    this.leftPressed = false;
	    this.upPressed = false;
	    this.downPressed = false;
	    this.spacePressed = false;

	    this.time = 0;
	    this.gameWon = false;
	    this.youWon = () => {};
	    this.youLose = () => {};

	    this.jumpDelay = this.jumpDelay.bind(this);
	    this.walking = this.walking.bind(this);
	    this.changeSprite = this.changeSprite.bind(this);
	  }

	  jumpDelay() {
	    this.justJumped = false;
	  }

	  changeSprite() {
	    if (!this.jumping && !this.falling) {
	      this.walkFunc();
	    }
	  }

	  walking() {

	    if (this.leftPressed) {
	      this.dudeX -= this.walkSpeed;
	      this.changeSprite();
	    } else if (this.rightPressed) {
	      this.dudeX += this.walkSpeed;
	      this.changeSprite();
	    }

	    // boundaries on where avatar can walk

	    if (this.dudeX >= this.endPoint && this.time > 0) {
	      this.dudeX = this.endPoint;
	      this.gameWon = true;
	      this.youWon();
	    } else if (this.dudeX >= this.endPoint) {
	      this.dudeX = this.endPoint;
	    } else if (this.dudeX < this.endMargin) {
	      this.dudeX = this.endMargin;
	    }


	    if (this.time === 0 && !this.gameWon) {
	      this.youLose();
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


/***/ }
/******/ ]);