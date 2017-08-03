package org.spaceinvaders.models;


import org.spaceinvaders.messages.gamelobby.LobbyMessageEntity;
import org.spaceinvaders.messages.process.ProcessMessageEntity;

import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * Created by gemini on 24.07.17.
 */
public class Game {

    private LinkedList<LobbyMessageEntity> lobbyMessages;
    private LinkedBlockingQueue<ProcessMessageEntity> processMessages;
    private  ConcurrentHashMap<String,Ship> ships;
    private Boolean isStarted;
    private ConcurrentHashMap<String,Player> players;
    public Game() {
        lobbyMessages = new LinkedList<>();
        processMessages = new LinkedBlockingQueue<>();
        players = new ConcurrentHashMap<>();
        ships = new ConcurrentHashMap<>();
        isStarted = false;
    }
    //Добавление игрока в игру, если игра еще не началась
    public void  addPlayer(Player player) {
        if (!isStarted) {
        if (player.getGame()!= null) {
            player.getGame().leaveGame(player);
        }
        players.put(player.getName(),player);
        player.setGame(this);
        }
    }
    public  void  leaveGame(Player player) {
        if (!players.contains(player)) return;
        players.remove(player.getName());
        ships.remove(player.getName());
        player.setReady(false);
        player.setSide(StatusInLobby.NONE);
        player.setGame(null);
    }
    public boolean startGame () {
        if (!isStarted&&readyCheck()) {
            for (Map.Entry<String,Player> player:players.entrySet()) {
                Player player1 = player.getValue();
                ships.put(player1.getName(),new Ship(player1.getName(),Conf.getBeginPosX(),
                        Conf.getBeginPosY(),player1.getSide(),this));
            }
            isStarted = true;
            return true;
        }
        return false;
    }

    public ConcurrentHashMap<String, Ship> getShips() {
        return ships;
    }

    public void setShips(ConcurrentHashMap<String, Ship> ships) {
        this.ships = ships;
    }

    public boolean readyCheck() {
        boolean rez = true;
        for (Map.Entry<String,Player> player:players.entrySet()) {
            if (!(player.getValue().getReady())) {
                rez = false;
                break;
            }
        }

        if ((players.size()==2)&&rez) System.out.println("111111");
        return (players.size()==2)&&rez;
    }
    public void resetGame() {
        if (isStarted) {
            isStarted = false;
            for (Map.Entry<String, Player> player : players.entrySet()) {
                player.getValue().leaveGame();
            }
        }
    }
    public  boolean  checkForEnd () {
        if(isStarted){
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

    public boolean  containsPlayer(Player player) {
        return players.contains(player);
    }
    public ConcurrentHashMap<String, Player> getPlayers() {
        return players;
    }

    public void setPlayers(ConcurrentHashMap<String, Player> players) {
        this.players = players;
    }

    public LinkedList<LobbyMessageEntity> getLobbyMessages() {
        return lobbyMessages;
    }

    public void setLobbyMessages(LinkedList<LobbyMessageEntity> lobbyMessages) {
        this.lobbyMessages = lobbyMessages;
    }

    public LinkedBlockingQueue<ProcessMessageEntity> getProcessMessages() {
        return processMessages;
    }

    public void setProcessMessages(LinkedBlockingQueue<ProcessMessageEntity> processMessages) {
        this.processMessages = processMessages;
    }

    public Boolean getStarted() {
        return isStarted;
    }

    public void setStarted(Boolean started) {
        isStarted = started;
    }
}