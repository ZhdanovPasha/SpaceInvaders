/**
 * Created by Gemini on 17.07.2017.
 */
var stompClient = null;
var name = null;
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
var satus = null;


function  connect() {
    if(stompClient==null){
    var  socket = new SockJS('/game');
    stompClient = Stomp.over(socket);
    stompClient.connect({},function (frame) {
        //что-о при конекте игрока

    })

}}

function startGame() {
    subscription.unsubscribe();
    subscription = stompClient.subscribe('/game/process',function (change) {
        var arr = JSON.parse(change.body);

        for(var i=0;i<arr.length;i++) {
            if (arr[i].type == 'SHOT') {

            } else if (arr[i].type == 'MOVE') {

            } else if (arr[i].type == 'HITTING') {

            } else if (arr[i].type == 'CREATESHIP') {

            } else if (arr[i].type == 'DESTROYSHIP') {

            } else if (arr[i].type == 'STOPGAME') {

            }

        }

        console.log(JSON.parse(change.body));
    })

}
//ввод имени, проверка на уникальность и заход на сервер в случае успеха
function tryToReg() {
    var _name = $('#name').val().length;
    if(_name > 0)
        $.ajax({
            url: '/login/'+ _name,
            success: function(data) {
                if (data) {
                    
                    subscription = stompClient.subscribe('/game/dest',function (change) {
                    name = _name;
                        console.log(change);
                    });
                    
                }}})
}

function joinLobby() {
    if (name!==null) {
        stompClient.unsubscribe(subscription);
        stompClient.subscribe('/game/lobby/1',function (change) {

        console.log(change);
        })
    }
    
}




function tryToconnect() {
    if($('#name').val().length>0)
    $.ajax({
        url: '/login/'+ $('#name').val(),
        success: function(data){
            if (data) {


         subscription = stompClient.subscribe('/game/lobby',function (change) {
         //   if (change.body="startGame"){
               // startGame();
           //     return;
            //}

            var arr = JSON.parse(change.body);

            for(var i=0;i < arr.length;i++) {
                if (arr[i].type=='JOIN') {


                }else if (arr[i].type=='CHOOSESIDE') {

                }else if (arr[i].type=='READY') {

                }else if (arr[i].type=='NOREADY') {

                }else if (arr[i].type=='START') {

                }else if (arr[i].type=='LEAVE') {

                }

            }



           console.log(JSON.parse(change.body));
        })


            stompClient.send("/lobby/addJoinMessage",{},JSON.stringify({'type':"JOIN",'name':$('#name').val()}));


            }
            else alert('Игрок с таким именем уже существует');

        }
    });


 }

 function f(){
     alert('ДАМАГВСЕМ ПИЗДА');
     }