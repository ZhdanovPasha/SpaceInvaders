(function () {
    var Ship = SpaceInvaders.Ship;
    /*
    params={
      x: 100, y: 200,
    }
     */
    var PinkBot = function (params) {
        this.obj = game.newAnimationObject({
            x: params.x, y: params.y, angle: this.direction == "UP" ? 90 : 90 + 180,
            w: 80, h: 39,
            animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 78, 80, 39, 4)
        });
        this.maxHP = 100;
        this.nameText = game.newTextObject({
            text: this.name + " bot",
            x: params.x,
            y: params.y - 15,
            size: 15,
            color: "white"
        });
        Ship.apply(this, arguments);
    };
    PinkBot.prototype = Object.create(Ship.prototype);
    PinkBot.prototype.constructor = PinkBot;
    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;
    var Pink = function (params) {
        this.speed = 4;
        this.bulPerSec = 2;
        this.bulletSpeed = 1;
        this.damage = 20;
        this.maxHP = 200;
        this.killScores = 100;
        this.selfDestroyed = false;
        Ship.apply(this, arguments);
        this.obj = game.newImageObject({
            x: params.x, y: params.y,
            w: 90,
            h: 75,
            file: 'img/player.png', angle: this.direction == "UP" ? 0 : 180
        });
        this.bots = [];
        for (var i = -2; i < 0; i++) {
            this.bots.push(new PinkBot({x: params.x + 80 * i, y: params.y, direction: this.direction}));
        }
        for (var i = 1; i < 3; i++) {
            this.bots.push(new PinkBot({x: params.x + 80 * i, y: params.y, direction: this.direction}));
        }

    };
    Pink.prototype = Object.create(Ship.prototype);
    Pink.prototype.constructor = Pink;
    Pink.prototype.draw = function () {
        this.bots.forEach(function (bot) {
            bot.draw();
        });
        if (!this.selfDestroyed) Ship.prototype.draw.call(this);
    };
    Pink.prototype.attacked = function (BulletObj) {
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
    SpaceInvaders.Pink = Pink;
})();