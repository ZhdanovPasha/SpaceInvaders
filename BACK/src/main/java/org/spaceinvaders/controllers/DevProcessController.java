package org.spaceinvaders.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.process.*;
import org.spaceinvaders.models.*;
import org.spaceinvaders.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import java.util.LinkedList;
import java.util.concurrent.PriorityBlockingQueue;


@Controller
@MessageMapping("/processDev")
public class DevProcessController {
    private Logger log = LoggerFactory.getLogger(DevProcessController.class);
    int i;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private GameService gameService;
    @MessageMapping("{id}/addShotMessage")
    public void  addShotMessage(@DestinationVariable Integer id, ShotMessage message) throws InterruptedException {
        Game game = gameService.findGameById(id);
        if (game.getStarted()){
            game.findShipByName(message.getName()).findBulletById(message.getNumBullet()).shot();
            game.getProcessMessages().put(message);
            log.info("Пришло сообщение о выстреле");
        }

        //gameService.findGameById(id).getProcessMessages().put(message);
    }

    @MessageMapping("{id}/addCreateMessage")
    public void addCreateMessage(@DestinationVariable Integer id,CreateShipMessage message) throws InterruptedException {
        gameService.findGameById(id).getProcessMessages().put(message);
    }
    @MessageMapping("{id}/addActivateSkillMessage")
    public void addActivateSkillMessage(@DestinationVariable Integer id, ActivateSkillMessage message) throws InterruptedException {
        Game game = gameService.findGameById(id);
        if (game.getStarted()) {
            game.findShipByName(message.getName()).findSkillById(message.getNum()).activate();
            game.getProcessMessages().put(message);
        }
    }
    @MessageMapping("{id}/addDeactivateSkillMessage")
    public void addDeactivateSkillMessage(@DestinationVariable Integer id, ActivateSkillMessage message) throws InterruptedException {
        Game game = gameService.findGameById(id);
        if (game.getStarted()) {
            game.findShipByName(message.getName()).findSkillById(message.getNum()).deactivate();
            game.getProcessMessages().put(message);
        }

    }

    @MessageMapping("{id}/addHitMessage")
    public void addHitMessage(@DestinationVariable Integer id,HitMessage message) throws InterruptedException {
        Game game = gameService.findGameById(id);
        if (game.getStarted()){
            game.getShips().get(message.getName()).findBulletById(message.getNumBullet()).destroyBull();
            game.getShips().get(message.getName()).setScores(100);
            game.getProcessMessages().put(message);
            log.info("Игрок "+message.getName()+" получил 100 очков");
        }

    }

    @MessageMapping("{id}/addHitBotMessage")
    public void addHitBotMessage(@DestinationVariable Integer id,HitBotMessage message) throws InterruptedException {
        Game game = gameService.findGameById(id);
        if (game.getStarted()){
            game.getShips().get(message.getName()).findBotById(message.getNumBot()).setEnabled(false);
            game.getProcessMessages().put(message);
            log.info("У игрока "+message.getName()+" убили бота");
            log.info("у бота Enable=" + game.getShips().get(message.getName()).findBotById(message.getNumBot()).isEnabled());
        }
    }

    @MessageMapping("{id}/addMoveMessage")
    public void addMoveMessage(@DestinationVariable Integer id,MoveMessage message) throws InterruptedException {
        Game game = gameService.findGameById(id);
        if (game.getStarted()) {
            if (message.getDirection() == Direction.LEFT)
                game.getShips().get(message.getName()).moveLeft();
            else if (message.getDirection() == Direction.RIGHT)
                game.getShips().get(message.getName()).moveRight();
            game.getProcessMessages().put(message);
        }
    }


    @MessageMapping("{id}/addDestroyMessage")
    public  void addDestroyMessage(@DestinationVariable Integer id,DestroyShipMessage message) throws InterruptedException {
        Game game = gameService.findGameById(id);
        if (game.getStarted())
            game.getShips().get(message.getName()).setDead(true);
        //messages.put(message);
    }
    @Scheduled(fixedDelay = 100)
    public void getState() {
        for (int j = 0; j <gameService.getGamesCount() ; j++) {
            Game game =  gameService.findGameById(j);
            simpMessagingTemplate.convertAndSend("/game/process/"+j,new StateMessage(game.getShips().values()));
            if (game.checkForEnd()) {
                game.resetGame();
                log.info("Игра закончена");
            }
        }
    }

    @Scheduled(fixedDelay = 10)
    public void hello() throws InterruptedException {
        for (int j = 0; j < gameService.getGamesCount() ; j++) {
            LinkedList<ProcessMessageEntity> mes = new LinkedList<>();
            Game game =  gameService.findGameById(j);
            if (!game.getProcessMessages().isEmpty()) {
                int size = game.getProcessMessages().size();
                for (int i = 0; i < size ; i++) {
                    mes.push(game.getProcessMessages().take());
                }
                simpMessagingTemplate.convertAndSend("/game/process/"+j, mes);
                log.info("send");
            }
        }
    }


}