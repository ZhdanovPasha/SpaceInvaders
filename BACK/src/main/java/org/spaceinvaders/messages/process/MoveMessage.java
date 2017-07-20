package org.spaceinvaders.messages.process;


import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by Gemini on 17.07.2017.
 */
public class MoveMessage extends ProcessMessageEntity {
    private int dx;
    private int id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Direction direction;
    public MoveMessage() {
        type = ProcessMessageType.MOVE;
    }
    public MoveMessage(int id,Direction direction, int dx) {
        this();
        this.id = id;
        this.direction = direction;
        this.dx = dx;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDx() {
        return dx;
    }

    public void setDx(int dx) {
        this.dx = dx;
    }
}
