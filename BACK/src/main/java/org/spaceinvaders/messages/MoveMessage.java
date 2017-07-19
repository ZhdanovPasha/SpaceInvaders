package org.spaceinvaders.messages;


import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by Gemini on 17.07.2017.
 */
public class MoveMessage extends MessageEntity {
    private int id,dx;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Direction direction;
    public MoveMessage(int id,Direction direction, int dx,int time) {
        type = Type.MOVE;
        this.id = id;
        this.direction = direction;
        this.dx = dx;
    }
}
