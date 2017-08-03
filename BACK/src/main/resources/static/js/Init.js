(function () {
    messageService = new MessageService2(ships,game);

    const style = {
        backgroundColor: '#767676'
        // other
    };
    const pjs = new PointJS('2D', 768, 600, style);
    const sys = pjs.system;
    Array.prototype.clear = function () {
        this.splice(0, this.length);
    };
    const SpaceInvaders = {
        pjs: pjs,
        game: pjs.game,
        width: sys.getWH().w,
        height: sys.getWH().h,
        OOP: pjs.OOP,
        key: pjs.keyControl,
        playerName: "unknownName",
        fraction: "unknown", // "BLUE"/"PINK"
        bullets: [],
        enemies: [],
        gameOver: false
    };
    SpaceInvaders.fon = SpaceInvaders.game.newImageObject({
        position: pjs.vector.point(0, 0),
        w: SpaceInvaders.width, h: SpaceInvaders.height,
        file: 'img/terrain.png'
    });
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
    window.onbeforeunload = function() {
        messageService.disconnect();
    }


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