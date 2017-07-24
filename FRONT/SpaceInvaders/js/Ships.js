(function () {
    /*
    params={
      x: 100, y: 200,
    }
     */

    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;
    var Ship = function () {
        this.maxHP = 100;
        this.killScores = 100;
        this.dx = 10;
        this.lastFire = Date.now();
        this.lastMove = Date.now();
        this.currentHP = this.maxHP;
        this.lastMove = Date.now();
    };
    Ship.prototype = Object.create(SpaceInvaders.Object.prototype);
    Ship.prototype.constructor = Ship;

    Ship.prototype.moveLeft = function () {
            if (this.obj.x >= 0) {
                this.obj.x -= this.speed;
            }
    };
        Ship.prototype.moveRight = function () {
                if (this.obj.x <= SpaceInvaders.width) {
                    this.obj.x += this.speed;
                }
        };
        ["x", "y"].forEach(function (i) {
            Ship.prototype["get" + i.toUpperCase()] = function () {
                return this.obj[i];
            };
        });
        Ship.prototype.attacked = function (damage) {
            this.currentHP -= damage;
            if (this.currentHP <= 0) {
                this.destroyed = true;
            }
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
        Blue.prototype.speed = 5;
        Blue.prototype.damage = 50;
        var Pink = function (params) {
            this.obj = game.newAnimationObject({
                x: params.x, y: params.y, angle: 90,
                w: 80, h: 39,

                animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 78, 80, 39, 4)
            });

        };
        Pink.prototype = Object.create(Ship.prototype);
        Pink.prototype.constructor = Pink;
        Pink.prototype.speed = 4;
        Pink.prototype.damage = 20;
        SpaceInvaders.Pink = Pink;
        SpaceInvaders.Blue = Blue;
    }
)
(SpaceInvaders);