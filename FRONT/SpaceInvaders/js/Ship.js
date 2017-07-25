class Ship{
	constructor(position, img, id, fraction){// image передаем как {source: "", width: , height: }, position = {x: , y: }
		this.obj = game.newImageObject({
			x: position.x ,	y: position.y,
			w: img.width,	h: img.height,
			file: img.source
		});
		this.id = id;
		this.fraction = fraction;
		this.currentHP = this.maxHP = 100;
		this.scores = 0;
		this.killScores = 100;
		this.speed = 1;
		this.dx = 10;
		this.lastFire = Date.now();
		this.lastMove = Date.now();
		this.damage = 50;
		this.bullets = [];
		this.lastFire = Date.now();
		this.bulletSpeed = 1;
		this.immortality = false;
	}
	
	isDead(){
		if(this.currentHP <= 0)
			return true;
		else 
			return false;
	}

	getDamage(damage){
		this.currentHP -= damage;
	}
	
	addBullet(bul){ 
		var bullet = new Bullet(bul.position, bul.img, bul.speed, bul.dy, bul.damage);
		this.bullets.push(bullet);
	}
	
	fire(){
		for (var i = 0; i < this.bullets.length; ++i){
			var hit = false; 
			var bullet = this.bullets[i];
			bullet.obj.draw();
			bullet.obj.y -= bullet.dy*this.bulletSpeed;
			for (var j = 0; j < ships.length; ++j){
				if (ships[j].fraction != this.fraction){
					if (bullet.obj.isStaticIntersect(ships[j].obj.getStaticBox())){
						hit = true;
						if (ships[j].immortality == false){
							ships[j].getDamage(this.damage);
							this.scores += this.killScores;
						}
					}
				}
			}
			if (bullet.obj.y <= 0 || hit){
				this.bullets.splice(i, 1);
				i--;
			}
		}
	}
	
	draw(){
		this.obj.draw();
	}

}