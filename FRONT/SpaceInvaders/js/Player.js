class Player extends Ship{	
	
	constructor(position, img, id, fraction, name){
		super(position, img, id, fraction);
		this.name = name;
	}

	control(){
		super.control();
	}
}