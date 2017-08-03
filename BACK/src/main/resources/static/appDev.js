

class MessageService2 {




    constructor(ships,game){
        this.stompClient = null;
        this.subscription = null;
        this.game = game;
        this.ships = ships;
        this.name = null;
        this.side = null;
        this.connected = false;
        this.gameId = 0;
        this.isStart = false;
        this.userSubscription = null;
        this.isEnteredToLobby =false;
    }
    connect() {
        if(this.stompClient===null){
            this.socket = new SockJS('/game');
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect({},function (frame) {
                this.userSubscription = this.stompClient.subscribe("/user/queue/private", function (change) {
                    let mes = JSON.parse(change.body);
                    if (mes.type==="IS_CHOOSEN_SIDE") {
                        if (mes.check){
                            this.setReady();
                            this.callback(true);
                        }
                        else {
                        alert('Мест в данной фракции нет');
                        }
                    } else  if (mes.type = "IS_JOIN_TO_LOBBY") {
                        if (mes.check) {
                            this.isEnteredToLobby = true;
                            this.subscribeLobby();
                            this.chooseSide();
                        } else  {
                            ++this.gameId;
                            this.joinLobby()
                        }

                    }
                }.bind(this))
            }.bind(this));
            console.log(this.stompClient);

        }}

    tryToconnect(name,side) {
        if ((name == this.name) && this.connected){
            this.side = side;
            setTimeout((function () {
                this.chooseSide();
            }).bind(this) ,300);
        } else
        if (name.length > 0)
            $.ajax({
                url: '/devlogin/' + name,
                context:this,
                success: function (data) {
                    if (data) {
                        this.name = name;
                        this.side = side;
                        this.connected = true;
                        this.joinServer();
                        setTimeout((function () {
                            this.joinLobby();
                        }).bind(this) ,200);

                    }


                    else{ alert('Игрок с таким именем уже существует');

                    }
                }
            });
    }



    startGame() {
        this.subscription.unsubscribe();
        this.subscription = this.stompClient.subscribe('/game/process/'+this.gameId,(function (change) {
            let arr = JSON.parse(change.body);
            if (arr.type === 'STATE') {
                let sh = arr.ships;
                for (let j = 0; j < sh.length; j++) {
                    for (let k = 0; k < ships.length; k++) {
                        if (sh[j].name === ships[k].name) {
                            ships[k].moveBullets(sh[j].bullets);
                            ships[k].moveTo(sh[j].x);
                            ships[k].scores = sh[j].scores;

                            if(sh[j].fraction == 'PINK' && ships[k] != ship){

                                if(sh[j].speed != 10){
                                    ships[k].activateSkill_2();
                                }
                                else
                                    ships[k].deactivateSkill_2();

                                if(sh[j].immortality == true){
                                    ships[k].activateSkill_3();
                                }
                                else
                                    ships[k].deactivateSkill_3();
                            }

                            if (sh[j].dead) {
                                var tmp = new Object();
                                tmp.scores = ships[k].scores;

                                tmp.name = ships[k].name;
                                players.push(tmp);
                                ships.splice(k,1);
                            }

                        }

                    }
                }
            }
            for(let i=0;i<arr.length;i++) {

                if (arr[i].type === 'SHOT') {
                    for (let j = 1; j < this.ships.length;j++) {
                        if (arr[i].name === this.ships[j].name ) {
                            this.ships[j].shot();
                        }
                    }
                } else if (arr[i].type === 'MOVE') {
                    for (let j = 0; j < this.ships.length;j++) {
                        if (arr[i].name === this.ships[j].name ) {
                            this.ships[j].move(arr[i].direction)
                        }
                    }
                } else if (arr[i].type === 'HITTING') {

                } else if (arr[i].type === 'CREATESHIP') {

                } else if (arr[i].type === 'DESTROYSHIP') {

                } else if (arr[i].type === 'STOPGAME') {

                }

            }


        }).bind(this));


    }
    move(name,direction){
        this.stompClient.send("/processDev/"+this.gameId+"/addMoveMessage",{},JSON.stringify({
            'name':name,
            'direction':direction
        }));
    }

