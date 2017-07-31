package org.spaceinvaders.messages.gamelobby;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.spaceinvaders.models.StatusInLobby;

public class JoinMessageDev extends LobbyMessageEntity {
    String name;
    JoinMessageDev() {
        type = LobbyMessageType.JOIN;
    }
    @JsonFormat(shape = JsonFormat.Shape.STRING)

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
