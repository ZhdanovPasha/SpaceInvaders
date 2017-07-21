package org.spaceinvaders.messages.gamelobby;

/**
 * Created by gemini on 20.07.17.
 */
public class LeaveMessage  extends LobbyMessageEntity{
    public LeaveMessage() {
        type = LobbyMessageType.LEAVE;
    }
}
