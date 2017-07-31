class Bot extends Ship{

	constructor(position, img, id, fraction, name){
		super(position, img, id, fraction, name);
		this.bulletWidth = 27;
		this.bulletHeight = 54;
	}

	move(){
		this.obj.x += getRandomInt(-1 * this.dx, this.dx);
		this.draw();
	}

}
