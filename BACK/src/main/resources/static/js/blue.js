class Blue extends Ship{

	constructor(position, img, id, fraction, name){
		super(position, img, id, fraction, name);
		this.obj.setAngle(180);
		this.bots = [];
		this.lastTimeCreateBots = Date.now();
		this.lastTimeBotsFire = Date.now();
		this.brush = pjs.brush;
		
		this.skill_1 = new Object();
		
		this.skill_1.img = "img/bot_skill.png";
		this.skill_1.description = "Призвать ботов";
		this.skill_1.duration = 5000;
		this.skill_1.cooldown = 10000;

        for (let i = 0; i < 4; ++i){
            let botsArea = (this.obj.w/2+10)* 4;
            let tmp = new Bot({x:this.obj.x - botsArea/2 + (i)*this.obj.w/2 + 4*(i+1) + 17, y:(ship instanceof Blue)?600: -this.obj.h},
                {w: this.obj.w, h: this.obj.h, source: 'img/bot.png'}, 0, 'BLUE', 'noname');
            this.bots.push(tmp);
        }
	}
	//создание ботов
	// createBots(num){
	// 	if (this.bots.length)
	// 		return;
	// 	var botsArea = (this.obj.w/2+10)* num;
	// 	for (var i = 0; i < num; ++i){
	// 		var tmp = new Bot({x:this.obj.x - botsArea/2 + (i)*this.obj.w/2 + num*(i+1) + 17, y:(ship instanceof Blue)?600: -this.obj.h},
	// 			{w: this.obj.w, h: this.obj.h, source: 'img/bot.png'}, 0, 'BLUE', 'noname');
	// 		this.bots.push(tmp);
	// 	}
	// }

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
		for (let i = 0; i < this.bots.length; ++i){
			this.bots[i].enabled = true;
            let botsArea = (this.obj.w/2+10)* this.bots.length;
            this.bots[i].obj.x =this.obj.x - botsArea/2 + (i)*this.obj.w/2 + this.bots.length*(i+1) + 17;
            this.bots[i].obj.y =(ship instanceof Blue)?600: -this.obj.h;
            this.bots[i].obj.setVisible(true);
		}
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
	    if((key.isDown('RIGHT'))&&(key.isDown('LEFT'))){
	        messageService.move(this.name, 'NONE');
	    }
		if (key.isDown('LEFT')){
			messageService.move(this.name, 'LEFT');
		}
		if (key.isDown('RIGHT')){
			messageService.move(this.name, 'RIGHT');
		}
		//возможно, что достаточно в ship
		if (key.isDown('SPACE')){
			if (Date.now() - this.lastFire > 100 * this.speed){
				let count = this.shot();
				if(count != -1)
				    messageService.shot(this.name, count);
				    this.lastFire = Date.now();
			}
		}
		let botsNow = this.getEnabledBots();
		if (Date.now() - this.lastTimeCreateBots > 5000 && !botsNow ){
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
		console.log('begin fire bots');
		if (Date.now() - this.lastTimeBotsFire > 4000) {
        	for (let i = 0; i < this.bots.length; ++i){
        		this.bots[i].shot();
			}
			this.lastTimeBotsFire = Date.now();
		}
		console.log('I m inside');
		for (var i = 0; i < this.bots.length; ++i) {
			console.log(this.bots[i].bullets);
			for (var j = 0; j < this.bots[i].bullets.length; ++j) {
				let bullet = this.bots[i].bullets[j];
				bullet.move();
				bullet.draw();
				let hit = false
				for (var k = 0; k < ships.length; ++k) {
				    if (ships[k] instanceof Pink) {
				        if (bullet.obj.isStaticIntersect(ships[k].obj.getStaticBox())) {
				            hit = true;
				            if (ships[k].immortality == false) {
				                ships[k].getDamage(this.damage);
				                //this.scores += this.killScores;

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
		if (ships[0] instanceof Blue){
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