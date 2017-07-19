package org.spaceinvaders.messages.gamelobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class ChooseSideMessage extends LobbyMessageEntity {
    String side;//true-розовые false голубые
    String name;

    ChooseSideMessage() {
        type = LobbyMessageType.CHOOSESIDE;
    }

    public ChooseSideMessage(String side, String name) {
        this();
        this.side = side;
        this.name = name;
    }

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
