class Pink extends Player{
	//description of skills

	constructor(position, img, id, fraction, name){
		super(position, img, id, fraction, name);
		this.immortality = false;
		this.lastChangeMoveSpeed = Date.now();
		this.lastChangeBulletsSpeed = Date.now();
		this.lastSetImmortality = Date.now();
		this.fastMoveSpeed = false;
		this.fastBulletsSpeed = false;
		this.immortalityOn = false;
		this.brush = pjs.brush;
	}
	//изменение скорости пули(включает\выключает скорострельность)
	changeBulletsSpeed(speed){
		this.bulletSpeed = speed;
	}
	//изменение скорости передвижения корабля(включает\выключает ускорение)
	changeMoveSpeed(speed){
		this.speed = speed;
	}
	//включение\выключение неуязвимости
	setImmortality(immortality){
		this.immortality = immortality;
	}

	control(){
		super.control();
		if (key.isPress('Q')){
			if (Date.now() - this.lastChangeBulletsSpeed > 10000 && !this.fastBulletsSpeed){
				this.fastBulletsSpeed = true;
				this.lastChangeBulletsSpeed = Date.now();
				this.changeBulletsSpeed(this.bulletSpeed+5);
				gameInterface.skill_1.switch();
				console.log('bulletSpeed is increased');
			}
		}
		if (key.isPress('W')){
			if (Date.now() - this.lastChangeMoveSpeed > 10000 && !this.fastMoveSpeed){
				this.fastMoveSpeed = true;
				this.lastChangeMoveSpeed = Date.now();
				this.changeMoveSpeed(this.speed + 5);
				gameInterface.skill_2.switch();
				console.log('moveSpeed is increased');
			}
		}
		if (key.isPress('E')){
			if (Date.now() - this.lastSetImmortality > 10000 && !this.immortalityOn){
				this.lastSetImmortality = Date.now();
				this.setImmortality(true);
				this.immortalityOn = true;
				gameInterface.skill_3.switch();
				console.log('setImmortality');
			}
		}
	}
	// проверка для выключения скилов
	check(){
		if (Date.now() - this.lastChangeMoveSpeed > 5000 && this.fastMoveSpeed == true){
			this.changeMoveSpeed(this.speed - 5);
			this.fastMoveSpeed = false;
			console.log('movespeed decrease');
		}
		if (Date.now() - this.lastChangeBulletsSpeed > 5000 && this.fastBulletsSpeed == true){
			this.changeBulletsSpeed(this.bulletSpeed - 5);
			this.fastBulletsSpeed = false;
			console.log('bulletSpeed increase');
		}
		if (Date.now() - this.lastSetImmortality > 5000 && this.immortality == true){
			this.immortalityOn = false;
			this.immortality = false;
			this.setImmortality(false);
			console.log(this.immortality);
			console.log('immortality off');
		}
	}
	
	draw(){
		super.draw();
		if (ships[0] instanceof Pink){
			this.brush.drawText({
				x: this.obj.x + this.obj.w/2,
				y: this.obj.y - 20,
				text: this.name,
				color: 'white',
				size: 18,
				align: 'center'
			});
		}
		else{
			this.brush.drawText({
				x: this.obj.x + this.obj.w/2,
				y: this.obj.y + this.obj.h + 2,
				text: this.name,
				color: 'white',
				size: 18,
				align: 'center'
			});
		}
	}

}