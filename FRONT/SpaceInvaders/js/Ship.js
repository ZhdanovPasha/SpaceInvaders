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
                "killScores",
                "fraction"].forEach(
                function (i) {
                    console.assert(properties.hasOwnProperty(i), "NO CONSTRUCTOR PARAM: " + i);
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
                    direction: this.direction,
                    ship: this
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
                for (let i = 1; i <= 3; i++)
                    if (this["skill_" + i]) this["skill_" + i].check(); //fixme PinkBot doesn't have skills
            }
        };

    }

    class Skill {
        constructor(args, ship, EnHandler, DisHandler) {
            //fixme:  this.interfaceDisable() and this.interfaceDisable() should for now be defined outside
            //in future fix it
            let t = this;
            [
                "n",
                "img",
                "description",
                "duration",
                "cooldown" //it's cooldown not coolDown because of Interface.js
            ].forEach(
                function (i) {
                    console.assert(args.hasOwnProperty(i), "NO CONSTRUCTOR PARAM: " + i);
                    t[i] = args[i];
                });
            this.ship = ship;
            this.EnHandler = function (a, b) {
                this.interfaceDisable(); //for Interface.js compatibility
                EnHandler(a, b);
            };
            this.DisHandler = function (a, b) {
                this.interfaceEnable();//for Interface.js compatibility
                DisHandler(a, b);
            };
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

        check() {
            if (Date.now() - this.lastLaunch > this.duration && this.enabled) {
                this.disable();
            }
        };
    }

    SpaceInvaders.Skill = Skill;
    SpaceInvaders.Ship = Ship;
})
(SpaceInvaders);