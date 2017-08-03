class Bot extends Ship{

	constructor(position, img, id, fraction, name){
		super(position, img, id, fraction, name);
		this.enabled = false;
		this.bulletWidth = 27;
		this.bulletHeight = 54;
		this.bullets.splice(1, this.bullets.length-1);
	}

}