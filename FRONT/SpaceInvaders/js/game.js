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
var bulletWidth = 27;
var bulletHeight = 64;
var beginPosX = width/2 - 25;
var beginPosY = height - 50; 
var bullets = [];
var enemies = [];
var countBullets = 0;  
var lastBulletTime = Date.now();

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

var addBullet = function(){
	var tmp = game.newImageObject({
		x: ship.x + ((countBullets++)%2)*(ship.w/2), y: ship.y,
		w: bulletWidth, h:bulletHeight,
		file: 'img/bullet.png'
	});
	bullets.push(tmp);
}

var scores = 0;

var fire = function(){
	for (i = 0; i < bullets.length; ++i){
		var bullet = bullets[i];
		var hit = false;
		bullet.draw();
		bullet.y -= bulletDY;
		enemies.forEach(function (enemy, j, enemies) {
            if (bullet.isStaticIntersect(enemy.getStaticBox())) {
                hit = true;
                enemies.splice(j, 1);
				
				scores += 10;
            }
    	});
		if (bullet.y <= 0 || hit){
			bullets.splice(i, 1);
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
		if (Date.now() - lastBulletTime > 100 * bulletSpeed){
			addBullet();
			lastBulletTime = Date.now();
		}
	}
};

// надо исправить числовые значения
var addEnemies = function(){
	for (i = 0; i < 10; i++) {
        enemies.push(game.newAnimationObject({
            x: i * 50, y: 41, angle: 90,
            w: 80, h: 39,
            animation: pjs.tiles.newImage("img/sprites.png").getAnimation(0, 78, 80, 39, 4)
        }));
    }
};

var noEnemy = false;

var gameInterface = new Interface(pjs);
gameInterface.initialize(100, scores, enemies.length);
gameInterface.initializeObjects();

game.newLoop('game', function(){
	game.clear();

	fon.draw();
	ship.draw();

	ship.control();
	
	if (!noEnemy){
		addEnemies();
		noEnemy = true;
	}
	enemies.forEach(function (enemy, i, enemies) {
    	enemy.draw();
	});
	fire();
	
	gameInterface.update(100, scores, enemies.length);
	gameInterface.draw();
});

game.startLoop('game');