package org.spaceinvaders.models;

import org.spaceinvaders.configuration.Conf;

import java.util.ArrayList;

public class Bot extends Ship {
    private Ship owner;
    private boolean enabled;
    public Bot(Ship owner) {
        x = 0;
        y = 0;
        this.bulletSpeed = Conf.getBulletSpeed();
        height = Conf.getBotHeight();
        wight = Conf.getBotWidth();
        this.owner = owner;
        this.bullets = new ArrayList<>(Conf.getBotBulletsCount());
        for (int i = 0; i < Conf.getBotBulletsCount() ; i++) {
            this.bullets.add(new Bullet(this));
        }

        this.fraction = owner.fraction;
    }
    @Override
    public void update () {
        moveBullets();
        if (enabled) {
            int i = owner.getEnabledBotIndexOf(this);
            x = owner.getX() - owner.getBotsArea()/2 + i * owner.wight/2 + owner.getEnabledBotsCount()*(i+1) + 17;
            y = owner.getY() - height;
        }
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
