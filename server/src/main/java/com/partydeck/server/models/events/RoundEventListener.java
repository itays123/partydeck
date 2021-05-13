package com.partydeck.server.models.events;

import com.partydeck.server.models.Player;
import com.partydeck.server.models.helpers.Card;

/**
 * An interface for handling round events
 */
public interface RoundEventListener {

    /**
     * Fires when all of the options are ready
     * @param options the options picked by the players
     * @param judge the current judge
     */
    void onOptionsReady(Iterable<Card> options, Player judge);

    /**
     * Fires when a round is unexpectedly ended
     * @param judge the judge of the round
     */
    void onUnexpectedRoundEnd(Player judge);

    /**
     * Fires every time a new round is created
     */
    void onRoundStart();

}
