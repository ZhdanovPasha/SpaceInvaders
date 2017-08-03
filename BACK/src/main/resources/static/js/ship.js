class Ship{
	constructor(position, img, id, fraction, name){
	    // image передаем как {source: "", width: , height: }, position = {x: , y: }
		this.img = img;
		this.obj = game.newImageObject({
			x: position.x ,	y: position.y,
			w: img.w,	h: img.h,
			file: img.source
		});
		this.id = id;
		this.dead = false;
		this.name = name;
		this.fraction = fraction;
		this.currentHP = this.maxHP = 100;
		this.scores = 0;
		this.killScores = 100;
		this.speed = 1;
		this.bulletSpeed = 5;
		this.dx = 10;
		this.bulletWidth = 27;
		this.bulletHeight = 64;
		this.lastFire = Date.now();
		this.lastMove = Date.now();
		this.damage = 25;
		this.bullets = [];
		for (let i = 0 ; i < 10;i++){
		    if(this.fraction === 'BLUE')
                this.bullets.push(new Bullet(this, {width:this.bulletWidth, height: this.bulletHeight, source:blueBullet}));
            else
                this.bullets.push(new Bullet(this, {width:this.bulletWidth, height: this.bulletHeight, source:pinkBullet}));
		}
		this.lastFire = Date.now();
        this.bulletSpeed = 1;
        this.immortality = false;
        this.fireSound = audio.newAudio('audio/bullet.mp3', 0.2); // file, volume
        this.explosionSound = audio.newAudio('audio/exp.mp3', 0.2); // file, volume
        this.bangStarted = Date.now();
	}

	isDead(){
		return this.currentHP <= 0;
	}

	getDamage(damage){
		this.currentHP -= damage;
	}
	//deprecated
	addBullet(){
        var bullet = null;
		if (ship.fraction === this.fraction) {
            console.log(this.obj.y);
            bullet = new Bullet({x:this.obj.x + (this.obj.w)/2-this.bulletWidth/2,y:this.obj.y }, {width:this.bulletWidth, height: this.bulletHeight, source:'img/bullet.png'}, 1, this.bulletSpeed,this.damage );
		} else {
			console.log(this.obj.y);
            bullet = new Bullet({x:this.obj.x + (this.obj.w)/2-this.bulletWidth/2,y:this.obj.y+this.obj.h }, {width:this.bulletWidth, height: this.bulletHeight, source:'img/bullet.png'}, 1, this.bulletSpeed,this.damage );
		}
		this.bullets.push(bullet);
		this.fireSound.replay();
	}

	shot() {
		for ( let i = 0; i < this.bullets.length; i++ ) {
           if (!this.bullets[i].enabled) {
               this.bullets[i].shot();
               return i;
		   }
		}
		return -1;
	}

	fire(){
		for (let i = 0; i < this.bullets.length; ++i){
			let hit = false;
			let bullet = this.bullets[i];
			bullet.move();
			bullet.draw();
            for (var j = 0; j < ships.length; ++j){
                if (ships[j].fraction != this.fraction){
                    if (bullet.obj.isStaticIntersect(ships[j].obj.getStaticBox()) && bullet.enabled){
                        hit = true;
                        bullet.obj.y = -bullet.obj.h*10;
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
                            if(ship == ships[j])
                                messageService.hit(this.name, ships[j].name, i);//Если сломаются пули, не передавать пули
                            break;
                        }
                    }
                    if (ships[j] instanceof Blue && !hit){
                        for (var k = 0; k < ships[j].bots.length; ++k){
                            if (bullet.obj.isStaticIntersect(ships[j].bots[k].obj.getStaticBox()) && bullet.enabled){
                                bullet.obj.y = -bullet.obj.h*100;
                                hit = true;
                                ships[j].bots[k].getDamage(this.damage);
                                this.bangAnimation = game.newAnimationObject({
                                    x: ships[j].bots[k].obj.x, y: ships[j].bots[k].obj.y,
                                    w: 80, h: 70,
                                    animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 117, 80, 39, 4)
                                });
                                this.bangStarted = Date.now();
                                if (ships[j].bots[k].isDead() && ships[j] == ship){
                                    messageService.hitBot(ships[j].name, ships[j].bots[k].id, i);
                                    ships[j].bots.splice(k,1);
                                    if (!ships[j].bots.length){
                                        messageService.deactivateSkill(ship.name,0);
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
            if (bullet.obj.y <= 0 || bullet.obj.y + bullet.obj.h >= height || hit){
                bullet.enabled = false;
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

	moveTo(x) {
		if (ship.fraction == this.fraction) {
            this.obj.x = x;
		} else {
			this.obj.x = game.getWH().w-(x+this.obj.w);
		}

	}
	moveBullets (bullets) {
		for (let i = 0 ; i < this.bullets.length; i++) {
            this.bullets[i].enabled = bullets[i].enabled;
			this.bullets[i].moveTo(bullets[i].x,bullets[i].y);
		}
	}
	move(direction) {
		if (ship.fraction==this.fraction){
            if (direction =='LEFT') {
                this.obj.x -= this.dx *this.speed;

            }
            if (direction == 'RIGHT') {
				this.obj.x += this.dx *this.speed;
                var dif = width - this.obj.w;

            }

            if(direction == 'NONE'){
            this.obj.x = this.obj.x;
            }

		} else{
            if (direction =='LEFT') {
                this.obj.x += this.dx *this.speed;
                var dif = width - this.obj.w;
            }
            if (direction == 'RIGHT') {
                this.obj.x -= this.dx *this.speed;
                var dif = width - this.obj.w;
            }
            if(direction == 'NONE'){
                        this.obj.x = this.obj.x;
			}
		}
	}
	//наследуются только для героев
	control() {
        if ((key.isDown('RIGHT')) && (key.isDown('LEFT'))) {
            messageService.move(this.name, 'NONE')
        }
        else {
            if (key.isDown('LEFT')) {
                messageService.move(this.name, 'LEFT');
            } else if (key.isDown('RIGHT')) {
                messageService.move(this.name, 'RIGHT');
            }
            if (key.isPress('SPACE')) {
                if (Date.now() - this.lastFire > 100 * this.speed) {
                    var bulletImg, bulletdy = 3;
                    if (this.fraction == 'BLUE') {
                        bulletImg = blueBullet;
                    }
                    else {
                        bulletImg = pinkBullet;
                    }
                    let k = this.shot();
                    if (k != -1){
                        messageService.shot(this.name, k);
                    }
                    this.lastFire = Date.now();
                }
            }
        }
        if (this.obj.x + SpaceInvaders.BGPosition <= 0) {
            camera.move(point(-this.speed, 0));
            SpaceInvaders.BGPosition += this.speed;
            pjs.system.setStyle({
                backgroundPositionX: SpaceInvaders.BGPosition + 'px'
            });
        }
        if (this.obj.x + this.obj.w + SpaceInvaders.BGPosition >= width) {
            camera.move(point(this.speed, 0));
            SpaceInvaders.BGPosition -= this.speed;
            pjs.system.setStyle({
                backgroundPositionX: SpaceInvaders.BGPosition + 'px'
            });
        }
    }
}