package org.spaceinvaders.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.gamelobby.JoinMessage;
import org.spaceinvaders.messages.gamelobby.LeaveMessage;
import org.spaceinvaders.messages.process.DestroyShipMessage;
import org.spaceinvaders.messages.process.StateMessage;
import org.spaceinvaders.messages.server.JoinServerMessage;
import org.spaceinvaders.messages.server.PreferLobbyMessage;
import org.spaceinvaders.models.Game;
import org.spaceinvaders.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class ServerController {
    private final Logger log = LoggerFactory.getLogger(ServerController.class);
    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public ServerController(GameService gameService, SimpMessagingTemplate simpMessagingTemplate) {
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/joinServer")
    void joinServer(JoinServerMessage message) {
        gameService.regPlayer(message.getName());
        log.info(message.getName()+" зарегался");
    }
    @MessageMapping("/leaveServer")
    void  leaveServer (LeaveMessage message) throws InterruptedException {

        gameService.leaveServer(message.getName());
        log.info(message.getName()+ " вышел из игры");
    }
    @MessageMapping("/getPreferLobby")
    @SendToUser("/queue/private")
    PreferLobbyMessage getPreferLobby() {
        return new PreferLobbyMessage(gameService.findIndexWithMaxCountOfPlayers());
    }
}