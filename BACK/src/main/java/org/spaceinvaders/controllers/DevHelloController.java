package org.spaceinvaders.controllers;

import org.spaceinvaders.models.StatusInLobby;
import org.spaceinvaders.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/checks")
public class DevHelloController  {
    @Autowired
    GameService gameService;



    @RequestMapping("/login/{name}")
    @ResponseBody
    Boolean isLoginEnable(@PathVariable String name) {
        return gameService.checkUnic(name);
    }
    @RequestMapping("/fraction/{name}")
    @ResponseBody
    Boolean isFractionEnable(@PathVariable String name) {
        if (name.equals("BlUE")) {
            return gameService.findGameById(0).isFractionEnable(StatusInLobby.BLUE);
        } else if (name.equals("PINK")) {
            return gameService.findGameById(0).isFractionEnable(StatusInLobby.PINK);
        } else  return false;

    }

}
