package org.spaceinvaders.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.gamelobby.*;
import org.spaceinvaders.messages.server.IsChoosenSideMessage;
import org.spaceinvaders.messages.server.IsJoinToLobbyMessage;
import org.spaceinvaders.models.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.spaceinvaders.services.GameService;

import java.security.Principal;

/**
 * Created by Gemini on 19.07.2017.
 */
@Controller
@MessageMapping("/lobbyDev")
public class DevLobbyPageController {
    private final Logger log = LoggerFactory.getLogger(DevLobbyPageController.class);
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final GameService gameService;

    public DevLobbyPageController(SimpMessagingTemplate simpMessagingTemplate, GameService gameService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.gameService = gameService;
    }
//ОТПРАВЛЕНИЕ СООБЩЕНИЯ НА ТО, ЧТО ДОБАВЛЕН ИГРОК

    @MessageMapping("{id}/addJoinMessage")
    @SendToUser("/queue/private")
    private IsJoinToLobbyMessage addJoinMessage(@DestinationVariable Integer id, JoinMessageDev message) {
        Boolean rez = gameService.addPlayerToGame(message.getName(),id);
        if (rez)
            log.info(message.getName() + " вошел в лобби "+ id);
        else
            log.info(message.getName()+" не смог войти в лобби");
        return new IsJoinToLobbyMessage(rez);

    }
    //ПРОВЕРКА НА ГОТОВНОСТЬ ВСЕХ
    //ЕСЛИ ИСТИНА, ТО ОТПРАВЛЯЕТСЯ СООБЩЕНИЕ "НАЧАТЬ ИГРУ"(startgame())
    @Scheduled(fixedDelay = 50)
    public  void checkReadyToStart() {
        for (int i = 0; i < gameService.getGamesCount() ; i++) {
            Game game = gameService.findGameById(i);
            if (game.startGame()) {
                game.getLobbyMessages().push(new StartMessage(game.getShips().values()));
            }

        }
    }
    //Выбор каждым игроком фракции
    @MessageMapping("{id}/addChooseSideMessage")
    @SendToUser("/queue/private")
    public IsChoosenSideMessage addChooseSideMessage(@DestinationVariable Integer id, ChooseSideMessage message) {

        if (gameService.findGameById(id).isFractionEnable(message.getSide())) {
            gameService.findPlayerByName(message.getName()).setSide(message.getSide());
            log.info(String.valueOf(gameService.findPlayerByName(message.getName()).getSide()));
            return new IsChoosenSideMessage(true);
        }
        return new IsChoosenSideMessage(false);
    }

    //Нажатие на кнопку ГОТОВ!
    @MessageMapping("{id}/addReadyMessage")
    public void addReadyMessage(ReadyMessage message) {
        gameService.findPlayerByName(message.getName()).setReady(true);
        log.info(message.getName()+" готов");
    }
    //Не готовность игрока, при нажатии НЕ ГОТОВ!
    @MessageMapping("{id}/addNoReadyMessage")
    public void addNoReadyMessage(@DestinationVariable Integer id,NoReadyMessage message) {
        gameService.findPlayerByName(message.getName()).setReady(false);
    }

    @MessageMapping("{id}/addLeaveMessage")
    public void addLeaveMessage(@DestinationVariable Integer id,LeaveMessage message){
        gameService.findPlayerByName(message.getName()).leaveGame();
    }

    //Отправка  сообщений в лобби игры
    @Scheduled(fixedDelay = 100)
    public void hello() {
        for (int i = 0; i < gameService.getGamesCount() ; i++) {
            Game game = gameService.findGameById(i);
                 if (!game.getLobbyMessages().isEmpty()) {
                     simpMessagingTemplate.convertAndSend("/game/lobby/" + i, game.getLobbyMessages());
                     game.getLobbyMessages().clear();
                 }
             }

    }

}