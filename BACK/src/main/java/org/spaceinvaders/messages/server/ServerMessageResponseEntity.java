package org.spaceinvaders.messages.server;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ServerMessageResponseEntity {

    protected ServerMessageResponseType type;
    public ServerMessageResponseEntity() {

    }


    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public ServerMessageResponseType getType() {
        return type;
    }

    public void setType(ServerMessageResponseType type) {
        this.type = type;
    }
}
