class Sun {

  constructor() {
    this.canvas = document.getElementById("layer3");
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
