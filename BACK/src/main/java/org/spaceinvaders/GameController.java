package org.spaceinvaders;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.process.*;
import org.spaceinvaders.models.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.LinkedList;


/**
 * Created by Gemini on 17.07.2017.
 */
@Controller
@MessageMapping("/process")
public class GameController {
    private Logger log = LoggerFactory.getLogger(GameController.class);

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private LinkedList<Game> games;

    @MessageMapping("{id}/addShotMessage")
    public void  addShotMessage(@DestinationVariable Integer id, ShotMessage message) {
        games.get(id).getProcessMessages().push(message);
    }


    @MessageMapping("{id}/addCreateMessage")
    public void addCreateMessage(@DestinationVariable Integer id, CreateShipMessage message) {
        games.get(id).getProcessMessages().push(message);
    }


    @MessageMapping("{id}/addHitMessage")
    public void addHitMessage(@DestinationVariable Integer id, HitMessage message) {

        games.get(id).getProcessMessages().push(message);
    }


    @MessageMapping("{id}/addMoveMessage")
    public void addMoveMessage(@DestinationVariable Integer id, MoveMessage message) {
        games.get(id).getProcessMessages().push(message);
    }


    @MessageMapping("{id}/addDestroyMessage")
    public  void addDestroyMessage(@DestinationVariable Integer id,DestroyShipMessage message) {
        games.get(id).getProcessMessages().push(message);

    }


    @Scheduled(fixedDelay = 16)
    public void hello() {
        for (int i = 0; i < games.size() ; i++) {
            Game game = games.get(i);
            if ( !game.getProcessMessages().isEmpty()) {
                simpMessagingTemplate.convertAndSend("/game/process" + i, game.getProcessMessages());
                game.getProcessMessages().clear();
            }
        }


    }



}
