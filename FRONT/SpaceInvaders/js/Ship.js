var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullScreen();

var game = pjs.game;
var mouse = pjs.mouseControl;
var key = pjs.keyControl;
var point = pjs.vector.point;
var width = game.getWH().w;
var height = game.getWH().h;

//init mouse and keyboard
mouse.initMouseControl();
key.initKeyControl();

class Ship{
	constructor(position, img, id){// image передаем как {source: "", width: , height: }, position = {x: , y: }
		this.img = img;
	
		this.obj = game.newImageObject({
			x: position.x ,	y: position.y,
			w: this.img.width,	h: this.img.height,
			file: this.img.source
		});
		
		this.id = 0;
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
		this.enemies = [];
		this.obj.draw();
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
	
	addBullet(bullet){ // bullet = {width: , height: , img: }
		var tmp = game.newImageObject({
			positionC : point(this.obj.x + this.img.width/2, this.obj.y + this.img.height/2),
			w: bullet.width, h: bullet.height,
			img: bullet.img
		});
		this.bullets.push(tmp);
	}

	addEnemy(enemy){

	}
	
	fire(num){
		console.log("i'm firee");
		console.log(this.bullets.length);
		console.log(ships);
		
		for (j = 0; j < this.bullets.length; ++j){
			var hit = false; 
			this.bullet[j].draw();
			this.bullet[j].y -= this.bullet[j].dy;
			if (this.bullet[j].isStaticIntersect(ships[num].getStaticBox())){
				hit = true;
				ships[num].getDamage(this.damage);
				this.scores += this.killScores;
			}
			if (this.bullet[j].y <= 0 || hit){
				this.bullets.splice(j, 1);
				j--;
			}
			console.log("ith bullet is out" + j);
		}
		console.log('end fire');	
	}
	
	draw(){
		this.obj.draw();
	}

	move(){
		this.obj.x += dx;
		this.draw();
		this.position.x = this.obj.x;
	}

	//наследуются только для героев
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
		if (key.isDown('SPACE')){
			if (Date.now() - this.lastFire > 100 * this.speed){
				this.addBullet({width:this.bulletWidth, height: this.bulletHeight, img:
					'img/bullet.png'});
				this.lastFire = Date.now();
			}
		}
	}

}