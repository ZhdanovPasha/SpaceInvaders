(function () {
    var Ship = SpaceInvaders.Ship;
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
            var properties={};
            properties.maxHP = 100;
             properties.speed = 5;
             properties.bulPerSec = 2;
             properties.bulletSpeed = 1;
             properties.damage = 50;
             properties.killScores = 100;
            super(params,properties);
            this.obj = game.newImageObject({
                x: params.x, y: params.y,
                w: 90,
                h: 75,
                file: 'img/enemyBlue1.png', angle: this.direction == "UP" ? 0 : 180
            });



            this.skill_1 = {};
            this.skill_2 = {};
            this.skill_3 = {};

            this.skill_1.img = "img/bullet_skill.png";
            this.skill_1.description = "Увеличение скорости пуль";
            this.skill_1.duration = 5000;
            this.skill_1.cooldown = 10000;

            this.skill_2.img = 'img/rocket.png';
            this.skill_2.description = "Увеличение скорости коробля";
            this.skill_2.duration = 5000;
            this.skill_2.cooldown = 10000;

            this.skill_3.img = 'img/shield.png';
            this.skill_3.description = "Активация щита";
            this.skill_3.duration = 5000;
            this.skill_3.cooldown = 10000;
        };

        skill() {
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
            if (Date.now() - this.beganAt > this.lastFor) {
                this.destroyed = true;
                this.endedAt = Date.now();
            }
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