package org.spaceinvaders.messages.gamelobby;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by Gemini on 19.07.2017.
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum LobbyMessageType {CHOOSESIDE,JOIN,READY,START}