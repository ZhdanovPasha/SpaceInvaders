package org.spaceinvaders.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.spaceinvaders.messages.process.ProcessMessageEntity;
import org.spaceinvaders.messages.process.ShotMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.concurrent.PriorityBlockingQueue;

/**
 * Created by gemini on 25.07.17.
 */


public class Ship {

    private int x, y,speed,bulletSpeed;

    private boolean dead;
    private LinkedList<Bullet> bullets;
    @JsonIgnore
    private PriorityBlockingQueue<ShotMessage> shotMessages;
    @JsonIgnore
    private Game game;
    @JsonIgnore
    private Conf conf;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private StatusInLobby fraction;
    private String name;
    public Ship(String name ,int x, int y,StatusInLobby fraction,Game game) {
        this.x = x;
        this.y = y;
        this.fraction = fraction;
        this.name = name;
        conf = new Conf();
        this.speed = conf.getSpeed();
        bullets = new LinkedList<>();
        this.game = game;
        shotMessages = new PriorityBlockingQueue<>(10,(m1,m2)->m1.getTimeStamp().compareTo(m2.getTimeStamp()));
        this.bulletSpeed = conf.getBulletSpeed();
    }
    public void addShotMessage (ShotMessage message) {
        shotMessages.put(message);
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
        Integer dif = conf.getW()-conf.getShipWidth();
        if (x>=dif) {
            x = dif;
        }
    }
    public void moveBullets() {
        Iterator<Bullet> bullet = this.bullets.iterator();
        while (bullet.hasNext()){
            Bullet bul = bullet.next();
            if (bul.isDestroyed()) bullets.remove(bul);
        }

    }
    public void  shot() {
        bullets.push(new Bullet(x + conf.getShipWidth()/2-conf.getBulletWidth()/2,y,bulletSpeed));
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

    public PriorityBlockingQueue<ShotMessage> getShotMessages() {
        return shotMessages;
    }

    public void setShotMessages(PriorityBlockingQueue<ShotMessage> shotMessages) {
        this.shotMessages = shotMessages;
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

    public LinkedList<Bullet> getBullets() {
        return bullets;
    }

    public void setBullets(LinkedList<Bullet> bullets) {
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
