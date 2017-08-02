package org.spaceinvaders.models;

/**
 * Created by gemini on 27.07.17.
 */
public class Bullet {
    private int x, y;
    private int speed;
    private boolean enabled;
    private Ship owner;
    public Bullet(Ship ship) {
        this.x = 0;
        this.y = 0;
        owner = ship;
        this.speed = ship.getBulletSpeed();
    }
   public  void move() {
        if (enabled)
        y -= speed;
    }
    public void shot() {
        x = owner.getX() + Conf.getShipWidth()/2-Conf.getBulletWidth()/2;
        y = owner.getY()-Conf.getBulletHeight();
        speed = owner.getBulletSpeed();
        enabled = true;
    }
    public void destroyBull() {
        this.enabled = false;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }
}
