package org.spaceinvaders.messages.process;

/**
 * Created by Lakor on 04.08.2017.
 */
public class DestroyBotMessage extends ProcessMessageEntity{
    private String name;
    private int numBot;

    public DestroyBotMessage() {
        type = ProcessMessageType.HITTING;
    }

    public DestroyBotMessage(String name, int numBot, int numBullet) {
        this();
        this.name = name;
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
}
