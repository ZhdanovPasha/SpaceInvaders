package org.spaceinvaders.messages.process;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;

/**
 * Created by Gemini on 17.07.2017.
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ProcessMessageType {MOVE,SHOT,HITTING,CREATESHIP,DESTROYSHIP,STOPGAME,STATE,ACTIVATE_SKILL,DEACTIVATE_SKILL}
