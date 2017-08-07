package org.spaceinvaders.messages.server;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum  ServerMessageResponseType {
    IS_CHOOSEN_SIDE,IS_JOIN_TO_LOBBY,PREFER_LOBBY;
}
