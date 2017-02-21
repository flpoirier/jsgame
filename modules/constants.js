var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 1100;
var canvasHeight = 750;

var endMargin = 40;
var endPoint = canvasWidth - endMargin;

var asteroidColors = ["red", "orange", "yellow", "green", "blue", "purple"];
var asteroidSpeed = 20;
var asteroidRad = 10;
var asteroidPush = 60;
var intersectionMaxTime = 15;
var asteroids = [];

var bridgeX = canvasWidth / 2;
var bridgeY = canvasHeight + 400;
var bridgeRad = canvasWidth * 2/3;
var bridgeHeight = Math.floor(bridgeRad + asteroidRad);

var stars = [];
var numStars = 800;
var twinkle = 0;
var starsOut = 0;

var maxTime = 30;
var time = maxTime;
var minsAndSecs;

var gameOver = false;
var gameWon = false;
var gameLost = false;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

var dudeX = endMargin;
var dudeY;
var dudeHeight = 75;
var dudeRad = 15;
var dudeDx = 1;
var walkSpeed = 2;

var jumping = false;
var falling = false;
var justJumped = false;
var jumpHeight = 0;
var jumpSpeed = 5;
var maxJump = 60;

var sunRad = 20;
var sunX = canvasWidth / 2;
var sunY = sunRad;
var sunset = 0;

var red = 85;
var green = 200;
var blue = 255;
