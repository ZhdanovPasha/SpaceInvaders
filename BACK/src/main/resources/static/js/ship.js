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
	constructor(position, img, name, fraction){
	// image передаем как {source: "", width: , height: }, position = {x: , y: }

		this.img = img;
		this.obj = game.newImageObject({
			x: position.x ,	y: position.y,
			w: this.img.width,	h: this.img.height,
			file: this.img.source
		});
		
		this.name = name;
		this.fraction = fraction;
		this.currentHP = this.maxHP = 100;
		this.scores = 0;
		this.killScores = 100;
		this.speed = 1;
		this.dx = 10;
		this.lastFire = Date.now();
		this.lastMove = Date.now();
		this.damage = 50;
		this.bulletWidth = 27;
		this.bulletHeight = 64;	
		this.bullets = [];
		this.lastFire = Date.now();
		//this.obj.draw();
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
			bullet.obj.y -= bullet.dy;
			for (var j = 0; j < ships.length; ++j){
				if (ships[j].fraction != this.fraction){
					if (bullet.obj.isStaticIntersect(ships[j].obj.getStaticBox())){
						hit = true;
						ships[j].getDamage(this.damage);
						this.scores += this.killScores;
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

	//move(){
	//	this.obj.x += getRandomInt(-1 * this.dx, this.dx);
	//	this.draw();
//	}
	move(direction,mainship) {
		if (mainship.fraction==this.fraction){
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
			this.move('LEFT',this)

		}else
		if (key.isDown('RIGHT')){
            messageService.move(this.name,'RIGHT')
            this.move('RIGHT',this)

		}



		if (key.isDown('SPACE')){
			if (Date.now() - this.lastFire > 100 * this.speed){
				var bul = {position:{x:this.obj.x + (this.obj.w)/2,y:this.obj.y + (this.obj.h)/2},
					img:{width:this.bulletWidth, height: this.bulletHeight, source:
					'img/bullet.png'}, speed:1, damage: 100, dy: 5 };
				this.addBullet(bul);
				this.lastFire = Date.now();
				for (i = 0; i < this.bullets.length; ++i)
					console.log(this.bullets[i]);
			}
			
		}
	}

}