package org.spaceinvaders.messages.server;

public class PreferLobbyMessage extends  ServerMessageResponseEntity{
    private Integer num;
    public PreferLobbyMessage() {
        type = ServerMessageResponseType.PREFER_LOBBY;
    }
    public PreferLobbyMessage(int num) {
        this();
        this.num = num;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }
}
