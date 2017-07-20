var pjs =  new PointJS('2d', 400, 400);
pjs.system.initFullScreen();

var game = pjs.game;
var mouse = pjs.mouseControl;
var key = pjs.keyControl;
var point = pjs.vector.point;
var width = game.getWH().w;
var height = game.getWH().h;

//init mouse and keyboard
mouse.initMouseControl();
key.initKeyControl();

//initial parametrs
var bulletSpeed = 1;
var shipSpeed = 1;
var shipDX = 10;
var bulletDY = 10;
var shipWidth = 50;
var shipHeight = 50;
var bulletHeroWidth = 27;
var bulletHeroHeight = 64;
var bulletEnemyWidth = 25;
var bulletEnemyHeight = 50;
var beginPosX = width/2 - 25;
var beginPosY = height - 50; 
var bulletsHero = [];
var bulletsEnemies = [];
var enemies = [];
var countHeroBullets = 0;  
var lastHeroFire = Date.now();
var lastEnemiesFire = Date.now();
var lastEnemiesMove = Date.now();
var scores = 0;
var curHP = 100;
var damageEnemyBullet = 50; 
var enemiesCount = 0;
var killScores = 100;
var botsMovingX = 5;
var botsMovingY = 5;

var fon = game.newImageObject({
	position: point(0, 0),
	w: width, h: height,
	file: 'img/terrain.png'
});

var ship = game.newImageObject({
	x: beginPosX ,	y: beginPosY,
	w: shipWidth,	h: shipHeight,
	file: 'img/player.png'
});

var initParameters = function(){
	curHP = 100;
	scores = 0;
	noEnemy = false;
	gameEnd = false;
	for (i = 0; i < bulletsEnemies.length; ++i){
		bulletsEnemies[i].splice(0, bulletsEnemies[i].length)
	}
	bulletsEnemies.splice(0, bulletsEnemies.length);
	bulletsHero.splice(0, bulletsHero.length);
};

var addBulletHero = function(){
	var tmp = game.newImageObject({
		x: ship.x + ((countHeroBullets++)%2)*(ship.w/2), y: ship.y,
		w: bulletHeroWidth, h:bulletHeroHeight,
		file: 'img/bullet.png'
	});
	bulletsHero.push(tmp);
};

var addBulletEnemy = function(number){
	var enemyX = enemies[number].x;
	var enemyY = enemies[number].y;
	var enemyWidth = enemies[number].w;
	var enemyHidth = enemies[number].h;
	var tmp = game.newImageObject({
		positionC : point(enemyX + enemyWidth/2, enemyY + enemyHidth/2) ,
		w: bulletEnemyWidth, h: bulletEnemyHeight,
		file: 'img/bulletEnemy.png'
	});
	bulletsEnemies[number].push(tmp);
}

var fireHero = function(){
	for (i = 0; i < bulletsHero.length; ++i){
		var bullet = bulletsHero[i];
		var hit = false;
		bullet.draw();
		bullet.y -= bulletDY;
		enemies.forEach(function (enemy, j, enemies) {
            if (bullet.isStaticIntersect(enemy.getStaticBox())) {
                hit = true;
                enemies.splice(j, 1);
                scores += killScores;
            }
    	});
		if (bullet.y <= 0 || hit){
			bulletsHero.splice(i, 1);
			i--;
		}
	} 
};

ship.control = function(){
	if (key.isDown('LEFT')){
		ship.x -= shipDX * shipSpeed;
		if (ship.x <= 0){
			ship.x = 0;
		}	
	}
	if (key.isDown('RIGHT')){
		ship.x += shipDX * shipSpeed;
		var dif = width - ship.w;
		if (ship.x >= width - ship.w){
			ship.x = width - ship.w;
		}
	}
	if (key.isDown('SPACE')){
		if (Date.now() - lastHeroFire > 100 * bulletSpeed){
			addBulletHero();
			lastHeroFire = Date.now();
		}
	}
};

// надо исправить числовые значения
var addEnemies = function(){
	for (i = 0; i < enemiesCount; ++i) {
        enemies.push(game.newAnimationObject({
            x: i * 75, y: hpRectVal.h + hpRectVal.y+50, angle: 90,
            w: 80, h: 39,
            animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 78, 80, 39, 4)
        }));
    }
    //initialization bulletEnemies
    for (i = 0; i < enemiesCount; ++i) {
    	bulletsEnemies[i] = [];
    }
};

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var movingEnemies = function(){
	enemies.forEach(function (enemy, i, enemies) {
		enemy.x += getRandomInt(-1 * botsMovingX, botsMovingY);
		enemy.y += getRandomInt(-1 * botsMovingX, botsMovingY);
	});
}

var fireEnemies = function(){
	for (i = 0; i < bulletsEnemies.length; ++i){
		for (j = 0; j < bulletsEnemies[i].length; ++j){
			var hit = false;
			var bullet = bulletsEnemies[i][j];
			bullet.draw();
			bullet.y += bulletDY/2;
			if (bullet.isStaticIntersect(ship.getStaticBox())) {
	                hit = true;
	                curHP -= damageEnemyBullet;
	        }
	        if (bullet.y >= height - bullet.height || hit){
				bulletsEnemies[i].splice(j, 1);
				j--;
			}
		}
	}
};

var noEnemy = false;
var gameEnd = false;

game.newLoop('game', function(){
	game.clear();
	fon.draw();
	if (!gameEnd){
		
		ship.draw();
		ship.control();
		
		if (!noEnemy){
			enemiesCount = 10;
			addEnemies();
			noEnemy = true;
		}
		enemies.forEach(function (enemy, i, enemies) {
		    enemy.draw();
		});
		fireEnemies();
		if (Date.now() - lastEnemiesFire > 2000){
			for (i = 0; i < enemies.length; ++i){
				addBulletEnemy(i);
			}
			//enemiesMoving();
			lastEnemiesFire = Date.now();
		}
		if (Date.now() - lastEnemiesMove > 500){
			movingEnemies();
			lastEnemiesMove = Date.now();
		}
		fireHero();
		if (!enemies.length){
			//game.stop();
			var success = game.newTextObject({
				text: "Вы победили!!Нажмите Enter, чтобы начать заново",
				size: 20, color: "white",
				positionC: point(width/2, height/2)
			});
			success.draw();
			gameEnd = true;
		}
		if (curHP <= 0){
			var lose = game.newTextObject({
				text: "Вы проиграли!!Нажмите Enter, чтобы начать заново",
				size: 20, color: "white",
				positionC: point(width/2, height/2)
			});
			lose.draw();
			gameEnd = true;
		}
	}
	updateInterface(curHP, 100, scores, enemies.length);
	drawInterface();	
	if (gameEnd && key.isPress('ENTER')){
		enemies.splice(0, enemies.length);
		initParameters();
		game.startLoop('game');
	}
});

game.startLoop('game');