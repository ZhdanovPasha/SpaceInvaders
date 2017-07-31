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

    protected int x, y,speed,bulletSpeed;

    protected boolean dead;
    protected ArrayList<Bullet> bullets;
    protected ArrayList<Bot> bots;
    @JsonIgnore
    protected Game game;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    protected StatusInLobby fraction;
    protected String name;
    public Ship() {

    }

    public Ship(String name ,int x, int y,StatusInLobby fraction,Game game) {
        this.x = x;
        this.y = y;
        this.fraction = fraction;
        this.name = name;
        this.speed = Conf.getSpeed();
        this.game = game;
        bots = new ArrayList<>(Conf.getCountOfBots());
        this.bulletSpeed = Conf.getBulletSpeed();
        bullets = new ArrayList<Bullet>(10);
        for (int i = 0; i < 10 ; i++) {
            bullets.add(new Bullet(0,0,this));
        }
    }

    public ArrayList<Bot> getBots() {
        return bots;
    }
    public int getEnabledBotsCount() {
        int i = 0;
        for (Bot bot: bots) {
            if (bot.isEnabled()) i++;
        }
        return i;
    }
    public int getEnabledBotIndexOf(Bot bot) {
        int k = -1;
        for (int i = 0; i < bots.size() ; i++) {
            if (bots.get(i).isEnabled()) k++;
            if (bots.get(i) == bot) {
                return k;
            }
        }
        return k;
    }
    public int getBotsArea() {
        return (Conf.getShipWidth()/2+10) * getEnabledBotsCount();
    }
    public void setBots(ArrayList<Bot> bots) {
        this.bots = bots;
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
        updateBots();
    }
    public void moveRight() {
        x +=speed;
        Integer dif = Conf.getW()-Conf.getShipWidth();
        if (x>=dif) {
            x = dif;
        }
        updateBots();
    }
    public void updateBots() {
        for (Bot bot:bots) {
            bot.update();
        }
    }
    public void moveBullets() {
        for (Bullet bul : bullets) {
            if (bul.isEnabled()) {
                bul.move();
                for (Bot bot:bots) {
                    bot.moveBullets();
                }
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
    public Bot findBotById (int id) {
        if ( id < bots.size())
            return bots.get(id);
        else return null;
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
