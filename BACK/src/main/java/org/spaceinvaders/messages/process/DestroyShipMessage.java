package org.spaceinvaders.messages.process;

/**
 * Created by Gemini on 19.07.2017.
 */
public class DestroyShipMessage extends ProcessMessageEntity {
    private String name;
    public DestroyShipMessage () {
        type = ProcessMessageType.DESTROYSHIP;
    }

    public DestroyShipMessage(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
