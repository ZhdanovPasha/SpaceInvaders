var width = 700;
var height = 600;
var pjs = new PointJS('2D', width, height, {});

var game = pjs.game;
var sys = pjs.system;
var key = pjs.keyControl;
var mouse = pjs.mouseControl;
var touch = pjs.touchControl;
var vector = pjs.vector;
var point = vector.point;
var v2d = vector.v2d;
var v2f = vector.v2d;
var size = vector.size;
var brush = pjs.brush;
var math = pjs.math;
var random = math.random;
var colors = pjs.colors;
var h2r = colors.hex2rgb;
var log = sys.log;
var stop = game.stop;
var audio = pjs.audio;
var camera = pjs.camera;
var tiles = pjs.tiles;
var OOP = pjs.OOP;
var limit = math.limit;
var alpha = 180;
var pinkPlayer = 'img/pinkPlayer.png';
var bluePlayer = 'img/bluePlayer.png';
var pinkBullet = 'img/pinkBullet.png';
var blueBullet = 'img/blueBullet.png';

var isDef = OOP.isDef;



var players = [];

sys.setSettings({
    isShowError: false,
// isAutoDraw : true
});

touch.initTouchControl();
sys.initFPSCheck();
key.initKeyControl();
mouse.initMouseControl();
var SpaceInvaders = {};
SpaceInvaders.BGPosition = 0;
pjs.system.setStyle({
    background: 'url(img/terrain.png)',
    backgroundSize: width + "px",
    backgroundPosition: SpaceInvaders.BGPosition + 'px center',
    backgroundRepeat: 'repeat-x'
});


// end Other ////////////////////////////////////