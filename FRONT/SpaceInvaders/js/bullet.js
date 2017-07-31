class Bullet{
	//position{x,y}, img={width, height, source}
	constructor(position, img, speed, dy, damage){
		console.log('success');
		this.speed = speed;
		this.dy = dy;
		this.damage = damage;
		this.img = img;
		this.position = position;
		this.obj = game.newImageObject({
			position: point(this.position.x, this.position.y),
			file: this.img.source,
			w: this.img.width, h: this.img.height
		});
	}

	move(){
		this.obj.y += this.dy;
		this.obj.draw();
	}

	draw(){
		this.obj.draw();
	}
}