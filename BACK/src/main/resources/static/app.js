/**
 * Created by Gemini on 17.07.2017.
 */
var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled",connected);
    $("#disconnect").prop("disabled",!connected);
    if (connected) {
        $("#game").show();
    } else
        $("#game").hide();
}
var subscription = null;
function  connect() {
    var  socket = new SockJS('/game');
    stompClient = Stomp.over(socket);
    stompClient.connect({},function (frame) {
        setConnected(true);
        subscription = stompClient.subscribe('/game/lobby',function (change) {
            if (change.body="startGame"){
                startGame();
                return;
            }
            console.log(JSON.parse(change.body));
        })

    })
}
function startGame() {
    subscription.unsubscribe();
    subscription = stompClient.subscribe('/game/process',function (change) {
        console.log(JSON.parse(change.body));
    })

}

function newMessage() {
    stompClient.send("/addShotMessage",{},JSON.stringify({'type':"SHOT",'id':1,'time':new Date().getTime()}));
}