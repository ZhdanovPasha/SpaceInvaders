package org.spaceinvaders;

import org.spaceinvaders.messages.gamelobby.LeaveMessage;
import org.spaceinvaders.messages.gamelobby.LobbyMessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;

import java.util.LinkedList;

/**
 * Created by gemini on 20.07.17.
 */
@Component
public class CustomWebSocketHandlerDecorator extends WebSocketHandlerDecorator {

    private LinkedList<LobbyMessageEntity> messages;
    @Autowired
    public void setMessages(LinkedList<LobbyMessageEntity> messages) {
        this.messages = messages;
    }

    public CustomWebSocketHandlerDecorator(WebSocketHandler delegate) {
        super(delegate);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        messages.push(new LeaveMessage());
        super.afterConnectionClosed(session, closeStatus);
    }
}
