package org.spaceinvaders.models;

public class Bot extends Ship {
    private Ship owner;
    boolean enabled;
    public Bot(Ship owner) {

        x = 0;
        y = 0;
        this.owner = owner;
    }
    void update () {
        if (enabled) {
            int i = owner.getEnabledBotIndexOf(this);
            x = owner.getX() - owner.getBotsArea()/2 + i * Conf.getShipWidth()/2 + owner.getEnabledBotsCount()*(i+1) + 17;
            y = owner.getY() - Conf.getBotHeight();
        }
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
