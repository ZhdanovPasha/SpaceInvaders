package org.spaceinvaders.messages.process;

import org.spaceinvaders.messages.TimeStamped;

import java.util.Date;

/**
 * Created by Gemini on 17.07.2017.
 */
public class ShotMessage extends ProcessMessageEntity {
    private String name;
    private Date timeStamp;
    public ShotMessage(){
        type = ProcessMessageType.SHOT;
    }
    public ShotMessage(String name,Date timeStamp) {
        this();
        this.name = name;
        this.timeStamp = timeStamp;
    }


    public String getName() {
        return name;
    }



    public void setName(String name) {
        this.name = name;
    }

    public Date getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        this.timeStamp = timeStamp;
    }
}
