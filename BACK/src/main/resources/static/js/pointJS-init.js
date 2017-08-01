var style = {
    backgroundColor: '#767676'
    // other
};

var pjs = new PointJS('2D', 400, 200, style);

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
var tiles = pjs.tiles;
var OOP = pjs.OOP;
var limit = math.limit;
var gameInterface = new Interface(pjs);
var alpha = 180;

var isDef = OOP.isDef;

var width = sys.getWH().w;
var height = sys.getWH().h;


sys.addEvent('gameResize', 'PointJS_DEMO_resize', function () {
    width = sys.getWH().w;
    height = sys.getWH().h;
});

sys.setSettings({
    isShowError: false,
    isAutoClear: true,
// isAutoDraw : true
});

touch.initTouchControl();
sys.initFullPage();
sys.initFPSCheck();
key.initKeyControl();
mouse.initMouseControl();




// end Other ////////////////////////////////////