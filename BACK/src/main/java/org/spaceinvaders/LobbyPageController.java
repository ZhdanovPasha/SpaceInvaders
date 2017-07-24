package org.spaceinvaders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.gamelobby.*;
import org.spaceinvaders.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;
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
    private HashMap<String,Ship> ships;
    @Autowired
    private ConcurrentHashMap<String,Player> players;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private Conf conf;
    @Autowired
    private MyBool gameStarted;

    //ОТПРАВЛЕНИЕ СООБЩЕНИЯ НА ТО, ЧТО ДОБАВЛЕН ИГРОК

    @MessageMapping("/addJoinMessage")
    private void  addJoinMessage(JoinMessage message) {
        players.put(message.getName(),new Player(message.getName(),message.getStat(),true));
        messages.push(message);
    }
    //ПРОВЕРКА НА ГОТОВНОСТЬ ВСЕХ
    //ЕСЛИ ИСТИНА, ТО ОТПРАВЛЯЕТСЯ СООБЩЕНИЕ "НАЧАТЬ ИГРУ"(startgame())
    @Scheduled(fixedDelay = 50)
    public  void checkReadyToStart() {
        boolean isReady;
        if (players.isEmpty()||gameStarted.getStarted()) return;
        if (players.size()==2) {

            for (Map.Entry<String,Player> player:players.entrySet()) {
                Player player1 = player.getValue();
                ships.put(player1.getName(),new Ship(player1.getName(),conf.getBeginPosX(),
                        conf.getBeginPosY(),conf.getSpeed(),player1.getSide()));
            }
            messages.push(new StartMessage(ships.values()));
            gameStarted.setStarted(true);
            log.info(String.valueOf(gameStarted));
        }

        //for (Map.Entry<String,Player> player:players.entrySet()
         //       ) {
         //       if(!player.getValue().getReady()) return;
        //}
        //simpMessagingTemplate.convertAndSend(new StartMessage());

    }
    //Выбор каждым игроком фракции
    @MessageMapping("/addChooseSideMessage")
    public  void addChooseSideMessage(ChooseSideMessage message) {
        players.get(message.getName()).setSide(message.getSide());

        messages.push(message);


    }

    //Нажатие на кнопку ГОТОВ!
    @MessageMapping("/addReadyMessage")
    public void addReadyMessage(ReadyMessage message) {
        players.get(message.getName()).setReady(true);
        messages.push(message);


    }


    //Не готовность игрока, при нажатии НЕ ГОТОВ!
    @MessageMapping("/addNoreadyMessage")
    public void addNoReadyMessage(NoReadyMessage message) {
        players.get(message.getName()).setReady(false);
        messages.push(message);

    }

    @MessageMapping("/addLeaveMessage")
    public void addLeaveMessage(LeaveMessage message){
        players.remove(message.getName());

        messages.push(message);
    }


    //Основная отправка сообщений
    @Scheduled(fixedDelay = 1)
    public void hello() {
        if (!messages.isEmpty()) {
            simpMessagingTemplate.convertAndSend("/game/lobby", messages);
            messages.clear();
            for (Map.Entry<String,Player> player:players.entrySet()) {
                log.info(player.getKey());
                log.info(String.valueOf(player.getValue().getSide()));
                log.info(String.valueOf(player.getValue().getReady()));

            }

            log.info("=================================");

    }


}
