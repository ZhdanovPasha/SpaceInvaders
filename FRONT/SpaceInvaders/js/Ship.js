(function () {
    /*
    params={
      direction:"UP"|"DOWN"
      name: "Someone"
    }
     */
    const bullets = SpaceInvaders.bullets;
    const game = SpaceInvaders.game;
    const pjs = SpaceInvaders.pjs;
    const audio = pjs.audio;

    //expects params.direction="UP"|"DOWN"
    class Ship extends SpaceInvaders.Object {
        constructor(params, properties) {
            super(params);
            const t = this;
            this.direction = params.direction;
            this.name = params.name;
            ["maxHP",
                "speed",
                "bulPerSec",
                "bulletSpeed",
                "damage",
                "killScores"].forEach(
                function (i) {
                    console.assert(properties.hasOwnProperty(i), "NO CONSTRUCTOR PARAM" + i);
                    t[i] = properties[i];
                }
            );
            this.currentHP = this.maxHP;
            this.immortal = false;
            this.bangStarted = Date.now();
            this.lastFire = Date.now();
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
            ["x", "y"].forEach(
                function (i) {
                    t["get" + i.toUpperCase()] = function () {
                        return t.obj[i];
                    };
                }
            );
        };

        moveLeft() {
            if (this.obj.x >= 0) {
                this.obj.x -= this.speed;
                this.nameText.x -= this.speed;
            }
        };

        moveRight() {
            if (this.obj.x <= SpaceInvaders.width) {
                this.obj.x += this.speed;
                this.nameText.x += this.speed;
            }
        };

        fire() {
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
        attacked(BulletObj) {
            if (!this.immortal && BulletObj.obj.isStaticIntersect(this.obj.getStaticBox())) {
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

        draw() {
            if (!this.destroyed) {
                if (this.bangAnimation != undefined) {
                    if (Date.now() - this.bangStarted < 1000) {
                        this.bangAnimation.draw();
                    } else this.bangAnimation = undefined;
                }

                this.obj.draw();
                this.nameText.draw();
            }
        };
    }

    class Skill {
        constructor(args, ship, EnHandler, DisHandler) {
            this.img = args.img;
            this.description = args.description;
            this.duration = args.duration;
            this.cooldown = args.cooldown; //it's cooldown not coolDown because of Interface.js
            this.ship = ship;
            this.EnHandler = EnHandler;
            this.DisHandler = DisHandler;
            this.lastLaunch = Date.now();
            this.enabled = false;
            this.firstLaunch = true;
        }

        enable() { //Возвращает true если позволено включить
            if (Date.now() - this.lastLaunch > this.cooldown && !this.enabled || this.firstLaunch) {
                this.enabled = true;
                this.lastLaunch = Date.now();
                this.EnHandler(this.ship, this);
                if (this.firstLaunch) this.firstLaunch = false;
                return true;
            }
            return false;
        };

        disable() {
            this.enabled = false;
            this.DisHandler(this.ship, this);
        };

        check(handler) {
            if (Date.now() - this.lastLaunch > this.duration && this.enabled) {
                this.disable();
                handler();
            }
        };
    }

    SpaceInvaders.Skill = Skill;
    SpaceInvaders.Ship = Ship;
})
(SpaceInvaders);