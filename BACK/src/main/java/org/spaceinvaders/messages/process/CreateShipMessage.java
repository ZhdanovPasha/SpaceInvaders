package org.spaceinvaders.messages.process;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.spaceinvaders.models.StatusInLobby;

/**
 * Created by Gemini on 19.07.2017.
 */
public class CreateShipMessage extends ProcessMessageEntity {
    private StatusInLobby fraction;
    private String name;
    public CreateShipMessage() {

        type = ProcessMessageType.CREATESHIP;
        fraction = StatusInLobby.BLUE;
    }

    public CreateShipMessage(String name,StatusInLobby fraction) {
        this.fraction = fraction;
        this.name = name;
    }
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public StatusInLobby getFraction() {
        return fraction;
    }

    public void setFraction(StatusInLobby fraction) {
        this.fraction = fraction;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
