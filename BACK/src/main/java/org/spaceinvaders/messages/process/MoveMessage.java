package org.spaceinvaders.messages.process;


import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by Gemini on 17.07.2017.
 */
public class MoveMessage extends ProcessMessageEntity {
    private int dx;
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Direction direction;
    public MoveMessage() {
        type = ProcessMessageType.MOVE;
    }
    public MoveMessage(String name,Direction direction, int dx) {
        this();
        this.name= name;
        this.direction = direction;
        this.dx = dx;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }

    public int getDx() {
        return dx;
    }

    public void setDx(int dx) {
        this.dx = dx;
    }
}
