class Blue extends Player{

	constructor(position, img, id, fraction){
		super(position, img, id, fraction);
		this.fraction = 'blue';
		this.bots = [];
		this.useSkill= false;
		this.lastTimeCreateBots = Date.now();
		this.lastTimeBotsFire = Date.now();
	}
	//создание ботов
	createBots(num){
		for (var i = 0; i < num; ++i){
			var tmp = new Bot({x:this.obj.x + (i)*this.obj.w/2 - 10, y:this.obj.y-this.obj.w - 10},
			 {w: this.obj.w, h: this.obj.h, source: 'img/bot.png'}, 0, 'blue')
			this.bots.push(tmp);
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
			else {
				for (var i = 0; i < this.bots.length; ++i){
					this.bots[i].obj.x -= this.dx * this.speed;
					if (this.bots[i].obj.x <= 0){
						this.bots[i].obj.x = 0;
					}
				}	
			}
		}
		if (key.isDown('RIGHT')){
			this.obj.x += this.dx * this.speed;
			var dif = width - this.obj.w;
			if (this.obj.x >= dif){
				this.obj.x = dif;
			}
			else {
				for (var i = 0; i < this.bots.length; ++i){
					this.bots[i].obj.x += this.dx*this.speed;
					if (this.bots[i].obj.x >= dif){
						this.bots[i].obj.x = dif;
					}
				}
			}
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
		if(key.isPress('Q')){
			if (Date.now() - this.lastTimeCreateBots > 3000 && !this.useSkill){
				this.createBots(1);
				this.lastTimeCreateBots = Date.now();
				this.useSkill = true;
				console.log('createBots');
			}
		}
	}

	fireBots(){
		for (var i = 0; i < this.bots.length; ++i){
			for (var j = 0; j < this.bots[i].bullets.length; ++j){
				console.log(this.bots[i].bullets[j]);
				this.bots[i].bullets[j].draw();
				var bullet = this.bots[i].bullets[j];
				console.log(bullet);
				bullet.draw();
				bullet.obj.y += bullet.dy;
				var hit = false;
				for (var k = 0; k < ships.length; ++k){
					if (ships[k] instanceof Pink){
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
			}
		}
	}

}