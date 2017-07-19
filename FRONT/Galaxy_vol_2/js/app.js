var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();


var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1050;
canvas.height = 540;
document.body.appendChild(canvas);

var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
};

function init() {
    terrainPattern = ctx.createPattern(resources.get('img/terrain.png'), 'repeat');

    document.getElementById('play-again').addEventListener('click', function() {
        var start = document.getElementById('start').pause();
    	reset();
    });
    document.getElementById('game-start').addEventListener('click', function(){
    	isGameStart = true;
    	var start = document.getElementById('start').pause();
    	reset();
    });
    //reset();
    gameStart();
    lastTime = Date.now();
    main();
}

resources.load([
    'img/sprites.png',
    'img/terrain.png',
    'img/111.png',
    'img/projectile_bolt_blue_single.png',
    'img/player.png'
]);
resources.onReady(init);


var player = {
    pos: [0, 0],
   
    //горизонтально
    //sprite: new Sprite('img/sprites.png', [0, 0], [39, 39], 16, [0, 1])
   
    //вертикально
    sprite: new Sprite('img/player.png', [0, 0], [99, 75])
};

var bullets = [];
var enemies = [];
var waves = 1;
var enemiesInWaves = 3;
var explosions = [];

var lastFire = Date.now();
var gameTime = 0;
var isGameOver;
var isGameStart = false;
var terrainPattern;

var score = 0;
var scoreEl = document.getElementById('score');
var enemiesCount = document.getElementById('enemiesCount');
var wavesCount = document.getElementById('waves');
var lives = 1;
var livesInHtml = document.getElementById('lives');
var hurt = false;
var final = document.getElementById('final');
// Скорость
var playerSpeed = 200;
var bulletSpeed = 500;
var enemySpeed = 50;

// Обновление объектов
function update(dt) {
   if(isGameStart){
    gameTime += dt;

    handleInput(dt);
    updateEntities(dt);

    
    if((Math.random() < 1 - Math.pow(.993, gameTime))&&(enemies.length<=enemiesInWaves-1)) {
        enemies.push({
            pos: [ Math.random() * (canvas.width - 80),
                  -80],
            sprite: new Sprite('img/111.png', [78, 192], [39, 80],
                               6, [0, 1, 2, 3, 2, 1],'vertical')
      //  sprite: new Sprite('img/strip_bug_eye.png', [34, 30], [59, 75],
                              // 6)

        });
    }

    checkCollisions();

    scoreEl.innerHTML = "Счёт "+score;
    enemiesCount.innerHTML = "Врагов "+enemiesInWaves;
    wavesCount.innerHTML = "Волна "+ waves;
   


    livesInHtml.innerHTML = "Жизней "+ lives;


    if(enemiesInWaves==0)
    	{
    		waves++;
    		enemiesInWaves = 3*waves;
    	}}
};

function handleInput(dt) {
    if(input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
    }

    if(input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
    }

    if(input.isDown('SPACE') &&
       !isGameOver &&
       Date.now() - lastFire > 100) {
        var x = player.pos[0] + 4 + player.sprite.size[0] / 3;
        var y = player.pos[1] + player.sprite.size[1] / 2;

       // bullets.push({ pos: [x, y],
         //              dir: 'forward',
           //            sprite: new Sprite('img/sprites.png', [0, 39], [18, 8]) });
        bullets.push({ pos: [x, y],
                       dir: 'up',
                       sprite: new Sprite('img/projectile_bolt_blue_single.png', [0, 0], [27, 64]) });
       // bullets.push({ pos: [x, y],
         //              dir: 'left',
           //            sprite: new Sprite('img/sprites.png', [0, 60], [9, 5]) });
           onAudio('music/1.mp3');
        lastFire = Date.now();
    }
}

