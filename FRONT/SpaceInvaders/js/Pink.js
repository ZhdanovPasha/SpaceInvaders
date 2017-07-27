(function () {
    var Ship = SpaceInvaders.Ship;

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
            for (var i = -2; i < 0; i++) {
                this.bots.push(new PinkBot({
                    x: params.x + 80 * i,
                    y: params.y,
                    direction: this.direction,
                    name: this.name
                }));
            }
            for (var i = 1; i < 3; i++) {
                this.bots.push(new PinkBot({
                    x: params.x + 80 * i,
                    y: params.y,
                    direction: this.direction,
                    name: this.name
                }));
            }

            this.skill_1 = {};

            this.skill_1.img = "img/bot_skill.png";
            this.skill_1.description = "Позвать рабов";
            this.skill_1.duration = 5000;
            this.skill_1.cooldown = 10000;

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
    }

    SpaceInvaders.Pink = Pink;
})();