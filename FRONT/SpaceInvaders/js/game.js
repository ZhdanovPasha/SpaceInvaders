var gameInterface = new Interface(pjs);
gameInterface.initialize(playerName, 100, scores, enemiesCount);
gameInterface.initializeObjects();
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


// надо исправить числовые значения
var addEnemies = function(fraction){
	if(fraction=='pink') {
        for (i = 1; i <= enemiesCount; ++i) {
            var tmp = new Bot({x: i * 75, y: 50}, {w: 80, h: 39, source: 'img/enemyBlue1.png'}, i, 'blue');
            ships.push(tmp);
        }
    }
    else{
        for (i = 1; i <= enemiesCount; ++i) {
            var tmp = new Bot({x: i * 75, y: 50}, {w: 80, h: 39, source: 'img/player.png'}, i, 'pink');
            ships.push(tmp);
        }
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
			if(SpaceInvaders.fraction=='blue') {
                var ship = new Blue({x: beginPosX, y: beginPosY - shipWidth},
                    {w: shipWidth, h: shipHeight, source: 'img/enemyBlue1.png'}, 0, 'blue', 'player');
            }else{
                var ship = new Pink({x: beginPosX, y: beginPosY - shipWidth},
                    {w: shipWidth, h: shipHeight, source: 'img/player.png'}, 0, 'blue', 'player');
			}
			ships[0] = ship;
			enemiesCount = 10;
			addEnemies(SpaceInvaders.fraction);
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
		//условия окончания игры
		if (ships.length == 1 || ships[0].isDead()){
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
		game.startLoop('menu');
	}
});
