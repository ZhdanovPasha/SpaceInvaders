package org.spaceinvaders.messages.process;

public class ActivateSkillMessage extends ProcessMessageEntity {
    private String name;
    private int num;

    public ActivateSkillMessage() {
        this.type = ProcessMessageType.ACTIVATE_SKILL;

    }

    public ActivateSkillMessage(String name, int index) {
        this();
        this.name = name;
        this.num = index;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
