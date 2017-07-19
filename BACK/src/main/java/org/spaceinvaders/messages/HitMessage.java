package org.spaceinvaders.messages;

/**
 * Created by Gemini on 17.07.2017.
 */
public class HitMessage {
    private int shipId;
    private Type type;
    public HitMessage(int shipId,int shelId,int time ) {
        type = Type.HITTING;
        this.shipId = shipId;
        this.shipId = shelId;
    }
}
