class Ship{
	constructor(img, coord_x, coord_y, width, height){
		this.id = 0;
		this.playerId = 0;
		this.hp = 100;
		
		this.image = img;
		
		this.position = pjs.vector.point(coord_x, coord_y);
		
		this.shipImageWidth = width;
		this.shipImageHeight = height;
	}
	
	getPosition(){
		return this.position;
	}
	
	setPosition(x,y){
		this.position = pjs.vector.point(x,y);
	}
	
	getImageProperties(){
		return {
			width: this.shipImageWidth,
			height: this.shipImageHeight
		};
	}
}