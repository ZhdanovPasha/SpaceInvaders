(function () {
    var pjs = SpaceInvaders.pjs;
    var game = SpaceInvaders.game;
    var key = SpaceInvaders.key;
    var player = new SpaceInvaders.Pink({x: 100, y: 300});
    var enemies = SpaceInvaders.enemies;
    var bullets = SpaceInvaders.bullets;
    var fraction = SpaceInvaders.fraction;
    var gameInterface;
    var fon = SpaceInvaders.fon;
    var Interface = SpaceInvaders.Interface;
    var backSound = pjs.audio.newAudio('audio/start.mp3', 0.1);
    var Pink = SpaceInvaders.Pink;
    var Blue = SpaceInvaders.Blue;

    game.newLoopFromConstructor('game', function () {
        this.entry = function () {
            enemies.clear();
            bullets.clear();
            if (fraction == 'BLUE') {
                player = new Blue({x: 100, y: 300, direction: "UP", name: SpaceInvaders.playerName});

                enemies.push(new Pink({
                    x: 160,
                    y: 100,
                    direction: "DOWN",
                    name: "enemy1"
                }));
                enemies.push(new Pink({
                    x: 560,
                    y: 100,
                    direction: "DOWN",
                    name: "enemy2"
                }));
            } else {
                player = new Pink({x: 100, y: 300, direction: "UP", name: SpaceInvaders.playerName});
                for (var i = 0; i < 3; i++) {
                    enemies.push(new Blue({
                        x: 160 + 100 * i,
                        y: 100,
                        direction: "DOWN",
                        name: "enemy1"
                    }));
                }

            }
            gameInterface = new Interface(pjs, game, SpaceInvaders.playerName);
            gameInterface.initialize(player, player.maxHP, 0, enemies.length);
            gameInterface.initializeObjects();
        };


        this.update = function () {
            game.clear(); // clear screen
            fon.draw();
            bullets.forEach(function (bullet, i, bullets) {
                if (!enemies.some(function (enemy, j, enemies) {
                        if (bullet.hit(enemy)) {
                            if (enemy.destroyed) enemies.splice(j, 1);
                            if (bullet.destroyed) {
                                bullets.splice(i, 1);
                                return true;
                            }
                        }
                    })) {
                    bullet.update();
                    bullet.draw();
                }
                else {
                    SpaceInvaders.scores += player.killScores;
                }
            });

            enemies.forEach(function (enemy, i, enemies) {
                if (bullets.Laser && !bullets.Laser.destroyed) {
                    bullets.Laser.hit(enemy);
                    if (enemy.destroyed) enemies.splice(i, 1);
                }
            });
            enemies.forEach(function (enemy, i, enemies) {
                enemy.draw();
            });

            player.draw();

            if (key.isDown('LEFT')) {
                player.moveLeft();
            }

            if (key.isDown('RIGHT')) {
                player.moveRight();
            }
            if (key.isDown('SPACE')) {
                player.fire();
            }

            if (key.isPress('Q')) {
                if (player.skill_1.enable()) {
                    gameInterface.skill_1.switchOn();
                }
            }
            if (key.isPress('W')) {
                if (player.skill_2.enable()) {
                    gameInterface.skill_2.switchOn();
                }
            }
            if (key.isPress('E')) {
                if (player.skill_3.enable()) {
                    gameInterface.skill_3.switchOn();
                }
            }
            //TODO game.startLoop('battle_result');
            if (enemies.length == 0 && key.isPress('ENTER')) {
                key.setInputMode(true);
                game.setLoop('menu');
            }
            player.skill_1.check(function () {
                gameInterface.skill_1.switchOff();
            });
            player.skill_2.check(function () {
                gameInterface.skill_2.switchOff();
            });
            player.skill_3.check(function () {
                gameInterface.skill_3.switchOff();
            });
            gameInterface.update(player.currentHP, SpaceInvaders.scores, enemies.length);
            gameInterface.draw();
        };

    });

    pjs.system.addEvent("onload", "game.js", function () {
        game.startLoop('menu');
        game.setLoopSound('game', [backSound]);
    });
})
();