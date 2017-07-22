class Ship{
	constructor(position, img, id){// image передаем как {source: "", width: , height: }, position = {x: , y: }
		this.img = img;
	
		this.obj = this.game.newImageObject({
			x: this.position.x ,	y: this.position.y,
			w: this.img.width,	h: this.img.height,
			file: this.img.source
		});
		
		this.id = 0;
		this.currentHP = this.maxHP = 100;
		this.scores = 0;
		this.killScores = 100;
		this.speed = 1;
		this.DX = 10;
		this.lastFireTime = Date.now();
		this.damage = 50;
		this.bulletWidth = 27;
		this.bulletHeight = 64;	
		this.bullets = [];
		this.enemies();
		this.obj.draw();
	}
	
	isDead(){
		if(this.currentHP <= 0)
			return true;
		else 
			return false;
	}
	
	addBullet(bullet){ // bullet = {width: , height: , img: }
		var tmp = game.newImageObject({
			positionC : point(this.obj.x + this.img.width/2, this.obj.y + this.img.height/2),
			w: bullet.width, h: bullet.height,
			img: bullet.img
		});
		bullets.push(tmp);
	}
	
	fire(){
		bullets.forEach(function (bullet, i, bullet){
			var hit = false; 
			bullet.draw();
			bullet.y -= bullet.dy;
			enemies.forEach(function(enemy, j, enemies){
				if (bullet.isStaticIntersect(enemy.getStaticBox())){
					hit = false;
					enemy.getDamage(this.damage);
					if (enemy.isDead){
						enemies.splice(j,1);
					}
					scores += killScores;
				}
				if (bullet.y <= 0 || hit){
					bullets.splice(i, 1);
				}
			});
		});	
	}
	
	draw(){
		this.obj.draw();
	}

	move(){
		this.obj.x += DX;
		this.draw();
		this.position.x = this.obj.x;
	}
}