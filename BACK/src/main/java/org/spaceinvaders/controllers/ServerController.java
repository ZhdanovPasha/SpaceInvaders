package org.spaceinvaders.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.gamelobby.JoinMessage;
import org.spaceinvaders.messages.gamelobby.LeaveMessage;
import org.spaceinvaders.messages.process.DestroyShipMessage;
import org.spaceinvaders.messages.process.StateMessage;
import org.spaceinvaders.messages.server.JoinServerMessage;
import org.spaceinvaders.models.Game;
import org.spaceinvaders.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ServerController {
    private Logger log = LoggerFactory.getLogger(ServerController.class);
    @Autowired
    GameService gameService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/joinServer")
    void joinServer(JoinServerMessage message) {
        gameService.regPlayer(message.getName());
        log.info(message.getName()+" зарегался");
    }
    @MessageMapping("/leaveServer/{id}")
    void  leaveServer (@DestinationVariable Integer id, LeaveMessage message) {
        Game game = gameService.findGameById(id);
        if (game.getStarted()) {
            game.getShips().get(message.getName()).setDead(true);
            simpMessagingTemplate.convertAndSend("/game/process/"+id,new DestroyShipMessage(message.getName()));

        }
        gameService.leaveServer(message.getName());
        log.info(message.getName()+ " вышел из игры");
    }
}
