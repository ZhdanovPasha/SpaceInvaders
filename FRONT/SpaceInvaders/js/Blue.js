(function () {
    var Ship = SpaceInvaders.Ship;
    var Skill = SpaceInvaders.Skill;
    var Bullet = SpaceInvaders.Bullet;
    var bullets = SpaceInvaders.bullets;
    /*
    params={
      x: 100, y: 200,
    }
     */

    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;

    class Blue extends Ship {
        constructor(params) {
            var properties = {};
            properties.maxHP = 100;
            properties.speed = 5;
            properties.bulPerSec = 2;
            properties.bulletSpeed = 1;
            properties.damage = 50;
            properties.killScores = 100;
            super(params, properties);
            this.obj = game.newImageObject({
                x: params.x, y: params.y,
                w: 90,
                h: 75,
                file: 'img/enemyBlue1.png', angle: this.direction == "UP" ? 0 : 180
            });

            this.skill_1 = new Skill({
                img: "img/bullet_skill.png",
                description: "Увеличение скорости пуль",
                duration: 5000,
                cooldown: 10000,
            }, this, function (ship) {
                ship.bulPerSec *= 4;
            }, function (ship) {
                ship.bulPerSec /= 4;
            });
            this.skill_2 = new Skill({
                img: 'img/laser_skill.png',
                description: "Лазер"
                , duration: 5000,
                cooldown: 10000
            }, this, function (ship) {
                // ship.fireSound.replay();
                    bullets.Laser = new Laser({
                        x: ship.obj.x + ship.obj.w / 2,
                        y: ship.obj.y,
                        damage: ship.damage,
                        direction: ship.direction
                    });

            }, function (ship) {
                bullets.Laser.destroyed = true;
            });
            this.skill_3 = new Skill({
                img: 'img/shield.png',
                description: "Активация щита",
                duration: 5000,
                cooldown: 10000
            }, this, function (ship) {
                ship.bulPerSec = 0;
            }, function (ship) {
                ship.bulPerSec = 1;
            });
        };



        moveLeft() {
            Ship.prototype.moveLeft.apply(this);
            if (bullets.Laser != undefined) {
                bullets.Laser.update(this.obj);
                bullets.Laser.draw();
            }
        };

        moveRight() {
            Ship.prototype.moveRight.apply(this);
            if (bullets.Laser != undefined) {
                bullets.Laser.update(this.obj);
                bullets.Laser.draw();
            }
        };
        draw() {
            Ship.prototype.draw.apply(this);
            if (bullets.Laser != undefined) {
                bullets.Laser.draw();
            }
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

    SpaceInvaders.Blue = Blue;
})();