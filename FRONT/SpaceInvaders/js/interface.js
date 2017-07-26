function Interface(pjs, game, playerName) {
    //TODO: use playerName

    this.pjs = pjs;
    this.game = game;

    //Инициализация параметров. Player - Объект, в котором есть имя игрока, его очки и корабль obj
    this.initialize = function (player, mHP, sc, en) {
        this.player = player;

        this.name = name;
        this.maxHP = this.currHP = mHP;
        this.scores = sc;
        this.enemies = en;

        this.width = this.game.getWH().w;
        this.height = this.game.getWH().h;

        this.point = this.pjs.vector.point;

        this.mouseControl = this.pjs.mouseControl;

        this.rectValWidth = 0.2 * this.width;
    }

    this.initializeHP = function () {
        this.hpText = this.game.newTextObject({
            text: 'HP',
            x: 10,
            y: 10,
            color: 'white',
            size: 0.03 * this.height
        });

        this.hpRectStroke = this.game.newRectObject({
            x: this.hpText.x + this.hpText.w + 5,
            y: this.hpText.y - 5,
            w: this.rectValWidth,
            h: 0.052 * this.height,
            fillColor: 'black',
            strokeColor: '#FFFFFF',
            strokeWidth: 2
        });

        this.hpRectVal = this.game.newRectObject({
            x: this.hpText.x + this.hpText.w + 7,
            y: this.hpText.y - 3,
            w: this.hpRectStroke.w - 2,
            h: this.hpRectStroke.h - 2,
            fillColor: 'red'
        });

        this.hpVal = this.game.newTextObject({
            text: '100/100',
            positionC: this.point(this.hpRectVal.x + this.hpRectVal.w / 2, this.hpRectVal.y + this.hpRectVal.h / 2),
            color: 'white',
            size: 0.03 * this.height
        });
    }

    this.initializeText = function () {
        this.scoresText = this.game.newTextObject({
            text: 'SCORES: 1000',
            x: this.hpRectStroke.x + this.hpRectStroke.w + 10,
            y: this.hpText.y,
            color: 'white',
            size: 0.03 * this.height
        });

        this.enemieText = this.game.newTextObject({
            text: 'ENEMIES: 100',
            x: this.scoresText.x + this.scoresText.w + 10,
            y: this.scoresText.y,
            color: 'white',
            size: 0.03 * this.height
        });
    }

    this.initializeSkills = function () {
        var clickSkill = function () {
            var object = this.getObjects()[2];
            if (!this.clicked) {
                object.alpha = 0.31;
                this.clicked = true;
            }
            else {
                object.alpha = 1;
                this.clicked = false;
            }
        }

        this.skill_2 = this.game.newMesh({
            //positionC: this.point(this.game.getWH().w2, this.height - 30),
            x: this.game.getWH().w2 - 25,
            y: this.height - 80,
            add: [this.game.newRectObject({
                w: 50,
                h: 50,
                fillColor: 'white',
                alpha: 0.5
            }), this.game.newTextObject({
                x: 35,
                y: 38,
                text: 'W',
                color: "black",
                size: 12
            }), this.game.newImageObject({
                file: 'img/bullet_skill.png',
                x: 3,
                y: 3,
                w: 45,
                h: 45,
                color: 'black',
            })]
        });

        this.skill_2.description = "Увеличение скорости пуль";
        this.skill_2.isClicked = false;
        this.skill_2.onClick = clickSkill;


        this.skill_1 = this.game.newMesh({
            x: this.skill_2.x - 60,
            y: this.skill_2.y,
            add: [this.game.newRectObject({
                w: 50,
                h: 50,
                fillColor: 'white',
                alpha: 0.5
            }), this.game.newTextObject({
                x: 35,
                y: 38,
                text: 'Q',
                color: "black",
                size: 12
            }), this.game.newImageObject({
                file: 'img/shield.png',
                x: 3,
                y: 3,
                w: 45,
                h: 45,
                color: 'black',
            })]
        });

        this.skill_1.description = "Активация щита";
        this.skill_1.isClicked = false;
        this.skill_1.onClick = clickSkill;

        this.skill_3 = this.game.newMesh({
            x: this.skill_2.x + 60,
            y: this.skill_2.y,
            add: [this.game.newRectObject({
                w: 50,
                h: 50,
                fillColor: 'white',
                alpha: 0.5
            }), this.game.newTextObject({
                x: 35,
                y: 38,
                text: 'E',
                color: "black",
                size: 12
            }), this.game.newImageObject({
                file: 'img/rocket.png',
                x: 3,
                y: 3,
                w: 45,
                h: 45,
                color: 'black',
            })]
        });

        this.skill_3.description = "Увеличение скорости коробля";
        this.skill_3.isClicked = false;
        this.skill_3.onClick = clickSkill;
    }

    this.initializeObjects = function () {
        this.brush = this.pjs.brush;

        this.initializeHP();

        this.initializeText();

        this.initializeSkills();

        this.resultBattleText = this.game.newTextObject({
            text: "Вы победили!\nДля продолжения нажмите ENTER",
            positionC: this.point(this.game.getWH().w2, this.game.getWH().h2),
            size: 20,
            color: "white"
        });
    }

    this.initialWin = function () {
        this.resultBattleText.text = "Вы победили!\nДля продолжения нажмите ENTER"
        this.resultBattleText.draw();
    }

    this.initialLose = function () {
        this.resultBattleText.text = "Вы проиграли!\nДля продолжения нажмите ENTER"
        this.resultBattleText.draw();
    }

    this.drawName = function () {
        if (!this.player.destroyed && this.enemies > 0) {
            this.brush.drawText({
                x: this.player.obj.x + this.player.obj.w / 2,
                y: this.player.obj.y - 20,
                text: "Test",
                color: 'white',
                size: 18,
                align: 'center'
            });
        }
    }

    this.drawHP = function () {
        this.hpText.draw();
        this.hpRectStroke.draw();
        this.hpRectVal.draw();
        this.hpVal.draw();
    }

    this.drawScores = function () {
        this.scoresText.draw();
    }

    this.drawEnemie = function () {
        this.enemieText.draw();
    }

    this.drawSkills = function () {
        this.skill_1.draw();
        this.skill_2.draw();
        this.skill_3.draw();
    }

    this.checkSkill_1 = function () {
        var obj = this.skill_1.getObjects()[2];
        if (this.mouseControl.isInStatic(obj.getStaticBox())) {
            this.brush.drawText({
                x: this.skill_1.x,
                y: this.skill_1.y - 25,
                text: this.skill_1.description,
                align: 'center',
                size: 18,
                color: 'white'
            });

            if (this.mouseControl.isPress('LEFT'))
                this.skill_1.onClick();

            console.log("Описание скилла: " + this.skill_1.description);
        }
    }

    this.checkSkill_2 = function () {
        var obj = this.skill_2.getObjects()[2];
        if (this.pjs.mouseControl.isInStatic(obj.getStaticBox())) {
            this.brush.drawText({
                x: this.skill_2.x,
                y: this.skill_2.y - 25,
                text: this.skill_2.description,
                align: 'center',
                size: 18,
                color: 'white'
            });
            if (this.mouseControl.isPress('LEFT'))
                this.skill_2.onClick();
            console.log("Описание скилла: " + this.skill_2.description);
        }
    }

    this.checkSkill_3 = function () {
        var obj = this.skill_3.getObjects()[2];
        if (this.pjs.mouseControl.isInStatic(obj.getStaticBox())) {
            this.brush.drawText({
                x: this.skill_3.x,
                y: this.skill_3.y - 25,
                text: this.skill_3.description,
                align: 'center',
                size: 18,
                color: 'white'
            });
            if (this.mouseControl.isPress('LEFT'))
                this.skill_3.onClick();
            console.log("Описание скилла: " + this.skill_3.description);
        }
    }

    this.checkMouse = function () {
        this.checkSkill_1();
        this.checkSkill_2();
        this.checkSkill_3();
    }

    this.update = function (hp, sc, en) {//Обновить текущие данные
        if (hp <= 0) {
            this.currHP = 0;
            this.initialLose();
        }
        else if (hp > this.maxHP)
            this.currHP = this.maxHP;
        else
            this.currHP = hp;

        if (en == 0)
            this.initialWin();

        this.enemies = en;

        if (sc < 0)
            this.scores = 0;
        else
            this.scores = sc;


        this.hpRectVal.w = (this.rectValWidth - 2) * this.currHP / this.maxHP;
        this.hpVal.text = this.currHP + '/' + this.maxHP;

        this.scoresText.text = 'SCORES: ' + this.scores;

        this.enemieText.text = 'ENEMIES: ' + this.enemies;
        this.checkMouse();
    }

    this.draw = function () {
        this.drawHP();
        this.drawScores();
        this.drawEnemie();
        this.drawSkills();
        this.drawName();
    }

}