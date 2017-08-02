(function () {
    const game = SpaceInvaders.game;

    class Bullet extends SpaceInvaders.Object {
        constructor(params) {
            super(params);
            const t = this;
            ["speed", "damage", "direction", "ship"].forEach(function (i) {
                t[i] = params[i];
            });
            this.obj = game.newImageObject({
                x: params.x, y: params.y,
                w: 27,
                h: 64,
                file: 'img/projectile_bolt_blue_single.png',
                angle: params.direction == "UP" ? 0 : 180
            });
        };


        update() {
            if (this.direction == "UP") {
                this.obj.y -= this.speed;
                // console.log("U"+this.obj.y);
            }
            if (this.direction == "DOWN") {
                this.obj.y += this.speed;
                // console.log("D"+this.obj.y);
            }
        };

        //Expects SpaceInvaders.Ship as a parameter
        hit(ship) {
            if (this.ship.fraction != ship.fraction) {
                this.destroyed = ship.attacked(this);
            }
            return this.destroyed;
        };
    }

    class Laser extends Bullet { //fixme: check bullet rotation and update
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