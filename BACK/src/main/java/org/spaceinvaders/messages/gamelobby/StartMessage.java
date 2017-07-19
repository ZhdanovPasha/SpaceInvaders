package org.spaceinvaders.messages.gamelobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class StartMessage extends LobbyMessageEntity {
    public StartMessage() {
        type = LobbyMessageType.START;
    }

}
