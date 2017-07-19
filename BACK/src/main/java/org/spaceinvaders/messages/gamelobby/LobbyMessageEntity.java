package org.spaceinvaders.messages.gamelobby;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.spaceinvaders.messages.process.ProcessMessageType;

/**
 * Created by Gemini on 19.07.2017.
 */
public class LobbyMessageEntity {
    protected LobbyMessageType type;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public LobbyMessageType getType() {
        return type;
    }

    public void setType(LobbyMessageType type) {
        this.type = type;
    }
}
