package org.spaceinvaders.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.gamelobby.*;
import org.spaceinvaders.models.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.spaceinvaders.services.GameService;

/**
 * Created by Gemini on 19.07.2017.
 */
@Controller
@MessageMapping("/lobbyDev")
public class DevLobbyPageController {
    private Logger log = LoggerFactory.getLogger(DevLobbyPageController.class);
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    GameService gameService;
    //ОТПРАВЛЕНИЕ СООБЩЕНИЯ НА ТО, ЧТО ДОБАВЛЕН ИГРОК

    @MessageMapping("{id}/addJoinMessage")
    private void  addJoinMessage(@DestinationVariable Integer id, JoinMessageDev message) {
        gameService.addPlayerToGame(message.getName(),id);
    }
    //ПРОВЕРКА НА ГОТОВНОСТЬ ВСЕХ
    //ЕСЛИ ИСТИНА, ТО ОТПРАВЛЯЕТСЯ СООБЩЕНИЕ "НАЧАТЬ ИГРУ"(startgame())
    @Scheduled(fixedDelay = 50)
    public  void checkReadyToStart() {
        for (int i = 0; i < gameService.getGamesCount() ; i++) {
            Game game = gameService.findGameById(i);
            game.startGame();
            if (game.getStarted()) {
                game.getLobbyMessages().push(new StartMessage(game.getShips().values()));
            }
        }
    }
    //Выбор каждым игроком фракции
    @MessageMapping("{id}/addChooseSideMessage")
    public  void addChooseSideMessage(@DestinationVariable Integer id, ChooseSideMessage message) {
            gameService.findPlayerByName(message.getName()).setSide(message.getSide());
            log.info(String.valueOf(gameService.findPlayerByName(message.getName()).getSide()));

    }

    //Нажатие на кнопку ГОТОВ!
    @MessageMapping("{id}/addReadyMessage")
    public void addReadyMessage(ReadyMessage message) {
        gameService.findPlayerByName(message.getName()).setReady(true);
        log.info(String.valueOf(gameService.findPlayerByName(message.getName()).getReady()));
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
        for (int i = 0; i <gameService.getGamesCount() ; i++) {
            if (!gameService.findGameById(i).getLobbyMessages().isEmpty()) {
                simpMessagingTemplate.convertAndSend("/game/lobby/"+i, gameService.findGameById(i).getLobbyMessages());
                gameService.findGameById(i).getLobbyMessages().clear();
            }
        }
    }


}
