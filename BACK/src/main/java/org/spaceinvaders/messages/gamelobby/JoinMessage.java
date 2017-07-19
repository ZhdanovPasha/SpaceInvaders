package org.spaceinvaders.messages.gamelobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class JoinMessage extends LobbyMessageEntity {
    int id;
    JoinMessage() {
        type = LobbyMessageType.JOIN;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
