let tableIsInit = false;
let rows = [];

var sortPlayers = function(){
	let len = players.length;
	for(var i=0; i < len - 1; ++i)
		for(var j = i + 1; j < len; ++j)
			if(players[j].scores > players[i].scores){
				var tmp = players[i];
				players[i] = players[j];
				players[j] = tmp;
			}
	return players;
}

var initTable = function(){
	for(var i = 0; i < players.length; ++i){
		var tmp = game.newMesh({
			x: 150,
			y: (i + 1)*30,
			add: [game.newRectObject({
				w: 300,
				h: 30,
				fillColor: (i % 2 == 0)?'white':'#918f8f',
				strokeColor: 'black',
				strokeWidth: 2,
				alpha: 0.8,
			}),game.newTextObject({
				positionC: point(150, 15),
				text: "ИИИИМММММЯЯЯЯЯ",//players[i].name,
				color: 'black',
				size: 20
			}), game.newRectObject({
				x: 300,
				w: 100,
				h: 30,
				fillColor: (i % 2 == 0)?'white':'#918f8f',
				strokeColor: 'black',
				strokeWidth: 2,
				alpha: 0.8,
			}),game.newTextObject({
				positionC: point(350, 15),
				text: "ОЧКИ 100",//players[i].scores,
				color: 'black',
				size: 20
			})]
		});
		var objects = tmp.getObjects();
		objects[1].text = players[i].name;
		objects[3].text = players[i].scores;
		rows.push(tmp);
	}

}

var drawTable = function(){
	for (var i=0; i < players.length; ++i){
		rows[i].draw();
	}
}

game.newLoop('battle_result',function(){
	if(!tableIsInit){
		sortPlayers();
		tableIsInit = true;
		initTable();
	}
	game.clear();
	fon.draw();
	drawTable();
	pjs.brush.drawText({
		x: 300,
		y: rows[rows.length-1].y + 50,
		text: 'Для продолжения нажмите Enter',
		color: 'white',
		size: 18,
		align: 'center'
	});
	if(key.isPress('ENTER')){
		players.splice(0, players.length);
		rows.splice(0, rows.length);
		tableIsInit = false;
        key.setInputMode(true);
		game.startLoop('menu');
	}
});