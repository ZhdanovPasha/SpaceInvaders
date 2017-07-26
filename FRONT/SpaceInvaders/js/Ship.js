(function () {
    /*
    params={
      direction:"UP"|"DOWN"
      name: "Someone"
    }
     */
    var bullets = SpaceInvaders.bullets;
    var game = SpaceInvaders.game;
    var pjs = SpaceInvaders.pjs;
    var audio = pjs.audio;
    //expects params.direction="UP"|"DOWN"
    var Ship = function (params) {
        this.direction = params.direction;
        this.name = params.name;
        this.currentHP = this.maxHP;
        this.bangStarted = Date.now();
        this.lastFire = Date.now();
        this.lastMove = Date.now();
        this.fireSound = audio.newAudio('audio/bullet.mp3', 0.2); // file, volume
        this.hurtSound = audio.newAudio('audio/hurt.ogg', 0.2); // file, volume
        this.explosionSound = audio.newAudio('audio/exp.mp3', 0.2); // file, volume
        this.nameText = game.newTextObject({
            text: this.name,
            x: params.x,
            y: params.y - 15,
            size: 15,
            color: "white"
        });
    };
    Ship.prototype = Object.create(SpaceInvaders.Object.prototype);
    Ship.prototype.constructor = Ship;

    Ship.prototype.moveLeft = function () {
        if (this.obj.x >= 0) {
            this.obj.x -= this.speed;
            this.nameText.x -= this.speed;
        }
    };
    Ship.prototype.moveRight = function () {
        if (this.obj.x <= SpaceInvaders.width) {
            this.obj.x += this.speed;
            this.nameText.x += this.speed;
        }
    };
    ["x", "y"].forEach(function (i) {
        Ship.prototype["get" + i.toUpperCase()] = function () {
            return this.obj[i];
        };
    });
    Ship.prototype.fire = function () {
        if (Date.now() - this.lastFire > 1000 / this.bulPerSec) {
            this.fireSound.replay();
            bullets.push(new SpaceInvaders.Bullet({
                x: this.obj.x + this.obj.w / 2,
                y: this.obj.y,
                speed: this.bulletSpeed,
                damage: this.damage,
                direction: this.direction
            }));
            this.lastFire = Date.now();
        }
    };
    //Возвращает true если в него попали
    Ship.prototype.attacked = function (BulletObj) {
        if (BulletObj.obj.isStaticIntersect(this.obj.getStaticBox())) {
            this.hurtSound.replay();
            this.currentHP -= BulletObj.damage;
            if (this.currentHP <= 0) {
                this.explosionSound.replay();
                this.destroyed = true;
            }
            this.bangAnimation = game.newAnimationObject({
                x: this.obj.x, y: this.obj.y,
                w: 80, h: 39,
                animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 117, 80, 39, 4)
            });
            this.bangStarted = Date.now();
            return true;
        }
        return false;
    };
    Ship.prototype.draw = function () {
        if (this.bangAnimation != undefined) {
            if (Date.now() - this.bangStarted < 1000) {
                this.bangAnimation.draw();
            } else this.bangAnimation = undefined;
        }
        this.obj.draw();
        this.nameText.draw();

    };
    SpaceInvaders.Ship = Ship;
})
(SpaceInvaders);