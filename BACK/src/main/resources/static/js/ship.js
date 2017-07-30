//var pjs = new PointJS('2d', 400, 400);
//pjs.system.initFullScreen();

//var game = pjs.game;
//var mouse = pjs.mouseControl;
//var key = pjs.keyControl;
//var point = pjs.vector.point;
//var width = game.getWH().w;
//var height = game.getWH().h;

//init mouse and keyboard
//mouse.initMouseControl();
//key.initKeyControl();

class Ship{
	constructor(position, img, name, fraction,speed){
	// image передаем как {source: "", width: , height: }, position = {x: , y: }

		this.img = img;
		this.obj = game.newImageObject({
			x: position.x ,	y: position.y,
			w: img.w,	h: img.w,
			file: img.source
		});
		this.dead = false;
		this.name = name;
		this.fraction = fraction;
		this.currentHP = this.maxHP = 100;
		this.scores = 0;
		this.killScores = 100;
		this.speed = 1;
		this.bulletSpeed = 5;
		this.dx = speed;
		this.lastFire = Date.now();
		this.lastMove = Date.now();
		this.damage = 50;
		this.bulletWidth = 27;
		this.bulletHeight = 64;	
		this.bullets = [];
		for (let i = 0 ; i<10;i++){
            this.bullets.push(new Bullet(this, {width:this.bulletWidth, height: this.bulletHeight, source:'img/bullet.png'}));
		}

		this.lastFire = Date.now();
		//this.obj.draw();
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
			for (let j = 0; j < ships.length; ++j) {
				 if (bullet.checkHitting(ships[j])) {
                     hit = true;
                     if (this === ship)
                         messageService.hit(this.name,ships[j].name,i);
                     ships[j].getDamage(bullet.damage);
                     this.scores += this.killScores;

                 }
			}
            if (bullet.obj.y <= 0 || hit || bullet.obj.y >= height ){
				bullet.enabled = false;
            }
		}


	}
	
	draw(){
		if (!this.dead){
            this.obj.draw();
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
			this.bullets[i].moveTo(bullets[i].x,bullets[i].y);
		}
	}
	move(direction) {
		if (ship.fraction==this.fraction){
            if (direction =='LEFT') {
                this.obj.x -= this.dx *this.speed;
                if (this.obj.x <= 0){
                    this.obj.x = 0;
                }
            }
            if (direction == 'RIGHT') {
				this.obj.x += this.dx *this.speed;
                var dif = width - this.obj.w;
                if (this.obj.x >= dif){
                    this.obj.x = dif;
                }
            }

            if(direction == 'NONE'){
            this.obj.x = this.obj.x;
            }

		} else{
            if (direction =='LEFT') {
                this.obj.x += this.dx *this.speed;
                var dif = width - this.obj.w;
                if (this.obj.x >= dif){
                    this.obj.x = dif;
                }
            }
            if (direction == 'RIGHT') {
                this.obj.x -= this.dx *this.speed;
                var dif = width - this.obj.w;
                if (this.obj.x <= 0){
                    this.obj.x = 0;
                }
            }
            if(direction == 'NONE'){
                        this.obj.x = this.obj.x;
			}


		}



	}
	//наследуются только для героев
	control(){

		if ((key.isDown('RIGHT'))&&(key.isDown('LEFT'))){
                        messageService.move(this.name,'NONE')
                }
                else

		if (key.isDown('LEFT')){
		    messageService.move(this.name,'LEFT')
			//this.move('LEFT',this)

		}else
		if (key.isDown('RIGHT')){
            messageService.move(this.name,'RIGHT')
           // this.move('RIGHT',this)

		}



		if (key.isDown('SPACE')){
			if (Date.now() - this.lastFire > 100 * this.speed){
				let k = this.shot();
				if (k != -1)
                messageService.shot(this.name,k);
				this.lastFire = Date.now();
			}
			
		}
	}

}