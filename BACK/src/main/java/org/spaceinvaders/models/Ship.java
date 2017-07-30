package org.spaceinvaders.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.spaceinvaders.messages.process.ProcessMessageEntity;
import org.spaceinvaders.messages.process.ShotMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.concurrent.PriorityBlockingQueue;

/**
 * Created by gemini on 25.07.17.
 */


public class Ship {

    private int x, y,speed,bulletSpeed;

    private boolean dead;
    private ArrayList<Bullet> bullets;

    @JsonIgnore
    private Game game;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private StatusInLobby fraction;
    private String name;
    public Ship(String name ,int x, int y,StatusInLobby fraction,Game game) {
        this.x = x;
        this.y = y;
        this.fraction = fraction;
        this.name = name;
        this.speed = Conf.getSpeed();
        this.game = game;

        this.bulletSpeed = Conf.getBulletSpeed();
        bullets = new ArrayList<Bullet>(10);
        for (int i = 0; i < 10 ; i++) {
            bullets.add(new Bullet(0,0,this));
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
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
        Integer dif = Conf.getW()-Conf.getShipWidth();
        if (x>=dif) {
            x = dif;
        }
    }
    public void moveBullets() {
        for (Bullet bul : bullets) {
            if (bul.isEnabled()) {
                bul.move();
                if (bul.getY() < 0) bul.destroyBull();
            }
        }
    }
    public void  shot(int i) {
        bullets.get(i).shot();
    }
    public Bullet findBulletById (int id) {
        return bullets.get(id);
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

    public int getBulletSpeed() {
        return bulletSpeed;
    }

    public void setBulletSpeed(int bulletSpeed) {
        this.bulletSpeed = bulletSpeed;
    }

    public ArrayList<Bullet> getBullets() {
        return bullets;
    }

    public void setBullets(ArrayList<Bullet> bullets) {
        this.bullets = bullets;
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