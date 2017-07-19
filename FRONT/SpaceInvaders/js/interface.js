var currHP = 100;
var maxHP = 100;
var currMP = 100;
var maxMP = 100;
var scores = 1000;
var alive = 10;

var width = game.getWH().w;
var height = game.getWH().h;

var point = pjs.vector.point;

var rectValWidth = 0.2 * width;
var rectValHeight;

var hpText = game.newTextObject({
	text: 'HP',
	x: 10,
	y: 10,
	color: 'white',
	size: 0.03 * height
	});
	
var hpRectStroke = game.newRectObject({
	x: hpText.x + hpText.w + 5,
	y: hpText.y - 5,
	w: rectValWidth,
	h: 0.052 * height,
	fillColor: 'black',
	strokeColor: '#FFFFFF',
	strokeWidth: 2
});

var hpRectVal = game.newRectObject({
	x: hpText.x + hpText.w + 7,
	y: hpText.y - 3,
	w: hpRectStroke.w - 2,
	h: hpRectStroke.h - 2,
	fillColor: 'red'
});

var hpVal = game.newTextObject({
		text: '100/100',
		//x: hpRectVal.x + hpRectVal.w / 2,
		positionC: point(hpRectVal.x + hpRectVal.w / 2, hpRectVal.y + hpRectVal.h / 2),
		//y: hpRectVal.y + hpRectVal.h / 2,
		color: 'white',
		size: 0.03 * height
});

var drawHP = function(){
	hpText.draw();
	hpRectStroke.draw();
	hpRectVal.draw();
	hpVal.draw();
};

var scoresText = game.newTextObject({
	text: 'ОЧКИ: 1000',
	x: hpRectStroke.x + hpRectStroke.w + 10,
	y: hpText.y,
	color: 'white',
	size: 0.03 * height
});

var incrScores = function(incr){
	scores += incr;
};

var drawScores = function(){
	scoresText.draw();
};

var aliveText = game.newTextObject({
	text: 'ВРАГОВ: 100',
	x: scoresText.x + scoresText.w + 10,
	y: scoresText.y,
	color: 'white',
	size: 0.03 * height
});

var incrAlive= function(incr){
	scores += incr;
};

var drawAlive = function(){
	aliveText.draw();
};

var skill_2 = game.newRectObject({
	positionC: point(game.getWH().w2, height - 30),
	w: 50,
	h: 50,
	fillColor: 'black'
});

var skill_1 = game.newRectObject({
	position: point(skill_2.x - 60, skill_2.y),
	w: 50,
	h: 50,
	fillColor: 'black'
});

var skill_3 = game.newRectObject({
	position: point(skill_2.x + 60, skill_2.y),
	w: 50,
	h: 50,
	fillColor: 'black'
});

var drawInterface = function(){
	drawHP();
	drawScores();
	drawAlive();
	skill_1.draw();
	skill_2.draw();
	skill_3.draw();
};

var updateInterface = function(cHP, cMP, sc, al){
	currHP = cHP;
	currMP = cMP;
	alive = al;
	scores = sc;
	
	hpRectVal.w = (rectValWidth - 2) * currHP / maxHP;
	hpVal.text = currHP + '/' + maxHP;
	
	scoresText.text = 'ОЧКИ: ' + scores;
	
	aliveText.text = 'ВРАГОВ: ' + alive;
};