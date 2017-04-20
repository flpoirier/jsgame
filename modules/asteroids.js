class Asteroid {

  constructor(sun, dude) {
    this.canvas = document.getElementById("layer3");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 1100;
    this.canvasHeight = 750;

    this.endMargin = 40;
    this.endPoint = this.canvasWidth - this.endMargin;

    this.asteroidColors = ["red", "orange", "yellow", "green", "blue", "purple"];
    this.asteroidSpeed = 20;
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

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'rgba(00,00,00,0)';
    this.ctx.beginPath();
    this.ctx.moveTo(this.dude.tlx,this.dude.tly);
    this.ctx.lineTo(this.dude.trx,this.dude.try);
    this.ctx.lineTo(this.dude.brx,this.dude.bry);
    this.ctx.lineTo(this.dude.blx,this.dude.bly);
    this.ctx.lineTo(this.dude.tlx,this.dude.tly);
    this.ctx.stroke();
    return this.ctx.isPointInPath(asteroid.X, asteroid.Y);

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
