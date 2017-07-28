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
		this.brush = pjs.brush;
		
		this.skill_1 = new Object();
		this.skill_2 = new Object();
		this.skill_3 = new Object();
		
		this.skill_1.img = "img/bullet_skill.png";
		this.skill_1.description = "Увеличение скорости пуль";
		this.skill_1.duration = 5000;
		this.skill_1.cooldown = 10000;
		
		this.skill_2.img = 'img/rocket.png';
		this.skill_2.description = "Увеличение скорости коробля";
		this.skill_2.duration = 5000;
		this.skill_2.cooldown = 10000;
		
		this.skill_3.img = 'img/shield.png';
		this.skill_3.description = "Активация щита";
		this.skill_3.duration = 5000;
		this.skill_3.cooldown = 10000;
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
		if (Date.now() - this.lastChangeBulletsSpeed > this.skill_1.cooldown && !this.fastBulletsSpeed){
			gameInterface.skill_1.switchOn();
			if (key.isPress('Q')){
				this.fastBulletsSpeed = true;
				this.lastChangeBulletsSpeed = Date.now();
				this.changeBulletsSpeed(this.bulletSpeed+5);
				gameInterface.skill_1.switchOff();
				console.log('bulletSpeed is increased');
			}
		}
		if (Date.now() - this.lastChangeMoveSpeed > this.skill_2.cooldown && !this.fastMoveSpeed){
				gameInterface.skill_2.switchOn();
			if (key.isPress('W')){
				this.fastMoveSpeed = true;
				this.lastChangeMoveSpeed = Date.now();
				this.changeMoveSpeed(this.speed + 1);
				gameInterface.skill_2.switchOff();
				console.log('moveSpeed is increased');
			}
		}
		if (Date.now() - this.lastSetImmortality > this.skill_3.cooldown && !this.immortality){
				gameInterface.skill_3.switchOn();
			if (key.isPress('E')){
				this.lastSetImmortality = Date.now();
				this.setImmortality(true);
				gameInterface.skill_3.switchOff();
				console.log('setImmortality');
			}
		}
	}
	// проверка для выключения скилов
	check(){
		if (Date.now() - this.lastChangeBulletsSpeed > this.skill_1.duration && this.fastBulletsSpeed == true){
			this.changeBulletsSpeed(this.bulletSpeed - 5);
			this.fastBulletsSpeed = false;
			console.log('bulletSpeed increase');
		}
		if (Date.now() - this.lastChangeMoveSpeed > this.skill_2.duration && this.fastMoveSpeed == true){
			this.changeMoveSpeed(this.speed - 1);
			this.fastMoveSpeed = false;
			console.log('movespeed decrease');
		}
		if (Date.now() - this.lastSetImmortality > this.skill_3.duration && this.immortality == true){
			this.setImmortality(false);
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