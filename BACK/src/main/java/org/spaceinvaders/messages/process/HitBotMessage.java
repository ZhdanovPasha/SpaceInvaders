package org.spaceinvaders.messages.process;

public class HitBotMessage extends ProcessMessageEntity {
    private String name;
    private int numBot;
    private int numBullet;

    public HitBotMessage() {
        type = ProcessMessageType.HITTING;
    }

    public HitBotMessage(String name, int numBot, int numBullet) {
        this();
        this.name = name;
        this.numBullet = numBullet;
        this.numBot = numBot;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumBot() {
        return numBot;
    }

    public void setNumBot(int numBot) {
        this.numBot = numBot;
    }

    public int getNumBullet() {
        return numBullet;
    }

    public void setNumBullet(int numBullet) {
        this.numBullet = numBullet;
    }
}