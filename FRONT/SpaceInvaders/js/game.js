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
    const fon = SpaceInvaders.fon;
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
                // enemy.fire(); fixme: fix bullet fraction
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
        key.initKeyControl();
    });
})
();