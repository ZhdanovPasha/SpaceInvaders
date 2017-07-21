class Bullet{
	constructor(position, img, speed, dy, damage){
		this.position = position;
		this.img = img;
		this.speed = speed;
		this.dy = dy;
		this.damage = damage;
		this.obj = newImageObject({
			positionC: point(this.position.x, this.position.y),
			file: 'img/' + this.img.source,
			w: this.img.width, h: this.img.height
		});
	}

	getPosition(){
		return this.position;
	}

	setPosition(position){
		this.position = position;
	}

	getImg(){
		return this.img;
	}

	setImg(img){
		this.img = img;
	}

	getSpeed(){
		return this.speed;
	}

	setSpeed(speed){
		this.speed = speed;
	}

	getDY(){
		return this.dy;
	}

	setDY(dy){
		this.dy = dy;
	}

	getDamage(){
		return this.damage;
	}

	setDamage(damage){
		return this.damage;
	}

	move(){
		this.position.y += DY;
		this.obj.draw();
	}

}
