package org.spaceinvaders.messages.process;


import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by Gemini on 17.07.2017.
 */
public class ProcessMessageEntity {
    protected ProcessMessageType type;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public ProcessMessageType getType() {
        return type;
    }

    public void setType(ProcessMessageType type) {
        this.type = type;
    }
}
