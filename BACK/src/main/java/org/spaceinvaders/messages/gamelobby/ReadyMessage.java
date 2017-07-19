package org.spaceinvaders.messages.gamelobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class ReadyMessage extends LobbyMessageEntity {
    int id;
    public ReadyMessage() {
        type = LobbyMessageType.READY;
    }

    public ReadyMessage(int id) {
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
