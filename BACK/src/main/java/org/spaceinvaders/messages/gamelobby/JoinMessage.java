package org.spaceinvaders.messages.gamelobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class JoinMessage extends LobbyMessageEntity {
    String name;
    JoinMessage() {
        type = LobbyMessageType.JOIN;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
