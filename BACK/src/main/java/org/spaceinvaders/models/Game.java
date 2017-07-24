package org.spaceinvaders.models;

import org.spaceinvaders.messages.gamelobby.LobbyMessageEntity;
import org.spaceinvaders.messages.process.ProcessMessageEntity;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by gemini on 24.07.17.
 */
public class Game {
    private LinkedList<LobbyMessageEntity> lobbyMessages;
    private LinkedList<ProcessMessageEntity> processMessages;
    private ConcurrentHashMap<String,Player> players;
    public Game() {
        lobbyMessages = new LinkedList<>();
        processMessages = new LinkedList<>();
        players = new ConcurrentHashMap<>();
    }
    public void  addPlayer(Player player) {
        if (player.getGame()!= null) {
            player.getGame().leaveGame(player);
        }
        players.put(player.getName(),player);
        player.setGame(this);
    }
    public  void  leaveGame(Player player) {
        if (!players.contains(player)) return;
        players.remove(player.getName());
        player.setGame(null);
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

    public LinkedList<ProcessMessageEntity> getProcessMessages() {
        return processMessages;
    }

    public void setProcessMessages(LinkedList<ProcessMessageEntity> processMessages) {
        this.processMessages = processMessages;
    }
}
