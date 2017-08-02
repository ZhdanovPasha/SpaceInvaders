package org.spaceinvaders.messages.server;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ServerMessageResponseEntity {
    protected Boolean check;
    protected ServerMessageResponseType type;
    public ServerMessageResponseEntity() {

    }
    public ServerMessageResponseEntity(Boolean bool) {
        this();
        this.check = bool;
    }
    public Boolean getCheck() {
        return check;
    }

    public void setCheck(Boolean check) {
        this.check = check;
    }
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public ServerMessageResponseType getType() {
        return type;
    }

    public void setType(ServerMessageResponseType type) {
        this.type = type;
    }
}
