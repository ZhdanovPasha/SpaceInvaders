(function () {
    var style = {
        backgroundColor: '#767676'
        // other
    };
    var pjs = new PointJS('2D', 1024, 768, style);
    var sys = pjs.system;
    var SpaceInvaders = {
        pjs:pjs,
        game: pjs.game,
        width: sys.getWH().w,
        height: sys.getWH().h,
        OOP:pjs.OOP,
        key:pjs.keyControl
    };
    sys.addEvent("onload", "myEvent", function () {
        console.log("Страница загружена полностью");
        SpaceInvaders.key.initKeyControl();
    });

    var Object=function(){
        this.obj={};
        this.destroyed=false;
    };
    Object.prototype.draw=function(){
        if(this.destroyed) return false;
        else{
            this.obj.draw();
        }
    };

   SpaceInvaders.Object=Object;
   window. SpaceInvaders= SpaceInvaders;
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

//     mouse.initMouseControl();

})();