/**
 * Created by Gemini on 17.07.2017.
 */


class MessageService {
    constructor(ships,game){
        this.stompClient = null;
        this.subscription = null;
        this.game = game;
        this.ships = ships;
        this.name = null;
        this.side = null;
        this.connected = false;
    }
    connect() {
    if(this.stompClient==null){
        this.socket = new SockJS('/game');
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect({},function (frame) {

        })
        console.log(this.stompClient);

    }}
    startGame() {
        this.subscription.unsubscribe();
        this.subscription = this.stompClient.subscribe('/game/process',(function (change) {
            let arr = JSON.parse(change.body);
            if (arr.type == 'STATE') {
                let sh = arr.ships;
                for (let j = 0; j < sh.length; j++) {
                    for (let k = 0; k < ships.length; k++) {
                        if (sh[j].name == ships[k].name) {
                            ships[k].moveTo(sh[j].x,ships[0])
                        }

                    }
                }
            }
            for(let i=0;i<arr.length;i++) {

                if (arr[i].type == 'SHOT') {
                    for (let j = 1; j < this.ships.length;j++) {
                        if (arr[i].name == this.ships[j].name ) {
                            this.ships[j].addBullet(this.ships[0]);
                        }
                    }
                } else if (arr[i].type == 'MOVE') {
                     for (let j = 0; j < this.ships.length;j++) {
                         if (arr[i].name == this.ships[j].name ) {
                             this.ships[j].move(arr[i].direction,this.ships[0])
                         }
                     }
                } else if (arr[i].type == 'HITTING') {

                } else if (arr[i].type == 'CREATESHIP') {

                } else if (arr[i].type == 'DESTROYSHIP') {

                } else if (arr[i].type == 'STOPGAME') {

                }

            }


            console.log(JSON.parse(change.body));
        }).bind(this))


    }
    tryToconnect(name,side) {
        if (name.length > 0)
            $.ajax({
                url: '/login/' + name,
                context:this,
                success: function (data) {
                    if (data) {
                        this.name = name;
                        this.side = side;
                        this.connected = true;
                        console.log(this.stompClient);
                        this.subscription = this.stompClient.subscribe('/game/lobby', (function (change) {
                            let arr = JSON.parse(change.body);
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i].name !== this.name) {
                                    if (arr[i].type == 'JOIN') {

                                    } else if (arr[i].type == 'CHOOSESIDE') {

                                    } else if (arr[i].type == 'READY') {

                                    } else if (arr[i].type == 'NOREADY') {

                                    } else if (arr[i].type == 'START') {
                                        key.setInputMode(false);
                                        for( let j = 0; j< arr[i].ships.length;j++) {
                                            let player = arr[i].ships[j];
                                            if (player.name == this.name) {
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
                                    } else if (arr[i].type == 'LEAVE') {

                                    }

                                }
                            }
                            console.log(JSON.parse(change.body));
                        }).bind(this))
                        this.stompClient.send("/lobby/addJoinMessage", {}, JSON.stringify({
                            'name': name,
                            'stat': side
                        }));
                        //stompClient.send("/lobby/addChooseSideMessage",{},JSON.stringify({'type':"CHOOSESIDE",'name':name,'side':side}));
                        //stompClient.send("/lobby/addReadyMessage",{},JSON.stringify({'type':"READY",'name':name}));
                    }
                    else alert('Игрок с таким именем уже существует');

                }
            });
    }

    move(name,direction){
        this.stompClient.send("/process/addMoveMessage",{},JSON.stringify({
            'name':name,
            'direction':direction
        }));
    }

    hit(name,nameHit,numBullet) {
        this.stompClient.send("/process/addHitMessage",{},JSON.stringify({
            'name':name,
            'nameHit':nameHit,
            'numBullet':numBullet
        }))
    }
    shot(name) {
        this.stompClient.send("/process/addShotMessage",{},JSON.stringify({
            'name':name
        }))
    }

    destroy(name) {
        this.stompClient.send("/process/addDestroyMessage",{},JSON.stringify({
            'name':name
        }))
    }
    create(name,fracton) {
        this.stompClient.send("/process/addCreateMessage",{},JSON.stringify({
            'name':name,
            'fraction':fracton
        }))
    }
    disconnect() {
        if (this.connected) {
            this.stompClient.send("/lobby/addLeaveMessage",{},JSON.stringify({'name':this.name}));
            this.stompClient.disconnect();
            console.log("Disconnected");
        }

    }



}

window.onbeforeunload = function() {
    messageService.disconnect();
}

 function f(){
     alert('ДАМАГВСЕМ ПИЗДА');
     }



