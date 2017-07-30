package org.spaceinvaders.services;

import org.spaceinvaders.messages.gamelobby.LobbyMessageEntity;
import org.spaceinvaders.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.concurrent.ConcurrentHashMap;
@Service
public class GameService {
    @Autowired
    private LinkedList<Game> games;
    @Autowired
    private ConcurrentHashMap<String,Player> players;


    @Scheduled(fixedDelay = 16)
    void updateBullets() {
        for (Ship ship:getAllShips()) {
          ship.moveBullets();
        }
    }
    public   Player findPlayerByName (String name) {
        return   players.get(name);
    }
    public   boolean regPlayer(String name) {
        if (players.containsKey(name)) return false;
        players.put(name, new Player(name, StatusInLobby.NONE,false));
        return true;
    }
    public LinkedList<Ship> getAllShips() {
        LinkedList<Ship> ships = new LinkedList<>();
         for (Game game: games) {
             ships.addAll(game.getShips().values());
         }
        return ships;
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
    public void leaveServer(String name) {
        Player player = findPlayerByName(name);
        player.leaveGame();
        players.remove(name);
    }
    public void leaveGame(String name) {
        Player player = findPlayerByName(name);
        player.leaveGame();
    }
    public int getGamesCount() {
        return games.size();
    }
    public boolean checkGameForReady(int id) {
       return findGameById(id).readyCheck();
    }
    public boolean checkUnic(String name) {
        return !players.containsKey(name);
    }


    LinkedList<LobbyMessageEntity> getLobbyMessages(int index) {
        return games.get(index).getLobbyMessages();
    }
}