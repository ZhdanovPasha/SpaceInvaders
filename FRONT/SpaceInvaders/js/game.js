(function () {
    /*
    Только ссылки на сложные типы должны юыть объявлены так
    Доступ к переменным простого типа должен быть напряму например:
    SpaceInvaders.playerName
    SpaceInvaders.fraction
    А НЕ объявлять let playerName=SpaceInvaders.playerName ибо если объявить с let/const то
    при смене SpaceInvaders.playerName извне, значение переменной playerName останется неизменным
     */
    const pjs = SpaceInvaders.pjs;
    const game = SpaceInvaders.game;
    const key = SpaceInvaders.key;
    const enemies = SpaceInvaders.enemies;
    const bullets = SpaceInvaders.bullets;
    const camera = SpaceInvaders.camera;
    const Point = SpaceInvaders.Point;
    const Interface = SpaceInvaders.Interface;
    const Pink = SpaceInvaders.Pink;
    const Blue = SpaceInvaders.Blue;
    const gameInterface = new Interface(pjs, game, SpaceInvaders.playerName);
    const backSound = pjs.audio.newAudio('audio/start.mp3', 0.1);

    game.newLoopFromConstructor('game', function () {
        this.entry = function () {
            enemies.clear();
            bullets.clear();
            if (SpaceInvaders.fraction == 'BLUE') {
                player = new Blue({x: 100, y: 400, direction: "UP", name: SpaceInvaders.playerName});

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
                player = new Pink({x: 100, y: 400, direction: "UP", name: SpaceInvaders.playerName});
                for (let i = 0; i < 3; i++) {
                    enemies.push(new Blue({
                        x: 160 + 100 * i,
                        y: 100,
                        direction: "DOWN",
                        name: "enemy1"
                    }));
                }

            }
            gameInterface.initialize(player, player.maxHP, 0, enemies.length);
            gameInterface.initializeObjects();
            for (let i = 1; i <= 3; i++) {
                gameInterface["skill_" + i].switchOn();
                player["skill_" + i].interfaceEnable = function () {
                    gameInterface["skill_" + i].switchOn();
                };
                player["skill_" + i].interfaceDisable = function () {
                    gameInterface["skill_" + i].switchOff();
                };
            }
        };


        this.update = function () {
            game.clear(); // clear screen
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

            bullets.forEach(function (bullet, i, bullets) {
                if (bullet.hit(player)) {
                    if (player.destroyed) {
                        console.log("GO");
                        SpaceInvaders.gameOver = true;
                    }
                    if (bullet.destroyed) {
                        bullets.splice(i, 1);
                    }
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
                enemy.fire();
            });

            player.draw();

            if (key.isDown('LEFT')) {
                player.moveLeft();
                if (player.obj.x - SpaceInvaders.BGPosition <= 0) {
                    camera.move(Point(-player.speed, 0));
                    SpaceInvaders.BGPosition -= player.speed;
                    pjs.system.setStyle({
                        backgroundPositionX: SpaceInvaders.BGPosition + 'px'
                    });
                }
            }

            if (key.isDown('RIGHT')) {
                player.moveRight();
                if (player.obj.x + player.obj.w >= SpaceInvaders.BGPosition + SpaceInvaders.width) {
                    camera.move(Point(player.speed, 0));
                    SpaceInvaders.BGPosition += player.speed;
                    pjs.system.setStyle({
                        backgroundPositionX: SpaceInvaders.BGPosition + 'px'
                    });
                }
            }
            if (key.isDown('SPACE')) {
                player.fire();
            }


            if (key.isPress('Q')) {
                player.skill_1.enable();

            }
            if (key.isPress('W')) {
                player.skill_2.enable();

            }
            if (key.isPress('E')) {
                player.skill_3.enable();

            }
            //TODO game.startLoop('battle_result');
            //if ( enemies.length == 0&& key.isPress('ENTER')) {
            if (key.isPress('ENTER')) {
                key.setInputMode(true);
                game.setLoop('menu');
            }

            gameInterface.update(player.currentHP, SpaceInvaders.scores, enemies.length);
            gameInterface.draw();
        };

    });

    pjs.system.addEvent("onload", "game.js", function () {
        game.startLoop('menu');
        game.setLoopSound('game', [backSound]);
        key.initKeyControl();
    });
})
();