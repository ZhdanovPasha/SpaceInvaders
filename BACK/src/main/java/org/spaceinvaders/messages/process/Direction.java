package org.spaceinvaders.messages.process;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by Gemini on 17.07.2017.
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Direction {   NONE,LEFT,RIGHT; }
