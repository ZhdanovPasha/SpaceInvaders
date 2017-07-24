package org.spaceinvaders;

import org.spaceinvaders.models.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by gemini on 20.07.17.
 */
@RestController
@RequestMapping("/login")
public class HelloController {
    @Autowired
    //LinkedList<Player> players;
    ConcurrentHashMap<String,Player> players;

    @RequestMapping("/{name}")
    @ResponseBody
    Boolean isEnable(@PathVariable String name) {
            return (!players.containsKey(name))&&(players.size()<2);
    }


}
