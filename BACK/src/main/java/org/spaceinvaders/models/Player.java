package org.spaceinvaders.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Created by lionnick on 20.07.17.
 */
public class Player {
    private StatusInLobby side;
    private String name;
    private boolean ready;
    private Game game;
    public Player(){

    }
    @JsonFormat(shape = JsonFormat.Shape.STRING)
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

    public boolean getReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    public Player(String name, StatusInLobby side,Boolean ready) {
        this.side = side;
        this.name = name;
        this.ready = ready;
    }
    public void setGame(Game game) {
        this.game = game;
    }
    @JsonIgnore
    public Game getGame() {
        return game;
    }
    public void leaveGame() {
        if (game!=null)
        game.leaveGame(this);
    }
}
