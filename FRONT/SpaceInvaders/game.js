game.newLoopFromConstructor('battle', function () {
    var player = game.newImageObject({
        x: 100, y: 200,
        w: 90,
        h: 75,
        file: 'img/player.png'
    });
    var enemies = [];
    var bullets = [];

    for (i = 0; i < 10; i++) {
        enemies.push(game.newAnimationObject({
            x: 0, y: 41, angle: 90,
            w: 80, h: 39,

            animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 78, 80, 39, 4)
        }));
    }


    // var obj = false;

    this.update = function () {
        game.clear(); // clear screen
        var hit = false;
        bullets.forEach(function (bullet, i, bullets) {
            enemies.forEach(function (enemy, j, enemies) {
                if (bullet.isStaticIntersect(enemy.getStaticBox())) {
                    hit = true;
                    enemies.splice(j, 1);
                }
            });
            if (bullet.y < 0 || hit) bullets.splice(i, 1);
            else {
                bullet.y--;
                bullet.draw();
            }
            // if (bullet[i].getDistance(pl.getPosition(1)) < pl.getRadius() + 10) {
            //     bullet[i].moveTimeC(pl.getPosition(1), 50);
            // }
            //
            // if (bullet[i].isDynamicInside(pl.getDynamicBox())) {
            //     pl.scaleC(1.005);
            //     bullet.splice(i, 1);
            // }
        });
        enemies.forEach(function (enemy, i, enemies) {
            enemy.draw();
        });

        player.draw();
        if (key.isDown('LEFT')) {
            if (player.x >= 0) {
                player.x--;
            }
        }
        if (key.isDown('RIGHT')) {
            if (player.x <= width) {
                player.x++;
            }
        }
        if (key.isDown('SPACE')) {
            bullets.push(game.newImageObject({
                x: player.x, y: player.y,
                w: 27,
                h: 64,
                file: 'img/projectile_bolt_blue_single.png'
            }));
        }

    };


});

// game.startLoop('battle');
game.setLoop('battle');


pjs.game.start();