function updateEntities(dt) {
    // Обновление анимации игрока
    player.sprite.update(dt);

    // Обновление пуль
    for(var i=0; i<bullets.length; i++) {
        var bullet = bullets[i];

        switch(bullet.dir) {
        case 'up': bullet.pos[1] -= bulletSpeed * dt; break;
        case 'left': bullet.pos[0] -= bulletSpeed * dt; break;
        default:
            bullet.pos[0] += bulletSpeed * dt;
        }

        // Удаление пуль, когда они уходят за экран
        if(bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
           bullet.pos[0] > canvas.width) {
            bullets.splice(i, 1);
            i--;
        }
    }

    // Обновление всех врагов
    for(var i=0; i<enemies.length; i++) {
        enemies[i].pos[1] += enemySpeed * dt;
        enemies[i].sprite.update(dt);

        // Удаление врагов, когда они выходят за рамки экрана
        if(enemies[i].pos[1] + enemies[i].sprite.size[1] > 540) {
            enemies.splice(i, 1);
            i--;
        }


    }

    // Обновление взрыва
    for(var i=0; i<explosions.length; i++) {
        explosions[i].sprite.update(dt);

        //удаление взрыва
        if(explosions[i].sprite.done) {
            explosions.splice(i, 1);
            i--;
        }
    }
}



function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
    checkPlayerBounds();
    
    // Встреча врага и пули)
    for(var i=0; i<enemies.length; i++) {
        var pos = enemies[i].pos;
        var size = enemies[i].sprite.size;

        for(var j=0; j<bullets.length; j++) {
            var pos2 = bullets[j].pos;
            var size2 = bullets[j].sprite.size;

            if(boxCollides(pos, size, pos2, size2)) {
                // Удаление врага
                enemies.splice(i, 1);
                i--;

                // Награда поднимается)
                score += 100;
                enemiesInWaves--;
                // Добавление взрыва
                explosions.push({
                    pos: pos,
                    sprite: new Sprite('img/sprites.png',
                                       [0, 117],
                                       [39, 39],
                                       16,
                                       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                       null,
                                       true)
                });
                onAudio('music/exp.mp3');
                // Удаление пули, которая взорвала врага)
                bullets.splice(j, 1);
                break;
            }
        }

        if(boxCollides(pos, size, player.pos, player.sprite.size)) {
            
            if(lives==1){
            gameOver();

        }
        	else 
        		if(lives>1){
        			player.pos = [canvas.width / 2, 1000];
        		lives--;
        		onAudio('music/hurt.ogg');
        	}
            
        }
        
    }

    

}

function checkPlayerBounds() {
    
    if(player.pos[0] < 0) {
        player.pos[0] = 0;
    }
    else if(player.pos[0] > canvas.width - player.sprite.size[0]) {
        player.pos[0] = canvas.width - player.sprite.size[0];
    }

    if(player.pos[1] < 0) {
        player.pos[1] = 0;
    }
    else if(player.pos[1] > canvas.height - player.sprite.size[1]) {
        player.pos[1] = canvas.height - player.sprite.size[1];
    }
}

// Полная прорисовка
function render() {
    ctx.fillStyle = terrainPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    if(isGameStart){
    if(!isGameOver) {
        renderEntity(player);
    }
}
    renderEntities(bullets);
    renderEntities(enemies);
    renderEntities(explosions);
};

function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }    
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

// Игра окончена
function gameOver() {
	lives--;
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    var start = document.getElementById('start').play();
    isGameOver = true;
    isGameStart = false;
    final.innerHTML = "Ваш счет "+score;
    
}

function gameStart(){
	document.getElementById('game-start').style.display = 'block';
	document.getElementById('game-over-overlay').style.display = 'block';
    
}

function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-start').style.display = 'none';
	
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;
    isGameStart = true;
    gameTime = 0;
    score = 0;
    lives = 3;
    waves = 1;

    enemies = [];
    bullets = [];

    player.pos = [canvas.width / 2, 1000];

    enemiesInWaves = 3*waves;
};

function onAudio(url){
var name = new Audio();
name.src=url;
name.autoplay = true;
}