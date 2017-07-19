package org.spaceinvaders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spaceinvaders.messages.*;
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
public class StartPageController {
    private Logger log = LoggerFactory.getLogger(StartPageController.class);

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;



}
