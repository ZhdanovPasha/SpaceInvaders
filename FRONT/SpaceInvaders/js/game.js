(function () {
    var game = SpaceInvaders.game;
    var key = SpaceInvaders.key;
    var player = new SpaceInvaders.Pink({x: 100, y: 300});
    var enemies = [];
    var bullets = [];
    var gameInterface;

    game.newLoopFromConstructor('game', function () {
        this.entry = function () {
            player = new SpaceInvaders.Blue({x: 100, y: 300, direction: "UP"});
            enemies = [];
            bullets = [];
            enemies.push(new SpaceInvaders.Pink({x: 160, y: 100, direction: "DOWN"}));
            enemies.push(new SpaceInvaders.Pink({x: 560, y: 100, direction: "DOWN"}));
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


            if (key.isDown('LEFT')) {
                player.moveLeft();
            }

            if (key.isDown('RIGHT')) {
                player.moveRight();
            }
            player.draw();
            if (key.isPress('SPACE')) {
                bullets.push(new SpaceInvaders.Bullet({
                    x: player.getX() + player.obj.w / 2,
                    y: player.getY(),
                    speed: 1,
                    damage: player.damage,
                    direction: player.direction
                }))
            }
            gameInterface.update(player.currentHP, SpaceInvaders.scores, enemies.length);
            gameInterface.draw();
        };

    })
    ;

// game.startLoop('battle');
    SpaceInvaders.pjs.system.addEvent("onload", "game.js", function () {
        game.setLoop('menu');
        game.start();

    });
})
();