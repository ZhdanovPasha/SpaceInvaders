package org.spaceinvaders.messages.server;

public class IsJoinToLobbyMessage extends ServerMessageResponseEntity {
    boolean check;
    public IsJoinToLobbyMessage() {
        type = ServerMessageResponseType.IS_JOIN_TO_LOBBY;
    }
    public IsJoinToLobbyMessage(boolean bool) {
        this();
        check = bool;
    }

    public boolean isCheck() {
        return check;
    }

    public void setCheck(boolean check) {
        this.check = check;
    }
}
