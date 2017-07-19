package org.spaceinvaders.messages;


import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by Gemini on 17.07.2017.
 */
public class MessageEntity {
    protected   Type type;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
