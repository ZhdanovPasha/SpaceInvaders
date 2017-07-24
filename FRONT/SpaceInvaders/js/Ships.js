(function () {
    /*
    params={
      x: 100, y: 200,
    }
     */

    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;
    var Ship = function () {
    };
    Ship.prototype = Object.create(SpaceInvaders.Object.prototype);
    Ship.prototype.constructor = Ship;

    Ship.prototype.moveLeft = function () {
        if (this.obj.x >= 0) {
            this.obj.x--;
        }
    };
    Ship.prototype.moveRight = function () {
        if (this.obj.x <= SpaceInvaders.width) {
            this.obj.x++;
        }
    };
    ["x", "y"].forEach(function (i) {
        Ship.prototype["get" + i.toUpperCase()] = function () {
            return this.obj[i];
        };
    });
    Ship.prototype.attacked = function () {
        this.destroyed = true;
        //Взрыв
    };


    var Blue = function (params) {
        this.obj = game.newImageObject({
            x: params.x, y: params.y,
            w: 90,
            h: 75,
            file: 'img/player.png'
        });
    };
    Blue.prototype = Object.create(Ship.prototype);
    Blue.prototype.constructor = Blue;

    var Pink = function (params) {
        this.obj = game.newAnimationObject({
            x: params.x, y: params.y, angle: 90,
            w: 80, h: 39,

            animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 78, 80, 39, 4)
        });
    };
    Pink.prototype = Object.create(Ship.prototype);
    Pink.prototype.constructor = Pink;
    SpaceInvaders.Pink = Pink;
    SpaceInvaders.Blue = Blue;
})
(SpaceInvaders);