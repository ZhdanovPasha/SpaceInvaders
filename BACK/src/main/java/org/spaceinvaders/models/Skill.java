package org.spaceinvaders.models;

public class Skill {
    private Ship owner;
    private Used used,deactive;
    boolean inUse;
    Skill(Ship owner,Used used,Used deactive) {
        this.owner = owner;
        this.used = used;
        this.deactive = deactive;
    }
    public void activate() {
        if (!inUse) {
            used.apply(owner);
            inUse = true;
        }
    }
    public void deactivate() {
        if (inUse) {
            deactive.apply(owner);
            inUse = false;
        }
    }
}
