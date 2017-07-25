class Blue extends Player{

	constructor(position, img, id, fraction){
		super(position, img, id, fraction);
		this.bots = [];
	}

	createBots(num){
		for (var i = 0; i < num; ++i){
			var tmp = new Bot({x:this.obj.x + i*50, y:this.obj.y-this.obj.w},
			 {w: this.obj.w, h: this.obj.h, source: 'img/player.png'}, 0, 'blue')
			this.bots.push(tmp);
		}
	}

	botsFire(){
		for (var i = 0; i < this.bots.length; ++i){
			bots[i].addBullet();
		}
	}

	control(){
		if (key.isDown('LEFT')){
			this.obj.x -= this.dx * this.speed;
			if (this.obj.x <= 0){
				this.obj.x = 0;
			}
			for (var i = 0; i < this.bots.length; ++i){
				this.bots[i].obj.x -= this.dx * this.speed;
				if (this.bots[i].obj.x <= 0){
					this.bots[i].obj.x = 0;
				}
			}	
		}
		if (key.isDown('RIGHT')){
			this.obj.x += this.dx * this.speed;
			var dif = width - this.obj.w;
			if (this.obj.x >= dif){
				this.obj.x = dif;
			}
			for (var i = 0; i < this.bots.length; ++i){
				this.bots[i].obj.x += this.dx*this.speed;
				if (this.bots[i].obj.x >= dif){
					this.bots[i].obj.x = dif;
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
	}


}