package com.partydeck.server.models.round;

import com.partydeck.server.models.Game;
import com.partydeck.server.models.player.Player;
import com.partydeck.server.models.shared.Card;

import java.util.*;

/**
 * An object responsible for tracking the round state
 * @author Itay Schechner
 * @version 1.0
 */
public class Round {

    private Map<String, Player> cache;
    private Set<Card> options;
    private boolean judging;
    private RoundEventListener eventListener;
    private Player judge;
    private int numberOfParticipants = 1;

    /**
     * Creates an empty round
     */
    public Round() {
        cache = new HashMap<>();
        options = new HashSet<>();
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
        cache.clear();
        options.clear();
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
        if (judging)
            return;
        cache.put(card.getId(), player);
        options.add(card);
        if (cache.size() == numberOfParticipants && eventListener != null) {
            judging = true;
            eventListener.onOptionsReady(options, judge);
        }
    }

    /**
     * Maps a card id to a player
     * @param cardId the id of the card that was picked
     * @return the player who used the card
     */
    public Optional<Player> getWinner(String cardId) {
        return Optional.ofNullable(cache.get(cardId));
    }

    /**
     * Skip the current state of the round
     */
    public void emitSkip() {
        if (eventListener != null) {
            if (judging || cache.size() < Game.MIN_NUMBER_OF_PLAYERS - 1) {
                eventListener.onUnexpectedRoundEnd(judge);
            } else { // player uses are pending
                judging = true;
                eventListener.onOptionsReady(options, judge);
            }
        }
    }
}
