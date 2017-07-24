(function () {
    var game = SpaceInvaders.game;
    var Bullet = function (params) {
        var t = this;
        ["speed", "damage", "direction"].forEach(function (i) {
            t[i] = params[i];
        });
        this.obj = game.newImageObject({
            x: params.x, y: params.y,
            w: 27,
            h: 64,
            file: 'img/projectile_bolt_blue_single.png'
        });
    };
    Bullet.prototype = Object.create(SpaceInvaders.Object.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.update = function () {
        if (this.direction == "UP")
            this.obj.y -= this.speed;
        if (this.direction == "DOWN")
            this.obj.y += this.speed;
    };
    //Expects SpaceInvaders.Ship as a parameter
    Bullet.prototype.hit = function (Ship) {
        this.destroyed = this.obj.isStaticIntersect(Ship.obj.getStaticBox());
        if (this.destroyed) Ship.attacked(this.damage);
        return this.destroyed;
    };
    SpaceInvaders.Bullet = Bullet;
})();