class Player{	
	constructor(){
		this.id = 0;
		this.name = "no name";
		this.scores = 0;
	}
	
	//Увеличить количество очков игрока
	incrScores(incr){
		this.scores += incr;
	}
}