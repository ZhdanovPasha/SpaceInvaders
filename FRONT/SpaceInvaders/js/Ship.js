(function () {
    /*
    params={
      direction:"UP"|"DOWN"
      name: "Someone"
    }
     */

    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;
    //expects params.direction="UP"|"DOWN"
    var Ship = function (params) {
        this.direction = params.direction;
        this.name = params.name;
        this.currentHP = this.maxHP;
        this.bangStarted = Date.now();
        this.lastFire = Date.now();
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
    Ship.prototype.fire = function (bullets) {
        if (Date.now() - this.lastFire > 1000 / this.bulPerSec) {
            bullets.push(new SpaceInvaders.Bullet({
                x: this.obj.x + this.obj.w / 2,
                y: this.obj.y,
                speed: this.bulletSpeed,
                damage: this.damage,
                direction: this.direction
            }));
            this.lastFire = Date.now();
        }
    };
    //Возвращает true если в него попали
    Ship.prototype.attacked = function (BulletObj) {
        if (BulletObj.obj.isStaticIntersect(this.obj.getStaticBox())) {
            this.currentHP -= BulletObj.damage;
            if (this.currentHP <= 0) {
                this.destroyed = true;
            }
            this.bangAnimation = game.newAnimationObject({
                x: this.obj.x, y: this.obj.y,
                w: 80, h: 39,
                animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 117, 80, 39, 4)
            });
            this.bangStarted = Date.now();
            return true;
        }
        return false;
    };
    Ship.prototype.draw = function () {
        if (this.bangAnimation != undefined) {
            if (Date.now() - this.bangStarted < 1000) {
                this.bangAnimation.draw();
            } else this.bangAnimation = undefined;
        }
        this.obj.draw();
    };
    SpaceInvaders.Ship = Ship;
})
(SpaceInvaders);