package org.spaceinvaders.messages.process;

/**
 * Created by Gemini on 19.07.2017.
 */
public class CreateShipMessage extends ProcessMessageEntity {
    private boolean isPink;
    public CreateShipMessage() {

        type = ProcessMessageType.CREATESHIP;
    }

    public boolean isPink() {
        return isPink;
    }

    public void setPink(boolean pink) {

        isPink = pink;
    }
}
