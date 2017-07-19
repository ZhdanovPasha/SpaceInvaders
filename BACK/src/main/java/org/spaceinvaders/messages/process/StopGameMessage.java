package org.spaceinvaders.messages.process;

/**
 * Created by Gemini on 19.07.2017.
 */
public class StopGameMessage extends ProcessMessageEntity {
    public StopGameMessage() {
        type = ProcessMessageType.STOPGAME;
    }
}
