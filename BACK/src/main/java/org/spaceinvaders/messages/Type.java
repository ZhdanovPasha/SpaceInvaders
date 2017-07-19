package org.spaceinvaders.messages;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;

/**
 * Created by Gemini on 17.07.2017.
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum  Type  {MOVE,SHOT,HITTING}
