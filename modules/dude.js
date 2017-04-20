class Dude {

  constructor(img, walkFunc) {
    this.canvas = document.getElementById("layer3");
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
    this.moonwalk = this.moonwalk.bind(this);
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

  moonwalk() {
    if (this.dudeX > this.endMargin) {
      this.dudeX -= this.walkSpeed;
      this.changeSprite();
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
