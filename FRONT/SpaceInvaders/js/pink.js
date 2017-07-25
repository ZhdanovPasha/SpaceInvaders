class Pink extends Player{
	//description of skills

	constructor(position, img, id, fraction){
		super(position, img, id, fraction);
		this.lastChangeMoveSpeed = Date.now();
		this.lastChangeBulletsSpeed = Date.now();
		this.lastSetImmortality = Date.now();
		this.fastMoveSpeed = false;
		this.fastBulletsSpeed = false;
		this.immortalityOn = false;
		this.fraction = 'pink';
	}

	changeBulletsSpeed(speed){
		this.bulletSpeed = speed;
	}

	changeMoveSpeed(speed){
		this.speed = speed;
	}

	setImmortality(immortality){
		this.immortality = immortality;
	}

	control(){
		if (key.isDown('LEFT')){
			this.obj.x -= this.dx * this.speed;
			if (this.obj.x <= 0){
				this.obj.x = 0;
			}	
		}
		if (key.isDown('RIGHT')){
			this.obj.x += this.dx * this.speed;
			var dif = width - this.obj.w;
			if (this.obj.x >= dif){
				this.obj.x = dif;
			}
		}
		if (key.isDown('SPACE')){
			if (Date.now() - this.lastFire > 100 * this.speed){
				var bul = {position:{x:this.obj.x + (this.obj.w)/2,y:this.obj.y + (this.obj.h)/2},
					img:{width:this.bulletWidth, height: this.bulletHeight, source:
					'img/bullet.png'}, speed:1, damage: 100, dy: 5 };
				this.addBullet(bul);
				this.lastFire = Date.now();
			}
		}
		if (key.isPress('Q')){
			if (Date.now() - this.lastChangeBulletsSpeed > 10000 && !this.fastBulletsSpeed){
				this.fastBulletsSpeed = true;
				this.lastChangeBulletsSpeed = Date.now();
				this.changeBulletsSpeed(this.bulletSpeed+5);
			}
		}
		if (key.isPress('W')){
			if (Date.now() - this.lastChangeMoveSpeed > 10000 && !this.fastMoveSpeed){
				this.fastMoveSpeed = true;
				this.lastChangeMoveSpeed = Date.now();
				this.changeMoveSpeed(this.speed + 5);
			}
		}
		if (key.isPress('E')){
			if (Date.now() - this.lastSetImmortality > 10000 && !this.immortalityOn){
				this.lastSetImmortality = Date.now();
				this.setImmortality(true);
				this.immortalityOn = true;
				console.log('setImmortality');
			}
		}
		if (key.isPress('A')){
			//if (Date.now() - this.lastChangeBulletsSpeed > 10000){
				this.lastChangeBulletsSpeed = Date.now();
				this.changeBulletsSpeed(this.bulletSpeed-2);
			//}
		}
		if (key.isPress('S')){
			this.lastChangeBulletsSpeed = Date.now();
			this.changeMoveSpeed(this.speed - 1);
		}
		if (key.isPress('D')){
			this.lastChangeBulletsSpeed = Date.now();
			this.setImmortality(false);
		}

	}
}