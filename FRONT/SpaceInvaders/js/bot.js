class Bot extends Ship{

	constructor(position, img, id, fraction){
		super(position, img, id, fraction);
	}


	move(){
		this.obj.x += getRandomInt(-1 * this.dx, this.dx);
		this.draw();
	}

}