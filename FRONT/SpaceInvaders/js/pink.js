class Pink extends Player{
	//description of skills

	constructor(position, img, id, fraction){
		super(position, img, id, fraction);
		this.immortallity = false;
	}

	changeBulletsSpeed(speed){
		this.bulletSpeed = speed;
	}

	changeMoveSpeed(speed){
		this.speed = speed;
	}

	setImmortality(immortallity){
		this.immortallity = immortallity;
	}



}