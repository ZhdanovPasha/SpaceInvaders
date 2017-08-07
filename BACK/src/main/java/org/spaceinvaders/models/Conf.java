package org.spaceinvaders.models;

import org.springframework.stereotype.Component;

/**
 * Created by gemini on 25.07.17.
 */

public class Conf {

    final static private int w = 700;
    final static private int h = 600;
    final static private int speed = 10;
    final static private int shipWidth = 50;
    final static private int shipHeight = 50;
    final static private int bulletWidth = 27;
    final static private int bulletHeight = 64;
    final static private int bulletSpeed = 5;
    final static private int offsetY = 70;
    final static private int botWidth = 50;
    final static private int botHeight = 50;
    final static private int countOfBots = 4;
    final static private int botBulletsCount = 5;
    final static private int bulletsCount = 10;
    final static private int maxPlayers = 2;
    public Conf() {
    }

    public static int getBotBulletsCount() {
        return botBulletsCount;
    }

    public static int getBulletsCount() {
        return bulletsCount;
    }

    public static int getMaxPlayers() {
        return maxPlayers;
    }

    public static int getBotWidth() {
        return botWidth;
    }

    public static int getBotHeight() {
        return botHeight;
    }

    public static int getBeginPosX() {
        return  w/2- shipWidth/2;
    }
    public static int getBeginPosY() {
        return h-shipHeight-offsetY;
    }
    public static int getW() {
        return w;
    }
    public static int getSpeed() {
        return speed;
    }

    public static int getCountOfBots() {
        return countOfBots;
    }

    public static int getBulletSpeed() {
        return bulletSpeed;
    }


    public static int getBulletWidth() {
        return bulletWidth;
    }

    public static int getBulletHeight() {
        return bulletHeight;
    }


    public static int getShipWidth() {
        return shipWidth;
    }


    public static int getShipHeight() {
        return shipHeight;
    }


    public static int getH() {
        return h;
    }

}

