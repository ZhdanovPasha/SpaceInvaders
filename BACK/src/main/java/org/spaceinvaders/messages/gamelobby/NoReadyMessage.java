package org.spaceinvaders.messages.gamelobby;

/**
 * Created by gemini on 20.07.17.
 */
public class NoReadyMessage extends LobbyMessageEntity{
    String name;
    public NoReadyMessage() {
        type = LobbyMessageType.NOREADY;
    }

    public NoReadyMessage(String name) {
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
