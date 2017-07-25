class Bot extends Ship{

	move(){
		this.obj.x += getRandomInt(-1 * this.dx, this.dx);
		this.draw();
	}

}