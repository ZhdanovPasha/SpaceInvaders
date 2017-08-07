package org.spaceinvaders.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.spaceinvaders.configuration.Conf;

import java.util.ArrayList;

/**
 * Created by gemini on 25.07.17.
 */


public class Ship {

    protected int x, y,speed,bulletSpeed, scores;
    protected boolean immortality;
    protected boolean dead;
    protected ArrayList<Bullet> bullets;
    protected ArrayList<Bot> bots;
    protected ArrayList<Skill> skills;
    protected int wight;
    protected int height;
    protected Game game;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    protected StatusInLobby fraction;
    protected String name;
    public Ship() {

    }

    public Ship(String name ,int x, int y,StatusInLobby fraction,Game game) {
        this.scores = 0;
        this.x = x;
        this.y = y;
        this.fraction = fraction;
        this.name = name;
        this.speed = Conf.getSpeed();
        this.game = game;
        wight = Conf.getShipWidth();
        height = Conf.getShipHeight();
        bots = new ArrayList<>(Conf.getCountOfBots());
        this.bulletSpeed = Conf.getBulletSpeed();
        bullets = new ArrayList<Bullet>(10);
        for (int i = 0; i < 10 ; i++) {
            bullets.add(new Bullet(this));
        }
        skills = new ArrayList<>();
    }

    public ArrayList<Bot> getBots() {
        return bots;
    }
    @JsonIgnore
    public int getEnabledBotsCount() {
        int i = 0;
        for (Bot bot: bots) {
            if (bot.isEnabled()) i++;
        }
        return i;
    }
    public void enableBots() {
        for (Bot bot:bots) {
           bot.setEnabled(true);
        }
    }

    public boolean isImmortality() {
        return immortality;
    }

    public void setImmortality(boolean immortality) {
        this.immortality = immortality;
    }
    @JsonIgnore
    public ArrayList<Skill> getSkills() {
        return skills;
    }
    public Skill findSkillById(int id) {
        if (id < skills.size())
            return skills.get(id);
        return null;
    }
    @JsonIgnore
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
    @JsonIgnore
    public int getBotsArea() {
        return (wight/2+10) * getEnabledBotsCount();
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
    @JsonIgnore
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
        Integer dif = Conf.getW()- wight;
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
    public void update() {
        updateBots();
        moveBullets();
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

    public int getScores() {
        return scores;
    }

    public void setScores(int scores) {
        this.scores += scores;
    }
}
