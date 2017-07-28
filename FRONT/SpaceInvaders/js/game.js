
//инициализация фона
var fon = game.newImageObject({
    position: point(0, 0),
    w: width, h: height,
    file: 'img/terrain.png'
});
//инициализация параметров перед каждым игровым циклом
var initParameters = function(){
	init = false;
	gameEnd = false;
	ships.splice(0, ships.length);
}

var gameInterface = new Interface(pjs);
var backSound = audio.newAudio('audio/start.mp3', 0.1);

//временно
var addEnemies = function(){
    var enemyFraction, enemyImage;
    if (playerFraction == 'blue'){
    	enemyFraction = 'pink';
    	enemyImage = pinkPlayer;
    }
    else {
    	enemyFraction = 'blue';
    	enemyImage = bluePlayer;
    }
    for (i = 1; i <= enemiesCount; ++i){
    	var tmp  = new Bot({x:i*75, y:50},	 {w: 80, h: 39, source: enemyImage}, i, enemyFraction ); 
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
		//инициализация в начале раунда
		if (!init){
			backSound.replay();
			var ship = null;
			if (playerFraction == 'blue'){
				ship = new Blue({x:beginPosX, y:beginPosY-shipWidth},
				{w: shipWidth,	h: shipHeight, source: bluePlayer}, 0, 'blue', playerName);
			}
			else {
				ship = new Pink({x:beginPosX, y:beginPosY-shipWidth},
				{w: shipWidth,	h: shipHeight, source: pinkPlayer}, 0, 'pink', playerName);	
			}
			ships[0] = ship;
			enemiesCount = 10;
			addEnemies();
			init = true;
			gameInterface.initialize(ships[0], 100, scores, ships.length);
			gameInterface.initializeObjects();
		}
		//отрисовка кораблей
		for (i = 0; i < ships.length; ++i){
			ships[i].draw();
			if (ships[i] instanceof Blue){
				for (var j = 0; j < ships[i].bots.length; ++j){
					ships[i].bots[j].draw();
				}
			}
		}
		//упраеление кораблем игрока
		ships[0].control();
		if (ships[0] instanceof Blue){
			ships[0].moveBots();
		}
		//огонь всех кораблей
		for (i = 0; i < ships.length; ++i){
			ships[i].fire();
			if (ships[i] instanceof Blue){
				for (var j = 0; j < ships[i].bots.length; ++j){
					ships[i].addBulletsForBots();
					ships[i].fireBots();
				}
			}
		}
		//проверка чтобы закончить действие скилов
		for (i = 0; i < ships.length; ++i){
			if (ships[i] instanceof Pink){
				ships[i].check();
			}
		}
		//временно
		//цикл для перемещения и стрельбы ботов
		for (i = 1 ; i < ships.length; ++i){
			if (Date.now() - ships[i].lastFire > 2000){
				var bulletImg;
 				if (ships[i].fraction == 'blue'){
 					bulletImg = blueBullet;
 				}
 				else {
 					bulletImg = pinkBullet;
 				}
				var bul = {position:{x:ships[i].obj.x + (ships[i].obj.w)/2,y:ships[i].obj.y + (ships[i].obj.h)/2},
					img:{width:ships[i].bulletWidth, height: ships[i].bulletHeight, source:
					bulletImg}, speed:1, damage: 50, dy: -5 };				
				ships[i].addBullet(bul);
				ships[i].lastFire = Date.now();
			}
			if (Date.now() - ships[i].lastMove > 500){
				ships[i].move();
				ships[i].lastMove = Date.now();
			}
			if (ships[i].isDead()){
				let tmp = new Object();
				tmp.scores = ships[i].scores;
				tmp.name = ships[i].name;
				players.push(tmp);
				
				ships.splice(i,1);
				i--;
			}
		}
		
		//условия окончания игры
		if (ships.length == 1 || ships[0].isDead()){
			for(var i = 0; i < ships.length; ++i){
				var tmp = new Object();
				tmp.scores = ships[i].scores;
				tmp.name = ships[i].name;
				players.push(tmp);
			}
			gameEnd = true;
		}
	}
	//отрисовка деталей интерфейса
	gameInterface.update(ships[0].currentHP, ships[0].scores, ships.length - 1);
	gameInterface.draw();
	//переход в главное меню
	if (gameEnd && key.isPress('ENTER')){
		console.log(gameEnd);
		initParameters();
		game.startLoop('battle_result');
		//game.startLoop('menu');
	}
});
