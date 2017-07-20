(function(game){
    var obj;
    var header;
    var items;
    var menuY=200;
    var menuElemHeight=40;
    var menuWidth=200;
    var chooseMenuElements=[
        { //0 всегда заголовок
            text:"Choose YOur destiny"
        },
        {
            text:"Pink",
            handle: function(){
                game.startLoop('game');
            }
        },
        {
            text:"Blue",
            handle: function(){
                game.startLoop('game');
            }
        }
    ];
    var menuElements=[
        { //0 всегда заголовок
            text:"Space Invaders"
        },
        {
            text:"Играть",
            handle: function(){
                setMenuElements(chooseMenuElements);
            }
        },
        {
            text:"Выход",
            handle: function(){
                game.startLoop('game');
            }
        }
    ];


    function setMenuElements(elements) {
        items=[];
        elements.forEach(function(elem,i){
            if(i===0) header=game.newTextObject({
                text: elem.text,
                x:width/2-menuWidth/2,
                y:menuY,
                color: 'white',
                size: menuElemHeight*0.75
            }); else{
                items.push(game.newTextObject({
                    text: elem.text,
                    x:width/2-menuWidth/2,
                    y:menuY+i*menuElemHeight,
                    color: 'white',
                    size: menuElemHeight*0.6
                }));
                items[items.length-1].handle=elem.handle;
            }
        });
    }


    game.newLoopFromConstructor('menu', function () {
        setMenuElements(menuElements);
        this.update = function () {
            game.clear(); // clear screen
            fon.draw();
            // var mPos = mouse.getPosition();
            pjs.OOP.drawArr(items, function (o) {

                if (mouse.isInObject(o)) {
                    pjs.brush.drawRect({
                        x : o.x - 4, y : o.y - 4,
                        w : o.w + 6, h : o.h + 6,
                        strokeColor : 'white',
                        strokeWidth : 2
                    });
                }

                if (mouse.isPeekObject('LEFT', o)) {
                    obj = o;
                }
            });

            if (mouse.isUp('LEFT')) {
                obj = false;
            }

            if (obj) {
                obj.handle();
            }


        };

    });
})(game);
