(function () {
    /*
    params={
      x: 100, y: 200,
    }
     */

    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;
    //expects params.direction="UP"|"DOWN"
    var Ship = function (params) {
        this.direction = params.direction;
        this.currentHP = this.maxHP;
    };
    Ship.prototype = Object.create(SpaceInvaders.Object.prototype);
    Ship.prototype.constructor = Ship;


    Ship.prototype.lastFire = Date.now();
    Ship.prototype.lastMove = Date.now();


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
    Ship.prototype.attacked = function (BulletObj) {
        if (BulletObj.obj.isStaticIntersect(this.obj.getStaticBox())) {
            this.currentHP -= BulletObj.damage;
            if (this.currentHP <= 0) {
                this.destroyed = true;
            }
            //Взрыв
            return true;
        }
        return false;
    };
    SpaceInvaders.Ship = Ship;
})
(SpaceInvaders);