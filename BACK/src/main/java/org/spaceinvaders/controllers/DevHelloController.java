package org.spaceinvaders.controllers;

import org.spaceinvaders.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/devlogin")
public class DevHelloController  {
    @Autowired
    GameService gameService;



    @RequestMapping("/{name}")
    @ResponseBody
    Boolean isEnable(@PathVariable String name) {
        return gameService.checkUnic(name);
    }


}
