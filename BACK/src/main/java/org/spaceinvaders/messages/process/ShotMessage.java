package org.spaceinvaders.messages.process;

import org.spaceinvaders.messages.TimeStamped;

import java.util.Date;

/**
 * Created by Gemini on 17.07.2017.
 */
public class ShotMessage extends ProcessMessageEntity {
    private String name;
    private int numBullet;
    public ShotMessage(){
        type = ProcessMessageType.SHOT;
    }
    public ShotMessage(String name,int numBullet) {
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
