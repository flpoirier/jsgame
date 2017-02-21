const Game = require('./game.js');

class Asteroid extends Game {

  constructor() {
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
      asteroids.push({X: asteroidX, Y: asteroidY, color: asteroidCol, intersectingColor: intersectingColor,
        collisionPoint: asteroidCollisionPoint, falling: asteroidFalling, rolling: asteroidRolling,
        intersecting: asteroidIntersecting, intersectingTimer: intersectingTimer, dX: asteroidDx});
    }
  }

  collisionChecker() {
    asteroids.forEach((asteroid) => {
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
