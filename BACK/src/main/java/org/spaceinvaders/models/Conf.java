package org.spaceinvaders.models;

import org.springframework.stereotype.Component;

/**
 * Created by gemini on 25.07.17.
 */
public class Conf {
    private int w = 700;
    private int h = 600;
    private int speed = 10;
    private int shipWidth = 50;
    private int shipHeight = 50;

    public Conf() {
    }
    public int getBeginPosX() {
        return  w/2-25;
    }
    public int getBeginPosY() {
        return h-shipHeight-70;
    }
    public int getW() {
        return w;
    }
    public int getSpeed() {
        return speed;
    }
    public void setW(int w) {
        this.w = w;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public int getShipWidth() {
        return shipWidth;
    }

    public void setShipWidth(int shipWidth) {
        this.shipWidth = shipWidth;
    }

    public int getShipHeight() {
        return shipHeight;
    }

    public void setShipHeight(int shipHeight) {
        this.shipHeight = shipHeight;
    }

    public int getH() {
        return h;
    }

    public void setH(int h) {
        this.h = h;
    }
}
