package org.spaceinvaders.messages.process;

/**
 * Created by Gemini on 17.07.2017.
 */
public class HitMessage extends ProcessMessageEntity {
    private String name;
    private String nameHit;
    private int numBullet;

    public HitMessage() {
        type = ProcessMessageType.HITTING;
    }

    //Что значит shelId???

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameHit() {
        return nameHit;
    }

    public void setNameHit(String nameHit) {
        this.nameHit = nameHit;
    }

    public int getNumBullet() {
        return numBullet;
    }

    public void setNumBullet(int numBullet) {
        this.numBullet = numBullet;
    }
}