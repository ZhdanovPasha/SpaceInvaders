package org.spaceinvaders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.gamelobby.*;
import org.spaceinvaders.models.Player;
import org.spaceinvaders.models.StatusInLobby;
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
    private LinkedList<Player> players;
    @Autowired
    private LinkedList<LobbyMessageEntity> messages;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    //ОТПРАВЛЕНИЕ СООБЩЕНИЯ НА ТО, ЧТО ДОБАВЛЕН ИГРОК
    @MessageMapping("/addJoinMessage")
    private void  addJoinMessage(JoinMessage message) {
        players.push(new Player(message.getName(), StatusInLobby.NONE,false));
        messages.push(message);
    }
    //ПРОВЕРКА НА ГОТОВНОСТЬ ВСЕХ
    //ЕСЛИ ИСТИНА, ТО ОТПРАВЛЯЕТСЯ СООБЩЕНИЕ "НАЧАТЬ ИГРУ"(startgame())
    @Scheduled(fixedDelay = 50)
    public  void checkReadyToStart() {
        boolean isReady;
        if (players.isEmpty()) return;
        for (Player player: players) {
            if (!player.getReady()) return;
        }
        simpMessagingTemplate.convertAndSend(new StartMessage());

    }
    //Выбор каждым игроком фракции
    @MessageMapping("/addChooseSideMessage")
    public  void addChooseSideMessage(ChooseSideMessage message) {
        messages.push(message);
        for (Player player :players) {
            if (player.getName() == message.getName()) {
                player.setSide(message.getSide()) ;
            }
        }
    }

    //Нажатие на кнопку ГОТОВ!
    @MessageMapping("/addReadyMessage")
    public void addReadyMessage(ReadyMessage message) {
        messages.push(message);
        for (Player player : players) {
            if (player.getName() == message.getName()) {
                player.setReady(true);
                break;
            }
        }
    }


    //Не готовность игрока, при нажатии НЕ ГОТОВ!
    @MessageMapping("/addNoreadyMessage")
    public void addNoReadyMessage(NoReadyMessage message) {
        messages.push(message);
        for (Player player: players) {
            if (player.getName() == message.getName()) {
                player.setReady(false);
                break;
            }
        }
    }


    //Основная отправка сообщений
    @Scheduled(fixedDelay = 10)
    public void hello() {
        if (!messages.isEmpty()) {
            simpMessagingTemplate.convertAndSend("/game/lobby", messages);
            messages.clear();
            log.info("send");
        }

    }


}
