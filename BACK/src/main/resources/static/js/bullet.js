class Bullet{
	//position{x,y}, img={width, height, source}
	constructor(position, img, speed, dy, damage){
		console.log('success');
		this.position = position;
		this.damage = damage;
		this.img = img;
		this.speed = speed;
		this.dy = dy;
		this.w = img.width;
		this.h = img.height;
		this.obj = game.newImageObject({
			position: point(this.position.x, this.position.y),
			file: this.img.source,
			w: this.img.width, h: this.img.height
		});
	}
	move(){
		this.obj.y -= this.dy;
	}

	draw(){
		this.obj.draw();
	}
}