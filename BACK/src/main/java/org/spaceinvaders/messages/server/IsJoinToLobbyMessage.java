package org.spaceinvaders.messages.server;

public class IsJoinToLobbyMessage extends ServerMessageResponseEntity {
    public IsJoinToLobbyMessage() {
        type = ServerMessageResponseType.IS_JOIN_TO_LOBBY;
    }
    public IsJoinToLobbyMessage(boolean bool) {
        this();
        check = bool;
    }
}
