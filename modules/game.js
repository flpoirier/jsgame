const Sun = require('./sun.js');
const Star = require('./stars.js');
const Asteroid = require('./asteroids.js');
const Dude = require('./dude.js');

// sprite source: http://media.photobucket.com/user/JRuff/media/Art/Improved%20versions/Sprite%20Animations/ed-sprite-walk.gif.html
// other sprites i considered: https://www.pinterest.com/pin/397794579560723889/

class Game {

  constructor() {

    this.canvas1 = document.getElementById("layer1");
    this.ctx1 = this.canvas1.getContext("2d");
    this.canvas2 = document.getElementById("layer2");
    this.ctx2 = this.canvas2.getContext("2d");
    this.canvas3 = document.getElementById("layer3");
    this.ctx3 = this.canvas3.getContext("2d");

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
    this.pattern = this.ctx3.createPattern(this.stone, 'repeat');

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
    this.drawSky = this.drawSky.bind(this);
    this.drawStars = this.drawStars.bind(this);
    this.drawFront = this.drawFront.bind(this);
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

  drawSky() {
    this.ctx1.fillStyle = `rgb(${this.sun.red},${this.sun.green},${this.sun.blue})`;
    this.ctx1.fillRect(0,0,this.canvasWidth,this.canvasHeight);
  }

  drawStars() {

    if (this.sun.blue < 150 && this.stars.star2Idx < this.stars.numStars) {

      let star1 = this.stars.stars[this.stars.star1Idx];
      let star2 = this.stars.stars[this.stars.star2Idx];

      this.ctx2.fillStyle = "white";
      this.ctx2.beginPath();
      this.ctx2.arc(star1.starX, star1.starY, star1.starRad, 0, 2 * Math.PI);
      this.ctx2.fill();

      this.ctx2.beginPath();
      this.ctx2.arc(star2.starX, star2.starY, star2.starRad, 0, 2 * Math.PI);
      this.ctx2.fill();

      this.stars.incrementStars();

    }

  }

  drawFront() {

    this.ctx3.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

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
        this.ctx3.fillStyle = `rgba(${tempRed},${tempGreen},${this.sun.blue}, ${trans})`;
        this.ctx3.beginPath();
        this.ctx3.arc(this.sun.sunX, this.sun.sunY, dist, 0, 2 * Math.PI);
        this.ctx3.fill();
      }

      dist -= 3;
      if (trans < 1) {
        trans += 0.03;
      }
    }

    this.ctx3.fillStyle = "white";
    this.ctx3.beginPath();
    this.ctx3.arc(this.sun.sunX, this.sun.sunY, this.sun.sunRad, 0, 2 * Math.PI);
    this.ctx3.fill();

    // bonus sun logic:
    // let nickX = this.sun.sunX - this.nickRad;
    // let nickY = this.sun.sunY - this.nickRad;
    // this.ctx3.drawImage(this.nick, nickX, nickY, this.nick.width, this.nick.height);

    // this.ctx3.strokeStyle = "#7b9095";
    // this.ctx3.lineWidth = 30;
    // this.ctx3.beginPath();
    // this.ctx3.arc(this.bridgeX, this.bridgeY, this.bridgeRad, Math.PI, 2 * Math.PI);
    // this.ctx3.stroke();

    // this.ctx3.strokeStyle = this.pattern;
    this.ctx3.strokeStyle = "#7b9095";
    this.ctx3.lineWidth = 30;
    this.ctx3.beginPath();
    this.ctx3.arc(this.bridgeX, this.bridgeY, this.bridgeRad, Math.PI, 2 * Math.PI);
    this.ctx3.stroke();

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

    // this.ctx3.fillStyle = "purple";
    // this.ctx3.beginPath();
    // this.ctx3.arc(this.dude.dudeX, this.dude.dudeY, this.dude.dudeRad, 0, 2 * Math.PI);
    // this.ctx3.fill();

    let tiltAngle = dudeAngle - Math.PI/2

    this.ctx3.translate(this.dude.dudeX, translatedDudeY);
    this.ctx3.rotate(tiltAngle);

    if (this.playing) {
      this.ctx3.drawImage(this.sprite, 0, 0, this.dude.dudeWidth, this.dude.dudeHeight);
    }

