(function () {
    var Ship = SpaceInvaders.Ship;
    var Skill = SpaceInvaders.Skill;

    /*
    params={
      x: 100, y: 200,
    }
     */
    class PinkBot extends Ship {
        constructor(params) {
            var properties = {};
            properties.speed = 4;
            properties.bulPerSec = 1;
            properties.bulletSpeed = 1;
            properties.damage = 20;
            properties.maxHP = 100;
            properties.killScores = 100;

            super(params, properties);
            this.obj = game.newAnimationObject({
                x: params.x, y: params.y, angle: this.direction == "UP" ? 90 : 90 + 180,
                w: 80, h: 39,
                animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 78, 80, 39, 4)
            });

            this.nameText = game.newTextObject({
                text: params.name + " bot",
                x: params.x,
                y: params.y - 15,
                size: 15,
                color: "white"
            });

        };
    }

    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;

    class Pink extends Ship {
        constructor(params) {
            var properties = {};

            properties.speed = 4;
            properties.bulPerSec = 2;
            properties.bulletSpeed = 1;
            properties.damage = 20;
            properties.maxHP = 200;
            properties.killScores = 100;

            super(params, properties);
            this.selfDestroyed = false;
            this.obj = game.newImageObject({
                x: params.x, y: params.y,
                w: 90,
                h: 75,
                file: 'img/player.png', angle: this.direction == "UP" ? 0 : 180
            });
            this.bots = [];

            this.skill_1 = new Skill({
                img: "img/bot_skill.png",
                description: "Позвать рабов",
                duration: 5000,
                cooldown: 10000
            }, this, function (ship, skill) {
                if (skill.firstLaunch) {
                    for (var i = -2; i < 0; i++) {
                        ship.bots.push(new PinkBot({
                            x: params.x + 80 * i,
                            y: params.y,
                            direction: ship.direction,
                            name: ship.name
                        }));
                    }
                    for (var i = 1; i < 3; i++) {
                        ship.bots.push(new PinkBot({
                            x: params.x + 80 * i,
                            y: params.y,
                            direction: ship.direction,
                            name: ship.name
                        }));
                    }
                } else {
                    console.log("You've once used it");
                }
            }, function (ship) {
                ship.bulPerSec /= 4;
            });
            this.skill_2 = new Skill({
                img: 'img/rocket.png',
                description: "Увеличение скорости коробля"
                , duration: 5000,
                cooldown: 10000
            }, this, function (ship) {
                ship.speed *= 4;
            }, function (ship) {
                ship.speed /= 4;
            });
            this.skill_3 = new Skill({
                img: 'img/rocket.png',
                description: "Увеличение скорости коробля"
                , duration: 5000,
                cooldown: 10000
            }, this, function (ship) {
                ship.speed *= 4;
            }, function (ship) {
                ship.speed /= 4;
            });

        };

        draw() {
            this.bots.forEach(function (bot) {
                bot.draw();
            });
            if (!this.selfDestroyed) Ship.prototype.draw.call(this);
        };

        attacked(BulletObj) {
            if (!this.selfDestroyed) {
                if (Ship.prototype.attacked.apply(this, arguments)) {
                    if (this.destroyed) {
                        this.selfDestroyed = true;//Главный сдох
                        this.destroyed = false; // Но его объект для игры "не сдох" пока боты не сдохли
                    }
                    this.destroyed = this.bots.length == 0 && this.selfDestroyed; //объект для игры сдох когда он и боты сдохли
                    return true;
                }
            }
            if (this.bots.some(function (bot, i, bots) {
                    if (bot.attacked(BulletObj)) {
                        if (bot.destroyed) bots.splice(i, 1);
                        return true;
                    }
                })) {
                this.destroyed = this.bots.length == 0 && this.selfDestroyed;
                return true;
            }
            return false;
        };

        moveLeft() {
            Ship.prototype.moveLeft.apply(this);
            var t = this;
            this.bots.forEach(function (bot, n, bots) {
                bot.obj.x -= t.speed;
            });
        };

        moveRight() {
            Ship.prototype.moveRight.apply(this);
            var t = this;
            this.bots.forEach(function (bot, n, bots) {
                bot.obj.x += t.speed;
            });
        };
    }

    SpaceInvaders.Pink = Pink;
})();