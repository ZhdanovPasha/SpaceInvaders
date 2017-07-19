package org.spaceinvaders.messages.gamelobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class ChooseSideMessage extends LobbyMessageEntity {
    String side;//true-розовые false голубые
    int shipId;

    ChooseSideMessage() {
        type = LobbyMessageType.CHOOSESIDE;
    }

    public ChooseSideMessage(String side, int shipId) {
        this();
        this.side = side;
        this.shipId = shipId;
    }

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public int getShipId() {
        return shipId;
    }

    public void setShipId(int shipId) {
        this.shipId = shipId;
    }
}
