class Blue extends Player{

	constructor(position, img, id, fraction){
		super(position, img, id, fraction);
		this.fraction = 'blue';
		this.bots = [];
		this.lastTimeCreateBots = Date.now();
		this.lastTimeBotsFire = Date.now();
	}
	//создание ботов
	createBots(num){
		var botsArea = (this.obj.w + this.obj.w/2 - 10)* num; 
		if (num%2){
			for (var i = 0; i < num; ++i){
				var tmp = new Bot({x:this.obj.x + (i)*this.obj.w/2 - 10, y:this.obj.y-this.obj.w - 10},
					{w: this.obj.w, h: this.obj.h, source: 'img/bot.png'}, 0, 'blue');
				this.bots.push(tmp);
			}
		}
		else {
			for (var i = 0; i < num; ++i){
				var tmp = new Bot({x:this.obj.x + (i)*this.obj.w/2 - 10, y:this.obj.y-this.obj.w - 10},
					{w: this.obj.w, h: this.obj.h, source: 'img/bot.png'}, 0, 'blue');
				this.bots.push(tmp);
			}
		}


		for (var i = 0; i < num; ++i){
			var tmp = new Bot({x:this.obj.x + (i)*this.obj.w/2 - 10, y:this.obj.y-this.obj.w - 10},
			 {w: this.obj.w, h: this.obj.h, source: 'img/bot.png'}, 0, 'blue')
			this.bots.push(tmp);
		}
	}

	moveBots(){
		for (var i = 0; i < this.bots.length; ++i){
			this.bots[i].obj.x = this.obj.x + (i)*this.obj.w/2 - 10;
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
		if(key.isPress('Q')){
			if (Date.now() - this.lastTimeCreateBots > 5000 && !this.bots.length){
				this.createBots(2);
				this.lastTimeCreateBots = Date.now();
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