package org.spaceinvaders.models;

public class PinkShip extends Ship {
    PinkShip(String name, int x, int y,Game game) {
        super(name,x,y,StatusInLobby.PINK,game);
    }
}
