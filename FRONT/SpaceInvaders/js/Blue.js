(function () {
    var Ship = SpaceInvaders.Ship;
    var bullets = SpaceInvaders.bullets;
    /*
    params={
      x: 100, y: 200,
    }
     */

    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;
    var Blue = function (params) {
        this.speed = 5;
        this.bulPerSec = 2;
        this.bulletSpeed = 1;
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
    Blue.prototype.skill = function () {
        // this.fireSound.replay();
        if (bullets.Laser == undefined) {
            bullets.Laser = new Laser({
                x: this.obj.x + this.obj.w / 2,
                y: this.obj.y,
                damage: this.damage,
                direction: this.direction
            });
        }
        else {
            if (bullets.Laser.destroyed) {
                if (Date.now() - bullets.Laser.endedAt > bullets.Laser.interval) {
                    bullets.Laser.destroyed = false;
                    bullets.Laser.beganAt = Date.now();
                }
            }
            bullets.Laser.update(this.obj);
            bullets.Laser.draw();
        }
    };
    Blue.prototype.moveLeft = function () {
        Ship.prototype.moveLeft.apply(this);
        if (bullets.Laser != undefined) {
            bullets.Laser.update(this.obj);
            bullets.Laser.draw();
        }
    };
    Blue.prototype.moveRight = function () {
        Ship.prototype.moveRight.apply(this);
        if (bullets.Laser != undefined) {
            bullets.Laser.update(this.obj);
            bullets.Laser.draw();
        }
    };
    var Laser = function (params) {
        this.obj = game.newImageObject({
            x: params.x, y: 0,
            w: 50,
            h: params.y,
            file: 'img/laser.png',
        });
        this.beganAt = Date.now();
        this.lastFor = 1000;
        this.interval = 2000;
    };
    //skill QWE неуязвимость ускорение скорострельность
    Laser.prototype = Object.create(SpaceInvaders.Bullet.prototype);
    Laser.prototype.constructor = Laser;

    Laser.prototype.update = function (shipObj) {
        this.obj.x = shipObj.x + shipObj.w / 4;
        if (Date.now() - this.beganAt > this.lastFor) {
            this.destroyed = true;
            this.endedAt = Date.now();
        }
    };
    //Expects SpaceInvaders.Ship as a parameter
    Laser.prototype.hit = function (Ship) {
        Ship.attacked(this);
    };
    SpaceInvaders.Laser = Laser;

    SpaceInvaders.Blue = Blue;
})();