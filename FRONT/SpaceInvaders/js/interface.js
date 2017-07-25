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

		this.rectValWidth = 0.2 * this.width;
	}
	
	initializeObjects(){	
		this.brush = this.pjs.brush;
	
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
		
		// this.skill_2 = this.game.newRectObject({
			// positionC: this.point(this.game.getWH().w2, this.height - 30),
			// w: 50,
			// h: 50,
			// fillColor: 'white',
			// alpha: 0.5
		// });
		
		this.skill_2 = this.game.newMesh({
			//positionC: this.point(this.game.getWH().w2, this.height - 30),
			x: this.game.getWH().w2-25,
			y: this.height - 80,
			add:[this.game.newRectObject({
				//positionC: this.point(this.game.getWH().w2, this.height - 30),
				w: 50,
				h: 50,
				fillColor: 'white',
				alpha: 0.5
				}), this.game.newImageObject({
				file: 'img/fist.png',
				x: 3,
				y: 3, 
				//position: this.point(this.skill_2.x - 60, this.skill_2.y),
				w: 45,
				h: 45,
				color: 'black',
				//alpha: 0.5
				})]
		});
		

		this.skill_1 = this.game.newMesh({
			x: this.skill_2.x - 60,
			y: this.skill_2.y,
			add: [this.game.newRectObject({
				//positionC: this.point(this.game.getWH().w2, this.height - 30),
				w: 50,
				h: 50,
				fillColor: 'white',
				alpha: 0.5
				}), this.game.newImageObject({
				file: 'img/shield.png',
				x: 3,
				y: 3, 
				//position: this.point(this.skill_2.x - 60, this.skill_2.y),
				w: 45,
				h: 45,
				color: 'black',
				//alpha: 0.5
				})]
		});

		this.skill_3 = this.game.newRectObject({
			position: this.point(this.skill_2.x + 60, this.skill_2.y),
			w: 50,
			h: 50,
			fillColor: 'white',
			alpha: 0.5
		});
		
		this.resultBattleText = this.game.newTextObject({
			text: "Вы победили!\nДля продолжения нажмите ENTER",
			positionC: this.point(this.game.getWH().w2, this.game.getWH().h2),
			size: 20,
			color: "white"
		});
	}
	
	initialWin(){
		this.resultBattleText.text = "Вы победили!\nДля продолжения нажмите ENTER"
		this.resultBattleText.draw();
	}
	
	initialLose(){
		this.resultBattleText.text = "Вы проиграли!\nДля продолжения нажмите ENTER"
		this.resultBattleText.draw();
	}
	
	drawName(){
		if(!this.player.isDead() && this.enemies > 0){
			this.brush.drawText({
				x: this.player.obj.x + this.player.obj.w/2,
				y: this.player.obj.y - 20,
				text: "Test",
				color: 'white',
				size: 18,
				align: 'center'
			});
		}
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
		this.skill_1.draw();
		this.skill_2.draw();
		this.skill_3.draw();
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
		
		if(en == 0)
			this.initialWin();
		
		this.enemies = en;
		
		if(sc < 0)
			this.scores = 0;
		else 	
			this.scores = sc;
			
		
		this.hpRectVal.w = (this.rectValWidth - 2) * this.currHP / this.maxHP;
		this.hpVal.text = this.currHP + '/' + this.maxHP;
		
		this.scoresText.text = 'SCORES: ' + this.scores;
		
		this.enemieText.text = 'ENEMIES: ' + this.enemies;
	}
	
	draw(){
		this.drawHP();
		this.drawScores();
		this.drawEnemie();
		this.drawSkills();
		this.drawName();
	}
}