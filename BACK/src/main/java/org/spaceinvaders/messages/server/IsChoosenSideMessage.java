package org.spaceinvaders.messages.server;

public class IsChoosenSideMessage extends  ServerMessageResponseEntity{
    public IsChoosenSideMessage() {
        type = ServerMessageResponseType.IS_CHOOSEN_SIDE;
    }
    public IsChoosenSideMessage(boolean bool) {
        this();
        check = bool;
    }
}
