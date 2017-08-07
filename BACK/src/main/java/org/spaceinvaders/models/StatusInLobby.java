package org.spaceinvaders.models;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by gemini on 20.07.17.
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum StatusInLobby {

    NONE,PINK,BLUE
}
