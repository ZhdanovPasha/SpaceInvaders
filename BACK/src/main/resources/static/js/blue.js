class Blue extends Ship{

	constructor(position, img, id, fraction, name){
		super(position, img, id, fraction, name);
		this.obj.setAngle(180);
		this.numBots = 4;
		this.bots = [];
		this.lastTimeCreateBots = Date.now();
		this.lastTimeBotsFire = Date.now();
		this.brush = pjs.brush;
		
		this.skill_1 = new Object();
		
		this.skill_1.img = "img/bot_skill.png";
		this.skill_1.description = "Призвать ботов";
		this.skill_1.duration = 5000;
		this.skill_1.cooldown = 10000;

	}
	//создание ботов
	createBots(num){
		var botsArea = (this.obj.w/2+10)* num;
		for (var i = 0; i < num; ++i){
			var tmp = new Bot({x:this.obj.x - botsArea/2 + (i)*this.obj.w/2 + num*(i+1) + 17, y:(ship instanceof Blue)?600: -this.obj.h},
				{w: this.obj.w, h: this.obj.h, source: 'img/bot.png'}, i, 'BLUE', 'noname');
			this.bots.push(tmp);
		}
	}

	moveBots(){
		var num = this.bots.length;
		var botsArea = (this.obj.w/2+10)* num; 
		//this is black magic
		for (var i = 0; i < num; ++i){
			this.bots[i].obj.x = this.obj.x - botsArea/2 + (i)*this.obj.w/2 + num*(i+1) + 17;
			if (ship instanceof Blue) {
                if (this.bots[i].obj.y != this.obj.y - this.obj.w - 10) {
                	this.bots[i].obj.y -= 1;
                }
            }
            else{
                if (this.bots[i].obj.y != this.obj.y + this.obj.w + 10) {
                	this.bots[i].obj.y += 1;
                }
			}
		}
	}

	move(direction){
	    if (ship.fraction==this.fraction){
            if (direction =='LEFT') {
                this.obj.x -= this.dx * this.speed;
                if (this.obj.x <= 0){
                    this.obj.x = 0;
                }
                this.moveBots();
            }
            if (direction == 'RIGHT') {
                this.obj.x += this.dx * this.speed;
                var dif = width - this.obj.w;
                if (this.obj.x >= dif){
                    this.obj.x = dif;
                }
                this.moveBots();
            }
            if(direction == 'NONE'){
            this.obj.x = this.obj.x;
            }
        } else{
            if (direction =='LEFT') {
                this.obj.x += this.dx *this.speed;
                var dif = width - this.obj.w;
                if (this.obj.x >= dif){
                    this.obj.x = dif;
                }
                this.moveBots();
            }
            if (direction == 'RIGHT') {
                this.obj.x -= this.dx *this.speed;
                var dif = width - this.obj.w;
                if (this.obj.x <= 0){
                    this.obj.x = 0;
                }
                this.moveBots();
            }
            if(direction == 'NONE'){
                this.obj.x = this.obj.x;
            }
        }
	}

	activateSkill(){
		if (this.bots.length){
			return;
		}
		this.createBots(this.numBots);
	}

	getEnabledBots(){
		let res = 0;
		for (let i = 0; i < this.bots.length; ++i ){
			if (this.bots[i].enabled){
				res ++;
			}
		}
		return res;
	}

	control(){
		super.control();
		if (Date.now() - this.lastTimeCreateBots > 5000 && !this.bots.length ){
			gameInterface.skill_1.switchOn();
			if(key.isPress('Q')){
				messageService.activateSkill(this.name, 0);
				this.activateSkill();
				this.lastTimeCreateBots = Date.now();
				gameInterface.skill_1.switchOff();
			}
		}
	}

	fireBots(){
		if (Date.now() - this.lastTimeBotsFire > 4000) {
        	for (let i = 0; i < this.bots.length; ++i){
        		this.bots[i].shot();
			}
			this.lastTimeBotsFire = Date.now();
		}
		for (var i = 0; i < this.bots.length; ++i) {
			console.log(this.bots[i].bullets);
			for (var j = 0; j < this.bots[i].bullets.length; ++j) {
				let bullet = this.bots[i].bullets[j];
				bullet.move();
				bullet.draw();
				let hit = false;
				for (var k = 0; k < ships.length; ++k) {
				    if (ships[k] instanceof Pink) {
				        if (bullet.obj.isStaticIntersect(ships[k].obj.getStaticBox()) && bullet.enabled) {
				            hit = true;
				            bullet.obj.y = -bullet.obj.h * 100;
				            if (ships[k].immortality == false) {
				                ships[k].getDamage(this.damage);
				                if (ships[k] == ship){
				                	messageService.hit(this.name, ships[k].name, j);
								}
				                break;
				            }
				        }
				    }
				}
				if (bullet.obj.y <= 0 || bullet.obj.y >= fon.w || hit) {
				    bullet.enabled = false;
				}
			}
		}
	}
	
	draw(){
		super.draw();
		let color = (this == ship)?'blue':'white';
		if (ships[0] instanceof Blue){
			this.brush.drawText({
				x: this.obj.x + this.obj.w/2,
				y: this.obj.y - 20,
				text: this.name,
				color: color,
				size: 18,
				align: 'center'
			});
		}
		else {
            this.brush.drawText({
                x: this.obj.x + this.obj.w / 2,
                y: this.obj.y + this.obj.h + 2,
                text: this.name,
                color: color,
                size: 18,
                align: 'center'
            });
        }
	}
}