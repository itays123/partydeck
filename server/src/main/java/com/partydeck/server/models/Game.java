package com.partydeck.server.models;

import com.partydeck.server.models.player.Player;
import com.partydeck.server.models.player.PlayerEventListener;
import com.partydeck.server.models.shared.Card;
import com.partydeck.server.models.shared.Circle;
import com.partydeck.server.models.shared.Deck;
import com.partydeck.server.models.shared.Identifiable;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * An object representing the game
 * @author Itay Schechner
 * @version 1.0
 */
public class Game implements PlayerEventListener, Identifiable<String> {

    public static final int TIMEOUT = 30 * 1000; // 30 seconds
    public static final int DELAY = 5 * 1000; // 5 seconds

    private String id;

    private Circle<String, Player> players;
    private Deck<String, Card> questionDeck;
    private Deck<String, Card> answerDeck;

    private Map<Card, Player> roundCache;
    private Set<Player> notPicked;

    private boolean started;
    private boolean stopRequested;

    private GameEventListener eventListener;

    /**
     * Creates an empty game
     */
    public Game() {
        this.id = "";
        this.players = new Circle<>();
        this.questionDeck = new Deck<>();
        this.answerDeck = new Deck<>();
        this.roundCache = new HashMap<>();
        this.notPicked = new HashSet<>();
        this.started = false;
        this.stopRequested = false;
        this.eventListener = null;
    }

    /**
     * Creates a new Game object
     * @param id the id of the game
     * @param questions the game card questions
     * @param answers the game card answers
     */
    public Game(String id, Iterable<Card> questions, Iterable<Card> answers) {
        this();
        this.id = id;
        this.questionDeck = new Deck<>(questions);
        this.answerDeck = new Deck<>(answers);
    }


    /**
     * Fires every time a player uses a card
     *
     * @param card   the card used
     * @param player the player that used the card
     * @return the new card to be added
     */
    @Override
    public Card onCardUse(Card card, Player player) {
        answerDeck.insertCardInBottom(card);
        // TODO: Use cache
        return answerDeck.pickTopCard().orElse(card);
    }

    /**
     * Fires when the admin requests to start the game
     */
    @Override
    public void onStartRequest(Player player) {

    }

    /**
     * Fires when the admin requests to stop the game
     */
    @Override
    public void onStopRequest(Player player) {

    }

    /**
     * Fires when the player has disconnected
     *
     * @param player the player who disconnected
     */
    @Override
    public void onPlayerDisconnection(Player player) {

    }

    /**
     * Checks if a given id is identical to the identifiable object id
     *
     * @param id the id to compare to
     * @return true if the two values match
     */
    @Override
    public boolean is(String id) {
        return this.id.equals(id);
    }

    /**
     * Returns the id of the object
     *
     * @return the object id
     */
    @Override
    public String getId() {
        return this.id;
    }
}
