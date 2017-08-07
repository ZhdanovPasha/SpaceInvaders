package org.spaceinvaders.messages.gamelobby;

import org.spaceinvaders.models.Player;
import org.spaceinvaders.models.Ship;

import java.util.Collection;

/**
 * Created by Gemini on 19.07.2017.
 */
public class StartMessage extends LobbyMessageEntity {
    private Collection<Ship> ships;
    public StartMessage() {
        type = LobbyMessageType.START;
    }

    public StartMessage(Collection<Ship> ships) {
        this();
        this.ships = ships;
    }

    public Collection<Ship> getShips() {
        return ships;
    }

    public void setShips(Collection<Ship> ships) {
        this.ships = ships;
    }
}
