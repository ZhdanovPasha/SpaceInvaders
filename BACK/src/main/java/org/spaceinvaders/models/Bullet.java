package org.spaceinvaders.models;

/**
 * Created by gemini on 27.07.17.
 */
public class Bullet {
    private int x, y;
    private int speed;
    private boolean destroyed;

    public Bullet(int x,int y,int speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    void move() {
        y-= speed;
    }

    public void destroyBull() {
        this.destroyed = true;
    }

    public boolean isDestroyed() {
        return destroyed;
    }

    public void setDestroyed(boolean destroyed) {
        this.destroyed = destroyed;
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
