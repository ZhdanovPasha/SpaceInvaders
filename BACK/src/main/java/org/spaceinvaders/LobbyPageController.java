package org.spaceinvaders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.gamelobby.JoinMessage;
import org.spaceinvaders.messages.gamelobby.LobbyMessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.LinkedList;

/**
 * Created by Gemini on 19.07.2017.
 */
@Controller
@MessageMapping("/lobby")
public class LobbyPageController {
    private Logger log = LoggerFactory.getLogger(LobbyPageController.class);
    @Autowired
    private LinkedList<LobbyMessageEntity> messages;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/addJoinMessage")
    private void  addJoinMessage(JoinMessage message) {
        messages.push(message);
    }
    @Scheduled(fixedDelay = 100)
    public void hello() {
        if (!messages.isEmpty()) {
            simpMessagingTemplate.convertAndSend("/game/lobby", messages);
            messages.clear();
            log.info("send");
        }

    }


}
