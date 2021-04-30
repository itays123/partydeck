package com.partydeck.server.models.round;

import com.partydeck.server.models.player.Player;
import com.partydeck.server.models.shared.Card;

import java.util.HashMap;
import java.util.Map;

/**
 * An object responsible for tracking the round state
 * @author Itay Schechner
 * @version 1.0
 */
public class Round {

    private Map<Card, Player> cache;
    private boolean judging;
    private RoundEventListener eventListener;
    private Player judge;
    private int numberOfParticipants = 1;

    /**
     * Creates an empty round
     */
    public Round() {
        cache = new HashMap<>();
        judging = false;
        eventListener = null;
        judge = null;
    }

    /**
     * Sets the round event listener
     * @param eventListener the listener to set
     */
    public void setRoundEventListener(RoundEventListener eventListener) {
        this.eventListener = eventListener;
    }

    /**
     * Clear the round object
     */
    public void clear() {
        cache = new HashMap<>();
        judging = false;
        judge = null;
    }

    /**
     * Fires the round start event listener
     */
    public void start() {
        if (eventListener != null)
            eventListener.onRoundStart();
    }

    /**
     * Sets the judge
     * @param judge the judge to set
     */
    public void setJudge(Player judge) {
        this.judge = judge;
    }

    /**
     * Modify the number of participants if needed
     * @param numberOfParticipants the number of participants to set
     */
    public void setNumberOfParticipants(int numberOfParticipants) {
        this.numberOfParticipants = numberOfParticipants - 1; // the judge cannot participate
    }

    /**
     * Add a pair of card and player to the cache
     * @param card the card to set
     * @param player the player to set
     */
    public void recordUse(Card card, Player player) {
        cache.put(card, player);
        if (cache.size() == numberOfParticipants && eventListener != null) {
            judging = true;
            eventListener.onOptionsReady(cache.keySet(), judge);
        }
    }


}
