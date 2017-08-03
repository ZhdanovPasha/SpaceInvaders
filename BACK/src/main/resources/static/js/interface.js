class Interface{

	constructor(pjs){
		this.pjs = pjs;
		this.game = pjs.game;
	}

	//Инициализация параметров. Player - Объект, в котором есть имя игрока, его очки и корабль obj
	initialize(player, mHP, sc, en){
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

	initializeHP(){
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

	initializeText(){
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

	initializeSkills(){
		var switchOn = function(){
			this.switchState = "on";
			this.lastLaunch = Date.now();
			this.getObjects()[2].alpha = 1;
		}

		var switchOff = function(){
			this.switchState = "off";
			this.getObjects()[2].alpha = 0.3;
		}

		if(this.player instanceof Pink){
			this.skill_2 = this.game.newMesh({
				//positionC: this.point(this.game.getWH().w2, this.height - 30),
				x: this.game.getWH().w2-25,
				y: this.height - 60,
				add:[this.game.newRectObject({
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
						file: this.player.skill_2.img,
						x: 3,
						y: 3,
						w: 45,
						h: 45,
						alpha: 0.3,
						color: 'black',
					}), this.game.newRectObject({
						w: 0,
						h: 3,
						fillColor: 'red'
					})]
			});

			this.skill_2.description = this.player.skill_2.description;
			this.skill_2.isClicked = false;
			this.skill_2.switchOn = switchOn;
			this.skill_2.switchOff = switchOff;
			this.skill_2.duration = this.player.skill_2.duration;
			this.skill_2.cooldown = this.player.skill_2.cooldown;
			this.skill_2.lastLaunch = Date.now();
            this.skill_2_baseX = this.skill_2.x;

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
					file: this.player.skill_1.img,
					x: 3,
					y: 3,
					w: 45,
					h: 45,
					alpha: 0.3,
					color: 'black',
					}), this.game.newRectObject({
						w: 0,
						h: 3,
						fillColor: 'red'
					})]
			});

			this.skill_1.description = this.player.skill_1.description;
			this.skill_1.switchOn = switchOn;
			this.skill_1.switchOff = switchOff;
			this.skill_1.duration = this.player.skill_1.duration;
			this.skill_1.cooldown = this.player.skill_1.cooldown;
			this.skill_1.lastLaunch = Date.now();
            this.skill_1_baseX = this.skill_2.x - 60;
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
					file: this.player.skill_3.img,
					x: 3,
					y: 3,
					w: 45,
					h: 45,
					alpha: 0.3,
					color: 'black',
					}), this.game.newRectObject({
						w: 0,
						h: 3,
						fillColor: 'red'
					})]
			});

			this.skill_3.description = this.player.skill_3.description;
			this.skill_3.switchState = "on";
			this.skill_3.switchOn = switchOn;
			this.skill_3.switchOff = switchOff;
			this.skill_3.duration = this.player.skill_3.duration;
			this.skill_3.cooldown = this.player.skill_3.cooldown;
			this.skill_3.lastLaunch = Date.now();
            this.skill_3_baseX = this.skill_2.x + 60;
		}
		else{
			this.skill_1 = this.game.newMesh({
				//positionC: this.point(this.game.getWH().w2, this.height - 30),
				x: this.game.getWH().w2-25,
				y: this.height - 60,
				add:[this.game.newRectObject({
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
						file: this.player.skill_1.img,
						x: 3,
						y: 3,
						w: 45,
						h: 45,
						alpha: 0.3,
						color: 'black',
					}), this.game.newRectObject({
						w: 0,
						h: 3,
						fillColor: 'red'
					})]
			});

			this.skill_1.description = this.player.skill_1.description;
			this.skill_1.isClicked = false;
			this.skill_1.switchOn = switchOn;
			this.skill_1.switchOff = switchOff;
			this.skill_1.duration = this.player.skill_1.duration;
			this.skill_1.cooldown = this.player.skill_1.cooldown;
			this.skill_1.lastLaunch = Date.now();
		}


	}

	initializeObjects(){
		this.brush = this.pjs.brush;

		this.initializeHP();

		this.initializeText();

		this.initializeSkills();

		this.resultBattleText = this.game.newTextObject({
			text: "Вы победили! Для продолжения нажмите ENTER",
			positionC: this.point(this.game.getWH().w2, this.game.getWH().h2),
			size: 20,
			color: "white"
		});
        this.InterfaceMesh = this.game.newMesh({
            x: 0,
            y: 0,
            add: [this.hpText, this.hpRectStroke, this.hpRectVal, this.hpVal, this.scoresText,
                this.enemieText,this.resultBattleText]
        });
	}

	initialWin(){
		this.resultBattleText.text = "Вы победили!Для продолжения нажмите ENTER"
		this.resultBattleText.draw();
	}

	initialLose(){
		this.resultBattleText.text = "Вы проиграли!Для продолжения нажмите ENTER"
		this.resultBattleText.draw();
	}

	drawHP(){
		this.hpText.draw();
		this.hpRectStroke.draw();
		this.hpRectVal.draw();
		this.hpVal.draw();
	}

	drawScores(){
		this.scoresText.draw();
	}

	drawEnemie(){
		this.enemieText.draw();
	}

	drawSkills(){
		if(this.player instanceof Pink){
			this.skill_1.draw();
			this.skill_2.draw();
			this.skill_3.draw();
		}
		else{
			this.skill_1.draw();
		}
	}

	checkSkill_1(){
		var obj = this.skill_1.getObjects()[2];
		if(this.mouseControl.isInStatic(obj.getStaticBox())){
			this.brush.drawText({
				x: this.skill_1.x,
				y: this.skill_1.y - 25,
				text: this.skill_1.description,
				align: 'center',
				size: 18,
				color: 'white'
			});

			console.log("Описание скилла: "+ this.skill_1.description);
		}

		if(this.skill_1.switchState == 'off' && this.player instanceof Pink){
			var time = this.skill_1.duration - (Date.now() - this.skill_1.lastLaunch);
			if(time < 0) time = 0;
			var obj = this.skill_1.getObjects()[3];
			obj.w = 50 * time / this.skill_1.duration;
		}
	}

	checkSkill_2(){
		var obj = this.skill_2.getObjects()[2];
		if(this.pjs.mouseControl.isInStatic(obj.getStaticBox())){
			this.brush.drawText({
				x: this.skill_2.x,
				y: this.skill_2.y - 25,
				text: this.skill_2.description,
				align: 'center',
				size: 18,
				color: 'white'
			});
			console.log("Описание скилла: "+ this.skill_2.description);
		}

		if(this.skill_2.switchState == 'off'){
			var time = this.skill_2.duration - Date.now() + this.skill_2.lastLaunch;
			if(time < 0) time = 0;
			var obj = this.skill_2.getObjects()[3];
			obj.w = 50 * time / this.skill_2.duration;
		}
	}

	checkSkill_3(){
		var obj = this.skill_3.getObjects()[2];
		if(this.pjs.mouseControl.isInStatic(obj.getStaticBox())){
			this.brush.drawText({
				x: this.skill_3.x,
				y: this.skill_3.y - 25,
				text: this.skill_3.description,
				align: 'center',
				size: 18,
				color: 'white'
			});
			console.log("Описание скилла: "+ this.skill_3.description);
		}

		if(this.skill_3.switchState == 'off'){
			var time = this.skill_3.duration - Date.now() + this.skill_3.lastLaunch;
			if(time < 0) time = 0;
			var obj = this.skill_3.getObjects()[3];
			obj.w = 50 * time / this.skill_3.duration;
		}
	}

	checkSkills(){
		if(this.player instanceof Pink){
			this.checkSkill_1();
			this.checkSkill_2();
			this.checkSkill_3();
		}
		else{
			this.checkSkill_1();
		}
	}

	update(hp, sc, en){//Обновить текущие данные
		if(hp <= 0){
			this.currHP = 0;
			this.initialLose();
		}
		else if(hp > this.maxHP)
			this.currHP = maxHP;
		else
			this.currHP = hp;

		if(en)
			this.initialWin();

		//this.enemies = en;

		if(sc < 0)
			this.scores = 0;
		else
			this.scores = sc;


		this.hpRectVal.w = (this.rectValWidth - 2) * this.currHP / this.maxHP;
		this.hpVal.text = this.currHP + '/' + this.maxHP;

		this.scoresText.text = 'SCORES: ' + this.scores;

		this.enemieText.text = 'ENEMIES: ' + this.enemies;
		this.checkSkills();
        this.InterfaceMesh.setPosition(this.point(-SpaceInvaders.BGPosition, 0));
        this.skill_1.setPosition(this.point(-SpaceInvaders.BGPosition + this.skill_1_baseX, 0));
        if(this.skill_2)this.skill_2.setPosition(this.point(-SpaceInvaders.BGPosition + this.skill_2_baseX, 0));
        if(this.skill_3)this.skill_3.setPosition(this.point(-SpaceInvaders.BGPosition + this.skill_3_baseX, 0));
	}

	draw(){
		this.drawHP();
		this.drawScores();
		this.drawEnemie();
		this.drawSkills();
	}
}