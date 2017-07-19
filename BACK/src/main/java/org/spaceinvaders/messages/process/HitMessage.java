package org.spaceinvaders.messages.process;

/**
 * Created by Gemini on 17.07.2017.
 */
public class HitMessage extends MoveMessage {
    private int shipId;
    public HitMessage() {
        type = ProcessMessageType.HITTING;
    }

    public HitMessage(int shipId,int shelId ) {
        this();
        this.shipId = shipId;
        this.shipId = shelId;
    }

    public int getShipId() {
        return shipId;
    }

    public void setShipId(int shipId) {
        this.shipId = shipId;
    }
}
