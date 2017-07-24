(function () {
    var game = SpaceInvaders.game;
    var key=SpaceInvaders.key;
    var player = new SpaceInvaders.Pink({x: 100, y: 300});
    var enemies = [];
    var bullets = [];


    // var fon = game.newImageObject({
    //     position: point(0, 0),
    //     w: width, h: height,
    //     file: 'img/terrain.png'
    // });
    game.newLoopFromConstructor('game', function () {
        this.entry = function () {
            player = new SpaceInvaders.Blue({x: 100, y: 300});
            enemies = [];
            bullets = [];

            for (var i = 0; i < 10; i++) {
                enemies.push(new SpaceInvaders.Pink({x: 40 * i, y: 0}));
            }
        };


        // var obj = false;

        this.update = function () {
            game.clear(); // clear screen
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
                    y: player.getY()
                }))
            }

        };

    });

// game.startLoop('battle');
    SpaceInvaders.pjs.system.addEvent("onload", "game.js", function () {
        game.setLoop('game');
        game.start();
    });
})();