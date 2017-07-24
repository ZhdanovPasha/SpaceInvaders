package org.spaceinvaders.messages.gamelobby;

import org.spaceinvaders.models.Player;

import java.util.Collection;

/**
 * Created by Gemini on 19.07.2017.
 */
public class StartMessage extends LobbyMessageEntity {
    private Collection<Player> players;
    public StartMessage() {
        type = LobbyMessageType.START;
    }

    public StartMessage(Collection<Player> players) {
        this();
        this.players = players;
    }

    public Collection<Player> getPlayers() {
        return players;
    }

    public void setPlayers(Collection<Player> players) {
        this.players = players;
    }
}
