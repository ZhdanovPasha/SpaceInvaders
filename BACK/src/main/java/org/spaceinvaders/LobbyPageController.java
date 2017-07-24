package org.spaceinvaders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.gamelobby.*;
import org.spaceinvaders.models.Game;
import org.spaceinvaders.models.Player;
import org.spaceinvaders.models.StatusInLobby;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Gemini on 19.07.2017.
 */
@Controller
@MessageMapping("/lobby")
public class LobbyPageController {
    private Logger log = LoggerFactory.getLogger(LobbyPageController.class);
    @Autowired
    GameService gameService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    //ОТПРАВЛЕНИЕ СООБЩЕНИЯ НА ТО, ЧТО ДОБАВЛЕН ИГРОК

    @MessageMapping("{id}/addJoinMessage")
    private void  addJoinMessage(@DestinationVariable Integer id, JoinMessage message) {
        gameService.addPlayerToGame(message.getName(),id);
        //TODO Доделать
        //e
        //games.get(id).getLobbyMessages().push(message);
    }
    //ПРОВЕРКА НА ГОТОВНОСТЬ ВСЕХ
    //ЕСЛИ ИСТИНА, ТО ОТПРАВЛЯЕТСЯ СООБЩЕНИЕ "НАЧАТЬ ИГРУ"(startgame())
    @Scheduled(fixedDelay = 50)
    public  void checkReadyToStart() {
        boolean isReady;
        if (players.isEmpty()) return;


        for (Map.Entry<String,Player> player:players.entrySet()
                ) {
                if(!player.getValue().getReady()) return;
        }
        simpMessagingTemplate.convertAndSend(new StartMessage());

    }
    //Выбор каждым игроком фракции
    @MessageMapping("{id}/addChooseSideMessage")
    public  void addChooseSideMessage(@DestinationVariable Integer id,ChooseSideMessage message) {
        games.get(id).getLobbyMessages().push(message);

        players.get(message.getName()).setSide(message.getSide());

    }

    //Нажатие на кнопку ГОТОВ!
    @MessageMapping("{id}/addReadyMessage")
    public void addReadyMessage(@DestinationVariable Integer id, ReadyMessage message) {
        games.get(id).getLobbyMessages().push(message);

        players.get(message.getName()).setReady(true);
    }


    //Не готовность игрока, при нажатии НЕ ГОТОВ!
    @MessageMapping("{id}/addNoreadyMessage")
    public void addNoReadyMessage(@DestinationVariable Integer id, NoReadyMessage message) {
        games.get(id).getLobbyMessages().push(message);

        players.get(message.getName()).setReady(false);
    }


    //Основная отправка сообщений
    @Scheduled(fixedDelay = 1)
    public void hello() {
        for (int i = 0; i < games.size() ; i++) {
            Game game = games.get(i);
            if (!game.getLobbyMessages().isEmpty()) {
                simpMessagingTemplate.convertAndSend("/game/lobby/"+i,game.getLobbyMessages());
                game.getLobbyMessages().clear();
            }
        }
            for (Map.Entry<String,Player> player:players.entrySet()) {
                log.info(player.getKey());
            }

            log.info("=================================");

    }


}
