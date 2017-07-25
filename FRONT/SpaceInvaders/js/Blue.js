(function () {
    var Ship = SpaceInvaders.Ship;
    /*
    params={
      x: 100, y: 200,
    }
     */

    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;
    var Blue = function (params) {
        this.speed = 5;
        this.bulPerSec=2;
        this.bulletSpeed=1;
        this.damage = 50;
        this.maxHP = 100;
        this.killScores = 100;
        Ship.apply(this, arguments);
        this.obj = game.newImageObject({
            x: params.x, y: params.y,
            w: 90,
            h: 75,
            file: 'img/enemyBlue1.png', angle: this.direction == "UP" ? 0 : 180
        });


    };
    Blue.prototype = Object.create(Ship.prototype);
    Blue.prototype.constructor = Blue;


    SpaceInvaders.Blue = Blue;
})();