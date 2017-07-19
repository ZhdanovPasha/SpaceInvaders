package org.spaceinvaders;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.MessageEntity;
import org.spaceinvaders.messages.ShotMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.LinkedList;


/**
 * Created by Gemini on 17.07.2017.
 */
@Controller
public class GameController {
    private Logger log = LoggerFactory.getLogger(GameController.class);

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private LinkedList<MessageEntity> messages;

    @MessageMapping("/addshotmessage")
    public void  addShotMessage(ShotMessage messageEntity){
        messages.push(messageEntity);
    }



    @Scheduled(fixedDelay = 16)
    public void hello() {
            if (!messages.isEmpty()) {
                simpMessagingTemplate.convertAndSend("/hello", messages);
                messages.clear();
                log.info("send");
            }

    }



}
