package com.partydeck.server.models.events;

import com.partydeck.server.models.Player;
import com.partydeck.server.models.helpers.Card;

/**
 * An interface used to handle player events
 */
public interface PlayerEventListener {

    /**
     * Fires every time a player uses a card
     * @param card the card used
     * @param player the player that used the card
     * @return the new card to be added
     */
    Card onCardUse(Card card, Player player);

    /**
     * Fires every time a judge picks a card
     * @param cardId the picked card id
     * @param judge the current judge
     */
    void onJudgePick(String cardId, Player judge);

    /**
     * Fires when the game admin presses 'next'.
     * @param player the player who pressed next
     */
    void onNextRoundRequest(Player player);

    /**
     * Fires when the admin requests to start the game
     * @param player the player who asked to start
     */
    void onStartRequest(Player player);

    /**
     * Fires when a player asks to skip
     * @param player the player who asked to skip
     */
    void onSkipRequest(Player player);

    /**
     * Fires when the admin requests to stop the game
     * @param player the player wo asked to stop
     */
    void onStopRequest(Player player);

    /**
     * Fires when the player has disconnected
     * @param player the player who disconnected
     */
    void onConnectionPause(Player player);

    /**
     * Fires when a player was unexpectedly disconnected for too long
     * @param player the player who disconnected
     */
    void onConnectionDestroy(Player player);

}
