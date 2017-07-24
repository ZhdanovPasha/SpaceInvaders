//initial parametrs
//пока здесь, потом надо вынести в отдельный файл
var shipDX = 10;
var scores = 100;
var bulletDY = 10;
var beginPosX = width/2 - 25;
var beginPosY = height - 50;
var shipWidth = 50;
var shipHeight = 50;
var bulletHeroWidth = 27;
var bulletHeroHeight = 64;
var playerName = "Kal";
var enemiesCount = 0;
var noEnemy = false;
var gameEnd = false;
var ships = [];

var gameInterface = new Interface(pjs);
gameInterface.initialize(playerName, 100, scores, enemiesCount);
gameInterface.initializeObjects();

var fon = game.newImageObject({
    position: point(0, 0),
    w: width, h: height,
    file: 'img/terrain.png'
});

var initParameters = function(){
	init = false;
	gameEnd = false;
	ships.splice(0, ships.length);
}

// надо исправить числовые значения
var addEnemies = function(){
    for (i = 1; i <= enemiesCount; ++i){
    	var tmp  = new Ship({x:i*75, y:50},	 {w: 80, h: 39, source: 'img/player.png'}, i, 'pink'); 
    	ships.push(tmp);
    }
};

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

game.newLoop('game', function(){
	game.clear();
	fon.draw();
	if (!gameEnd){
		
		if (!init){
			ship = new Ship({x:beginPosX, y:beginPosY-shipWidth},
			 {w: shipWidth,	h: shipHeight, source: 'img/player.png'}, 0, 'blue');
			ships[0] = ship;
			enemiesCount = 10;
			addEnemies();
			init = true;
		}

		for (i = 0; i < ships.length; ++i){
			ships[i].draw();
		}
		ships[0].control();
		for (i = 0; i < ships.length; ++i)
			ships[i].fire();
		for (i = 1 ; i < ships.length; ++i){
			if (Date.now() - ships[i].lastFire > 2000){
				var bul = {position:{x:ships[i].obj.x + (ships[i].obj.w)/2,y:ships[i].obj.y + (ships[i].obj.h)/2},
					img:{width:ships[i].bulletWidth, height: ships[i].bulletHeight, source:
					'img/bullet.png'}, speed:1, damage: 50, dy: -5 };				
				ships[i].addBullet(bul);
				ships[i].lastFire = Date.now();
			}
			if (Date.now() - ships[i].lastMove > 500){
				ships[i].move();
				ships[i].lastMove = Date.now();
			}
			if (ships[i].isDead()){
				ships.splice(i,1);
				i--;
			}
		}
		if (ships.length == 1 || ships[0].isDead()){
			gameEnd = true;
		}
	}
	
	gameInterface.update(ships[0].currentHP, ships[0].scores, ships.length - 1);
	gameInterface.draw();

	if (gameEnd && key.isPress('ENTER')){
		console.log(gameEnd);
		initParameters();
		game.startLoop('menu');
	
	}
});
