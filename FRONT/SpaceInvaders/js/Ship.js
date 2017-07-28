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
		this.bangStarted = Date.now();
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
		this.fireSound = audio.newAudio('audio/bullet.mp3', 0.2); // file, volume
        this.explosionSound = audio.newAudio('audio/exp.mp3', 0.2); // file, volume
		this.bangStarted = Date.now();
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
		this.fireSound.replay();
	}
	
	fire(){
		for (var i = 0; i < this.bullets.length; ++i){
			var hit = false; 
			var bullet = this.bullets[i];
			bullet.obj.draw();
			bullet.obj.y -= bullet.dy*this.bulletSpeed;
			if (this.id == 0){
				console.log(bullet.dy);
				console.log(this.bulletSpeed);
				console.log(bullet.obj.y);
			}
			for (var j = 0; j < ships.length; ++j){
				if (ships[j].fraction != this.fraction){
					if (bullet.obj.isStaticIntersect(ships[j].obj.getStaticBox())){
						hit = true;
						if (ships[j].immortality == false){
							this.bangAnimation = game.newAnimationObject({
				                x: ships[j].obj.x, y: ships[j].obj.y,
				                w: 80, h: 70,
				                animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 117, 80, 39, 4)
				            });
				            this.bangStarted = Date.now();
							ships[j].getDamage(this.damage);
							if (ships[j].isDead()){
								this.explosionSound.replay();
							}
							this.scores += this.killScores;
							break;
						}
					}
					if (ships[j] instanceof Blue && !hit){
						for (var k = 0; k < ships[j].bots.length; ++k){
							if (bullet.obj.isStaticIntersect(ships[j].bots[k].obj.getStaticBox())){
								hit = true;
								ships[j].bots[k].getDamage(this.damage);
								this.bangAnimation = game.newAnimationObject({
					                x: ships[j].bots[k].obj.x, y: ships[j].bots[k].obj.y,
					                w: 80, h: 70,
					                animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 117, 80, 39, 4)
				            	});
				            	this.bangStarted = Date.now();
								if (ships[j].bots[k].isDead()){
									ships[j].bots.splice(k, 1);
									k--;
									ships[j].moveBots();
								}
								break;
							}
						}
					}
				}
			}
			if (bullet.obj.y <= 0 || bullet.obj.y + bullet.obj.h >= fon.h || hit){
				this.bullets.splice(i, 1);
				i--;
			}
		}
	}
	
	control(){
		if (key.isDown('LEFT')){
 			this.obj.x -= this.dx * this.speed;
 			if (this.obj.x <= 0){
 				this.obj.x = 0;
 			}	
 		}
 		if (key.isDown('RIGHT')){
 			this.obj.x += this.dx * this.speed;
 			var dif = width - this.obj.w;
 			if (this.obj.x >= dif){
 				this.obj.x = dif;
 			}
 		}
 		if (key.isPress('SPACE')){
 			if (Date.now() - this.lastFire > 100 * this.speed){
 				var bulletImg, bulletdy = 3;
 				if (this.fraction == 'blue'){
 					bulletImg = blueBullet;
 				}
 				else {
 					bulletImg = pinkBullet;
 				}
 				var bul = {position:{x:this.obj.x + (this.obj.w)/2,y:this.obj.y + (this.obj.h)/2},
 					img:{width:this.bulletWidth, height: this.bulletHeight, source:
 					bulletImg}, speed:1, damage: 100, dy: bulletdy };
 				this.addBullet(bul);
 				this.lastFire = Date.now();
 			}
 		}
	}
	
	draw(){
		this.obj.draw();
		if (this.bangAnimation != undefined) {
            if (Date.now() - this.bangStarted < 1000) {
                this.bangAnimation.draw();
            }
            else {
            	this.bangAnimation = undefined;
        	}
        }
	}
	
}