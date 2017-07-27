var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullScreen();

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
var bulletHeroWidth = 27;
var bulletHeroHeight = 64;
var playerName = "Kal";
var enemiesCount = 0;
var init = false;
var gameEnd = false;
var ships = [];
var playerClass = 'bot';