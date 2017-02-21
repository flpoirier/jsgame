const Game = require('./game.js');

class Draw extends Game {

  constructor() {
    this.draw = this.draw.bind(this);
  }

  draw() {

    this.ctx.fillStyle = `rgb(${this.red},${this.green},${this.blue})`;
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

      tempRed = thia.red - dist + Math.floor(300*this.sunY/500);
      if (tempRed < this.red) {
        tempRed = this.red;
      }

      tempGreen = this.green - dist + Math.floor(175*this.sunY/500);
      if (tempGreen < this.green) {
        tempGreen = this.green;
      }

      if (!this.skyColored(tempRed, tempGreen)) {
        this.ctx.fillStyle = `rgba(${tempRed},${tempGreen},${this.blue}, ${trans})`;
        this.ctx.beginPath();
        this.ctx.arc(this.sunX, this.sunY, dist, 0, 2 * Math.PI);
        this.ctx.fill();
      }

      dist -= 3;
      if (trans < 1) {
        trans += 0.03;
      }
    }

    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(this.sunX, this.sunY, this.sunRad, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.strokeStyle = "#7b9095";
    this.ctx.lineWidth = 15;
    this.ctx.beginPath();
    this.ctx.arc(this.bridgeX, this.bridgeY, this.bridgeRad, Math.PI, 2 * Math.PI);
    this.ctx.stroke();

    let translatedDudeX = 0;
    if (this.dudeX < this.bridgeX) {
      translatedDudeX = -(this.bridgeX - this.dudeX);
    } else if (this.dudeX > this.bridgeX) {
      translatedDudeX = this.dudeX - this.bridgeX;
    }

    let dudeAngle = Math.PI - Math.acos(translatedDudeX / this.bridgeRad);
    let dudeXDraw = this.dudeX;

    // change dudeX to account for jump

    this.dudeY = this.bridgeY - Math.floor(this.bridgeRad * Math.sin(this.dudeAngle)) - this.jumpHeight - this.dudeRad;


    this.ctx.fillStyle = "purple";
    this.ctx.beginPath();
    this.ctx.arc(this.dudeX, this.dudeY, this.dudeRad, 0, 2 * Math.PI);
    this.ctx.fill();

    this.asteroids.forEach((asteroid) => {

      if (!asteroid.intersecting) {
        this.ctx.fillStyle = asteroid.color;
      } else {
        this.ctx.fillStyle = asteroid.intersectingColor;
      }
      this.ctx.beginPath();
      this.ctx.arc(asteroid.X, asteroid.Y, this.asteroidRad, 0, 2 * Math.PI);
      this.ctx.fill();

      if (asteroid.Y >= (asteroid.collisionPoint - this.asteroidSpeed)) {
        asteroid.falling = false;
        asteroid.Y = asteroid.collisionPoint;
        asteroid.rolling = true;
      }

      if (asteroid.falling) {

        asteroid.Y += this.asteroidSpeed;

      } else if (asteroid.rolling) {

        asteroid.X += Math.floor(asteroid.dX / 2);

        let translatedAstX = 0;
        if (asteroid.X < this.bridgeX) {
          translatedAstX = -(this.bridgeX - asteroid.X);
        } else if (asteroid.X > this.bridgeX) {
          translatedAstX = asteroid.X - this.bridgeX;
        }

        let asteroidAngle = Math.PI - Math.acos(translatedAstX / this.bridgeRad);
        asteroid.Y = this.bridgeY - Math.floor(this.bridgeRad * Math.sin(this.asteroidAngle)) - this.asteroidRad;

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

}

module.exports = Draw;