    hit(name,nameHit,numBullet) {
        this.stompClient.send("/processDev/"+this.gameId+"/addHitMessage",{},JSON.stringify({
            'name':name,
            'nameHit':nameHit,
            'numBullet':numBullet
        }));
    }
    shot(name,k) {
        this.stompClient.send("/processDev/"+this.gameId+"/addShotMessage",{},JSON.stringify({
            'name':name,
            'numBullet' : k
        }));
    }

    activateSkill(name, num){
        this.stompClient.send("/processDev/"+this.gameId+"/addActivateSkillMessage",{},JSON.stringify({
            'name':name,
            'num' : num
        }));
    }

    deactivateSkill(name, num){
        this.stompClient.send("/processDev/"+this.gameId+"/addDeactivateSkillMessage",{},JSON.stringify({
            'name':name,
            'num' : num
        }));
    }

    destroy(name) {
        this.subscription.unsubscribe();
        this.stompClient.send("/processDev/"+this.gameId+"/addDestroyMessage",{},JSON.stringify({
            'name':name
        }));
    }
    create(name,fracton) {
        this.stompClient.send("/processDev/"+ this.gameId + "/addCreateMessage",{},JSON.stringify({
            'name':name,
            'fraction':fracton
        }));
    }
    disconnect() {
        if (this.connected) {
            this.leaveServer();
            this.stompClient.disconnect();
            console.log("Disconnected");
        }

    }

    leaveServer() {
        this.stompClient.send("/leaveServer",{},JSON.stringify({'name':this.name}));
    }
    joinServer() {
        this.stompClient.send("/joinServer",{},JSON.stringify({'name':this.name}));
    }
    joinLobby() {
        this.stompClient.send("/lobbyDev/"+this.gameId+"/addJoinMessage", {}, JSON.stringify({
            'name': this.name
        }));

    }

    getLastChangesForScores(){
        var sub = messageService.stompClient.subscribe('/game/process/'+messageService.gameId,(function (change) {
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
                sub.unsubscribe();
            }
        }));
    }

    chooseSide() {
        this.stompClient.send("/lobbyDev/"+this.gameId+"/addChooseSideMessage",{},JSON.stringify({
            'name':this.name,
            'side':this.side
        }));
    }
    setReady() {
        this.stompClient.send("/lobbyDev/"+this.gameId+"/addReadyMessage",{},JSON.stringify({
            'name':this.name
        }));
    }
    subscribeLobby() {
        if (this.subscription!==null)
        this.subscription.unsubscribe();
        this.subscription = this.stompClient.subscribe('/game/lobby/'+this.gameId, (function (change) {
            let arr = JSON.parse(change.body);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name !== this.name) {
                    if (arr[i].type === 'JOIN') {
                        console.log('JOIN');
                    } else if (arr[i].type === 'CHOOSESIDE') {
                        console.log('CHOOSESIDE');
                    } else if (arr[i].type === 'READY') {
                        console.log('Готов');
                    } else if (arr[i].type === 'NOREADY') {
                        console.log('ожидание игроков');

                    } else if (arr[i].type === 'START') {
                        key.setInputMode(false);
                        for( let j = 0; j< arr[i].ships.length;j++) {
                            let player = arr[i].ships[j];
                            if (player.name === this.name) {
                                createShip(player.name,player.fraction,player.x,player.y,player.speed);
                                break;
                            }
                        }
                        for( let j = 0; j< arr[i].ships.length;j++) {
                            let player = arr[i].ships[j];
                            if (player.name !== this.name) {
                                createShip(player.name,player.fraction,player.x,player.y,player.speed);
                            }
                        }
                        console.log('I want to start game');
                        this.startGame();
                        this.game.startLoop('game');
                    } else if (arr[i].type === 'LEAVE') {

                    }

                }
            }
            console.log(JSON.parse(change.body));
        }).bind(this));
    }



}



