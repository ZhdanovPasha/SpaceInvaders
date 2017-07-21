class Ship{
	constructor(position, img){// image передаем как {source: "", width: , height: }, position = {x: , y: }
		this.img = img;
	
		this.obj = this.game.newImageObject({
			x: this.position.x ,	y: this.position.y,
			w: this.img.width,	h: this.img.height,
			file: this.img.source
		});
		
		this.id = 0;
		this.playerId = 0;
		this.currentHP = this.maxHP = 100;
		this.scores = 0;
		this.speed = 1;
		this.DX = 10;
		this.lastFireTime = Date.now();
		this.damage = 50;
		this.bulletWidth = 27;
		this.bulletHeight = 64;
		
		this.bullets = [];
		this.obj.draw();
		
	}
	
	isAlive(){
		if(this.currentHP <= 0)
			return false;
		else 
			return true;
	}
	
	addBullet(){
		
	}
	
	fire(){
		
	}
	
	draw(){
		this.obj.draw();
	}
	
	move(DX){
		this.obj.x += DX;
		this.obj.draw();
		this.position.x = this.obj.x;
	}
}