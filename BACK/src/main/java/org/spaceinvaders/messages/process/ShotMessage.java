package org.spaceinvaders.messages.process;

/**
 * Created by Gemini on 17.07.2017.
 */
public class ShotMessage extends ProcessMessageEntity {
    private int id;

    public ShotMessage(){
        type = ProcessMessageType.SHOT;
    }
    public ShotMessage(int id) {
        this();
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


}
