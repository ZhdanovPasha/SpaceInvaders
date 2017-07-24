package org.spaceinvaders.messages.gamelobby;

/**
 * Created by gemini on 20.07.17.
 */
public class LeaveMessage  extends LobbyMessageEntity{
    String name;
    public LeaveMessage() {
        type = LobbyMessageType.LEAVE;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
