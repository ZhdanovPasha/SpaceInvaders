var pjs = new PointJS('2d', 1024, 600);
//pjs.system.initFullScreen();

var game = pjs.game;
var mouse = pjs.mouseControl;
var key = pjs.keyControl;
var point = pjs.vector.point;
var width = game.getWH().w;
var height = game.getWH().h;
var audio = pjs.audio;

//init mouse and keyboard
mouse.initMouseControl();
key.initKeyControl();

var shipDX = 10;
var scores = 100;
var bulletDY = 10;
var beginPosX = width/2 - 25;
var beginPosY = height - 50;
var shipWidth = 50;
var shipHeight = 50;
var botWidth = 50;
var botHeight = 50;
var bulletHeroWidth = 27;
var bulletHeroHeight = 64;
var playerName = "";
var players = [];
var enemiesCount = 0;
var init = false;
var gameEnd = false;
var ships = [];
var playerFraction = 'bot';
var pinkPlayer = 'img/pinkPlayer.png';
var bluePlayer = 'img/bluePlayer.png';
var pinkBullet = 'img/pinkBullet.png';
var blueBullet = 'img/blueBullet.png';