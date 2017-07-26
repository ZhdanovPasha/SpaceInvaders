class Bullet{
	//position{x,y}, img={width, height, source}
	constructor(position, img, speed, dy, damage){
		// console.log('success');
		this.speed = speed;
		this.dy = dy;
		this.damage = damage;
		this.obj = game.newImageObject({
			position: point(position.x, position.y),
			file: img.source,
			w: img.width, h: img.height
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