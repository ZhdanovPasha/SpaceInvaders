package org.spaceinvaders;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.process.*;
import org.spaceinvaders.models.MyBool;
import org.spaceinvaders.models.Player;
import org.spaceinvaders.models.Ship;
import org.spaceinvaders.models.StatusInLobby;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;


/**
 * Created by Gemini on 17.07.2017.
 */
@Controller
@MessageMapping("/process")
public class GameController {
    private Logger log = LoggerFactory.getLogger(GameController.class);
    int i;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private HashMap<String,Ship> ships;
    @Autowired
    private ConcurrentHashMap<String,Player> players;
    @Autowired
    private LinkedBlockingQueue<ProcessMessageEntity> messages;
    @Autowired
    private MyBool gameStarted;
    @MessageMapping("/addShotMessage")
    public void  addShotMessage(ShotMessage message) throws InterruptedException {
        messages.put(message);
    }
    public boolean checkForEnd() {
        if(gameStarted.getStarted()){
        boolean rez1 = true;
        boolean rez2 = true;

        LinkedList<Ship> blueShips = new LinkedList<>();
        LinkedList<Ship> pinkShips = new LinkedList<>();
        for (Map.Entry<String,Ship> ship:ships.entrySet()) {
            if (ship.getValue().getFraction()==StatusInLobby.BLUE) {
                blueShips.push(ship.getValue());
            } else pinkShips.push(ship.getValue());
        }
        for (Ship ship:blueShips) {
            if (!ship.isDead()) {
                rez1 = false;
                break;
            }
        }
        for (Ship ship:pinkShips) {
            if (!ship.isDead()) {
                rez2 = false;
                break;
            }
        }
        return rez1||rez2;}
        else
    return false;
    }

    @MessageMapping("/addCreateMessage")
    public void addCreateMessage(CreateShipMessage message) throws InterruptedException {
        messages.put(message);
    }


    @MessageMapping("/addHitMessage")
    public void addHitMessage(HitMessage message) throws InterruptedException {
        if (gameStarted.getStarted()) {
            messages.put(message);
        }
    }


    @MessageMapping("/addMoveMessage")
    public void addMoveMessage(MoveMessage message) throws InterruptedException {
        log.info(gameStarted.toString());
        if (gameStarted.getStarted()) {
            log.info("!!");
            if (message.getDirection() == Direction.LEFT)
                ships.get(message.getName()).moveLeft();
            else if (message.getDirection() == Direction.RIGHT)
                ships.get(message.getName()).moveRight();

            messages.put(message);
        }
    }


    @MessageMapping("/addDestroyMessage")
    public  void addDestroyMessage(DestroyShipMessage message) throws InterruptedException {
        if (!ships.isEmpty())
        ships.get(message.getName()).setDead(true);
        //messages.put(message);
    }
    @Scheduled(fixedDelay = 100)
    public void getState() {

        simpMessagingTemplate.convertAndSend("/game/process",new StateMessage(ships.values()));
        if (checkForEnd()){
            log.info("Игра закончилась");
            ships.clear();
            players.clear();
            gameStarted.setStarted(false);
        }
    }

    @Scheduled(fixedDelay = 1)
    public void hello() throws InterruptedException {
        LinkedList<ProcessMessageEntity> mes = new LinkedList<>();
            if (!messages.isEmpty()) {
                int size = messages.size();
                for (int i = 0; i < size ; i++) {
                    mes.push(messages.take());
                }
                simpMessagingTemplate.convertAndSend("/game/process", mes);
                log.info("send");
            }

    }



}
