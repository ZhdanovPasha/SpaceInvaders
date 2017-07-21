/**
 * Created by Gemini on 17.07.2017.
 */
var stompClient = null;
var name = document.getElementById("name").value;
var button = document.getElementById('button');
function setConnected(connected) {
    $("#connect").prop("disabled",connected);
    $("#disconnect").prop("disabled",!connected);
    if (connected) {
        $("#game").show();
    } else
        $("#game").hide();
}
var subscription = null;
var count = 0;


function  connect() {
    if(stompClient==null){
    var  socket = new SockJS('/game');
    stompClient = Stomp.over(socket);
    stompClient.connect({},function (frame) {
        setConnected(true);
        subscription = stompClient.subscribe('/game/lobby',function (change) {
           console.log('1');
         //   if (change.body="startGame"){
               // startGame();
           //     return;
            //}

            var arr = JSON.parse(change.body);

            for(var i=0;i<arr.length;i++)
            if (arr[i].type=='JOIN')

            button.innerHTML = name;

           console.log(JSON.parse(change.body));
        })

    })
}}
function startGame() {
    subscription.unsubscribe();
    subscription = stompClient.subscribe('/game/process',function (change) {
        console.log(JSON.parse(change.body));
    })

}

function newMessage() {
    $.ajax({
        url: '/login/test',
        success: function(data){
            alert(d);        }
    });
 //   stompClient.send("/lobby/addJoinMessage",{},JSON.stringify({'type':"JOIN",'name':$('#name').val()}));
 }