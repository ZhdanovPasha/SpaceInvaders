package org.spaceinvaders.messages.process;

import org.spaceinvaders.models.Ship;

import java.util.Collection;

/**
 * Created by gemini on 26.07.17.
 */
public class StateMessage extends ProcessMessageEntity{
    private Collection<Ship> ships;

    public StateMessage() {
        type = ProcessMessageType.STATE;
    }

    public StateMessage(Collection<Ship> ships) {
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
