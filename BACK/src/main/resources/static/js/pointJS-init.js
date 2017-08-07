var style = {
    backgroundColor: '#767676'
};

var pjs = new PointJS('2d', 700, 600);
var game = pjs.game;
var sys = pjs.system;
var key = pjs.keyControl;
var mouse = pjs.mouseControl;
var touch = pjs.touchControl;
var vector = pjs.vector;
var point = vector.point;
var size = vector.size;
var math = pjs.math;
var colors = pjs.colors;
var log = sys.log;
var audio = pjs.audio;
var alpha = 180;
var pinkPlayer = 'img/pinkPlayer.png';
var bluePlayer = 'img/bluePlayer.png';
var pinkBullet = 'img/pinkBullet.png';
var blueBullet = 'img/blueBullet.png';
var fireSound = audio.newAudio('audio/bullet.mp3', 0.2); // file, volume
var explosionSound = audio.newAudio('audio/exp.mp3', 0.2); // file, volume
var backSound = audio.newAudio('audio/start.mp3', 0.1);
var explosionAnimation = pjs.tiles.newImage("img/sprites.png").getAnimation(0, 117, 39, 39, 13);

var players = [];

var width = game.getWH().w;
var height = game.getWH().h;

sys.addEvent('gameResize', 'PointJS_DEMO_resize', function () {
    width = sys.getWH().w;
    height = sys.getWH().h;
});

sys.setSettings({
    isShowError: false,
    isAutoClear: true,
});

sys.initFPSCheck();
key.initKeyControl();
mouse.initMouseControl();