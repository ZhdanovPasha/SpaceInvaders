package org.spaceinvaders.messages.gamelobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class ReadyMessage extends LobbyMessageEntity {
    public String name;
    public ReadyMessage() {
        type = LobbyMessageType.READY;
    }

    public ReadyMessage(String name) {
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
