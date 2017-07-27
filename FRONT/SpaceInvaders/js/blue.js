class Blue extends Player{

	constructor(position, img, id, fraction){
		super(position, img, id, fraction);
		this.fraction = 'blue';
		this.bots = [];
		this.lastTimeCreateBots = Date.now();
		this.lastTimeBotsFire = Date.now();
		
		this.skill_1 = new Object();
		
		this.skill_1.img = "img/bot_skill.png";
		this.skill_1.description = "Позвать рабов";
		this.skill_1.duration = 5000;
		this.skill_1.cooldown = 10000;
	}
	//создание ботов
	createBots(num){
		var botsArea = (this.obj.w/2+10)* num; 	
		for (var i = 0; i < num; ++i){
			var tmp = new Bot({x:this.obj.x - botsArea/2 + (i)*this.obj.w/2 + num*(i+1) + 17, y:this.obj.y-this.obj.w - 10},
				{w: this.obj.w, h: this.obj.h, source: 'img/bot.png'}, 0, 'blue');
			this.bots.push(tmp);
		}
	}

	moveBots(){
		var num = this.bots.length;
		var botsArea = (this.obj.w/2+10)* num; 
		//this is black magic
		for (var i = 0; i < num; ++i){
			this.bots[i].obj.x = this.obj.x - botsArea/2 + (i)*this.obj.w/2 + num*(i+1) + 17;
		}
	}

	addBulletsForBots(){
		if (Date.now() - this.lastTimeBotsFire > 3000){
			for (var i = 0; i < this.bots.length; ++i){
				var bul = {position:{x:this.bots[i].obj.x + (this.bots[i].obj.w)/2,y:this.bots[i].obj.y + (this.bots[i].obj.h)/2},
						img:{width:this.bots[i].bulletWidth, height: this.bots[i].bulletHeight, source:
						'img/bullet.png'}, speed:1, damage: 25, dy: -5 };				 
				var bullet = new Bullet(bul.position, bul.img, bul.speed, bul.dy, bul.damage);
				this.bots[i].bullets.push(bullet);
			}
			this.lastTimeBotsFire = Date.now();
		}
	}

	control(){
		if (key.isDown('LEFT')){
			this.obj.x -= this.dx * this.speed;
			if (this.obj.x <= 0){
				this.obj.x = 0;
			}
			this.moveBots();
		}
		if (key.isDown('RIGHT')){
			this.obj.x += this.dx * this.speed;
			var dif = width - this.obj.w;
			if (this.obj.x >= dif){
				this.obj.x = dif;
			}
			this.moveBots();
		}
		if (key.isDown('SPACE')){
			if (Date.now() - this.lastFire > 100 * this.speed){
				var bul = {position:{x:this.obj.x + (this.obj.w)/2,y:this.obj.y + (this.obj.h)/2},
					img:{width:this.bulletWidth, height: this.bulletHeight, source:
					'img/bullet.png'}, speed:1, damage: 100, dy: 5 };
				this.addBullet(bul);
				this.lastFire = Date.now();
			}
		}
		if (Date.now() - this.lastTimeCreateBots > 5000 && !this.bots.length){
			gameInterface.skill_1.switchOn();
			if(key.isPress('Q')){
				this.createBots(4);
				this.lastTimeCreateBots = Date.now();
				gameInterface.skill_1.switchOff();
			}
		}
	}

	fireBots(){
		for (var i = 0; i < this.bots.length; ++i){
			for (var j = 0; j < this.bots[i].bullets.length; ++j){
				this.bots[i].bullets[j].draw();
				var bullet = this.bots[i].bullets[j];
				bullet.draw();
				bullet.obj.y += bullet.dy;
				var hit = false;
				for (var k = 0; k < ships.length; ++k){
					if (ships[k] instanceof Pink || ships[k] instanceof Bot){
				 		if (bullet.obj.isStaticIntersect(ships[k].obj.getStaticBox())){
					 		hit = true;
					 		if (ships[k].immortality == false){
					 			ships[k].getDamage(this.damage);
					 			this.scores += this.killScores;
								break;
							}
					 	}
				 	}
				}
				if (bullet.obj.y <= 0 || bullet.obj.y >= fon.w || hit){
			 		this.bots[i].bullets.splice(j, 1);
			 		j--;
			 	}
			}
		}
	}
}