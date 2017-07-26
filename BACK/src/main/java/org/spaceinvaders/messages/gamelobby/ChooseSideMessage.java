package org.spaceinvaders.messages.gamelobby;

import org.spaceinvaders.models.StatusInLobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class ChooseSideMessage extends LobbyMessageEntity {
    StatusInLobby side;
    String name;

    ChooseSideMessage() {
        type = LobbyMessageType.CHOOSESIDE;
    }

    public ChooseSideMessage( String name,StatusInLobby side) {
        this.side = side;
        this.name = name;
    }

    public StatusInLobby getSide() {
        return side;
    }

    public void setSide(StatusInLobby side) {
        this.side = side;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
