package org.spaceinvaders.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.gamelobby.JoinMessage;
import org.spaceinvaders.messages.gamelobby.LeaveMessage;
import org.spaceinvaders.messages.server.JoinServerMessage;
import org.spaceinvaders.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ServerController {
    private Logger log = LoggerFactory.getLogger(ServerController.class);
    @Autowired
    GameService gameService;
    @MessageMapping("/joinServer")
    void joinServer(JoinServerMessage message) {
        gameService.regPlayer(message.getName());
        log.info(message.getName()+" зарегался");
    }
    @MessageMapping("/leaveServer")
    void  leaveServer (LeaveMessage message) {
        gameService.leaveServer(message.getName());
    }
}