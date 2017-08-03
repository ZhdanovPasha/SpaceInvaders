(function (game) {
    let obj;
    const width = SpaceInvaders.width;
    const pjs = SpaceInvaders.pjs;
    const mouse = pjs.mouseControl;
    const key = SpaceInvaders.key;

    mouse.initMouseControl();

    let header;
    let items;
    const menuY = 200;
    const menuElemHeight = 40;
    const menuWidth = 200;
    let objects = [];

    const nameMaxLength = 30;
    const chooseMenuElements = [
        { //0 всегда заголовок
            text: "Choose Your destiny"
        },
        {
            text: "Pink",
            handle: function () {
                SpaceInvaders.fraction = "PINK";
                SpaceInvaders.playerName = name;
                key.setInputMode(false);
                game.startLoop('game');
            }
        },
        {
            text: "Blue",
            handle: function () {
                SpaceInvaders.fraction = "BLUE";
                SpaceInvaders.playerName = name;
                key.setInputMode(false);
                game.startLoop('game');
            }
        }
    ];
    const menuElements = [
        { //0 всегда заголовок
            text: "Space Invaders"
        },
        {
            text: "Играть",
            handle: function () {
                objects.push(game.newTextObject({
                    text: "Имя:",
                    x: width / 2 - menuWidth,
                    y: 50,
                    color: 'white',
                    size: menuElemHeight * 0.75
                }));
                key.setInputMode(true);
                setMenuElements(chooseMenuElements);
            }
        },
        {
            text: "Выход",
            handle: function () {
                game.startLoop('game');
            }
        }
    ];

    function setMenuElements(elements) {
        items = [];
        elements.forEach(function (elem, i) {
            if (i === 0) header = game.newTextObject({
                text: elem.text,
                x: width / 2 - menuWidth,
                y: menuY,
                color: 'white',
                size: menuElemHeight * 0.75
            }); else {
                items.push(game.newTextObject({
                    text: elem.text,
                    x: width / 2 - menuWidth / 2,
                    y: menuY + i * menuElemHeight,
                    color: 'white',
                    size: menuElemHeight * 0.6
                }));
                items[items.length - 1].handle = elem.handle;
            }
        });
    }

    game.newLoopFromConstructor('menu', function () {
        this.entry = function () {
            console.log("entered menu");
            game.clear(); // clear screen
            obj = false;
            setMenuElements(menuElements);
        };
        this.update = function () {
            game.clear(); // clear screen
            // var mPos = mouse.getPosition();
            header.draw();
            pjs.OOP.drawArr(items, function (o) {

                if (mouse.isInObject(o)) {
                    pjs.brush.drawRect({
                        x: o.x - 4, y: o.y - 4,
                        w: o.w + 6, h: o.h + 6,
                        strokeColor: 'white',
                        strokeWidth: 2
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

            objects.forEach(
                function (i) {
                    i.draw();
                });
            if (key.isInputMode()) {        // если включен режим ввода
                let char = key.getInputChar(); // запомним то, что ввели
                let iKey = key.getInputKey();  // запомним клавишу, которой это ввели

                if (iKey) {
                    if (iKey == 'BACKSPACE') {
                        name = name.substr(0, name.length - 1);
                    } else if (iKey == 'ENTER') {
                        SpaceInvaders.playerName = name;
                    }

                    if (char) {                     // если вводится символ
                        if (name.length < nameMaxLength) {      // ограничили в 30 символов
                            name += char;
                        }
                    }
                }
                pjs.brush.drawTextS({
                    text: name + '_',
                    size: menuElemHeight,
                    color: '#FFFFFF',
                    x: width / 2, y: 50
                });
            }
        };
    });
})(SpaceInvaders.game);
