class Bot extends Ship{

	constructor(position, img, id, fraction, name){
		super(position, img, id, fraction, name);
		this.enabled = false;
		this.bulletWidth = 17;
		this.bulletHeight = 44;
		for (let i = 0; i < this.bullets.length; ++i){
			let bullet = this.bullets[i];
			bullet.obj.w = 17;
			bullet.obj.h = 44;
			bullet.dy = 1;
		}
		//this.bullets.splice(1, this.bullets.length-1);
	}

}