package org.spaceinvaders.models;

/**
 * Created by lionnick on 20.07.17.
 */
public class Player {
    private StatusInLobby side;
    private String name;
    private Boolean ready;
    public Player(){

    }
    public StatusInLobby getSide() {
        return side;
    }

    public void setSide(StatusInLobby side) {
        this.side = side;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getReady() {
        return ready;
    }

    public void setReady(Boolean ready) {
        ready = ready;
    }

    public Player(String name, StatusInLobby side,Boolean ready) {
        this.side = side;
        this.name = name;
        this.ready = ready;
    }
}
