const Game = require('./game.js');

class Sun extends Game {

  constructor() {
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
