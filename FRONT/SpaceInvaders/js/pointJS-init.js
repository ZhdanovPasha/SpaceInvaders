(function () {
    const style = {
        backgroundColor: '#767676'
        // other
    };
    Array.prototype.clear = function () {
        this.splice(0, this.length);
    };
    const SpaceInvaders = {
        width: 768, //sys.getWH().w
        height: 600,//sys.getWH().h
        playerName: "unknownName",
        fraction: "unknown", // "BLUE"/"PINK"
        bullets: [],
        enemies: [],
        BGPosition: 0,
        gameOver: false
    };

    const pjs = new PointJS('2D', SpaceInvaders.width, SpaceInvaders.height, style);
    // pjs.system.initFullPage();
    const sys = pjs.system;
    pjs.system.setStyle({
        background: 'url(img/terrain.png)',
        backgroundSize: SpaceInvaders.width + "px",
        backgroundPosition: SpaceInvaders.BGPosition + 'px center',
        backgroundRepeat: 'repeat-x'
    });
    SpaceInvaders.pjs = pjs;
    SpaceInvaders.game = pjs.game;
    SpaceInvaders.camera = pjs.camera;
    SpaceInvaders.Point = pjs.vector.point;
    SpaceInvaders.OOP = pjs.OOP;
    SpaceInvaders.key = pjs.keyControl;
    SpaceInvaders.scores = 0;

    class Object {
        constructor() {
            this.obj = {};
            this.destroyed = false;
        };

        draw() {
            if (this.destroyed) return false;
            else {
                this.obj.draw();
                return true;
            }
        };

    }

    window.SpaceInvaders = SpaceInvaders;
    SpaceInvaders.Object = Object;


    // var mouse = pjs.mouseControl;
    // var touch = pjs.touchControl;
    // var vector = pjs.vector;
    // var point = vector.point;
    // var v2d = vector.v2d;
    // var v2f = vector.v2d;
    // var size = vector.size;
    // var brush = pjs.brush;
    // var math = pjs.math;
    // var random = math.random;
    // var colors = pjs.colors;
    // var h2r = colors.hex2rgb;
    // var log = sys.log;
    // var stop = game.stop;
    // var audio = pjs.audio;
    // var tiles = pjs.tiles;
    //
    // var limit = math.limit;
    //
    // var isDef = OOP.isDef;


//     sys.setSettings({
//         isShowError: false,
//         isAutoClear: true,
// // isAutoDraw : true
//     });
//
//     touch.initTouchControl();
//     sys.initFullPage();
//     sys.initFPSCheck();


})();