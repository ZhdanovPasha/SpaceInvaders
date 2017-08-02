class Bot extends Ship{

	constructor(position, img, id, fraction, name){
		super(position, img, id, fraction, name);
		this.enabled = false;
		this.bulletWidth = 27;
		this.bulletHeight = 54;
	}

	draw(){
		if (this.enabled) {
			super.draw();
		}
	}

}