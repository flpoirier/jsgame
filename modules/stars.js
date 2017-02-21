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
