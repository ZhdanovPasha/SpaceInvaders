var pjs = new PointJS('2d', 700, 600);
//pjs.system.initFullScreen();

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
//пока здесь, потом надо вынести в отдельный файл
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
var beginPosX = width/2 - shipWidth/2;
var beginPosY = height - shipHeight;
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
var noEnemy = false;
var gameEnd = false;
var ships = [];
var ship = null;
var gameInterface = new Interface(pjs);

var fon = game.newImageObject({
    position: point(0, 0),
    w: width, h: height,
    file: 'img/terrain.png'
});

var initParameters = function(){
	noEnemy = false;
	gameEnd = false;
	ships.splice(0, ships.length);
	ship = null;
}
var messageService = new MessageService2(ships,game);
var playerName = name;

// надо исправить числовые значения
//var addEnemies = function(){
//    for (i = 1; i <= enemiesCount; ++i){
 //   	var tmp  = new Ship({x:i*75, y:50},	 {w: 80, h: 39, source: 'img/player.png'}, i, 'PINK');
  //  	ships.push(tmp);
 //   }
//};
function newEnemyShip(name,x0){
    if (ship.fraction === 'BLUE'){
        var pink = new Pink({x:x0, y:70},{w: shipWidth, h: shipHeight, source: 'img/pinkPlayer.png'}, ships.length +1, 'PINK', name);
        pink.obj.setAngle(alpha);
        return pink;
    }
    else{
        var blue = new Blue({x:x0, y:70},{w: shipWidth, h: shipHeight, source: 'img/bluePlayer.png'}, ships.length +1, 'BLUE', name);
        blue.obj.setAngle(0);
        console.log('create blue enemy');
        return blue;
    }
}

function newAllyShip(name,x,y) {
    if (ship.fraction === 'BLUE'){
        return new Blue({x:x, y:y},{w: shipWidth, h: shipHeight, source: 'img/bluePlayer.png'}, ships.length +1, 'BLUE', name);
    }
    else {
        return new Pink({x:x, y:y},{w: shipWidth, h: shipHeight, source: 'img/pinkPlayer.png'}, ships.length +1, 'PINK', name);
    }
}

function createShip(name,fraction,x0,y0,speed) {
	if (ship===null) {
        if (fraction === 'BLUE'){
            ship = new Blue({x:x0, y:y0},{w: shipWidth, h: shipHeight, source: 'img/bluePlayer.png'}, ships.length +1, fraction, name);
        }
        else {
            ship = new Pink({x:x0, y:y0},{w: shipWidth, h: shipHeight, source: 'img/pinkPlayer.png'}, ships.length +1, fraction, name);
        }
        ships.push(ship);
        gameInterface.initialize(ship, 100, scores, enemies.length);
        gameInterface.initializeObjects();
        console.log(ships);
    } else  if (ship.fraction != fraction) {
	    ships.push(newEnemyShip(name,x0));
    } else {
	    ships.push(newAllyShip(name,x0,y0));
    }
}
function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function checkEnemiesIsDead(){
    for(i=1; i<ships.length;i++){
        if(ship.fraction != ships[i].fraction)
        return false;

    }return true;
}

game.newLoop('game', function(){
	game.clear();
	fon.draw();
	if (!gameEnd) {
        for (i = 0; i < ships.length; ++i) {
            ships[i].draw();
        }
        ships[0].control();
        for (i = 0; i < ships.length; ++i)
        	ships[i].fire();

        //for (i = 1 ; i < ships.length; ++i){
        //	if (Date.now() - ships[i].lastFire > 2000){
        //		var bul = {position:{x:ships[i].obj.x + (ships[i].obj.w)/2,y:ships[i].obj.y + (ships[i].obj.h)/2},
        //			img:{width:ships[i].bulletWidth, height: ships[i].bulletHeight, source:
        //		'img/bullet.png'}, speed:1, damage: 50, dy: -5 };

        //		ships[i].addBullet(bul);
        //		ships[i].lastFire = Date.now();
        //	}
        //if (Date.now() - ships[i].lastMove > 500){
        //	ships[i].move();
        //	ships[i].lastMove = Date.now();
        //	}
        //	if (ships[i].isDead()){
        //		ships.splice(i,1);
        //		i--;checkEnemiesIsDead()
        //	}
        if (checkEnemiesIsDead()|| ships[0].isDead()) {
            messageService.destroy(ship.name);
            for(let i=0; i<ships.length; ++i){
                let tmp = new Object();
                tmp.scores = ships[i].scores;
                tmp.name = ships[i].name;
                players.push(tmp);
            }
            gameEnd = true;

            messageService.stompClient.subscribe('/game/process/'+messageService.gameId,(function (change) {
                let arr = JSON.parse(change.body);
                if (arr.type === 'STATE') {
                    let sh = arr.ships;
                    for (let j = 0; j < sh.length; j++) {
                        for(let i = 0; i < players.length; ++i){
                            if(sh[j].name == players[i].name){
                                if(sh[j].scores != players[i].scores)
                                    players[i].scores = sh[j].scores;
                            }
                        }
                    }
                }
            }).bind(this));
            }
    }
    gameInterface.update(ship.currentHP, ship.scores,checkEnemiesIsDead() );
    gameInterface.draw();

	if (gameEnd && key.isPress('ENTER')){
	    messageService.leaveServer();
		console.log(gameEnd);
		initParameters();
		game.startLoop('battle_result');
	
	}
	// for (i = 1; i<ships.length; ++i){
	// 	if (ships[i].isDead()){
	// 		ships.splice(i,1);
	// 		i--;
	// 	}
	// }
});
