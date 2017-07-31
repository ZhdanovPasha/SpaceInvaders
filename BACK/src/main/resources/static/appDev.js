

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

    }
    connect() {
        if(this.stompClient===null){
            this.socket = new SockJS('/game');
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect({},function (frame) {

            });
            console.log(this.stompClient);

        }}

    tryToconnect(name,side) {
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
                            this.joinLobby(this.gameId);
                        }).bind(this) ,200);
                        setTimeout((function () {
                            this.chooseSide();
                        }).bind(this) ,300);
                        setTimeout((function () {
                            this.setReady();
                        }).bind(this) ,400);
                        this.callback(true);
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
                            if (sh[j].dead) {
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


            console.log(JSON.parse(change.body));
        }).bind(this))


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
        }))
    }
    shot(name,k) {
        this.stompClient.send("/processDev/"+this.gameId+"/addShotMessage",{},JSON.stringify({
            'name':name,
            'numBullet' : k
        }))
    }

    destroy(name) {
        this.subscription.unsubscribe();
        this.stompClient.send("/processDev/"+this.gameId+"/addDestroyMessage",{},JSON.stringify({
            'name':name
        }));
        //ships.splice(0,ships.length);
    }
    create(name,fracton) {
        this.stompClient.send("/processDev/"+this.gameId+"/addCreateMessage",{},JSON.stringify({
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
    joinLobby(id) {
        this.gameId = id;
        this.subscribeLobby(this.gameId);
        this.stompClient.send("/lobbyDev/"+this.gameId+"/addJoinMessage", {}, JSON.stringify({
            'name': this.name
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
    subscribeLobby(id) {
        if (this.subscription!==null)
        this.subscription.unsubscribe();
        this.subscription = this.stompClient.subscribe('/game/lobby/'+id, (function (change) {
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



function f(){
    alert('ДАМАГВСЕМ ПИЗДА');
}



