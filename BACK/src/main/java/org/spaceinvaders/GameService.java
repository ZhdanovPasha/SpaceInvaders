package org.spaceinvaders;

import org.omg.CosNaming.NamingContextExtPackage.StringNameHelper;
import org.spaceinvaders.models.Game;
import org.spaceinvaders.models.Player;
import org.spaceinvaders.models.StatusInLobby;
import org.springframework.aop.target.LazyInitTargetSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by gemini on 24.07.17.
 */
@Service
public class GameService {
    @Autowired
    private LinkedList<Game> games;
    @Autowired
    private ConcurrentHashMap<String,Player> players;
    public   Player findPlayerByName (String name) {
      return   players.get(name);
    }
    public   boolean regPlayer(String name) {
        if (players.containsKey(name)) return false;
        players.put(name, new Player(name, StatusInLobby.NONE,false));
        return true;
    }
    public Game findGameById(int index) {
        return games.get(index);
    }
    public LinkedList<Game> getGamesList() {
        return games;
    }
    //добавить игрока в игру
    public boolean addPlayerToGame(String name, int GameIndex ) {
        findGameById(GameIndex).addPlayer(findPlayerByName(name));
        return true;
    }
    public void leaveGame(String name) {
        Player player = findPlayerByName(name);
        Game game  = player.getGame();
        if (game!=null) game.leaveGame(player);
    }

}
