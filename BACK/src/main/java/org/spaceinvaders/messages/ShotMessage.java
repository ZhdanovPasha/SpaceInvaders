package org.spaceinvaders.messages;

import java.util.Date;

/**
 * Created by Gemini on 17.07.2017.
 */
public class ShotMessage extends MessageEntity {
    private int id;
    private Date time;
    public ShotMessage(){

    }
    public ShotMessage(int id,Date time) {
        type = Type.SHOT;
        this.id = id;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
