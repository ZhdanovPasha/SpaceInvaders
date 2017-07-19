package org.spaceinvaders.messages.gamelobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class ChooseSideMessage extends LobbyMessageEntity {
    boolean side;//true-розовые false голубые
    int shipId;
    ChooseSideMessage() {
        type = LobbyMessageType.CHOOSESIDE;
    }

    public ChooseSideMessage(boolean side, int shipId) {
        this();
        this.side = side;
        this.shipId = shipId;
    }

    public void setSide(boolean side) {
        this.side = side;
    }

    public boolean getSide() {
        return side;
    }

    public int getShipId() {
        return shipId;
    }

    public void setShipId(int shipId) {
        this.shipId = shipId;
    }
}
