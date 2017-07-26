package org.spaceinvaders.messages.process;

/**
 * Created by Gemini on 17.07.2017.
 */
public class ShotMessage extends ProcessMessageEntity {
    private String name;

    public ShotMessage(){
        type = ProcessMessageType.SHOT;
    }
    public ShotMessage(String name) {
        this();
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
