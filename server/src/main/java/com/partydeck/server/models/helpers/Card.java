package com.partydeck.server.models.helpers;

/**
 * An object representing a card in the game
 * @author Itay Schechner
 * @version 1.0
 */
public class Card implements Identifiable<String> {

    private final String id;

    private final String content;

    public Card(String id, String content) {
        this.id = id;
        this.content = content;
    }

    @Override
    public boolean is(String id) {
        return this.id.equals(id);
    }

    @Override
    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    @Override
    public String toString() {
        return "Card{" +
                "id='" + id + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
