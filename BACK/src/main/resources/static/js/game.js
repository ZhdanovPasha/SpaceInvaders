var game = pjs.game;
var mouse = pjs.mouseControl;
var key = pjs.keyControl;
var point = pjs.vector.point;
var width = game.getWH().w;
var height = game.getWH().h;

//initial parametrs
var shipWidth = 50;
var shipHeight = 50;
var enemies = [];
var scores = 0;
var noEnemy = false;
var gameEnd = false;
var ships = [];
var ship = null;
var gameInterface = new Interface(pjs);


var initParameters = function(){
	noEnemy = false;
	gameEnd = false;
	ships.splice(0, ships.length);
	ship = null;
}

var messageService = new MessageService2(ships,game);

window.onbeforeunload = function() {
    return messageService.disconnect();
};

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

function numEnemies(){
    let res = 0;
    for(i=0; i<ships.length;i++){
        if(ship.fraction != ships[i].fraction)
            res++;
    }
    return res;
}

function checkEnemiesIsDead(){
    for(i=0; i<ships.length;i++){
        if(ship.fraction != ships[i].fraction)
        return false;
    }
    return true;
}

function checkFriendsIsDead(){
    for(i=0; i<ships.length;i++){
        if(ship.fraction == ships[i].fraction)
        return false;
    }
    return true;
}

game.newLoopFromConstructor('game', function(){
    this.entry=function(){
        camera.move(point(SpaceInvaders.mapWidth/2-SpaceInvaders.width/2, 0));
        SpaceInvaders.BGPosition = -(SpaceInvaders.mapWidth/2-SpaceInvaders.width/2);
        pjs.system.setStyle({
            backgroundPositionX: SpaceInvaders.BGPosition + 'px'
        });
    };
    this.update=function(){
	game.clear();
	if (!gameEnd) {
	    backSound.replay();
        for (i = 0; i < ships.length; ++i) {
            ships[i].draw();
            if (ships[i] instanceof Blue){
                ships[i].moveBots();
                for (j = 0; j < ships[i].bots.length; j++){
                    ships[i].bots[j].draw();
                }
            }
        }
        if(!ship.isDead())
            ship.control();
        for(let i = 0; i < ships.length; ++i){
            if(ships[i] instanceof Pink){
                ships[i].check();
            }
        }
        for (i = 0; i < ships.length; ++i) {
            ships[i].fire();
            if (ships[i] instanceof Blue){
                ships[i].fireBots();
            }
        }
        if (checkEnemiesIsDead() || checkFriendsIsDead()) {
            messageService.destroy(ship.name);
            for(let i=0; i<ships.length; ++i){
                let tmp = new Object();
                tmp.scores = ships[i].scores;
                tmp.name = ships[i].name;
                players.push(tmp);
            }
            gameEnd = true;
            messageService.getLastChangesForScores();
        }
    }
    gameInterface.update(ship.currentHP, ship.scores, numEnemies() );
    gameInterface.draw();

	if (gameEnd && key.isPress('ENTER')){
	    messageService.leaveServer();
		console.log(gameEnd);
		initParameters();
		game.startLoop('battle_result');
	
	}
};
});
