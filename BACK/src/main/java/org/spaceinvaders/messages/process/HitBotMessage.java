package org.spaceinvaders.messages.process;

public class HitBotMessage extends ProcessMessageEntity {
    private String name;
    private int numBullet;

    public HitBotMessage() {
        type = ProcessMessageType.HITTING;
    }

    public HitBotMessage(String name, int numBot, String bulletOwner, int numBullet) {
        this();
        this.name = name;
        this.numBullet = numBullet;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumBullet() {
        return numBullet;
    }

    public void setNumBullet(int numBullet) {
        this.numBullet = numBullet;
    }
}