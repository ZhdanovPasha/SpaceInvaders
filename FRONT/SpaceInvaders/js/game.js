(function () {
    var game = SpaceInvaders.game;
    var key = SpaceInvaders.key;
    var player = new SpaceInvaders.Pink({x: 100, y: 300});
    var enemies = [];
    var bullets = [];
    var gameInterface;

    game.newLoopFromConstructor('game', function () {
        this.entry = function () {
            player = new SpaceInvaders.Blue({x: 100, y: 300});
            enemies = [];
            bullets = [];

            for (var i = 0; i < 10; i++) {
                enemies.push(new SpaceInvaders.Pink({x: 40 * i, y: 100}));
            }
            gameInterface = new Interface(SpaceInvaders.pjs, SpaceInvaders.game);
            gameInterface.initialize(player.maxHP, 0, enemies.length);
            gameInterface.initializeObjects();
        };


        // var obj = false;

        this.update = function () {
            game.clear(); // clear screen
            SpaceInvaders.fon.draw();
            bullets.forEach(function (bullet, i, bullets) {
                enemies.forEach(function (enemy, j, enemies) {
                    if (bullet.hit(enemy)) {
                        enemies.splice(j, 1);
                    }
                });
                if (bullet.destroyed) bullets.splice(i, 1);
                else {
                    bullet.update();
                    bullet.draw();
                }

            });
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
                    x: player.getX(),
                    y: player.getY(),
                    speed: 1,
                    damage: player.damage,
                    direction: "UP"
                }))
            }
            gameInterface.update(player.currentHP, SpaceInvaders.scores, enemies.length - 1);
            gameInterface.draw();
        };

    });

// game.startLoop('battle');
    SpaceInvaders.pjs.system.addEvent("onload", "game.js", function () {
        game.setLoop('menu');
        game.start();

    });
})();