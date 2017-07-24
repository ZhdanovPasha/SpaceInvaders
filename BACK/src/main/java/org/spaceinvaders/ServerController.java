package org.spaceinvaders;

import org.spaceinvaders.messages.gamelobby.JoinMessage;
import org.spaceinvaders.models.Player;
import org.spaceinvaders.models.StatusInLobby;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by gemini on 24.07.17.
 */
@Controller
public class ServerController {
    ConcurrentHashMap<String,Player> players;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/game")
    void joinServer(JoinMessage message) {
        players.put(message.getName(),new Player(message.getName(), StatusInLobby.NONE,false));
        simpMessagingTemplate.convertAndSend("/game/dest",message);
    }

}