    this.ctx3.rotate(-tiltAngle);
    this.ctx3.translate(-this.dude.dudeX, -translatedDudeY);


    let r = this.dude.dudeWidth;

    this.dude.tlx = this.dude.dudeX;
    this.dude.tly = translatedDudeY;

    this.dude.trx = this.dude.tlx + r * Math.cos(tiltAngle);
    this.dude.try = this.dude.tly + r * Math.sin(tiltAngle);

    this.dude.brx = this.dude.trx + r * Math.cos(dudeAngle);
    this.dude.bry = this.dude.try + r * Math.sin(dudeAngle);

    this.dude.blx = this.dude.brx - r * Math.cos(tiltAngle);
    this.dude.bly = this.dude.bry - r * Math.sin(tiltAngle);

    // this.ctx3.lineWidth = 3;
    // this.ctx3.strokeStyle = "white";
    // this.ctx3.beginPath();
    // this.ctx3.moveTo(this.dude.tlx,this.dude.tly);
    // this.ctx3.lineTo(this.dude.trx,this.dude.try);
    // this.ctx3.lineTo(this.dude.brx,this.dude.bry);
    // this.ctx3.lineTo(this.dude.blx,this.dude.bly);
    // this.ctx3.lineTo(this.dude.tlx,this.dude.tly);
    // this.ctx3.stroke();


    this.asteroids.asteroids.forEach((asteroid) => {

      if (!asteroid.intersecting) {
        // this.ctx3.fillStyle = asteroid.color;
        this.ctx3.fillStyle = (this.pattern || asteroid.color);
      } else {
        this.ctx3.fillStyle = asteroid.intersectingColor;
      }



      this.ctx3.beginPath();
      this.ctx3.arc(asteroid.X, asteroid.Y, this.asteroids.asteroidRad, 0, 2 * Math.PI);
      this.ctx3.fill();

      // bonus asteroid logic:
      // this.ctx3.drawImage(this.nick, asteroid.X, asteroid.Y-55, 65, 65);

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

    this.ctx3.fillStyle = "white";
    this.ctx3.font = "30px sans-serif";
    this.ctx3.fillText(`${this.minsAndSecs}`, 40, 60);

    if (this.gameWon) {
      this.ctx3.fillStyle = "white";
      this.ctx3.font = "60px sans-serif";
      this.ctx3.fillText("You won!", (this.canvasWidth / 2) - 125, this.canvasHeight / 2);
    } else if (this.gameLost) {
      this.ctx3.fillStyle = "white";
      this.ctx3.font = "60px sans-serif";
      this.ctx3.fillText("You lost!", (this.canvasWidth / 2) - 125, this.canvasHeight / 2);
    }

    if (!this.playing) {

      let centX = this.canvasWidth/2;
      let centY = this.canvasHeight/2 - 50;

      // draws circle for play button

      // this.ctx3.fillStyle = "#841f27";
      this.ctx3.fillStyle = (this.pattern || "#841f27");
      this.ctx3.beginPath();
      this.ctx3.arc(centX, centY, 70, 0, 2 * Math.PI);
      this.ctx3.fill();

      // draws triangle for play button

      this.ctx3.fillStyle = "white";
      this.ctx3.beginPath();
      this.ctx3.moveTo(centX-30, centY-40);
      this.ctx3.lineTo(centX-30, centY+40);
      this.ctx3.lineTo(centX+50, centY);
      this.ctx3.fill();
    }

  }

  // end of draw function

  play() {

    this.playing = true;

    // this.soundicon.className = "fa fa-volume-up";
    // this.music.play();

    this.timeString();
    this.stars.starConstructor();

    this.canvas3.removeEventListener("click", this.play, false);
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);

    setInterval(this.sun.sundown, 30);
    // setInterval(() => { this.stars.starshine(this.sun.blue); }, 30);
    setInterval(this.dude.walking, 30);
    setInterval(this.asteroids.collisionChecker, 30);
    setInterval(this.asteroids.asteroidConstructor, 1000);
    setInterval(this.asteroids.asteroidConstructor, 2500);
    setInterval(this.timeTick, 1000);
    setInterval(this.timeString, 1000);
    setInterval(this.drawFront, 30);
    setInterval(this.drawSky, 30);
    setInterval(this.drawStars, 100);

  }
}

module.exports = Game;
