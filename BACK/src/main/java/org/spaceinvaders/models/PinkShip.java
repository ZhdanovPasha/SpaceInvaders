package org.spaceinvaders.models;

public class PinkShip extends Ship {
    PinkShip(String name, int x, int y,Game game) {
        super(name,x,y,StatusInLobby.PINK,game);
        skills.add(new Skill(this,s-> s.setSpeed(s.getSpeed()*2),s -> s.setSpeed(s.getSpeed()/2)));
        skills.add(new Skill(this,s -> s.setImmortality(true),s -> s.setImmortality(false)));
        skills.add(new Skill(this,s -> s.setBulletSpeed(s.getBulletSpeed()*2),
                s -> s.setBulletSpeed(s.getBulletSpeed()/2)));
    }
}
