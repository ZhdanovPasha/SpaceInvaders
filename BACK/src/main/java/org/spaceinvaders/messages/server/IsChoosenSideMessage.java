package org.spaceinvaders.messages.server;

public class IsChoosenSideMessage extends  ServerMessageResponseEntity{
    boolean check;
    public IsChoosenSideMessage() {
        type = ServerMessageResponseType.IS_CHOOSEN_SIDE;
    }
    public IsChoosenSideMessage(boolean bool) {
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
