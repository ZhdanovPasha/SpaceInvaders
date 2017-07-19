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
        // var mPos = mouse.getPosition();
        game.clear(); // clear screen

        OOP.drawArr(enemies, function (o) {
            // o.y++;

            // if (mouse.isInObject(o)) {
            //     brush.drawRect({
            //         x : o.x - 4, y : o.y - 4,
            //         w : o.w + 6, h : o.h + 6,
            //         strokeColor : 'white',
            //         strokeWidth : 2
            //     });
            // }

            // if (mouse.isPeekObject('LEFT', o)) {
            //     obj = o;
            // }
        });

        // if (mouse.isUp('LEFT')) {
        //     obj = false;
        // }
        //
        // if (obj) {
        //     obj.moveTimeC(mPos, 10);
        // }

        OOP.drawArr([player], function (o) {
            // your code
        });
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
    };


});

// game.startLoop('battle');
game.setLoop('battle');


pjs.game.start();