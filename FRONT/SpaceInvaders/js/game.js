var pjs =  new PointJS('2d', 400, 400);
pjs.system.initFullScreen();

var game = pjs.game;
var mouse = pjs.mouseControl;
var key = pjs.keyControl;
var point = pjs.vector.point;
var width = game.getWH().w;
var height = game.getWH().h;

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
var bulletEnemyWidth = 800 ;
var bulletEnemyHeight = 600 ;
var beginPosX = width/2 - 25;
var beginPosY = height - 50; 
var bulletsHero = [];
var bulletsEnemies = [];
var enemies = [];
var countHeroBullets = 0;  
var lastHeroFire = Date.now();
var lastEnemiesFire = Date.now();
var lastEnemiesMove = Date.now();
var scores = 1000;
var curHP = 100;
var enemiesCount;

var fon = game.newImageObject({
	position: point(0, 0),
	w: width, h: height,
	file: 'img/terrain.png'
});

var ship = game.newImageObject({
	x: beginPosX ,	y: beginPosY,
	w: shipWidth,	h: shipHeight,
	file: 'img/player.png'
})

var addBulletHero = function(){
	var tmp = game.newImageObject({
		x: ship.x + ((countHeroBullets++)%2)*(ship.w/2), y: ship.y,
		w: bulletHeroWidth, h:bulletHeroHeight,
		file: 'img/bullet.png'
	});
	bulletsHero.push(tmp);
}

var addBulletEnemy = function(number){
	var enemyX = enemies[number].x;
	var enemyY = enemies[number].y;
	var tmp = game.newImageObject({
		x: enemyX, y: enemyY,
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
                scores += 100;
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

var enemiesMoving = function(){
	enemies.forEach(function (enemy, i, enemies) {
		enemy.x += getRandomInt(-5, 5);
		enemy.y += getRandomInt(-1, 1);
	});
}

var enemiesFire = function(){
	for (i = 0; i < bulletsEnemies.length; ++i){
		for (j = 0; j < bulletsEnemies[i].length; ++j){
			var hit = false;
			var bullet = bulletsEnemies[i][j];
			bullet.draw();
			bullet.y += bulletDY;
			if (bullet.isStaticIntersect(ship.getStaticBox())) {
	                hit = true;
	                curHP -= 5;
	        }
	        if (bullet.y >= height - bullet.height || hit){
				bulletsEnemies[i].splice(j, 1);
				j--;
			}
		}
	}
	// bulletsEnemies.forEach(function (enemy, i, bulletsEnemies){
	// 	bulletsEnemies.forEach(function (bullet, j, enemy){
	// 		var hit = false;
	// 		bullet.draw();
	// 		bullet.y += bulletDY;
	// 		if (bullet.isStaticIntersect(ship.getStaticBox())) {
	//                 hit = true;
	//                 hp -= 5;
	//         }
	//         if (bullet.y >= height - bullet.height || hit){
	// 			bullet.splice(j, 1);
	// 		}
	// 	});
	// });
};

var noEnemy = false;
game.newLoop('game', function(){
	game.clear();

	fon.draw();
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
	if (Date.now() - lastEnemiesMove > 300){
		enemiesMoving();
		enemiesFire();
		lastEnemiesMove = Date.now();
	}
	if (Date.now() - lastEnemiesFire > 500){
		for (i = 0; i < enemies.length; ++i){
			addBulletEnemy(i);
		}
		lastEnemiesFire = Date.now();
	}
	fireHero();
	updateInterface(curHP, 100, scores, enemies.length);
	drawInterface();
});

game.startLoop('game');