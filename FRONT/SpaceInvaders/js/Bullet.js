(function () {
    var game = SpaceInvaders.game;

    class Bullet extends SpaceInvaders.Object {
        constructor(params) {
            super(params);
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


        update() {
            if (this.direction == "UP")
                this.obj.y -= this.speed;
            if (this.direction == "DOWN")
                this.obj.y += this.speed;
        };

        //Expects SpaceInvaders.Ship as a parameter
        hit(Ship) {
            this.destroyed = Ship.attacked(this);
            return this.destroyed;
        };
    }

    class Laser extends Bullet {
        constructor(params) {
            super(params);
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

        update(shipObj) {
            this.obj.x = shipObj.x + shipObj.w / 4;
        };

        //Expects SpaceInvaders.Ship as a parameter
        hit(Ship) {
            Ship.attacked(this);
            return this.destroyed;
        };
    }

    SpaceInvaders.Laser = Laser;
    SpaceInvaders.Bullet = Bullet;
})();