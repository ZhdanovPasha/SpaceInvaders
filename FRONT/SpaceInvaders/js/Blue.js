(function () {
    var Ship = SpaceInvaders.Ship;
    var Skill = SpaceInvaders.Skill;
    var Laser = SpaceInvaders.Laser;
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
                    x: ship.obj.x + ship.obj.w / 4,
                    y: ship.obj.y,
                    damage: 1,
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
            super.moveLeft();
            if (bullets.Laser != undefined) {
                bullets.Laser.update(this.obj);
                bullets.Laser.draw();
            }
        };

        moveRight() {
            super.moveRight();
            if (bullets.Laser != undefined) {
                bullets.Laser.update(this.obj);
                bullets.Laser.draw();
            }
        };

        draw() {
            super.draw();
            if (bullets.Laser != undefined) {
                bullets.Laser.draw();
            }
        };

    }


    SpaceInvaders.Laser = Laser;

    SpaceInvaders.Blue = Blue;
})();