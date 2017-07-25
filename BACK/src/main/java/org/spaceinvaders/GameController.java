package org.spaceinvaders;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.process.*;
import org.spaceinvaders.models.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.Collection;
import java.util.LinkedList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;


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
    private LinkedBlockingQueue<ProcessMessageEntity> messages;

    @MessageMapping("/addShotMessage")
    public void  addShotMessage(ShotMessage message) throws InterruptedException {
        messages.put(message);
    }


    @MessageMapping("/addCreateMessage")
    public void addCreateMessage(CreateShipMessage message) throws InterruptedException {
        messages.put(message);
    }


    @MessageMapping("/addHitMessage")
    public void addHitMessage(HitMessage message) throws InterruptedException {

        messages.put(message);
    }


    @MessageMapping("/addMoveMessage")
    public void addMoveMessage(MoveMessage message) throws InterruptedException {

        messages.put(message);
    }


    @MessageMapping("/addDestroyMessage")
    public  void addDestroyMessage(DestroyShipMessage message) throws InterruptedException {

        messages.put(message);
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
