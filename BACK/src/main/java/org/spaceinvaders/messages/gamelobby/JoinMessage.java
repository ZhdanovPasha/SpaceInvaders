package org.spaceinvaders.messages.gamelobby;

import org.spaceinvaders.models.StatusInLobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class JoinMessage extends LobbyMessageEntity {
    String name;
    StatusInLobby stat;
    JoinMessage() {
        type = LobbyMessageType.JOIN;
    }

    public StatusInLobby getStat() {
        return stat;
    }

    public void setStat(StatusInLobby stat) {
        this.stat = stat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
