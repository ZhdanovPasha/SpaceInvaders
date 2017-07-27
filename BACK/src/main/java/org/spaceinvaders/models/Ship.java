package org.spaceinvaders.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by gemini on 25.07.17.
 */
//blue сверх

public class Ship {

    private int x, y,speed;
    private boolean dead;
    @JsonIgnore
    private Conf conf;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private StatusInLobby fraction;
    private String name;
    public Ship(String name ,int x, int y,int speed, StatusInLobby fraction) {
        this.x = x;
        this.y = y;
        this.fraction = fraction;
        this.name = name;
        this.speed = speed;
        conf = new Conf();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getX() {
        return x;
    }
    public  void moveLeft() {
        x -= this.speed;
        if (x <= 0){
            x = 0;
        }
    }

    public void moveRight() {
        x +=speed;
        Integer dif = conf.getW()-conf.getShipWidth();
        if (x>=dif) {
            x = dif;
        }
    }
    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public boolean isDead() {
        return dead;
    }

    public void setDead(boolean dead) {
        this.dead = dead;
    }

    public void setY(int y) {
        this.y = y;
    }
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public StatusInLobby getFraction() {
        return fraction;
    }
    public void setFraction(StatusInLobby fraction) {
        this.fraction = fraction;
    }
}
