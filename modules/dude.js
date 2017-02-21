const Game = require('./game.js');

class Dude extends Game {

  constructor() {
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
