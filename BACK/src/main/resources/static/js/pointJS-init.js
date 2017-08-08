var width = 700;
var mapWidth = 2000;
var height = 600;
var pjs = new PointJS('2D', width, height, {});

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
var camera = pjs.camera;
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

sys.setSettings({
    isShowError: false,
});

sys.initFPSCheck();
key.initKeyControl();
mouse.initMouseControl();
var SpaceInvaders = {
    BGPosition: 0,
    width: width,
    height: height,
    mapWidth: mapWidth
};
pjs.system.setStyle({
    background: 'url(img/terrain.png)',
    backgroundSize: width + "px",
    backgroundPosition: SpaceInvaders.BGPosition + 'px center',
    backgroundRepeat: 'repeat-x'
});