package org.spaceinvaders.models;

public class BlueShip extends Ship {

    BlueShip(String name, int x, int y,Game game) {
        super(name,x,y,StatusInLobby.BLUE,game);
            for (int i = 0; i < Conf.getCountOfBots() ; i++) {
                bots.add(new Bot(this));
            }
    }
}
