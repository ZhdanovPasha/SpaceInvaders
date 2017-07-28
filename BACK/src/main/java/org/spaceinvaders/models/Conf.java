package org.spaceinvaders.models;

import org.springframework.stereotype.Component;

/**
 * Created by gemini on 25.07.17.
 */

public class Conf {

    final private int w = 700;
    final private int h = 600;
    final private int speed = 10;
    final private int shipWidth = 50;
    final private int shipHeight = 50;
    final private int bulletWidth = 27;
    final private int bulletHeight = 64;
    final private int bulletSpeed = 5;
    final private int offsetY = 70;
    public Conf() {
    }
    public int getBeginPosX() {
        return  w/2- shipWidth/2;
    }
    public int getBeginPosY() {
        return h-shipHeight-offsetY;
    }
    public int getW() {
        return w;
    }
    public int getSpeed() {
        return speed;
    }


    public int getBulletSpeed() {
        return bulletSpeed;
    }


    public int getBulletWidth() {
        return bulletWidth;
    }

    public int getBulletHeight() {
        return bulletHeight;
    }


    public int getShipWidth() {
        return shipWidth;
    }


    public int getShipHeight() {
        return shipHeight;
    }


    public int getH() {
        return h;
    }

}
