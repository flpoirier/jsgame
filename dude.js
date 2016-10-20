class Dude {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.left = options.left;
    this.top = options.top;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }
}

module.exports = Dude;
