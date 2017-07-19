package org.spaceinvaders.messages.process;

/**
 * Created by Gemini on 19.07.2017.
 */
public class DestroyShipMessage extends ProcessMessageEntity {
    private int id;
    public DestroyShipMessage () {
        type = ProcessMessageType.DESTROYSHIP;
    }

    public DestroyShipMessage(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
