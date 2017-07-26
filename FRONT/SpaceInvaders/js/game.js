(function () {
    var game = SpaceInvaders.game;
    var key = SpaceInvaders.key;
    var player = new SpaceInvaders.Pink({x: 100, y: 300});
    var enemies = SpaceInvaders.enemies;
    var bullets = SpaceInvaders.bullets;
    var fraction = SpaceInvaders.fraction;
    var gameInterface;
    var backSound = SpaceInvaders.pjs.audio.newAudio('audio/start.mp3', 0.1);

    game.newLoopFromConstructor('game', function () {
        this.entry = function () {
            enemies.clear();
            bullets.clear();
            if (fraction == 'blue') {
                player = new SpaceInvaders.Blue({x: 100, y: 300, direction: "UP", name: SpaceInvaders.playerName});

                enemies.push(new SpaceInvaders.Pink({
                    x: 160,
                    y: 100,
                    direction: "DOWN",
                    name: "enemy1"
                }));
                enemies.push(new SpaceInvaders.Pink({
                    x: 560,
                    y: 100,
                    direction: "DOWN",
                    name: "enemy2"
                }));
            } else {
                player = new SpaceInvaders.Pink({x: 100, y: 300, direction: "UP", name: SpaceInvaders.playerName});
                for (var i = 0; i < 3; i++) {
                    enemies.push(new SpaceInvaders.Blue({
                        x: 160 + 100 * i,
                        y: 100,
                        direction: "DOWN",
                        name: "enemy1"
                    }));
                }

            }
            gameInterface = new Interface(SpaceInvaders.pjs, SpaceInvaders.game, SpaceInvaders.playerName);
            gameInterface.initialize(player.maxHP, 0, enemies.length);
            gameInterface.initializeObjects();
        };


        this.update = function () {
            game.clear(); // clear screen
            SpaceInvaders.fon.draw();
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
                }
            );
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
            if (key.isDown('S')) {
                player.skill();
            }
            gameInterface.update(player.currentHP, SpaceInvaders.scores, enemies.length);
            gameInterface.draw();
        };

    });

    SpaceInvaders.pjs.system.addEvent("onload", "game.js", function () {
        game.setLoop('menu');
        game.start();
        game.setLoopSound('game', [backSound]);

    });
})
();